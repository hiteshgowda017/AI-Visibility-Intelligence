# backend/engine.py

from __future__ import annotations

from typing import Any, Dict, List

from services.company_lookup import (
    build_competitor_table,
    get_company,
    get_top_competitor,
)


def _clamp_score(value: int) -> int:
    return max(0, min(100, value))


def _compute_model_scores(base_score: int) -> Dict[str, int]:
    gpt_score = _clamp_score(base_score + 3)
    claude_score = _clamp_score(base_score - 2)
    gemini_score = _clamp_score(base_score - 8)

    return {
        "GPT-4": gpt_score,
        "Claude": claude_score,
        "Gemini": gemini_score,
    }


def _compute_rank(competitors: List[Dict[str, Any]], brand: str) -> int:
    normalized_brand = brand.strip().lower()

    for index, company in enumerate(competitors, start=1):
        if company["name"].strip().lower() == normalized_brand:
            return index

    return len(competitors) + 1 if competitors else 1


def _compute_main_weakness(
    brand: str,
    brand_score: int,
    top_competitor: Dict[str, Any] | None,
) -> str:
    if not top_competitor:
        return "Limited category visibility data available."

    score_gap = top_competitor["score"] - brand_score
    competitor_name = top_competitor["name"]

    if score_gap >= 10:
        return f"Significantly lower category authority than {competitor_name}."
    if score_gap >= 5:
        return f"Lower category authority than {competitor_name}."
    if score_gap >= 1:
        return f"Weaker AI recall consistency than {competitor_name}."

    return "Low comparative differentiation in AI-generated recommendations."


def _compute_recommendations(
    brand: str,
    top_competitor: Dict[str, Any] | None,
) -> List[str]:
    competitor_name = top_competitor["name"] if top_competitor else "top competitors"

    return [
        f"Improve category-specific authority against {competitor_name}.",
        f"Build stronger comparison content vs {competitor_name}.",
        "Increase review and trust signal coverage.",
        "Improve entity visibility across AI search engines.",
    ]


def run_audit(payload: Dict[str, Any]) -> Dict[str, Any]:
    brand = str(payload.get("brand", "")).strip()
    category = str(payload.get("category", "")).strip()
    description = str(payload.get("description", "")).strip()

    competitors = build_competitor_table(category)

    if not category or not competitors:
        return {
            "brand": brand or "Unknown Brand",
            "category": category or "Unknown Category",
            "score": 0,
            "rank": 1,
            "top_competitor": "N/A",
            "main_weakness": "Category not found in benchmark dataset.",
            "model_scores": {"GPT-4": 0, "Claude": 0, "Gemini": 0},
            "competitors": [],
            "recommendations": [
                "Select a valid category to generate an audit.",
                "Ensure the brand belongs to the selected category.",
                "Provide a clearer business description.",
                "Re-run the audit with valid benchmark inputs.",
            ],
        }

    company = get_company(category, brand)

    if not company:
        fallback_score = max(55, competitors[-1]["score"] - 4)
        inferred_brand = brand or "Unknown Brand"
        top_competitor = competitors[0]

        synthetic_competitors = sorted(
            competitors + [{"name": inferred_brand, "score": fallback_score}],
            key=lambda item: item["score"],
            reverse=True,
        )

        rank = _compute_rank(synthetic_competitors, inferred_brand)

        return {
            "brand": inferred_brand,
            "category": category,
            "score": fallback_score,
            "rank": rank,
            "top_competitor": top_competitor["name"],
            "main_weakness": f"Brand authority is not yet established against {top_competitor['name']}.",
            "model_scores": _compute_model_scores(fallback_score),
            "competitors": synthetic_competitors[:8],
            "recommendations": [
                f"Improve category-specific authority against {top_competitor['name']}.",
                f"Create comparison pages against {top_competitor['name']}.",
                "Strengthen trust, review, and citation signals.",
                "Expand brand entity coverage across AI search engines.",
            ],
        }

    score = int(company["score"])
    top_competitor = get_top_competitor(category, brand)
    rank = _compute_rank(competitors, brand)

    return {
        "brand": company["name"],
        "category": category,
        "score": score,
        "rank": rank,
        "top_competitor": top_competitor["name"] if top_competitor else "N/A",
        "main_weakness": _compute_main_weakness(company["name"], score, top_competitor),
        "model_scores": _compute_model_scores(score),
        "competitors": competitors[:8],
        "recommendations": _compute_recommendations(company["name"], top_competitor),
    }