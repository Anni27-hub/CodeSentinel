import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  ShieldCheck,
  History,
  Sparkles,
  GitPullRequest,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  LogOut,
} from "lucide-react";

/* ─── Sidebar ─────────────────────────────────────────────── */
const NAV = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    id: "dashboard",
    path: "/dashboard",
  },
  {
    icon: GitBranch,
    label: "Repositories",
    id: "repos",
    path: "/repositories",
  },
  { icon: ShieldCheck, label: "AI Reviews", id: "reviews", path: "/reviews" },
  { icon: History, label: "History", id: "history", path: "/history" },
];

const Sidebar = ({ active = "reviews" }) => (
  <aside className="w-[220px] shrink-0 border-r border-[#1f1f23] bg-[#09090b] flex flex-col min-h-screen">
    <div className="px-5 py-[18px] border-b border-[#1f1f23] flex items-center gap-2.5">
      <div className="w-8 h-8 bg-[#e5ff4a] rounded-lg flex items-center justify-center text-sm font-bold text-[#09090b] shrink-0">
        C
      </div>
      <div>
        <div className="text-[14px] font-semibold tracking-tight text-white leading-none">
          CodeSentinel
        </div>
        <div className="text-[10px] text-[#444] mt-0.5">AI PR Reviewer</div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {NAV.map(({ icon: Icon, label, id, path }) => {
        const isActive = active === id;
        return (
          <Link
            key={id}
            to={path}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
              isActive
                ? "bg-[#e5ff4a] text-[#09090b]"
                : "text-[#666] hover:text-[#ccc] hover:bg-[#111113]"
            }`}
          >
            <Icon size={15} />
            {label}
          </Link>
        );
      })}
    </nav>
    {/* Bottom */}
    <div className="px-4 py-4 border-t border-[#1f1f23] space-y-3">
      <div className="text-[11px] text-[#333] leading-relaxed">
        Connected via GitHub OAuth
      </div>
      <a
        href={`${import.meta.env.VITE_API_URL}/auth/logout`}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#555] hover:text-[#f87171] hover:bg-[#1a0a0a] transition-all"
      >
        <LogOut size={15} />
        Logout
      </a>
    </div>
  </aside>
);

/* ─── Severity Badge ──────────────────────────────────────── */
const SeverityBadge = ({ severity }) => {
  const map = {
    CRITICAL: {
      cls: "bg-[#1a0a0a] border-[#3d1414] text-[#f87171]",
      Icon: AlertTriangle,
    },
    WARNING: {
      cls: "bg-[#1a1500] border-[#3d3200] text-[#fbbf24]",
      Icon: AlertTriangle,
    },
    SUGGESTION: {
      cls: "bg-[#0a0f1a] border-[#0f2040] text-[#60a5fa]",
      Icon: Info,
    },
    INFO: { cls: "bg-[#111113] border-[#2a2a2e] text-[#888]", Icon: Info },
  };
  const { cls, Icon } = map[severity] || map.INFO;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold ${cls}`}
    >
      <Icon size={11} />
      {severity}
    </span>
  );
};

/* ─── Score Ring ──────────────────────────────────────────── */
const ScoreRing = ({ score }) => {
  const safeScore = Number(score) || 0;
  const color =
    safeScore >= 80 ? "#4ade80" : safeScore >= 60 ? "#fbbf24" : "#f87171";

  const r = 20;
  const circ = 2 * Math.PI * r;
  const fill = (safeScore / 100) * circ;

  return (
    <div className="relative flex items-center justify-center w-14 h-14">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#1f1f23"
          strokeWidth="3"
        />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[12px] font-bold" style={{ color }}>
        {safeScore}
      </span>
    </div>
  );
};

/* ─── Review Card ─────────────────────────────────────────── */
const ReviewCard = ({ review, index }) => {
  const [expanded, setExpanded] = useState(false);

  const criticalCount =
    review.issues?.filter((i) => i.severity === "CRITICAL").length || 0;
  const warningCount =
    review.issues?.filter((i) => i.severity === "WARNING").length || 0;
  const suggestionCount =
    review.issues?.filter((i) => i.severity === "SUGGESTION").length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-[#1f1f23] rounded-xl overflow-hidden"
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#09090b] hover:bg-[#111113] transition-colors">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#111113] border border-[#1f1f23] flex items-center justify-center shrink-0">
            <Sparkles size={13} className="text-[#e5ff4a]" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-white truncate">
              {review.repository}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <GitPullRequest size={10} className="text-[#444]" />
              <span className="text-[11px] text-[#444] font-mono">
                PR #{review.pullRequest}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-4">
          {/* Issue pills */}
          <div className="hidden sm:flex items-center gap-1.5">
            {criticalCount > 0 && (
              <span className="text-[10px] font-semibold bg-[#1a0a0a] border border-[#3d1414] text-[#f87171] px-2 py-0.5 rounded-md">
                {criticalCount} critical
              </span>
            )}
            {warningCount > 0 && (
              <span className="text-[10px] font-semibold bg-[#1a1500] border border-[#3d3200] text-[#fbbf24] px-2 py-0.5 rounded-md">
                {warningCount} warning
              </span>
            )}
            {suggestionCount > 0 && (
              <span className="text-[10px] font-semibold bg-[#0a0f1a] border border-[#0f2040] text-[#60a5fa] px-2 py-0.5 rounded-md">
                {suggestionCount} suggestion
              </span>
            )}
          </div>

          <ScoreRing score={review.overallScore ?? review.score ?? 0} />

          <button
            onClick={() => setExpanded((p) => !p)}
            className="w-7 h-7 rounded-lg border border-[#1f1f23] bg-[#111113] flex items-center justify-center text-[#555] hover:text-[#ccc] hover:border-[#2a2a2e] transition-all"
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#1f1f23]"
          >
            <div className="px-5 py-5 bg-[#09090b] space-y-4">
              {/* Summary */}
              <div className="bg-[#111113] border border-[#1f1f23] rounded-lg p-4">
                <div className="text-[10px] text-[#444] font-medium uppercase tracking-wider mb-2">
                  Summary
                </div>
                <p className="text-[13px] text-[#888] leading-relaxed">
                  {review.summary}
                </p>
              </div>

              {/* Issues */}
              {review.issues?.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] text-[#444] font-medium uppercase tracking-wider">
                    Issues — {review.issues.length} found
                  </div>
                  {review.issues.map((issue, i) => (
                    <div
                      key={i}
                      className="bg-[#111113] border border-[#1f1f23] rounded-lg px-4 py-3 hover:border-[#2a2a2e] transition-all"
                    >
                      <div className="mb-2">
                        <SeverityBadge severity={issue.severity} />
                      </div>
                      <p className="text-[12px] text-[#777] leading-relaxed">
                        {issue.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Main Page ───────────────────────────────────────────── */
const AIReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews`)
      .then((res) => {
        if (!cancelled) setReviews(res.data);
      })
      .catch((e) => console.log(e));

    return () => {
      cancelled = true;
    };
  }, []);

  const FILTERS = ["ALL", "CRITICAL", "WARNING", "SUGGESTION"];

  const filtered = reviews.filter((review) => {
    const severityMatch =
      filter === "ALL" || review.issues?.some((i) => i.severity === filter);

    const searchMatch = review.repository
      .toLowerCase()
      .includes(search.toLowerCase());

    return severityMatch && searchMatch;
  });

  const avgScore = reviews.length
    ? Math.round(
        reviews.reduce((a, r) => a + (r.overallScore || 0), 0) / reviews.length,
      )
    : 0;
  const criticals = reviews.reduce(
    (a, r) =>
      a + (r.issues?.filter((i) => i.severity === "CRITICAL").length || 0),
    0,
  );
  const repositoriesReviewed = new Set(reviews.map((r) => r.repository)).size;

  return (
    <div
      className="flex bg-[#09090b] text-white min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-[14px] border-b border-[#1f1f23] bg-[#09090b] sticky top-0 z-10">
          <div>
            <h1 className="text-[18px] font-semibold tracking-tight text-white">
              AI Reviews
            </h1>
            <p className="text-[12px] text-[#444] mt-0.5">
              All past AI-generated pull request analyses
            </p>
          </div>
          <div className="flex items-center gap-1.5 border border-[#1f1f23] bg-[#111113] px-3 py-1.5 rounded-lg">
            <CheckCircle2 size={11} className="text-[#4ade80]" />
            <span className="text-[12px] text-[#555]">
              {reviews.length} reviews total
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-6">
          {/* Stats Strip */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            {[
              {
                label: "Average Score",
                value: avgScore,
                accent: "text-[#e5ff4a]",
                suffix: "/100",
              },
              {
                label: "Repositories",
                value: repositoriesReviewed,
                accent: "text-[#60a5fa]",
                suffix: "",
              },
              {
                label: "Critical Issues",
                value: criticals,
                accent: "text-[#f87171]",
                suffix: "",
              },
              {
                label: "Repository Health",
                value: avgScore,
                accent: "text-[#4ade80]",
                suffix: "%",
              },
            ].map(({ label, value, accent, suffix }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className="border border-[#1f1f23] rounded-xl p-5 bg-[#09090b] hover:border-[#2a2a2e] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[11px] text-[#555] uppercase tracking-wider">
                    {label}
                  </div>

                  {label === "Repository Health" && (
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                        avgScore >= 80
                          ? "bg-green-500/20 text-green-400"
                          : avgScore >= 60
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {avgScore >= 80
                        ? "Excellent"
                        : avgScore >= 60
                          ? "Average"
                          : "Needs Attention"}
                    </span>
                  )}
                </div>

                <div className={`text-[32px] font-bold ${accent}`}>
                  {value}
                  <span className="text-[16px] text-[#555]">{suffix}</span>
                </div>

                {label === "Repository Health" && (
                  <div className="mt-4">
                    <div className="w-full h-2 rounded-full bg-[#1f1f23] overflow-hidden">
                      <div
                        className="h-full bg-[#4ade80] rounded-full transition-all duration-700"
                        style={{ width: `${avgScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="border border-[#1f1f23] rounded-xl px-4 py-3 bg-[#111113]">
            <input
              placeholder="Search Repository..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[12px] font-medium px-3.5 py-1.5 rounded-lg border transition-all ${
                  filter === f
                    ? "bg-[#e5ff4a] text-[#09090b] border-[#e5ff4a]"
                    : "text-[#555] border-[#1f1f23] hover:text-[#ccc] hover:border-[#2a2a2e]"
                }`}
              >
                {f === "ALL" ? `All (${reviews.length})` : f}
              </button>
            ))}
          </div>

          {/* Review list */}
          {filtered.length === 0 ? (
            <div className="border border-[#1f1f23] rounded-xl py-14 text-center text-[13px] text-[#444]">
              No reviews match this filter
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((review, i) => (
                <ReviewCard key={review._id} review={review} index={i} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIReviews;
