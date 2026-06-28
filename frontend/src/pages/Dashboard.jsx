import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "../api/axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  ShieldCheck,
  History,
  Search,
  Sparkles,
  ChevronRight,
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  Info,
  Loader2,
  Send,
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

const Sidebar = ({ active = "dashboard" }) => (
  <aside className="w-[220px] shrink-0 border-r border-[#1f1f23] bg-[#09090b] flex flex-col min-h-screen">
    {/* Logo */}
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

    {/* Nav */}
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

/* ─── Stat Card ───────────────────────────────────────────── */
const StatCard = ({ title, value, icon: Icon, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#09090b] border border-[#1f1f23] rounded-xl p-5 hover:border-[#2a2a2e] transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-[12px] text-[#555] font-medium">{title}</span>
      <div className="w-7 h-7 rounded-md bg-[#111113] border border-[#1f1f23] flex items-center justify-center">
        <Icon size={13} className={accent} />
      </div>
    </div>
    <div
      className={`text-[32px] font-semibold tracking-tight leading-none ${accent}`}
    >
      {value ?? "—"}
    </div>
  </motion.div>
);

/* ─── Severity badge ──────────────────────────────────────── */
const SeverityBadge = ({ severity }) => {
  const map = {
    CRITICAL: "bg-[#1a0a0a] border-[#3d1414] text-[#f87171]",
    WARNING: "bg-[#1a1500] border-[#3d3200] text-[#fbbf24]",
    SUGGESTION: "bg-[#0a0f1a] border-[#0f2040] text-[#60a5fa]",
    INFO: "bg-[#111113] border-[#2a2a2e] text-[#888]",
  };
  const icons = {
    CRITICAL: AlertTriangle,
    WARNING: AlertTriangle,
    SUGGESTION: Info,
    INFO: Info,
  };
  const cls = map[severity] || map.INFO;
  const Icon = icons[severity] || Info;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold ${cls}`}
    >
      <Icon size={11} />
      {severity}
    </span>
  );
};

/* ─── Risk Level Badge ───────────────────────────────────── */
const RiskLevelBadge = ({ riskLevel }) => {
  const map = {
    LOW: "bg-green-500/20 text-green-400 border-green-500/30",
    MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    HIGH: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  const cls = map[riskLevel] || map.MEDIUM;
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-[12px] font-semibold ${cls}`}
    >
      {riskLevel}
    </span>
  );
};

