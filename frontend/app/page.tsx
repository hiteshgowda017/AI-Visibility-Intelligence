"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

type AuditResult = {
  score: number;
  brand: string;
  category: string;
  top_rank_position: number;
  top_competitor: string;
  main_weakness: string;
};

export default function HomePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setError("");

        const res = await fetch(`${API}/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Category load error:", err);
        setError("Unable to load categories. Check backend connection.");
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!category) {
      setBrands([]);
      setBrand("");
      return;
    }

    const loadBrands = async () => {
      try {
        const res = await fetch(`${API}/brands/${encodeURIComponent(category)}`);

        if (!res.ok) throw new Error("Failed to fetch brands");

        const data = await res.json();
        setBrands(data.brands || []);
      } catch (err) {
        console.error("Brand load error:", err);
        setBrands([]);
      }
    };

    loadBrands();
  }, [category]);

  const runAudit = async () => {
    if (!category || !brand || !description) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          brand,
          description,
        }),
      });

      if (!res.ok) throw new Error("Audit failed");

      const result: AuditResult = await res.json();

      localStorage.setItem("audit_result", JSON.stringify(result));
      window.location.href = "/results";
    } catch (err) {
      console.error("Audit error:", err);
      setError("Audit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060816] text-white">
      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-2 lg:px-10">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AI Visibility Intelligence
          </div>

          <h1 className="max-w-3xl text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
            The AI engine behind brand discovery.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-white/60">
            Measure how GPT, Claude, and Gemini rank your brand with premium AI
            visibility diagnostics, competitor intelligence, and entity authority
            benchmarking.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="text-3xl font-semibold">Run AI Visibility Audit</h2>
            <p className="mt-2 text-white/50">
              Generate a live AI brand intelligence report.
            </p>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-200">
                {error}
              </div>
            )}

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-3 block text-white/70">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-2xl bg-black/30 px-5 py-4 outline-none"
                >
                  <option value="">Select category</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-white/70">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full rounded-2xl bg-black/30 px-5 py-4 outline-none"
                >
                  <option value="">Select brand</option>
                  {brands.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-white/70">
                  Brand Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this brand does..."
                  className="h-40 w-full rounded-2xl bg-black/30 px-5 py-4 outline-none"
                />
              </div>

              <button
                onClick={runAudit}
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-4 font-medium text-black"
              >
                {loading ? "Running..." : "Run Visibility Audit"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}