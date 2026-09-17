import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.database import Base

class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, index=True)
    email = Column(String(150), nullable=False, index=True)
    subject = Column(String(150), nullable=False, index=True)
    message = Column(Text, nullable=False)
    client_ip = Column(String(64), nullable=True)
    status = Column(String(32), default="unread", index=True)  # unread, read, replied, archived
    waf_flags = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "subject": self.subject,
            "message": self.message,
            "client_ip": self.client_ip,
            "status": self.status,
            "waf_flags": self.waf_flags,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
