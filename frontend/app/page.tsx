"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Company = {
  name: string;
  score: number;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000";

export default function HomePage() {
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [brandQuery, setBrandQuery] = useState("");
  const [brandOpen, setBrandOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [error, setError] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setError("");
        const res = await fetch(`${API_BASE}/categories`);

        if (!res.ok) {
          throw new Error("Failed to load categories");
        }

        const data = await res.json();
        setCategories(data.categories ?? []);
      } catch (error) {
        console.error(error);
        setError("Unable to load categories. Check backend connection.");
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadCompanies = async () => {
      if (!category) {
        setCompanies([]);
        setBrand("");
        setBrandQuery("");
        return;
      }

      try {
        setLoadingBrands(true);
        setError("");

        const res = await fetch(`${API_BASE}/companies/${encodeURIComponent(category)}`);

        if (!res.ok) {
          throw new Error("Failed to load brands");
        }

        const data = await res.json();
        setCompanies(data.companies ?? []);
        setBrand("");
        setBrandQuery("");
      } catch (error) {
        console.error(error);
        setCompanies([]);
        setError("Unable to load brands for this category.");
      } finally {
        setLoadingBrands(false);
      }
    };

    loadCompanies();
  }, [category]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setBrandOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, []);

  const filteredCompanies = useMemo(() => {
    if (!brandQuery.trim()) return companies;
    return companies.filter((company) =>
      company.name.toLowerCase().includes(brandQuery.toLowerCase())
    );
  }, [brandQuery, companies]);

  const handleAudit = async () => {
    if (!category || !brand || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand,
          category,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error("Audit request failed");
      }

      const data = await res.json();
      sessionStorage.setItem("aeo_audit_result", JSON.stringify(data));
      router.push("/results");
    } catch (error) {
      console.error(error);
      setError("Audit failed. Please verify backend and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.16),transparent_26%),radial-gradient(circle_at_70%_75%,rgba(255,255,255,0.04),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-cyan-200 backdrop-blur-xl">
              AI Visibility Intelligence
            </div>

            <h1 className="mt-8 max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-[6.8rem]">
              The AI engine
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                behind brand
              </span>
              discovery.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-white/55">
              Measure how GPT, Claude, and Gemini rank your brand with premium
              AI visibility diagnostics, competitor intelligence, and entity
              authority benchmarking.
            </p>

            <div className="mt-10 grid max-w-2xl gap-4 md:grid-cols-3">
              <SignalCard title="Entity Authority" value="Trust Signals" />
              <SignalCard title="Live Rankings" value="Model Benchmark" />
              <SignalCard title="AI Citations" value="Gap Detection" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-black/50 backdrop-blur-3xl">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em]">
                    Run AI Visibility Audit
                  </h2>
                  <p className="mt-2 text-sm text-white/45">
                    Generate a live AI brand intelligence report.
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-cyan-400/40" />
                  <span className="h-3 w-3 rounded-full bg-violet-400/30" />
                  <span className="h-3 w-3 rounded-full bg-white/10" />
                </div>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <Field label="Category">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none"
                  >
                    <option value="">Select category</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="relative" ref={dropdownRef}>
                  <Field label="Brand">
                    <button
                      type="button"
                      disabled={!category || loadingBrands}
                      onClick={() => category && !loadingBrands && setBrandOpen((prev) => !prev)}
                      className="flex h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className={brand ? "text-white" : "text-white/25"}>
                        {loadingBrands ? "Loading brands..." : brand || "Select brand"}
                      </span>
                      <span className="text-white/30">⌄</span>
                    </button>
                  </Field>

                  {brandOpen && category && !loadingBrands && (
                    <div className="absolute z-30 mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1020] p-2 shadow-2xl shadow-black/60">
                      <input
                        value={brandQuery}
                        onChange={(e) => setBrandQuery(e.target.value)}
                        placeholder="Search brand..."
                        className="mb-2 h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none placeholder:text-white/20"
                      />

                      <div className="max-h-64 overflow-y-auto">
                        {filteredCompanies.length ? (
                          filteredCompanies.map((company) => (
                            <button
                              key={company.name}
                              type="button"
                              onClick={() => {
                                setBrand(company.name);
                                setBrandQuery(company.name);
                                setBrandOpen(false);
                              }}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition hover:bg-white/5"
                            >
                              <span>{company.name}</span>
                              <span className="text-white/25">{company.score}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-3 text-sm text-white/35">
                            No brands found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Field label="Brand Description">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe what this brand does..."
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white outline-none placeholder:text-white/20"
                  />
                </Field>

                <button
                  type="button"
                  disabled={!category || !brand || loading}
                  onClick={handleAudit}
                  className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-sm font-medium text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Running Audit..." : "Run Visibility Audit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/60">{label}</label>
      {children}
    </div>
  );
}

function SignalCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="text-sm font-medium text-white/85">{title}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
        {value}
      </div>
    </div>
  );
}