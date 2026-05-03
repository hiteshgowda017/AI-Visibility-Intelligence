from data.company_master import COMPANY_MASTER


def discover_competitors(brand: str, category: str, description: str = ""):
    companies = COMPANY_MASTER.get(category, [])

    if not companies:
        return []

    brand_lower = brand.strip().lower()

    competitors = [c for c in companies if c.lower() != brand_lower]

    return competitors[:3]