"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AuditResult = {
  brand: string;
  category: string;
  description: string;
  score: number;
  rank: number;
  top_competitor: string;
  main_weakness: string;
  model_scores: {
    "GPT-4": number;
    Claude: number;
    Gemini: number;
  };
  competitors: {
    rank: number;
    name: string;
    score: number;
  }[];
  recommendations: string[];
};

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("audit_result");

    if (!stored) {
      router.push("/");
      return;
    }

    try {
      setResult(JSON.parse(stored));
    } catch {
      router.push("/");
    }
  }, [router]);

  const scoreLabel = useMemo(() => {
    if (!result) return "";
    if (result.score >= 90) return "Excellent";
    if (result.score >= 80) return "Strong";
    if (result.score >= 70) return "Moderate";
    return "Weak";
  }, [result]);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        Loading report...
      </main>
    );
  }

  const downloadReport = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#020617] px-6 py-10 text-white print:bg-white print:text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between print:hidden">
          <button
            onClick={() => router.push("/")}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
          >
            ← Back
          </button>

          <button
            onClick={downloadReport}
            className="rounded-xl bg-white px-5 py-2 text-sm font-medium text-black"
          >
            Download PDF
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 print:border print:border-slate-300 print:bg-white">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 print:text-slate-600">
                {result.category}
              </p>
              <h1 className="mt-2 text-5xl font-semibold">{result.brand}</h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-400 print:text-slate-700">
                {result.description?.trim()
                  ? result.description
                  : `${result.brand} was evaluated across major answer engines for category visibility, competitor positioning, and AI discoverability.`}
              </p>
            </div>

            <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 print:border-slate-300 print:bg-white">
              <div className="text-5xl font-bold text-cyan-300 print:text-black">
                {result.score}
              </div>
              <div className="mt-1 text-sm text-slate-400 print:text-slate-600">
                {scoreLabel}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <MetricCard title="AI Visibility Score" value={result.score} />
          <MetricCard title="Rank Position" value={result.rank} />
          <MetricCard title="Top Competitor" value={result.top_competitor} />
          <MetricCard title="Main Weakness" value={result.main_weakness} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 print:border print:border-slate-300 print:bg-white">
            <h2 className="text-2xl font-semibold">Model Comparison</h2>
            <div className="mt-6 space-y-5">
              {Object.entries(result.model_scores).map(([model, score]) => (
                <div key={model}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300 print:text-slate-700">
                    <span>{model}</span>
                    <span>{score}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10 print:bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 print:bg-black"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 print:border print:border-slate-300 print:bg-white">
            <h2 className="text-2xl font-semibold">Competitor Ranking</h2>
            <div className="mt-6 space-y-3">
              {result.competitors.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4 print:border print:border-slate-200 print:bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm print:bg-slate-100">
                      {company.rank}
                    </div>
                    <div>{company.name}</div>
                  </div>
                  <div className="font-medium">{company.score}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 print:border print:border-slate-300 print:bg-white">
          <h2 className="text-2xl font-semibold">Recommendations</h2>
          <ul className="mt-6 space-y-4 text-slate-300 print:text-slate-700">
            {result.recommendations.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 print:border print:border-slate-300 print:bg-white">
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
        {title}
      </div>
      <div className="mt-4 text-2xl font-semibold text-white print:text-black">
        {value}
      </div>
    </div>
  );
}