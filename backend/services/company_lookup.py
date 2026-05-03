from typing import Dict, List, Optional

from data.company_master import COMPANY_MASTER


def get_categories() -> List[str]:
    """
    Return all available business categories sorted alphabetically.
    """
    return sorted(COMPANY_MASTER.keys())


def get_companies_by_category(category: str) -> List[Dict[str, int | str]]:
    """
    Return all companies for a given category sorted by score descending.
    Returns empty list if category is invalid.
    """
    companies = COMPANY_MASTER.get(category, [])
    return sorted(companies, key=lambda company: company["score"], reverse=True)


def get_company_names_by_category(category: str) -> List[str]:
    """
    Return only company names for dropdown usage.
    """
    return [company["name"] for company in get_companies_by_category(category)]


def find_company(category: str, brand: str) -> Optional[Dict[str, int | str]]:
    """
    Find a specific company inside a category by exact brand match.
    Returns None if not found.
    """
    normalized_brand = brand.strip().lower()

    for company in COMPANY_MASTER.get(category, []):
        if company["name"].strip().lower() == normalized_brand:
            return company

    return None


def get_competitor_leaderboard(category: str) -> List[Dict[str, int | str]]:
    """
    Return ranked leaderboard for a category.
    Adds stable rank ordering.
    """
    ranked_companies = get_companies_by_category(category)

    return [
        {
            "rank": index + 1,
            "name": company["name"],
            "score": company["score"],
        }
        for index, company in enumerate(ranked_companies)
    ]


def get_top_competitor(category: str, brand: str) -> Optional[Dict[str, int | str]]:
    """
    Return the strongest competitor excluding the selected brand.
    """
    normalized_brand = brand.strip().lower()

    for company in get_companies_by_category(category):
        if company["name"].strip().lower() != normalized_brand:
            return company

    return None


def build_category_snapshot(category: str) -> Dict[str, object]:
    """
    Return frontend-safe category snapshot.
    """
    companies = get_companies_by_category(category)

    return {
        "category": category,
        "total_companies": len(companies),
        "companies": companies,
    }