/* ─── Main Dashboard ──────────────────────────────────────── */
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [reviewStats, setReviewStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pullRequests, setPullRequests] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [prFiles, setPrFiles] = useState([]);
  const [selectedPR, setSelectedPR] = useState(null);
  const [aiReview, setAiReview] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const [postStatus, setPostStatus] = useState("idle");
  const [postNotice, setPostNotice] = useState("");
  const aiReviewRef = useRef(null);

  const filteredRepos = useMemo(
    () =>
      repos.filter((r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [repos, searchTerm],
  );

  async function fetchReviewStats() {
    try {
      const r = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
      setReviewStats(r.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
        withCredentials: true,
      }),
      axios.get(`${import.meta.env.VITE_API_URL}/github/repos`, {
        withCredentials: true,
      }),
      axios.get(`${import.meta.env.VITE_API_URL}/reviews`),
    ])
      .then(([userRes, reposRes, statsRes]) => {
        if (cancelled) return;
        setUser(userRes.data);
        setRepos(reposRes.data);
        setReviewStats(statsRes.data);
      })
      .catch((e) => console.log(e));

    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll to AI Review section
  useEffect(() => {
    if (loadingAI || aiReview) {
      aiReviewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [loadingAI, aiReview]);

  const fetchPullRequests = async (owner, repo) => {
    try {
      setAiReview(null);
      setPrFiles([]);
      const r = await axios.get(
        `${import.meta.env.VITE_API_URL}/github/repos/${owner}/${repo}/pulls`,
        { withCredentials: true },
      );
      setPullRequests(r.data);
      setSelectedRepo({ owner, repo });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPRFiles = async (pullNumber) => {
    try {
      const r = await axios.get(
        `${import.meta.env.VITE_API_URL}/github/repos/${selectedRepo.owner}/${selectedRepo.repo}/pulls/${pullNumber}/files`,
        { withCredentials: true },
      );
      setPrFiles(r.data);
      setSelectedPR(pullNumber);
    } catch (e) {
      console.log(e);
    }
  };

  // Simulate loading stages
  const runLoadingStages = async () => {
    const stages = [
      "Analyzing security…",
      "Evaluating performance…",
      "Reviewing maintainability…",
      "Analyzing readability…",
      "Generating suggestions…",
    ];
    for (const stage of stages) {
      setLoadingStage(stage);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  };

  const analyzePatch = async (patch) => {
    try {
      setLoadingAI(true);
      setAiReview(null);
      runLoadingStages();
      const r = await axios.post(`${import.meta.env.VITE_API_URL}/ai/review`, {
        patch,
        repository: selectedRepo?.repo,
        pullRequest: selectedPR,
      });
      setAiReview(r.data);
      fetchReviewStats();
      setLoadingAI(false);
      setLoadingStage("");
    } catch (e) {
      console.log(e);
      setLoadingAI(false);
      setLoadingStage("");
    }
  };

  const postReviewToGitHub = async () => {
    try {
      setPostStatus("posting");
      setPostNotice("");

      const formattedComment = `# CodeSentinel Review

## Overall Assessment

| Metric | Score |
|--------|------:|
| Overall Score | ${aiReview.overallScore}/100 |
| Security | ${aiReview.securityScore}/10 |
| Performance | ${aiReview.performanceScore}/10 |
| Maintainability | ${aiReview.maintainabilityScore}/10 |
| Readability | ${aiReview.readabilityScore}/10 |

---

## Risk Level

**${aiReview.riskLevel}**

---

## Executive Summary

${aiReview.summary}

---

## Findings

${
  aiReview.issues && aiReview.issues.length > 0
    ? aiReview.issues
        .map(
          (issue, index) => `### ${index + 1}. ${issue.severity}

**Issue**

${issue.message}

**Suggested Fix**

${issue.suggestion || "Review and refactor as needed"}`,
        )
        .join("\n\n")
    : "No critical issues found."
}

---

Generated automatically by **CodeSentinel AI**`;

      await axios.post(
        `${import.meta.env.VITE_API_URL}/github/repos/${selectedRepo.owner}/${selectedRepo.repo}/pulls/${selectedPR}/comment`,
        { comment: formattedComment },
        { withCredentials: true },
      );

      setPostStatus("posted");
      setPostNotice("Posted to GitHub");

      setTimeout(() => {
        setPostNotice("");
      }, 3000);
    } catch (e) {
      console.log(e);
      setPostStatus("idle");
      setPostNotice(e?.response?.data?.message || "Failed to post comment");

      setTimeout(() => {
        setPostNotice("");
      }, 3000);
    }
  };

  // Helpers for stats
  const averageScore = reviewStats.length
    ? Math.round(
        reviewStats.reduce((sum, r) => sum + (r.overallScore || 0), 0) /
          reviewStats.length,
      )
    : 0;

  const criticalIssueCount = reviewStats.reduce(
    (total, r) =>
      total + (r.issues?.filter((i) => i.severity === "CRITICAL").length || 0),
    0,
  );

  const highestScore = reviewStats.length
    ? Math.max(...reviewStats.map((r) => r.overallScore || 0))
    : 0;

  const lowestScore = reviewStats.length
    ? Math.min(...reviewStats.map((r) => r.overallScore || 0))
    : 0;

  return (
    <div
      className="flex bg-[#09090b] text-white min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-[14px] border-b border-[#1f1f23] bg-[#09090b] sticky top-0 z-10">
          <div>
            <h1 className="text-[18px] font-semibold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="text-[12px] text-[#444] mt-0.5">
              AI-powered pull request insights
            </p>
          </div>
          {user && (
            <div className="flex items-center gap-3 border border-[#1f1f23] bg-[#111113] px-3.5 py-2 rounded-xl">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-7 h-7 rounded-full ring-1 ring-[#2a2a2e]"
              />
              <div>
                <div className="text-[13px] font-semibold leading-none text-white">
                  {user.username}
                </div>
                <div className="text-[10px] text-[#555] mt-0.5 flex items-center gap-1">
                  <CheckCircle2 size={9} className="text-[#4ade80]" /> GitHub
                  Connected
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-8">
          {/* Dashboard Statistics */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            <StatCard
              title="Repositories"
              value={repos.length}
              icon={GitBranch}
              accent="text-[#e5ff4a]"
            />
            <StatCard
              title="Reviews Generated"
              value={reviewStats.length}
              icon={Sparkles}
              accent="text-[#60a5fa]"
            />
            <StatCard
              title="Average Score"
              value={averageScore}
              icon={ShieldCheck}
              accent="text-[#4ade80]"
            />
            <StatCard
              title="Critical Issues"
              value={criticalIssueCount}
              icon={AlertTriangle}
              accent="text-[#f87171]"
            />
          </div>

          {/* Repository Health */}
          <div className="border border-[#1f1f23] rounded-2xl p-6 bg-[#111113]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">Repository Health</h2>
                <p className="text-[#666] text-sm">Based on all AI Reviews</p>
              </div>
              <div className="text-5xl font-bold text-[#e5ff4a]">
                {averageScore}%
              </div>
            </div>

            <div className="w-full h-3 rounded-full bg-[#1f1f23] overflow-hidden">
              <div
                style={{ width: `${averageScore}%` }}
                className="bg-[#e5ff4a] h-full rounded-full transition-all duration-700"
              />
            </div>

            <div className="mt-3 text-sm text-[#888]">
              {reviewStats.length === 0
                ? "No reviews yet. Run your first AI analysis to see insights."
                : "Repository quality is improving with every AI review."}
            </div>
          </div>

          {/* Trend Summary */}
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="border border-[#1f1f23] rounded-xl p-5 bg-[#09090b]">
              <div className="text-[#666] text-sm mb-2">Latest Review</div>
              <div className="text-3xl font-bold text-white">
                {reviewStats[0]?.overallScore || "--"}
              </div>
            </div>

            <div className="border border-[#1f1f23] rounded-xl p-5 bg-[#09090b]">
              <div className="text-[#666] text-sm mb-2">Highest Score</div>
              <div className="text-3xl font-bold text-green-400">
                {highestScore || "--"}
              </div>
            </div>

            <div className="border border-[#1f1f23] rounded-xl p-5 bg-[#09090b]">
              <div className="text-[#666] text-sm mb-2">Lowest Score</div>
              <div className="text-3xl font-bold text-red-400">
                {lowestScore || "--"}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 border border-[#1f1f23] bg-[#111113] rounded-xl px-4 py-2.5 focus-within:border-[#2a2a2e] transition-all">
            <Search size={14} className="text-[#444] shrink-0" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1 text-[13px] text-white placeholder:text-[#333]"
            />
          </div>

          {/* Repositories */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold">Repositories</h2>
                <p className="text-[#666] text-sm">
                  Select a repository to analyze its Pull Requests
                </p>
              </div>
              <div className="text-sm text-[#888]">
                {filteredRepos.length} repositories
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              {filteredRepos.length === 0 ? (
                <div className="col-span-full py-10 text-center text-[13px] text-[#444]">
                  No repositories found
                </div>
              ) : (
                filteredRepos.map((repo) => (
                  <motion.div
                    key={repo.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="border border-[#1f1f23] rounded-2xl p-6 bg-[#111113] hover:border-[#2a2a2e] transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{repo.name}</h3>
                        <p className="text-sm text-[#666] mt-2">
                          {repo.description || "No description available"}
                        </p>
                      </div>
                      <div>
                        {repo.private ? (
                          <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
                            Private
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            Public
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <div className="text-[#666] text-xs">Language</div>
                        <div className="font-medium mt-1">
                          {repo.language || "--"}
                        </div>
                      </div>

                      <div>
                        <div className="text-[#666] text-xs">Forks</div>
                        <div className="font-medium mt-1">
                          {repo.forks_count || 0}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-[#666]">Repository Health</span>
                        <span>{averageScore || 90}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#1f1f23] overflow-hidden">
                        <div
                          className="bg-[#e5ff4a] h-full"
                          style={{ width: `${averageScore || 90}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        fetchPullRequests(repo.owner.login, repo.name)
                      }
                      className="mt-6 w-full bg-[#e5ff4a] hover:bg-[#d4ee35] text-black font-semibold py-3 rounded-xl transition-all"
                    >
                      Analyze Pull Requests
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Pull Requests */}
          <AnimatePresence>
            {selectedRepo && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-[15px] font-semibold text-white">
                    Pull Requests
                  </h2>
                  <span className="text-[11px] text-[#444] border border-[#1f1f23] px-2 py-0.5 rounded-md font-mono">
                    {selectedRepo.repo}
                  </span>
                </div>
                {pullRequests.length === 0 ? (
                  <div className="border border-[#1f1f23] rounded-xl py-10 text-center text-[13px] text-[#444]">
                    No open pull requests
                  </div>
                ) : (
                  <div className="border border-[#1f1f23] rounded-xl overflow-hidden divide-y divide-[#1f1f23]">
                    {pullRequests.map((pr) => (
                      <div
                        key={pr.id}
                        className="flex items-center justify-between px-5 py-4 bg-[#09090b] hover:bg-[#111113] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <GitPullRequest
                            size={14}
                            className="text-[#4ade80] shrink-0"
                          />
                          <div>
                            <div className="text-[13px] font-medium text-white">
                              {pr.title}
                            </div>
                            <div className="text-[11px] text-[#444] mt-0.5">
                              #{pr.number}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => fetchPRFiles(pr.number)}
                          className="flex items-center gap-1.5 text-[12px] font-medium border border-[#1f1f23] text-[#ccc] px-3 py-1.5 rounded-lg hover:border-[#2a2a2e] hover:text-white transition-all"
                        >
                          Analyze <ChevronRight size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>

          {/* Changed Files */}
          <AnimatePresence>
            {selectedPR && prFiles.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-[15px] font-semibold text-white mb-4">
                  Changed Files
                </h2>
                <div className="space-y-4">
                  {prFiles.map((file) => (
                    <div
                      key={file.sha}
                      className="border border-[#1f1f23] rounded-xl overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1f1f23] bg-[#111113]">
                        <span className="text-[12px] font-mono text-[#ccc] truncate">
                          {file.filename}
                        </span>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          <span className="text-[11px] text-[#4ade80] font-mono">
                            +{file.additions}
                          </span>
                          <span className="text-[11px] text-[#f87171] font-mono">
                            -{file.deletions}
                          </span>
                          <button
                            onClick={() => analyzePatch(file.patch)}
                            className="flex items-center gap-1.5 text-[11px] font-semibold bg-[#e5ff4a] text-[#09090b] px-3 py-1.5 rounded-lg hover:bg-[#d4ee35] transition-all"
                          >
                            <Sparkles size={11} /> Run AI Review
                          </button>
                        </div>
                      </div>
                      <SyntaxHighlighter
                        language="javascript"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: "16px 20px",
                          background: "#0a0a0d",
                          fontSize: "12px",
                          lineHeight: "1.7",
                        }}
                      >
                        {file.patch || "No patch available"}
                      </SyntaxHighlighter>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* AI Review Section */}
          <AnimatePresence>
            {(loadingAI || aiReview) && (
              <motion.section
                ref={aiReviewRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border border-[#1f1f23] rounded-xl overflow-hidden scroll-mt-6"
              >
                {/* Header */}
                <div className="relative flex items-center justify-between px-6 py-5 border-b border-[#1f1f23] bg-[#111113]">
                  {postNotice && (
                    <div className="absolute right-6 top-16 border border-[#1f1f23] bg-[#111113] text-[#4ade80] px-4 py-2 rounded-lg text-sm shadow-lg z-20">
                      {postNotice}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-[#e5ff4a]" />
                    <span className="text-[16px] font-semibold text-white">
                      CodeSentinel Review
                    </span>
                  </div>
                  {aiReview && !loadingAI && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 border border-[#1f1f23] bg-[#09090b] px-3 py-1.5 rounded-lg">
                        <span className="text-[11px] text-[#555]">
                          Overall Score
                        </span>
                        <span className="text-[14px] font-bold text-[#e5ff4a]">
                          {aiReview.overallScore}/100
                        </span>
                      </div>
                      <RiskLevelBadge
                        riskLevel={aiReview.riskLevel || "MEDIUM"}
                      />
                      <button
                        onClick={postReviewToGitHub}
                        disabled={postingComment}
                        className="flex items-center gap-1.5 text-[12px] font-semibold bg-[#4ade80] text-[#09090b] px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-all disabled:opacity-50"
                      >
                        {postingComment ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Send size={12} />
                        )}
                        {postingComment ? "Posting..." : "Post to GitHub"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-[#09090b]">
                  {loadingAI ? (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[13px] text-[#888]">
                          <Loader2
                            size={14}
                            className="animate-spin text-[#e5ff4a] shrink-0"
                          />
                          <span>{loadingStage || "Analyzing code…"}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#1f1f23] rounded-full overflow-hidden">
                          <div className="h-full bg-[#e5ff4a] animate-pulse w-2/3 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ) : aiReview ? (
                    <div className="space-y-6">
                      {/* Score Table */}
                      <div className="border border-[#1f1f23] rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <tbody>
                            <tr className="border-b border-[#1f1f23]">
                              <td className="px-4 py-3 text-[#888]">Overall</td>
                              <td className="px-4 py-3 text-right font-bold text-[#e5ff4a]">
                                {aiReview.overallScore}/100
                              </td>
                            </tr>
                            <tr className="border-b border-[#1f1f23]">
                              <td className="px-4 py-3 text-[#888]">
                                Security
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-green-400">
                                {aiReview.securityScore}/10
                              </td>
                            </tr>
                            <tr className="border-b border-[#1f1f23]">
                              <td className="px-4 py-3 text-[#888]">
                                Performance
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-blue-400">
                                {aiReview.performanceScore}/10
                              </td>
                            </tr>
                            <tr className="border-b border-[#1f1f23]">
                              <td className="px-4 py-3 text-[#888]">
                                Maintainability
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-yellow-400">
                                {aiReview.maintainabilityScore}/10
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-[#888]">
                                Readability
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-purple-400">
                                {aiReview.readabilityScore}/10
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Score Cards Grid */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border border-[#1f1f23] rounded-xl p-4 bg-[#111113]">
                          <div className="text-xs text-[#666] mb-2">
                            Overall Score
                          </div>
                          <div className="text-2xl font-bold text-[#e5ff4a]">
                            {aiReview.overallScore}/100
                          </div>
                        </div>
                        <div className="border border-[#1f1f23] rounded-xl p-4 bg-[#111113]">
                          <div className="text-xs text-[#666] mb-2">
                            Security
                          </div>
                          <div className="text-2xl font-bold text-green-400">
                            {aiReview.securityScore}/10
                          </div>
                        </div>
                        <div className="border border-[#1f1f23] rounded-xl p-4 bg-[#111113]">
                          <div className="text-xs text-[#666] mb-2">
                            Performance
                          </div>
                          <div className="text-2xl font-bold text-blue-400">
                            {aiReview.performanceScore}/10
                          </div>
                        </div>
                        <div className="border border-[#1f1f23] rounded-xl p-4 bg-[#111113]">
                          <div className="text-xs text-[#666] mb-2">
                            Maintainability
                          </div>
                          <div className="text-2xl font-bold text-yellow-400">
                            {aiReview.maintainabilityScore}/10
                          </div>
                        </div>
                      </div>

                      {/* Risk Level */}
                      <div>
                        <div className="text-xs text-[#666] mb-3 font-medium uppercase tracking-wide">
                          Risk Level
                        </div>
                        <RiskLevelBadge
                          riskLevel={aiReview.riskLevel || "MEDIUM"}
                        />
                      </div>

                      {/* Summary */}
                      <div>
                        <div className="text-xs text-[#666] mb-3 font-medium uppercase tracking-wide">
                          Summary
                        </div>
                        <div className="border border-[#1f1f23] rounded-lg p-4 bg-[#111113]">
                          <p className="text-[13px] text-[#aaa] leading-relaxed">
                            {aiReview.summary}
                          </p>
                        </div>
                      </div>

                      {/* Findings */}
                      {aiReview.issues && aiReview.issues.length > 0 ? (
                        <div>
                          <div className="text-xs text-[#666] mb-3 font-medium uppercase tracking-wide">
                            Findings — {aiReview.issues.length} found
                          </div>
                          <div className="space-y-3">
                            {aiReview.issues.map((issue, i) => (
                              <div
                                key={i}
                                className="border border-[#1f1f23] rounded-lg p-4 bg-[#111113] hover:border-[#2a2a2e] transition-all"
                              >
                                <div className="mb-3">
                                  <SeverityBadge severity={issue.severity} />
                                </div>
                                <div className="mb-3">
                                  <p className="text-[13px] text-[#888] leading-relaxed">
                                    {issue.message}
                                  </p>
                                </div>
                                <div className="border-t border-[#1f1f23] pt-3">
                                  <div className="text-xs text-[#666] mb-1">
                                    Suggested Fix
                                  </div>
                                  <p className="text-sm text-[#ddd]">
                                    {issue.suggestion ||
                                      "Review and refactor as needed"}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="border border-[#1f1f23] rounded-lg p-4 bg-[#111113] text-center">
                          <p className="text-[13px] text-[#888]">
                            No issues found. Code looks good!
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-[13px] text-[#666]">
                        Run an AI review to generate code quality insights.
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;