from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from engine import run_audit
from services.company_lookup import get_categories, get_company_names_by_category

app = FastAPI(title="AEO Diagnostic API")


class AuditRequest(BaseModel):
    brand: str
    category: str
    description: Optional[str] = ""


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://localhost:3000",
        "https://ai-visibility-intelligence-mwrp0knq7-hiteshs-projects-d1b4e4ec.vercel.app",
        "https://ai-visibility-intelligence.vercel.app/" ,  
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "AEO Diagnostic API"}


@app.get("/categories")
def fetch_categories():
    return {"categories": get_categories()}


@app.get("/companies/{category}")
def fetch_companies(category: str):
    return {"companies": get_company_names_by_category(category)}


@app.post("/audit")
def audit_brand(payload: AuditRequest):
    return run_audit(
        brand=payload.brand,
        category=payload.category,
        description=payload.description,
    )