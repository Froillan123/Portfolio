import os
from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, Request, Response, status, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import text
from sqlalchemy.orm import Session

from backend.config import ALLOWED_ORIGINS, PORT
from backend.database import Base, engine, get_db
from backend.models import ContactInquiry
from backend.security import (
    get_client_ip,
    sanitize_text,
    validate_email_domain,
    dispatch_discord_embed,
    verify_admin_key,
    check_contact_rate_limit,
)

# Initialize Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Froillan Edem Portfolio Ingress Gateway API",
    description="FastAPI + PostgreSQL CRUD & Discord Ingress Gateway with Server-Side WAF and Rate Limiting",
    version="2.5.1",
    docs_url=None,
    redoc_url=None,
    openapi_url=None
)

# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response

# CORS Middleware (Allow all origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Pydantic Schemas -----------------

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Sender's full name")
    email: EmailStr = Field(..., description="Valid sender email address")
    subject: str = Field(default="Platform / Cloud Systems Role Opportunity", max_length=150)
    message: str = Field(..., min_length=10, max_length=2000, description="Inquiry details")
    honeypot: Optional[str] = Field(default=None, description="Hidden anti-bot trap")

class InquiryUpdate(BaseModel):
    status: str = Field(..., pattern="^(unread|read|replied|archived)$", description="New inquiry status")

class InquiryResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    client_ip: Optional[str]
    status: str
    waf_flags: Optional[str]
    created_at: Optional[str]
    updated_at: Optional[str]

    class Config:
        from_attributes = True

# ----------------- API Endpoints -----------------

@app.get("/")
def root():
    return {
        "service": "Froillan Edem Portfolio Ingress Gateway API",
        "status": "online",
        "waf": "Active (Token Bucket + Honeypot + XSS Filter)",
        "region": "asia-southeast1"
    }

@app.get("/api/health")
def health_check(db: Session = Depends(get_db)):
    try:
        # Check DB connection
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        print(f"[Health Check DB Error] {e}")
        db_status = "unavailable"

    return {
        "status": "healthy" if db_status == "connected" else "degraded",
        "database": db_status,
        "rate_limiter": "active",
        "version": "2.5.1",
        "gitops_engine": "github-actions-wif",
        "region": "asia-southeast1"
    }

# 1. CREATE: Public Contact Ingress (Rate-Limited & WAF Protected)
@app.post("/api/contact", status_code=status.HTTP_201_CREATED, dependencies=[Depends(check_contact_rate_limit)])
async def submit_contact_inquiry(
    request: Request,
    payload: ContactCreate,
    db: Session = Depends(get_db)
):
    client_ip = get_client_ip(request)

    # Layer 1: Anti-Bot Honeypot Trap
    if payload.honeypot and len(payload.honeypot.strip()) > 0:
        # Silently absorb bot spam
        return {
            "success": True,
            "message": "Inquiry received and queued for processing.",
            "inquiry_id": None
        }

    # Layer 2: Email Domain & TLD Integrity Check
    is_valid_email, email_error = validate_email_domain(payload.email)
    if not is_valid_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=email_error
        )

    # Layer 3: Server-Side WAF Sanitization
    sanitized_name, flags_name = sanitize_text(payload.name)
    sanitized_subject, flags_subj = sanitize_text(payload.subject)
    sanitized_message, flags_msg = sanitize_text(payload.message)
    all_flags = list(set(flags_name + flags_subj + flags_msg))
    waf_flags_str = ", ".join(all_flags) if all_flags else "Clean"

    # Layer 4: Save to PostgreSQL Database (CRUD Create)
    inquiry = ContactInquiry(
        name=sanitized_name,
        email=payload.email,
        subject=sanitized_subject,
        message=sanitized_message,
        client_ip=client_ip,
        status="unread",
        waf_flags=waf_flags_str
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    # Layer 5: Forward to Discord Webhook
    discord_dispatched = await dispatch_discord_embed(
        inquiry_id=inquiry.id,
        name=sanitized_name,
        email=payload.email,
        subject=sanitized_subject,
        message=sanitized_message,
        client_ip=client_ip,
        waf_flags=waf_flags_str
    )

    return {
        "success": True,
        "message": "Inquiry saved to database and dispatched to Discord Gateway!",
        "inquiry_id": inquiry.id,
        "discord_notified": discord_dispatched
    }

# 2. READ: List All Inquiries (CRUD Read with Filter & Search)
@app.get("/api/inquiries", response_model=List[InquiryResponse])
def list_inquiries(
    status_filter: Optional[str] = Query(None, alias="status", pattern="^(unread|read|replied|archived)$"),
    search: Optional[str] = Query(None, alias="q"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    authorized: bool = Depends(verify_admin_key)
):
    query = db.query(ContactInquiry)

    if status_filter:
        query = query.filter(ContactInquiry.status == status_filter)

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (ContactInquiry.name.ilike(search_pattern)) |
            (ContactInquiry.email.ilike(search_pattern)) |
            (ContactInquiry.subject.ilike(search_pattern)) |
            (ContactInquiry.message.ilike(search_pattern))
        )

    inquiries = query.order_by(ContactInquiry.created_at.desc()).offset(skip).limit(limit).all()
    return [i.to_dict() for i in inquiries]

# 3. READ: Get Single Inquiry Details
@app.get("/api/inquiries/{inquiry_id}", response_model=InquiryResponse)
def get_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    authorized: bool = Depends(verify_admin_key)
):
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return inquiry.to_dict()

# 4. UPDATE: Update Status (e.g. mark read, replied, archived)
@app.patch("/api/inquiries/{inquiry_id}", response_model=InquiryResponse)
def update_inquiry_status(
    inquiry_id: int,
    update_data: InquiryUpdate,
    db: Session = Depends(get_db),
    authorized: bool = Depends(verify_admin_key)
):
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    inquiry.status = update_data.status
    db.commit()
    db.refresh(inquiry)
    return inquiry.to_dict()

# 5. DELETE: Delete Inquiry from Database
@app.delete("/api/inquiries/{inquiry_id}", status_code=status.HTTP_200_OK)
def delete_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    authorized: bool = Depends(verify_admin_key)
):
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    db.delete(inquiry)
    db.commit()
    return {
        "success": True,
        "message": f"Inquiry #{inquiry_id} deleted successfully"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=PORT, reload=True)
