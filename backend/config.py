import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend and root directory with override=True
env_path = Path(__file__).resolve().parent / ".env"
root_env_path = Path(__file__).resolve().parent.parent / ".env"

if env_path.exists():
    load_dotenv(dotenv_path=env_path, override=True)
if root_env_path.exists():
    load_dotenv(dotenv_path=root_env_path, override=True)

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./inquiries.db"
)

# Fix postgresql:// vs postgres:// for modern SQLAlchemy
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Discord Webhook Ingress
DISCORD_WEBHOOK_URL = os.getenv(
    "DISCORD_WEBHOOK_URL",
    os.getenv("DISCORD_URL", "")
)

# Security & Rate Limiting
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "admin-secret-key-change-in-prod")
RATE_LIMIT_SUBMIT = os.getenv("RATE_LIMIT_SUBMIT", "5/minute")
RATE_LIMIT_BURST = os.getenv("RATE_LIMIT_BURST", "15/hour")

# CORS Allowed Origins
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:8080,http://localhost:5173,http://localhost:3000,http://127.0.0.1:8080"
).split(",")

# Server Port
PORT = int(os.getenv("PORT", "8000"))
