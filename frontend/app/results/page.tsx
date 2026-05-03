"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AuditResult = {
  brand: string;
  category: string;
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
    name: string;
    score: number;
  }[];
  recommendations: string[];
};

const emptyState: AuditResult = {
  brand: "No Brand Selected",
  category: "No Category",
  score: 0,
  rank: 0,
  top_competitor: "N/A",
  main_weakness: "No audit data available.",
  model_scores: {
    "GPT-4": 0,
    Claude: 0,
    Gemini: 0,
  },
  competitors: [],
  recommendations: [],
};

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<AuditResult>(emptyState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("aeo_audit_result");

    if (!raw) {
      setReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<AuditResult>;

      setData({
        brand: parsed.brand ?? emptyState.brand,
        category: parsed.category ?? emptyState.category,
        score: Number(parsed.score ?? 0),
        rank: Number(parsed.rank ?? 0),
        top_competitor: parsed.top_competitor ?? "N/A",
        main_weakness: parsed.main_weakness ?? "No audit data available.",
        model_scores: {
          "GPT-4": Number(parsed.model_scores?.["GPT-4"] ?? 0),
          Claude: Number(parsed.model_scores?.Claude ?? 0),
          Gemini: Number(parsed.model_scores?.Gemini ?? 0),
        },
        competitors: Array.isArray(parsed.competitors) ? parsed.competitors : [],
        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations
          : [],
      });
    } catch {
      setData(emptyState);
    } finally {
      setReady(true);
    }
  }, []);

  const modelRows = useMemo(
    () => [
      { label: "GPT-4", value: data.model_scores["GPT-4"] },
      { label: "Claude", value: data.model_scores.Claude },
      { label: "Gemini", value: data.model_scores.Gemini },
    ],
    [data]
  );

  const handleDownload = () => window.print();

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <div className="text-sm text-white/50">Loading audit...</div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="screen-report min-h-screen bg-[#050505] px-6 py-10 text-white print:hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/40">
                AEO Diagnostic Report
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
                {data.brand}
              </h1>
              <p className="mt-2 text-sm text-white/45">{data.category}</p>
            </div>

            <button
              onClick={() => router.push("/")}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              New Audit
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-sm text-white/45">AI Visibility Score</p>
              <div className="mt-4 text-8xl font-semibold tracking-[-0.06em]">
                {data.score}
                <span className="text-4xl text-white/35">/100</span>
              </div>

              <div className="mt-10">
                <h2 className="text-3xl font-medium">{data.brand}</h2>
                <p className="mt-2 text-sm text-white/45">Category: {data.category}</p>
              </div>

              <p className="mt-10 max-w-3xl text-xl leading-10 text-white/85">
                Your brand is benchmarked against real category competitors across
                AI-generated recommendation systems.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <MetricCard label="Top Rank Position" value={`#${data.rank}`} />
                <MetricCard label="Top Competitor" value={data.top_competitor} />
                <MetricCard label="Main Weakness" value={data.main_weakness} />
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="text-4xl font-semibold">Model Comparison</h2>
              <div className="mt-10 space-y-8">
                {modelRows.map((model) => (
                  <div key={model.label}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-2xl font-medium">{model.label}</span>
                      <span className="text-xl text-white/80">{model.value}%</span>
                    </div>
                    <div className="h-4 rounded-full bg-white/10">
                      <div
                        className="h-4 rounded-full bg-white"
                        style={{ width: `${model.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="text-4xl font-semibold">Competitor Ranking</h2>
              <div className="mt-8 space-y-3">
                {data.competitors.map((company, index) => (
                  <div
                    key={company.name}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-sm text-white/35">#{index + 1}</span>
                      <span>{company.name}</span>
                    </div>
                    <span className="text-white/55">{company.score}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="text-4xl font-semibold">Recommendations</h2>
              <div className="mt-8 space-y-3">
                {data.recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 flex h-16 w-full items-center justify-center rounded-3xl bg-white text-lg font-medium text-black"
          >
            Download PDF Report
          </button>
        </div>
      </main>

      <main className="print-report hidden print:block">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 text-slate-900">
          <div className="mb-10 border-b border-slate-200 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
              AEO Diagnostic Report
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h1 className="text-5xl font-bold">{data.brand}</h1>
                <p className="mt-2 text-base text-slate-500">{data.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">AI Visibility Score</p>
                <div className="text-6xl font-bold">
                  {data.score}
                  <span className="text-2xl text-slate-400">/100</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <PrintMetric label="Top Rank Position" value={`#${data.rank}`} />
            <PrintMetric label="Top Competitor" value={data.top_competitor} />
            <PrintMetric label="Main Weakness" value={data.main_weakness} />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold">Model Comparison</h2>
              <div className="mt-6 space-y-5">
                {modelRows.map((model) => (
                  <div key={model.label}>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span>{model.label}</span>
                      <span>{model.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-200">
                      <div
                        className="h-3 rounded-full bg-indigo-600"
                        style={{ width: `${model.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Recommendations</h2>
              <div className="mt-6 space-y-3">
                {data.recommendations.map((item, index) => (
                  <div key={index} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold">Competitor Ranking</h2>
            <div className="mt-6 space-y-3">
              {data.competitors.map((company, index) => (
                <div
                  key={company.name}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-sm text-slate-400">#{index + 1}</span>
                    <span className="font-medium">{company.name}</span>
                  </div>
                  <span className="text-slate-500">{company.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
      <p className="text-sm text-white/40">{label}</p>
      <div className="mt-5 text-4xl font-semibold leading-tight break-words">{value}</div>
    </div>
  );
}

function PrintMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <div className="mt-3 text-2xl font-semibold leading-snug">{value}</div>
    </div>
  );
}