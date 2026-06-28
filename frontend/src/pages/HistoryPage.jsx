import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  ShieldCheck,
  History,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  Clock,
  XCircle,
  BarChart2,
  Loader2,
  ServerCrash,
  LogOut,
  Download,
  Copy,
  Trash2,
} from "lucide-react";

/* ─── Helpers ─────────────────────────────────────────────── */
const getReviewScore = (review) => {
  const score =
    review.overallScore ??
    review.score ??
    review.review?.overallScore ??
    review.result?.overallScore ??
    0;

  return Math.max(0, Math.min(100, Number(score) || 0));
};

const scoreColor = (s) =>
  s >= 80 ? "#4ade80" : s >= 60 ? "#fbbf24" : "#f87171";

const ScoreRing = ({ score, size = 48 }) => {
  const r = size / 2 - 4;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const c = scoreColor(score);
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1f1f23"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={c}
          strokeWidth="3"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[11px] font-bold" style={{ color: c }}>
        {score}
      </span>
    </div>
  );
};

const TrendIcon = ({ current, previous }) => {
  if (previous == null) return <Minus size={12} className="text-[#444]" />;
  if (current > previous)
    return <TrendingUp size={12} className="text-[#4ade80]" />;
  if (current < previous)
    return <TrendingDown size={12} className="text-[#f87171]" />;
  return <Minus size={12} className="text-[#444]" />;
};

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
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-semibold ${cls}`}
    >
      <Icon size={9} />
      {severity}
    </span>
  );
};

const RiskLevelBadge = ({ riskLevel }) => {
  const map = {
    LOW:    "bg-green-500/20 text-green-400 border-green-500/30",
    MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    HIGH:   "bg-red-500/20 text-red-400 border-red-500/30",
  };
  const cls = map[riskLevel] || map.MEDIUM;
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-[12px] font-semibold ${cls}`}>
      {riskLevel}
    </span>
  );
};

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

const getHealthStatus = (score) => {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Needs Attention";
  return "Needs Improvement";
};

const getHealthColor = (score) => {
  if (score >= 90) return "bg-green-500/20 text-green-400";
  if (score >= 75) return "bg-yellow-500/20 text-yellow-400";
  if (score >= 60) return "bg-orange-500/20 text-orange-400";
  return "bg-red-500/20 text-red-400";
};

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

