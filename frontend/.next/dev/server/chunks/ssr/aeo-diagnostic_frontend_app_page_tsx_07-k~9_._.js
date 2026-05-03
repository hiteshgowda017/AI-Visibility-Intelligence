module.exports = [
"[project]/aeo-diagnostic/frontend/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aeo-diagnostic/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aeo-diagnostic/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aeo-diagnostic/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const API_BASE = ("TURBOPACK compile-time value", "http://127.0.0.1:8000") || "http://127.0.0.1:8000";
const auditCards = [
    {
        title: "Entity Authority",
        subtitle: "TRUST SIGNALS"
    },
    {
        title: "Live Rankings",
        subtitle: "MODEL BENCHMARK"
    },
    {
        title: "AI Citations",
        subtitle: "GAP DETECTION"
    }
];
function HomePage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [companies, setCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedBrand, setSelectedBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [brandSearch, setBrandSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [brandOpen, setBrandOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingCategories, setLoadingCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadingCompanies, setLoadingCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadCategories = async ()=>{
            try {
                setLoadingCategories(true);
                setError("");
                const res = await fetch(`${API_BASE}/categories`, {
                    cache: "no-store"
                });
                if (!res.ok) throw new Error("Failed to fetch categories");
                const data = await res.json();
                setCategories(Array.isArray(data.categories) ? data.categories : []);
            } catch (err) {
                console.error(err);
                setError("Unable to load categories. Check backend connection.");
            } finally{
                setLoadingCategories(false);
            }
        };
        loadCategories();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!selectedCategory) {
            setCompanies([]);
            setSelectedBrand("");
            setBrandSearch("");
            return;
        }
        const loadCompanies = async ()=>{
            try {
                setLoadingCompanies(true);
                const res = await fetch(`${API_BASE}/companies/${encodeURIComponent(selectedCategory)}`, {
                    cache: "no-store"
                });
                if (!res.ok) throw new Error("Failed to fetch companies");
                const data = await res.json();
                setCompanies(Array.isArray(data.companies) ? data.companies : []);
            } catch (err) {
                console.error(err);
                setCompanies([]);
            } finally{
                setLoadingCompanies(false);
            }
        };
        loadCompanies();
    }, [
        selectedCategory
    ]);
    const filteredCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!brandSearch.trim()) return companies;
        return companies.filter((company)=>company.toLowerCase().includes(brandSearch.toLowerCase()));
    }, [
        companies,
        brandSearch
    ]);
    const runAudit = async ()=>{
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category: selectedCategory,
                    brand: selectedBrand,
                    description
                })
            });
            if (!res.ok) throw new Error("Audit failed");
            const result = await res.json();
            sessionStorage.setItem("audit_result", JSON.stringify(result));
            router.push("/results");
        } catch (err) {
            console.error(err);
            setError("Unable to run audit. Please try again.");
        } finally{
            setSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#020617] text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-2 lg:px-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm tracking-[0.35em] text-cyan-300",
                                    children: "AI VISIBILITY INTELLIGENCE"
                                }, void 0, false, {
                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "mt-10 text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl",
                                    children: [
                                        "The AI engine",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-300 bg-clip-text text-transparent",
                                            children: "behind brand"
                                        }, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        "discovery."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-10 max-w-2xl text-xl leading-10 text-slate-400",
                                    children: "Measure how GPT, Claude, and Gemini rank your brand with premium AI visibility diagnostics, competitor intelligence, and entity authority benchmarking."
                                }, void 0, false, {
                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 grid grid-cols-1 gap-5 md:grid-cols-3",
                            children: auditCards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-semibold",
                                            children: card.title
                                        }, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 text-xs tracking-[0.35em] text-slate-500",
                                            children: card.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, card.title, true, {
                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-5xl font-semibold tracking-tight",
                            children: "Run AI Visibility Audit"
                        }, void 0, false, {
                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-xl text-slate-400",
                            children: "Generate a live AI brand intelligence report."
                        }, void 0, false, {
                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-rose-200",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mb-3 block text-lg text-slate-300",
                                            children: "Category"
                                        }, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedCategory,
                                            onChange: (e)=>setSelectedCategory(e.target.value),
                                            disabled: loadingCategories,
                                            className: "w-full rounded-2xl border border-white/5 bg-[#050b1f] px-5 py-4 text-lg text-white outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: loadingCategories ? "Loading categories..." : "Select category"
                                                }, void 0, false, {
                                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 17
                                                }, this),
                                                categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: category,
                                                        children: category
                                                    }, category, false, {
                                                        fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mb-3 block text-lg text-slate-300",
                                            children: "Brand"
                                        }, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: brandSearch,
                                            onChange: (e)=>{
                                                setBrandSearch(e.target.value);
                                                setBrandOpen(true);
                                                setSelectedBrand("");
                                            },
                                            onFocus: ()=>setBrandOpen(true),
                                            placeholder: loadingCompanies ? "Loading brands..." : selectedCategory ? "Search brand..." : "Select category first",
                                            disabled: !selectedCategory,
                                            className: "w-full rounded-2xl border border-white/5 bg-[#050b1f] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
                                        }, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this),
                                        brandOpen && selectedCategory && filteredCompanies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#0a1022] p-2 shadow-2xl",
                                            children: filteredCompanies.map((company)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setSelectedBrand(company);
                                                        setBrandSearch(company);
                                                        setBrandOpen(false);
                                                    },
                                                    className: "block w-full rounded-xl px-4 py-3 text-left text-white hover:bg-white/5",
                                                    children: company
                                                }, company, false, {
                                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mb-3 block text-lg text-slate-300",
                                            children: [
                                                "Brand Description ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-500",
                                                    children: "(Optional)"
                                                }, void 0, false, {
                                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 35
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 5,
                                            value: description,
                                            onChange: (e)=>setDescription(e.target.value),
                                            placeholder: "Describe what this brand does...",
                                            className: "w-full rounded-2xl border border-white/5 bg-[#050b1f] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
                                        }, void 0, false, {
                                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aeo$2d$diagnostic$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: runAudit,
                                    disabled: submitting,
                                    className: "w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-5 text-xl font-medium text-white transition hover:opacity-90 disabled:opacity-60",
                                    children: submitting ? "Running Audit..." : "Run Visibility Audit"
                                }, void 0, false, {
                                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
            lineNumber: 139,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/aeo-diagnostic/frontend/app/page.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=aeo-diagnostic_frontend_app_page_tsx_07-k~9_._.js.map