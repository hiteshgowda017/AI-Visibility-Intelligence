# backend/services/company_lookup.py

from __future__ import annotations

from typing import Dict, List, Optional

from data.company_master import COMPANY_MASTER


def get_categories() -> List[str]:
    return sorted(COMPANY_MASTER.keys())


def get_companies_by_category(category: str) -> List[Dict[str, int | str]]:
    companies = COMPANY_MASTER.get(category, [])
    return sorted(companies, key=lambda item: item["score"], reverse=True)


def get_company(category: str, brand: str) -> Optional[Dict[str, int | str]]:
    if not category or not brand:
        return None

    companies = COMPANY_MASTER.get(category, [])
    normalized_brand = brand.strip().lower()

    for company in companies:
        if company["name"].strip().lower() == normalized_brand:
            return company

    return None


def get_top_competitor(category: str, brand: str) -> Optional[Dict[str, int | str]]:
    companies = get_companies_by_category(category)
    normalized_brand = brand.strip().lower()

    for company in companies:
        if company["name"].strip().lower() != normalized_brand:
            return company

    return None


def build_competitor_table(category: str) -> List[Dict[str, int | str]]:
    return [{"name": company["name"], "score": company["score"]} for company in get_companies_by_category(category)]