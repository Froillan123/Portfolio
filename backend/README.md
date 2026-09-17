# FaceOfMind FastAPI + PostgreSQL Ingress Gateway

Production-ready backend service providing **PostgreSQL CRUD storage**, **SlowAPI IP-based Rate Limiting**, **WAF Anti-Spam / DDoS filtering**, and **Discord Webhook notifications** for portfolio inquiries.

---

## 🎯 Architecture Overview

```mermaid
flowchart LR
    Client[Browser / Frontend] -->|POST /api/contact| WAF[FastAPI Gateway + SlowAPI]
    WAF -->|1. Rate Limit Check| Limiter[IP Sliding-Window / Token Bucket]
    WAF -->|2. Honeypot & Threat Sanitize| Sanitize[WAF Sanitizer]
    WAF -->|3. ACID Transaction| DB[(PostgreSQL / SQLite)]
    WAF -->|4. Async Forward| Discord[Discord Channel Webhook]
```

- **Zero Webhook Exposure**: Discord Webhook URL is safely encapsulated on the server (`.env`).
- **PostgreSQL CRUD**: All inquiries are persisted in PostgreSQL with timestamps, IP telemetry, and status tags (`unread`, `read`, `replied`, `archived`).
- **Anti-Spam & Anti-DDoS**: SlowAPI IP limiter (5 req/min, 15 req/hour per IP) + Honeypot trap + Speed trap + XSS / SQLi sanitization + Discord `@everyone` disarmer.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

### 2. Configure Environment (`backend/.env`)
Create `backend/.env` (or copy from `backend/.env.example`):
```env
# PostgreSQL connection (Defaults to sqlite:///./inquiries.db if left empty)
DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio_db

# Discord Webhook Ingress
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Security
ADMIN_API_KEY=fke-platform-secret-admin-key-2026
PORT=8000
```

### 3. Run the Server
```bash
python backend/run.py
```
- **API Server**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **Alternative ReDoc**: `http://localhost:8000/redoc`

---

## 📡 REST API & CRUD Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/contact` | Submit inquiry (Rate-Limited, WAF sanitization, save to DB, alert Discord) | Public (Rate-Limited) |
| `GET` | `/api/inquiries` | List all inquiries (Supports `?status=unread`, `?q=search`, `?skip=0&limit=50`) | Optional Admin Key |
| `GET` | `/api/inquiries/{id}` | Read single inquiry detail | Optional Admin Key |
| `PATCH` | `/api/inquiries/{id}` | Update status (`unread`, `read`, `replied`, `archived`) | Optional Admin Key |
| `DELETE` | `/api/inquiries/{id}` | Delete inquiry record from database | Optional Admin Key |
| `GET` | `/api/health` | Health check & DB connection probe | Public |

---

## 🐳 Docker & Google Cloud Run Deployment

### Build & Run with Docker
```bash
docker build -t faceofmind-backend -f backend/Dockerfile .
docker run -p 8000:8000 --env-file backend/.env faceofmind-backend
```

### Deploy to Google Cloud Run
```bash
gcloud run deploy faceofmind-gateway \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars "DATABASE_URL=postgresql://...,DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/..."
```