const Sidebar = ({ active = "history" }) => (
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

/* ─── Mini spark bar ──────────────────────────────────────── */
const SparkBar = ({ values }) => {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm transition-all"
          style={{
            height: `${Math.max(10, (v / max) * 100)}%`,
            backgroundColor: scoreColor(v),
            opacity: i === values.length - 1 ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
};

/* ─── History Row ─────────────────────────────────────────── */
const HistoryRow = ({ review, index, prevScore, onDelete, onCopy, onExportPdf }) => {
  const [expanded, setExpanded] = useState(false);
  const [renderedAt] = useState(() => Date.now());

  const daysAgo = Math.floor((renderedAt - new Date(review.createdAt)) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="border border-[#1f1f23] rounded-xl overflow-hidden"
    >
      {/* Row */}
      <div
        className="flex items-center gap-4 px-5 py-3.5 bg-[#09090b] hover:bg-[#111113] transition-colors cursor-pointer"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Index */}
        <span className="text-[11px] text-[#333] w-5 shrink-0 text-right font-mono">
          {index + 1}
        </span>

        {/* Score ring */}
        <ScoreRing score={getReviewScore(review)} size={56} />

        {/* Trend */}
        <div className="flex flex-col items-center">
          <TrendIcon current={getReviewScore(review)} previous={prevScore} />
          <div className="text-[9px] text-[#444] mt-1">Trend</div>
        </div>

        {/* Repo + PR */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-white truncate">
              {review.repository}
            </span>
            <span className="text-[10px] font-mono text-[#444] border border-[#1f1f23] px-1.5 py-0.5 rounded shrink-0">
              PR #{review.pullRequest}
            </span>
          </div>

          {/* Health Badge */}
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getHealthColor(getReviewScore(review))}`}>
              {getHealthStatus(getReviewScore(review))}
            </span>
          </div>
        </div>

        {/* Date + time */}
        <div className="hidden md:flex flex-col items-end shrink-0">
          <span className="text-[11px] text-[#555] flex items-center gap-1">
            <Calendar size={9} /> {formatDate(review.createdAt)}
          </span>
          <span className="text-[10px] text-[#333] flex items-center gap-1 mt-0.5">
            <Clock size={9} /> {formatTime(review.createdAt)}
          </span>
          <span className="text-[9px] text-[#333] mt-1">
            {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago
          </span>
        </div>

        {/* Expand toggle */}
        <button className="w-6 h-6 rounded-md border border-[#1f1f23] bg-[#111113] flex items-center justify-center text-[#555] shrink-0">
          {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
      </div>

      {/* Expanded */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[#1f1f23]"
          >
            <div className="px-5 py-4 bg-[#09090b] space-y-5">
              {/* Risk Level Badge */}
              {review.riskLevel && (
                <div>
                  <div className="text-[10px] text-[#666] mb-2 font-medium uppercase tracking-wide">Risk Level</div>
                  <RiskLevelBadge riskLevel={review.riskLevel} />
                </div>
              )}

              {/* Review Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="border border-[#1f1f23] rounded-lg p-3 bg-[#111113]">
                  <div className="text-[10px] text-[#444] uppercase mb-1 font-medium">Overall Score</div>
                  <div className="text-2xl font-bold text-[#e5ff4a]">{getReviewScore(review)}/100</div>
                </div>

                <div className="border border-[#1f1f23] rounded-lg p-3 bg-[#111113]">
                  <div className="text-[10px] text-[#444] uppercase mb-1 font-medium">Security</div>
                  <div className="text-xl font-bold text-green-400">{review.securityScore || 0}/10</div>
                </div>

                <div className="border border-[#1f1f23] rounded-lg p-3 bg-[#111113]">
                  <div className="text-[10px] text-[#444] uppercase mb-1 font-medium">Performance</div>
                  <div className="text-xl font-bold text-blue-400">{review.performanceScore || 0}/10</div>
                </div>

                <div className="border border-[#1f1f23] rounded-lg p-3 bg-[#111113]">
                  <div className="text-[10px] text-[#444] uppercase mb-1 font-medium">Maintainability</div>
                  <div className="text-xl font-bold text-yellow-400">{review.maintainabilityScore || 0}/10</div>
                </div>

                <div className="border border-[#1f1f23] rounded-lg p-3 bg-[#111113]">
                  <div className="text-[10px] text-[#444] uppercase mb-1 font-medium">Readability</div>
                  <div className="text-xl font-bold text-purple-400">{review.readabilityScore || 0}/10</div>
                </div>

                <div className="border border-[#1f1f23] rounded-lg p-3 bg-[#111113]">
                  <div className="text-[10px] text-[#444] uppercase mb-1 font-medium">Health</div>
                  <div className={`text-sm font-semibold px-2 py-1 rounded-md w-fit ${getHealthColor(getReviewScore(review))}`}>
                    {getHealthStatus(getReviewScore(review))}
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-[#111113] border border-[#1f1f23] rounded-lg p-3.5">
                <div className="text-[10px] text-[#444] uppercase tracking-wider mb-1.5 font-medium">Executive Summary</div>
                <p className="text-[12px] text-[#888] leading-relaxed">
                  {review.summary || "No summary available."}
                </p>
              </div>

              {/* Issues */}
              {review.issues?.length > 0 && (
                <div className="space-y-3">
                  <div className="text-[10px] text-[#444] uppercase tracking-wider font-medium">
                    Findings — {review.issues.length} found
                  </div>
                  {review.issues.map((issue, i) => (
                    <div
                      key={i}
                      className="bg-[#111113] border border-[#1f1f23] rounded-lg p-4 space-y-3"
                    >
                      <SeverityBadge severity={issue.severity} />

                      <div>
                        <div className="text-[10px] text-[#444] uppercase mb-1 font-medium">Issue</div>
                        <p className="text-[12px] text-[#ccc]">{issue.message}</p>
                      </div>

                      <div>
                        <div className="text-[10px] text-[#444] uppercase mb-1 font-medium">Suggested Fix</div>
                        <p className="text-[12px] text-green-400">{issue.suggestion || "Review and refactor as needed"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-[#1f1f23] pt-4 flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-[#444]">Generated using</div>
                  <div className="text-sm text-white font-medium">Groq Llama 3.3 70B</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#444]">Review ID</div>
                  <div className="text-[11px] text-[#888] font-mono">{review._id}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-[#1f1f23] pt-5 flex gap-3">
                <button
                  onClick={() => onExportPdf(review)}
                  className="flex-1 border border-[#1f1f23] hover:border-[#2a2a2e] bg-[#111113] hover:bg-[#1a1a1e] rounded-lg py-2 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Download size={14} />
                  Export PDF
                </button>

                <button
                  onClick={() => onCopy(review)}
                  className="flex-1 border border-[#1f1f23] hover:border-[#2a2a2e] bg-[#111113] hover:bg-[#1a1a1e] rounded-lg py-2 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Copy size={14} />
                  Copy Review
                </button>

                <button
                  onClick={() => onDelete(review._id)}
                  className="flex-1 border border-red-900 hover:bg-red-900/20 text-red-400 hover:text-red-300 rounded-lg py-2 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Score Timeline Chart ────────────────────────────────── */
const ScoreTimeline = ({ reviews }) => {
  if (reviews.length < 2) return null;
  const last10 = [...reviews].slice(-10);
  const max = 100,
    min = 0;
  const w = 100 / (last10.length - 1);

  const points = last10.map((r, i) => ({
    x: i * w,
    y: 100 - (((getReviewScore(r) - min) / (max - min)) * 100),
    score: getReviewScore(r),
    repo: r.repository,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} 100 L 0 100 Z`;

  return (
    <div className="border border-[#1f1f23] rounded-xl p-5 bg-[#09090b]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] text-[#444] uppercase tracking-wider mb-0.5">
            Score Trend
          </div>
          <div className="text-[13px] font-semibold text-white">
            Last {last10.length} reviews
          </div>
        </div>
        <BarChart2 size={14} className="text-[#333]" />
      </div>
      <svg
        viewBox="0 0 100 60"
        className="w-full h-16"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e5ff4a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e5ff4a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#areaGrad)" />
        <path
          d={pathD}
          fill="none"
          stroke="#e5ff4a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.5"
            fill={i === points.length - 1 ? "#e5ff4a" : "#333"}
            stroke="#09090b"
            strokeWidth="0.5"
          />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] text-[#333]">oldest</span>
        <span className="text-[9px] text-[#333]">latest</span>
      </div>
    </div>
  );
};

/* ─── Repo Leaderboard ────────────────────────────────────── */
const RepoLeaderboard = ({ reviews }) => {
  const byRepo = useMemo(() => {
    const map = {};
    reviews.forEach((r) => {
      if (!map[r.repository]) map[r.repository] = { scores: [], issues: 0 };
      map[r.repository].scores.push(getReviewScore(r));
      map[r.repository].issues += r.issues?.length || 0;
    });
    return Object.entries(map)
      .map(([repo, { scores, issues }]) => ({
        repo,
        avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        count: scores.length,
        issues,
        scores,
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 5);
  }, [reviews]);

  if (byRepo.length === 0) return null;

  return (
    <div className="border border-[#1f1f23] rounded-xl overflow-hidden bg-[#09090b]">
      <div className="px-5 py-3.5 border-b border-[#1f1f23] flex items-center justify-between">
        <div className="text-[13px] font-semibold text-white">
          Top Repositories
        </div>
        <span className="text-[10px] text-[#444]">by avg score</span>
      </div>
      <div className="divide-y divide-[#1f1f23]">
        {byRepo.map(({ repo, avg, count, issues, scores }, i) => (
          <div
            key={repo}
            className="flex items-center gap-3 px-5 py-3 hover:bg-[#111113] transition-colors"
          >
            <span className="text-[11px] text-[#333] w-4 shrink-0 font-mono">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-white truncate">
                {repo}
              </div>
              <div className="text-[10px] text-[#444] mt-0.5">
                {count} review{count !== 1 ? "s" : ""} · {issues} issues
              </div>
            </div>
            <SparkBar values={scores} />
            <div
              className="text-[13px] font-bold shrink-0"
              style={{ color: scoreColor(avg) }}
            >
              {avg}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Page ───────────────────────────────────────────── */
const HistoryPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [scoreFilter, setScoreFilter] = useState("ALL");
  const [notice, setNotice] = useState("");

  async function fetchReviews() {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`, {
        withCredentials: true,
      });
      setReviews(res.data);
    } catch (e) {
      console.error("❌ History fetch failed:", e);
      setError(
        e?.response?.data?.message || e.message || "Failed to load history",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!cancelled) setReviews(res.data);
      })
      .catch((e) => {
        if (cancelled) return;
        console.error("❌ History fetch failed:", e);
        setError(
          e?.response?.data?.message || e.message || "Failed to load history",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const SCORE_FILTERS = [
    { id: "ALL", label: "All" },
    { id: "GOOD", label: "Good (≥80)" },
    { id: "FAIR", label: "Fair (60–79)" },
    { id: "POOR", label: "Poor (<60)" },
  ];

  const SORT_OPTIONS = [
    { id: "newest", label: "Newest first" },
    { id: "oldest", label: "Oldest first" },
    { id: "highest", label: "Highest score" },
    { id: "lowest", label: "Lowest score" },
  ];

  const filtered = useMemo(() => {
    let list = [...reviews];
    if (search)
      list = list.filter(
        (r) =>
          r.repository?.toLowerCase().includes(search.toLowerCase()) ||
          String(r.pullRequest).includes(search),
      );
    if (scoreFilter === "GOOD")
      list = list.filter((r) => getReviewScore(r) >= 80);
    else if (scoreFilter === "FAIR")
      list = list.filter(
        (r) =>
          getReviewScore(r) >= 60 &&
          getReviewScore(r) < 80
      );
    else if (scoreFilter === "POOR")
      list = list.filter((r) => getReviewScore(r) < 60);
    if (sortBy === "newest")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest")
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "highest")
      list.sort(
        (a, b) =>
          getReviewScore(b) -
          getReviewScore(a)
      );
    if (sortBy === "lowest")
      list.sort(
        (a, b) =>
          getReviewScore(a) -
          getReviewScore(b)
      );
    return list;
  }, [reviews, search, sortBy, scoreFilter]);

  const avgScore = reviews.length
    ? Math.round(
        reviews.reduce(
          (a, r) => a + getReviewScore(r),
          0
        ) / reviews.length
      )
    : 0;

  const repositoryHealth = avgScore;
  const criticalIssues = reviews.reduce(
    (total, r) =>
      total + (r.issues?.filter(i => i.severity === "CRITICAL").length || 0),
    0
  );

  const exportReviewPdf = (review) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setNotice("Popup blocked. Please allow popups to export PDF.");
      setTimeout(() => setNotice(""), 3000);
      return;
    }

    const issues = review.issues?.length
      ? review.issues
          .map(
            (issue, index) => `
            <h3>${index + 1}. ${issue.severity}</h3>
            <p><strong>Issue:</strong> ${issue.message}</p>
            <p><strong>Suggested Fix:</strong> ${
              issue.suggestion || "Review and refactor as needed"
            }</p>
          `,
          )
          .join("")
      : "<p>No issues found.</p>";

    printWindow.document.write(`
      <html>
        <head>
          <title>CodeSentinel Review</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
            h1 { margin-bottom: 4px; }
            .muted { color: #666; }
            .score { font-size: 28px; font-weight: bold; }
            section { margin-top: 24px; }
          </style>
        </head>
        <body>
          <h1>CodeSentinel Review</h1>
          <p class="muted">${review.repository} | PR #${review.pullRequest}</p>
          <p class="score">${getReviewScore(review)}/100</p>

          <section>
            <h2>Summary</h2>
            <p>${review.summary || "No summary available."}</p>
          </section>

          <section>
            <h2>Findings</h2>
            ${issues}
          </section>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const copyReview = async (review) => {
    const text = `Repository: ${review.repository}
PR: ${review.pullRequest}
Overall Score: ${getReviewScore(review)}/100

Summary:
${review.summary}

Issues:
${review.issues?.map((i) => `${i.severity}
${i.message}

Suggested Fix:
${i.suggestion || "Review and refactor as needed"}
`).join("\n") || "No issues found."}
`;

    await navigator.clipboard.writeText(text);
    setNotice("Review copied");
    setTimeout(() => setNotice(""), 3000);
  };

  const deleteReview = () => {
    setNotice("Delete is not connected to backend yet");
    setTimeout(() => setNotice(""), 3000);
  };

  return (
    <div
      className="flex bg-[#09090b] text-white min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Sidebar />

      {/* Notification */}
      {notice && (
        <div className="fixed top-6 right-6 z-50 border border-[#1f1f23] bg-[#111113] text-[#4ade80] px-4 py-2 rounded-lg text-sm shadow-lg">
          {notice}
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-[14px] border-b border-[#1f1f23] sticky top-0 z-10 bg-[#09090b]">
          <div>
            <h1 className="text-[18px] font-semibold tracking-tight text-white">
              History
            </h1>
            <p className="text-[12px] text-[#444] mt-0.5">
              Past activity and AI analysis logs
            </p>
          </div>
          <div className="flex items-center gap-1.5 border border-[#1f1f23] bg-[#111113] px-3 py-1.5 rounded-lg">
            <Clock size={11} className="text-[#555]" />
            <span className="text-[12px] text-[#555]">
              {reviews.length} total entries
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-6">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 size={22} className="animate-spin text-[#e5ff4a]" />
              <span className="text-[13px] text-[#444]">
                Loading history...
              </span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="border border-[#3d1414] bg-[#1a0a0a] rounded-xl px-5 py-6 flex items-start gap-3">
              <ServerCrash
                size={16}
                className="text-[#f87171] mt-0.5 shrink-0"
              />
              <div>
                <div className="text-[13px] font-semibold text-[#f87171] mb-1">
                  Failed to load history
                </div>
                <div className="text-[12px] text-[#7a3535]">{error}</div>
                <button
                  onClick={fetchReviews}
                  className="mt-3 text-[12px] font-medium border border-[#3d1414] text-[#f87171] px-3 py-1.5 rounded-lg hover:bg-[#2a0a0a] transition-all"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  {
                    label: "Total Reviews",
                    value: reviews.length,
                    accent: "text-white",
                    suffix: "",
                  },
                  {
                    label: "Avg Score",
                    value: avgScore,
                    accent: "text-[#e5ff4a]",
                    suffix: "/100",
                  },
                  {
                    label: "Repository Health",
                    value: repositoryHealth,
                    accent: "text-[#4ade80]",
                    suffix: "%",
                  },
                  {
                    label: "Critical Issues",
                    value: criticalIssues,
                    accent: "text-[#f87171]",
                    suffix: "",
                  },
                ].map(({ label, value, accent, suffix }) => (
                  <div
                    key={label}
                    className="border border-[#1f1f23] rounded-xl p-4 bg-[#09090b] hover:border-[#2a2a2e] transition-all"
                  >
                    <div className="text-[10px] text-[#444] mb-2">{label}</div>
                    <div
                      className={`text-[26px] font-semibold tracking-tight leading-none ${accent}`}
                    >
                      {value}
                      <span className="text-[13px] text-[#333]">{suffix}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-2 gap-4">
                <ScoreTimeline
                  reviews={[...reviews].sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
                  )}
                />
                <RepoLeaderboard reviews={reviews} />
              </div>

              {/* Search + filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 flex-1 border border-[#1f1f23] bg-[#111113] rounded-xl px-3.5 py-2.5 focus-within:border-[#2a2a2e] transition-all">
                  <Search size={13} className="text-[#444] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by repo or PR number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-[13px] text-white placeholder:text-[#333]"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="text-[#444] hover:text-[#888] transition-colors"
                    >
                      <XCircle size={13} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Filter size={12} className="text-[#444] shrink-0" />
                  <div className="flex gap-1.5">
                    {SCORE_FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setScoreFilter(f.id)}
                        className={`text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                          scoreFilter === f.id
                            ? "bg-[#e5ff4a] text-[#09090b] border-[#e5ff4a]"
                            : "text-[#555] border-[#1f1f23] hover:text-[#ccc] hover:border-[#2a2a2e]"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[12px] bg-[#111113] border border-[#1f1f23] text-[#888] px-3 py-2 rounded-xl outline-none cursor-pointer hover:border-[#2a2a2e] transition-all"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Result count */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#444]">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  {search || scoreFilter !== "ALL" ? " (filtered)" : ""}
                </span>
                {(search || scoreFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setScoreFilter("ALL");
                    }}
                    className="text-[11px] text-[#555] hover:text-[#ccc] transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="border border-[#1f1f23] rounded-xl py-20 text-center">
                  <div className="text-6xl mb-5"></div>
                  <h2 className="text-xl font-semibold">No AI Reviews Yet</h2>
                  <p className="text-[#666] mt-3">Run an AI Review from Dashboard.</p>
                </div>
              )}

              {/* List */}
              {filtered.length > 0 && (
                <div className="space-y-2">
                  {filtered.map((review, i) => (
                    <HistoryRow
                      key={review._id}
                      review={review}
                      index={i}
                      prevScore={
                        i < filtered.length - 1 ? getReviewScore(filtered[i + 1]) : null
                      }
                      onDelete={deleteReview}
                      onCopy={copyReview}
                      onExportPdf={exportReviewPdf}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;