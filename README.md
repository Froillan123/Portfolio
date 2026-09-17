# Froillan Kim B. Edem — Platform & Cloud Infrastructure Portfolio

> **Self-Taught Platform Engineer & B.S. Information Technology (University of Cebu, 2026)**  
> Engineered declarative GitOps control planes, low-latency Go API reverse proxies, zero-trust Google Cloud Run serverless workloads, and keyless CI/CD automation.

[![Live Web Platform](https://img.shields.io/badge/Live_Platform-froillan--edem.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-git-main-froillan-edems-projects.vercel.app)
[![Google Cloud Run](https://img.shields.io/badge/GCP-Cloud_Run_Serverless-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/run)
[![Keyless WIF](https://img.shields.io/badge/Security-Keyless_OIDC_WIF-22C55E?style=for-the-badge&logo=githubactions&logoColor=white)](https://cloud.google.com/iam/docs/workload-identity-federation)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Froillan_Kim-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/froillan-kim-b-edem-5b591b252)

---

## 🏛️ System Architecture

```text
                               ┌─────────────────────────┐
                               │   Developer Git Push    │
                               │  (main / feat branches) │
                               └────────────┬────────────┘
                                            │
                                            ▼
                        ┌───────────────────────────────────────┐
                        │       GitHub Actions Orchestrator     │
                        │    (Path Filtering & Change Matrix)   │
                        └───────────┬───────────────┬───────────┘
                                    │               │
                     Frontend Diffs │               │ Backend Diffs
                                    ▼               ▼
        ┌───────────────────────────────┐       ┌─────────────────────────────────┐
        │  Vercel Deploy Hook Trigger   │       │ GCP Workload Identity (Keyless) │
        │  POST api.vercel.com/v1/...   │       │ OIDC Token Exchange (No Keys)   │
        └───────────────┬───────────────┘       └────────────────┬────────────────┘
                        │                                        │
                        ▼                                        ▼
        ┌───────────────────────────────┐       ┌─────────────────────────────────┐
        │  Vercel Edge Global Network   │       │ Google Cloud Build Submission   │
        │  React + Vite + Tailwind UI   │       │ Container Build -> Artifact Reg │
        └───────────────┬───────────────┘       └────────────────┬────────────────┘
                        │                                        │
                        ▼                                        ▼
        ┌───────────────────────────────┐       ┌─────────────────────────────────┐
        │ Deployments API Status Poller │       │ Google Cloud Run (Serverless)   │
        │ (READY / ERROR State Machine) │       │ FastAPI + Neon PostgreSQL + WAF │
        └───────────────┬───────────────┘       └────────────────┬────────────────┘
                        │                                        │
                        └───────────────────┬────────────────────┘
                                            │
                                            ▼
                        ┌───────────────────────────────────────┐
                        │   Unified Discord Rich Embed Alerts   │
                        │  (Commit, SHA, Status, Health Probes) │
                        └───────────────────────────────────────┘
```

---

## ⚡ Key Engineering & Architectural Highlights

### 1. Keyless Workload Identity Federation (WIF)
- **Zero Stored Service Account Keys**: Eliminates long-lived JSON credentials in GitHub Secrets by exchanging GitHub OIDC JWTs for short-lived Google Cloud IAM tokens.
- **Defensive IAM Principle of Least Privilege**: Scoped strictly to Cloud Run Administrator, Cloud Build Editor, and Artifact Registry Writer roles.

### 2. Declarative Infrastructure Manifests
- **Frontend Contract** ([`frontend/client.yaml`](file:///c:/Users/Admin/Documents/Portfolio/frontend/client.yaml)): Binds Vercel `org_id` (`team_mohFlju4zqjlLP9BF8k8IKRC`), `project_id` (`prj_DvOSDvCGzooytRd9255aQPWN7AyJ`), build commands, and routing domains.
- **Backend Contract** ([`backend/service.yaml`](file:///c:/Users/Admin/Documents/Portfolio/backend/service.yaml)): Encapsulates Cloud Run CPU/Memory sizing, auto-scaling constraints (0 to 5 instances), concurrency (80 req/worker), container ports, and `/api/health` readiness probes.

### 3. Asynchronous Terminal State Poller
- Rather than assuming HTTP 200 on hook trigger equals deployment success, [`verify_vercel_deployment.py`](file:///c:/Users/Admin/Documents/Portfolio/.github/scripts_actions/verify_vercel_deployment.py) actively queries `api.vercel.com/v6/deployments` until terminal verification (`READY` vs `ERROR`).

### 4. Hardened Ingress & Cryptographic Defense
- **Dynamic Ingress Sanitization**: Real-time email domain syntax, disposable burner domain blocklists, and TLD integrity validation in both TypeScript and Python.
- **Process Memory Safety**: Linux POSIX `RLIMIT_CORE=0` suppression to protect cryptographic material during crashes.
- **PostgreSQL Connection Pooling**: Managed async connections to Neon PostgreSQL over encrypted SSL.

---

## 🛠️ Technology Matrix

| Layer | Technologies |
| :--- | :--- |
| **Edge & Client** | React 18, TypeScript, Vite, Tailwind CSS, Radix UI, Cytoscape.js, Mermaid.js |
| **Backend & Ingress** | Python 3.10, FastAPI, SQLAlchemy ORM (asyncpg), Uvicorn, Discord Ingress WAF |
| **Cloud & Serverless** | Google Cloud Run, Google Cloud Build, Artifact Registry, Vercel Edge Network |
| **Security & Identity** | Workload Identity Federation (WIF), Google Cloud KMS, IAM RBAC, RA 10173 DPA |
| **Databases** | Neon Serverless PostgreSQL, Redis Cache, SQLite (local fallback) |
| **CI/CD & GitOps** | GitHub Actions, Declarative Manifests (`client.yaml`, `service.yaml`), Python Automation |

---

## 📂 Repository Layout

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/            # Standardized bug and feature issue templates
│   ├── scripts_actions/           # CI/CD Python automation scripts
│   │   ├── notify_discord.py      # Unified Discord deployment notification engine
│   │   └── verify_vercel_deployment.py # Vercel API terminal status poller
│   ├── workflows/
│   │   ├── ci-cd.yml              # Unified multi-component GitOps orchestrator
│   │   ├── deploy-backend.yml     # Standalone GCP Cloud Run WIF deployer
│   │   └── deploy-frontend.yml    # Standalone Vercel deployer
│   └── PULL_REQUEST_TEMPLATE.md   # Quality control & checklist for Pull Requests
├── backend/
│   ├── config.py                  # Pydantic environment configuration & settings
│   ├── database.py                # Async SQLAlchemy engine & connection pool
│   ├── main.py                    # FastAPI application, CORS, and ingress routes
│   ├── models.py                  # Database entity models
│   ├── run.py                     # Local development entrypoint
│   ├── schemas.py                 # Pydantic validation schemas
│   ├── security.py                # Ingress sanitation, domain validation & Discord webhook
│   └── service.yaml               # Declarative Cloud Run infrastructure manifest
├── frontend/
│   ├── client.yaml                # Declarative Vercel deployment manifest
│   ├── src/                       # React, TypeScript, Tailwind, & Visualization source
│   ├── package.json
│   └── vite.config.ts
├── .gitignore                     # Bulletproof ignore rules for secrets and builds
└── README.md
```

---

## 💻 Local Quickstart

### Prerequisites
- Node.js 20+ & npm
- Python 3.10+ & pip

```bash
# 1. Clone the repository
git clone https://github.com/Froillan123/Portfolio.git
cd Portfolio

# 2. Start the Backend API (FastAPI)
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Linux: source venv/bin/activate
pip install -r requirements.txt
python run.py
# -> Live at http://127.0.0.1:8000 (Swagger docs: http://127.0.0.1:8000/docs)

# 3. Start the Frontend Client (in a new terminal)
cd ../frontend
npm install
npm run dev
# -> Live at http://localhost:8080
```

---

## 🎯 Target Engineering Roles

- **Junior / Associate Platform Engineer**
- **Cloud Infrastructure & DevOps Engineer**
- **Site Reliability Engineer (SRE)**
- **Backend Systems Engineer (Go / Python)**

---

**© 2026 Froillan Kim B. Edem** · Built with precision, declarative GitOps, and zero-trust cloud principles.
