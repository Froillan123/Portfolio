import os
import sys
from pathlib import Path

# Add root directory to sys.path so backend imports work seamlessly
root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir))

import uvicorn
from backend.config import PORT

if __name__ == "__main__":
    print(f"🚀 Starting FaceOfMind FastAPI + PostgreSQL Gateway on http://localhost:{PORT}")
    print(f"📚 Swagger Interactive Documentation: http://localhost:{PORT}/docs")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=PORT, reload=True)
