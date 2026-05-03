from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import settings
from engine import run_audit
from services.company_lookup import get_categories, get_brands

app = FastAPI(title="AEO Diagnostic API")

origins = [
    settings.FRONTEND_ORIGIN,
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AuditRequest(BaseModel):
    category: str
    brand: str
    description: str


@app.get("/")
def health():
    return {"status": "ok", "service": "AEO Diagnostic API"}


@app.get("/categories")
def categories():
    return {"categories": get_categories()}


@app.get("/brands/{category}")
def brands(category: str):
    return {"brands": get_brands(category)}


@app.post("/audit")
def audit(payload: AuditRequest):
    return run_audit(
        {
            "category": payload.category,
            "brand": payload.brand,
            "description": payload.description,
        }
    )