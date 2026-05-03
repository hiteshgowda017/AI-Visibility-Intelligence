"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type AuditCard = {
  title: string;
  subtitle: string;
};

const auditCards: AuditCard[] = [
  { title: "Entity Authority", subtitle: "TRUST SIGNALS" },
  { title: "Live Rankings", subtitle: "MODEL BENCHMARK" },
  { title: "AI Citations", subtitle: "GAP DETECTION" },
];

export default function HomePage() {
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [description, setDescription] = useState("");

  const [brandSearch, setBrandSearch] = useState("");
  const [brandOpen, setBrandOpen] = useState(false);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        setError("");

        const res = await fetch(`${API_BASE}/categories`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(Array.isArray(data.categories) ? data.categories : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load categories. Check backend connection.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setCompanies([]);
      setSelectedBrand("");
      setBrandSearch("");
      return;
    }

    const loadCompanies = async () => {
      try {
        setLoadingCompanies(true);

        const res = await fetch(
          `${API_BASE}/companies/${encodeURIComponent(selectedCategory)}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch companies");

        const data = await res.json();
        setCompanies(Array.isArray(data.companies) ? data.companies : []);
      } catch (err) {
        console.error(err);
        setCompanies([]);
      } finally {
        setLoadingCompanies(false);
      }
    };

    loadCompanies();
  }, [selectedCategory]);

  const filteredCompanies = useMemo(() => {
    if (!brandSearch.trim()) return companies;
    return companies.filter((company) =>
      company.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [companies, brandSearch]);

  const runAudit = async () => {
    if (!selectedCategory || !selectedBrand) {
      setError("Please select a category and brand before running audit.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const res = await fetch(`${API_BASE}/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          brand: selectedBrand,
          description,
        }),
      });

      if (!res.ok) throw new Error("Audit failed");

      const result = await res.json();
      sessionStorage.setItem("audit_result", JSON.stringify(result));
      router.push("/results");
    } catch (err) {
      console.error(err);
      setError("Unable to run audit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-2 lg:px-10">
        <div className="flex flex-col justify-between">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm tracking-[0.35em] text-cyan-300">
              AI VISIBILITY INTELLIGENCE
            </div>

            <h1 className="mt-10 text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
              The AI engine
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                behind brand
              </span>
              <br />
              discovery.
            </h1>

            <p className="mt-10 max-w-2xl text-xl leading-10 text-slate-400">
              Measure how GPT, Claude, and Gemini rank your brand with premium AI
              visibility diagnostics, competitor intelligence, and entity authority
              benchmarking.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {auditCards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <div className="text-2xl font-semibold">{card.title}</div>
                <div className="mt-3 text-xs tracking-[0.35em] text-slate-500">
                  {card.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-5xl font-semibold tracking-tight">
            Run AI Visibility Audit
          </h2>

          <p className="mt-4 text-xl text-slate-400">
            Generate a live AI brand intelligence report.
          </p>

          {error && (
            <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-rose-200">
              {error}
            </div>
          )}

          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-3 block text-lg text-slate-300">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loadingCategories}
                className="w-full rounded-2xl border border-white/5 bg-[#050b1f] px-5 py-4 text-lg text-white outline-none"
              >
                <option value="">
                  {loadingCategories ? "Loading categories..." : "Select category"}
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="mb-3 block text-lg text-slate-300">Brand</label>
              <input
                value={brandSearch}
                onChange={(e) => {
                  setBrandSearch(e.target.value);
                  setBrandOpen(true);
                  setSelectedBrand("");
                }}
                onFocus={() => setBrandOpen(true)}
                placeholder={
                  loadingCompanies
                    ? "Loading brands..."
                    : selectedCategory
                    ? "Search brand..."
                    : "Select category first"
                }
                disabled={!selectedCategory}
                className="w-full rounded-2xl border border-white/5 bg-[#050b1f] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
              />

              {brandOpen && selectedCategory && filteredCompanies.length > 0 && (
                <div className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#0a1022] p-2 shadow-2xl">
                  {filteredCompanies.map((company) => (
                    <button
                      key={company}
                      type="button"
                      onClick={() => {
                        setSelectedBrand(company);
                        setBrandSearch(company);
                        setBrandOpen(false);
                      }}
                      className="block w-full rounded-xl px-4 py-3 text-left text-white hover:bg-white/5"
                    >
                      {company}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="mb-3 block text-lg text-slate-300">
                Brand Description <span className="text-slate-500">(Optional)</span>
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this brand does..."
                className="w-full rounded-2xl border border-white/5 bg-[#050b1f] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <button
              onClick={runAudit}
              disabled={submitting}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-5 text-xl font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Running Audit..." : "Run Visibility Audit"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}