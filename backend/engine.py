from typing import Any, Dict, List

from services.company_lookup import (
    find_company,
    get_categories,
    get_competitor_leaderboard,
    get_top_competitor,
)


def _clamp(value: int, minimum: int = 0, maximum: int = 100) -> int:
    return max(minimum, min(maximum, value))


def _build_model_scores(base_score: int) -> Dict[str, int]:
    """
    Deterministic model scoring derived from master score.
    No randomness.
    """
    return {
        "GPT-4": _clamp(base_score + 4),
        "Claude": _clamp(base_score - 2),
        "Gemini": _clamp(base_score - 6),
    }


def _build_main_weakness(
    brand: str,
    top_competitor: str,
    brand_score: int,
    competitor_score: int,
) -> str:
    gap = competitor_score - brand_score

    if gap <= 2:
        return f"{brand} trails {top_competitor} slightly in comparative authority."
    if gap <= 6:
        return f"{brand} shows weaker AI citation depth than {top_competitor}."
    if gap <= 10:
        return f"{brand} has lower category authority than {top_competitor}."
    return f"{brand} significantly underperforms {top_competitor} in AI visibility."


def _build_recommendations(
    brand: str,
    top_competitor: str,
    category: str,
) -> List[str]:
    return [
        f"Improve category-specific authority against {top_competitor}.",
        f"Build stronger comparison content between {brand} and {top_competitor}.",
        f"Increase review and trust signal coverage in the {category} category.",
        "Improve entity visibility across AI search engines.",
        "Strengthen structured mentions across high-authority third-party sources.",
    ]


def run_audit(
    brand: str,
    category: str,
    description: str | None = None,
) -> Dict[str, Any]:
    """
    Stable deterministic audit engine.
    Always returns valid JSON-safe response.
    """
    if category not in get_categories():
        return {
            "brand": brand,
            "category": category,
            "description": description or "",
            "score": 0,
            "rank": 0,
            "top_competitor": "N/A",
            "main_weakness": "Invalid category selected.",
            "model_scores": {"GPT-4": 0, "Claude": 0, "Gemini": 0},
            "competitors": [],
            "recommendations": ["Select a valid category to run the audit."],
        }

    selected_company = find_company(category, brand)
    leaderboard = get_competitor_leaderboard(category)

    if not selected_company:
        fallback_top = leaderboard[0] if leaderboard else {"name": "N/A", "score": 0}

        return {
            "brand": brand,
            "category": category,
            "description": description or "",
            "score": 0,
            "rank": 0,
            "top_competitor": fallback_top["name"],
            "main_weakness": "Selected brand was not found in this category.",
            "model_scores": {"GPT-4": 0, "Claude": 0, "Gemini": 0},
            "competitors": leaderboard[:5],
            "recommendations": [
                "Choose a listed brand to generate a valid audit.",
                "Ensure the selected category and brand match correctly.",
            ],
        }

    brand_score = int(selected_company["score"])
    ranked_brand = next(
        (item for item in leaderboard if item["name"].lower() == brand.lower()),
        {"rank": 0},
    )

    top_competitor = get_top_competitor(category, brand) or {"name": "N/A", "score": 0}
    competitor_name = str(top_competitor["name"])
    competitor_score = int(top_competitor["score"])

    return {
        "brand": brand,
        "category": category,
        "description": description or "",
        "score": brand_score,
        "rank": ranked_brand["rank"],
        "top_competitor": competitor_name,
        "main_weakness": _build_main_weakness(
            brand,
            competitor_name,
            brand_score,
            competitor_score,
        ),
        "model_scores": _build_model_scores(brand_score),
        "competitors": leaderboard[:5],
        "recommendations": _build_recommendations(
            brand,
            competitor_name,
            category,
        ),
    }