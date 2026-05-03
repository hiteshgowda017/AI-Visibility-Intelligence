from __future__ import annotations

from typing import Any, Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from config import FRONTEND_ORIGIN
from engine import run_audit
from services.company_lookup import get_categories, get_companies_by_category

app = FastAPI(
    title="AEO Diagnostic API",
    description="Answer Engine Optimization Diagnostic Platform API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_ORIGIN,
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AuditRequest(BaseModel):
    brand: str = Field(default="", max_length=120)
    category: str = Field(default="", max_length=120)
    description: str = Field(default="", max_length=500)


@app.get("/")
def healthcheck() -> Dict[str, str]:
    return {
        "status": "ok",
        "service": "AEO Diagnostic API",
    }


@app.get("/categories")
def categories() -> Dict[str, list[str]]:
    return {"categories": get_categories()}


@app.get("/companies/{category}")
def companies(category: str) -> Dict[str, list[Dict[str, Any]]]:
    return {"companies": get_companies_by_category(category)}


@app.post("/audit")
def audit(payload: AuditRequest) -> Dict[str, Any]:
    return run_audit(payload.model_dump())