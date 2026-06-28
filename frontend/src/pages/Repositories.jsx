import { Link } from "react-router-dom";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  ShieldCheck,
  History,
  Search,
  Lock,
  Globe,
  Star,
  GitPullRequest,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Filter,
  GitFork,
  Clock,
  Loader2,
  ServerCrash,
  SortAsc,
  SortDesc,
  Eye,
  AlertCircle,
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

const Sidebar = ({ active = "repos" }) => (
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

/* ─── Language dot ────────────────────────────────────────── */
const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  CSS: "#563d7c",
  HTML: "#e34c26",
  "C++": "#f34b7d",
  C: "#555",
  Shell: "#89e051",
};

const LangDot = ({ lang }) => {
  if (!lang) return null;
  const color = LANG_COLORS[lang] || "#555";
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-[#555]">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {lang}
    </span>
  );
};

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

/* ─── Repo Card (Grid view) ───────────────────────────────── */
const RepoCard = ({ repo, index, onViewPRs }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04 }}
    className="border border-[#1f1f23] rounded-xl bg-[#09090b] hover:border-[#2a2a2e] transition-all group flex flex-col overflow-hidden"
  >
    {/* Card top */}
    <div className="p-5 flex-1">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md bg-[#111113] border border-[#1f1f23] flex items-center justify-center shrink-0 group-hover:border-[#2a2a2e] transition-all">
            {repo.private ? (
              <Lock size={11} className="text-[#555]" />
            ) : (
              <Globe size={11} className="text-[#555]" />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-white truncate">
              {repo.name}
            </div>
            <div className="text-[10px] text-[#444] mt-0.5 truncate">
              {repo.full_name}
            </div>
          </div>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-md border shrink-0 ${
            repo.private
              ? "bg-[#1a1500] border-[#3d3200] text-[#fbbf24]"
              : "bg-[#0a1a0a] border-[#1a3a1a] text-[#4ade80]"
          }`}
        >
          {repo.private ? "Private" : "Public"}
        </span>
      </div>

      <p className="text-[12px] text-[#555] leading-relaxed line-clamp-2 min-h-[36px]">
        {repo.description || "No description provided."}
      </p>
    </div>

    {/* Meta row */}
    <div className="px-5 py-3 border-t border-[#1f1f23] flex items-center gap-3 flex-wrap">
      <LangDot lang={repo.language} />
      {repo.stargazers_count > 0 && (
        <span className="flex items-center gap-1 text-[11px] text-[#555]">
          <Star size={10} /> {repo.stargazers_count}
        </span>
      )}
      {repo.forks_count > 0 && (
        <span className="flex items-center gap-1 text-[11px] text-[#555]">
          <GitFork size={10} /> {repo.forks_count}
        </span>
      )}
      {repo.open_issues_count > 0 && (
        <span className="flex items-center gap-1 text-[11px] text-[#555]">
          <AlertCircle size={10} /> {repo.open_issues_count}
        </span>
      )}
    </div>

    {/* Action row */}
    <div className="px-5 py-3 border-t border-[#1f1f23] flex items-center gap-2">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-[11px] font-medium border border-[#1f1f23] text-[#666] px-3 py-1.5 rounded-lg hover:border-[#2a2a2e] hover:text-[#ccc] transition-all"
      >
        <Eye size={11} /> View
      </a>
      <button
        onClick={() => onViewPRs(repo.owner.login, repo.name)}
        className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium bg-[#e5ff4a] text-[#09090b] px-3 py-1.5 rounded-lg hover:bg-[#d4ee35] transition-all"
      >
        View PRs <ArrowUpRight size={11} />
      </button>
    </div>
  </motion.div>
);

/* ─── Repo Row (List view) ────────────────────────────────── */
const RepoRow = ({ repo, index, onViewPRs }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.03 }}
    className="flex items-center justify-between px-5 py-4 bg-[#09090b] hover:bg-[#111113] transition-colors group"
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-7 h-7 rounded-md bg-[#111113] border border-[#1f1f23] flex items-center justify-center shrink-0 group-hover:border-[#2a2a2e] transition-all">
        {repo.private ? (
          <Lock size={11} className="text-[#555]" />
        ) : (
          <Globe size={11} className="text-[#555]" />
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-white truncate">
            {repo.name}
          </span>
          {repo.private && (
            <span className="text-[10px] font-medium bg-[#1a1500] border border-[#3d3200] text-[#fbbf24] px-1.5 py-0.5 rounded shrink-0">
              Private
            </span>
          )}
        </div>
        <div className="text-[11px] text-[#444] truncate mt-0.5">
          {repo.description || "No description"}
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4 shrink-0 ml-4">
      <LangDot lang={repo.language} />
      {repo.stargazers_count > 0 && (
        <span className="flex items-center gap-1 text-[11px] text-[#444]">
          <Star size={10} /> {repo.stargazers_count}
        </span>
      )}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1 text-[11px] text-[#555] hover:text-[#888] transition-colors"
      >
        <Eye size={11} />
      </a>
      <button
        onClick={() => onViewPRs(repo.owner.login, repo.name)}
        className="flex items-center gap-1.5 text-[12px] font-medium bg-[#e5ff4a] text-[#09090b] px-3 py-1.5 rounded-lg hover:bg-[#d4ee35] transition-all"
      >
        View PRs <ArrowUpRight size={11} />
      </button>
    </div>
  </motion.div>
);

/* ─── PR Drawer ───────────────────────────────────────────── */
const PRDrawer = ({ repoName, pullRequests, loading, onClose, onAnalyze }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="border border-[#1f1f23] rounded-xl overflow-hidden scroll-mt-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1f1f23] bg-[#111113]">
        <div className="flex items-center gap-2">
          <GitPullRequest size={14} className="text-[#4ade80]" />
          <span className="text-[14px] font-semibold text-white">
            Pull Requests
          </span>
          <span className="text-[11px] text-[#444] border border-[#1f1f23] px-2 py-0.5 rounded-md font-mono">
            {repoName}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg border border-[#1f1f23] bg-[#09090b] flex items-center justify-center text-[#555] hover:text-[#ccc] hover:border-[#2a2a2e] transition-all"
        >
          <XCircle size={13} />
        </button>
      </div>

      {/* Body */}
      <div className="bg-[#09090b]">
        {loading ? (
          <div className="flex items-center gap-2 px-5 py-8 text-[13px] text-[#444]">
            <Loader2 size={13} className="animate-spin text-[#e5ff4a]" />
            Fetching pull requests...
          </div>
        ) : pullRequests.length === 0 ? (
          <div className="py-10 text-center text-[13px] text-[#444]">
            No open pull requests in this repository
          </div>
        ) : (
          <div className="divide-y divide-[#1f1f23]">
            {pullRequests.map((pr) => (
              <div
                key={pr.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-[#111113] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-[#0a1a0a] border border-[#1a3a1a] flex items-center justify-center shrink-0">
                    <GitPullRequest size={11} className="text-[#4ade80]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-white truncate">
                      {pr.title}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[#444] font-mono">
                        #{pr.number}
                      </span>
                      {pr.user?.login && (
                        <span className="text-[10px] text-[#444]">
                          by {pr.user.login}
                        </span>
                      )}
                      {pr.created_at && (
                        <span className="text-[10px] text-[#333] flex items-center gap-1">
                          <Clock size={9} />
                          {new Date(pr.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onAnalyze(pr.number, pr.title)}
                  className="flex items-center gap-1.5 text-[12px] font-medium border border-[#1f1f23] text-[#ccc] px-3 py-1.5 rounded-lg hover:border-[#2a2a2e] hover:text-white transition-all shrink-0 ml-4"
                >
                  Analyze <ArrowUpRight size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  </AnimatePresence>
);

/* ─── Main Page ───────────────────────────────────────────── */
const Repositories = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState("ALL"); // ALL | PUBLIC | PRIVATE
  const [sortBy, setSortBy] = useState("name"); // name | stars | updated
  const [sortDir, setSortDir] = useState("asc");
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  const [selectedRepo, setSelectedRepo] = useState(null);
  const [pullRequests, setPullRequests] = useState([]);
  const [prLoading, setPrLoading] = useState(false);
  const prDrawerRef = useRef(null);

  async function fetchRepos(isRefresh = false) {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      const r = await axios.get(`${import.meta.env.VITE_API_URL}/github/repos`, {
        withCredentials: true,
      });
      setRepos(r.data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e.message ||
          "Failed to load repositories",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
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
    ])
      .then(([userRes, reposRes]) => {
        if (cancelled) return;
        setUser(userRes.data);
        setRepos(reposRes.data);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(
          e?.response?.data?.message ||
            e.message ||
            "Failed to load repositories",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll to PR Drawer
  useEffect(() => {
    if (selectedRepo) {
      prDrawerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedRepo]);

  const fetchPullRequests = async (owner, repo) => {
    try {
      setPrLoading(true);
      setPullRequests([]);
      setSelectedRepo({ owner, repo });
      const r = await axios.get(
        `${import.meta.env.VITE_API_URL}/github/repos/${owner}/${repo}/pulls`,
        { withCredentials: true },
      );
      setPullRequests(r.data);
    } catch (e) {
      console.log(e);
    } finally {
      setPrLoading(false);
    }
  };

  const handleAnalyzePR = (prNumber, prTitle) => {
    // Navigate to dashboard with this PR pre-selected, or open analysis
    // (adjust routing as needed for your app)
    alert(`Navigate to Dashboard → analyze PR #${prNumber}: ${prTitle}`);
  };

  const filtered = useMemo(() => {
    let list = [...repos];
    if (search) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.description?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (visibility === "PUBLIC") list = list.filter((r) => !r.private);
    if (visibility === "PRIVATE") list = list.filter((r) => r.private);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      if (sortBy === "stars")
        cmp = (a.stargazers_count || 0) - (b.stargazers_count || 0);
      if (sortBy === "updated")
        cmp = new Date(a.updated_at) - new Date(b.updated_at);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [repos, search, visibility, sortBy, sortDir]);

  const publicCount = repos.filter((r) => !r.private).length;
  const privateCount = repos.filter((r) => r.private).length;
  const totalStars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);

  const VISIBILITY_FILTERS = [
    { id: "ALL", label: `All (${repos.length})` },
    { id: "PUBLIC", label: `Public (${publicCount})` },
    { id: "PRIVATE", label: `Private (${privateCount})` },
  ];

  const SORT_OPTIONS = [
    { id: "name", label: "Name" },
    { id: "stars", label: "Stars" },
    { id: "updated", label: "Updated" },
  ];

  return (
    <div
      className="flex bg-[#09090b] text-white min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-[14px] border-b border-[#1f1f23] bg-[#09090b] sticky top-0 z-10">
          <div>
            <h1 className="text-[18px] font-semibold tracking-tight text-white">
              Repositories
            </h1>
            <p className="text-[12px] text-[#444] mt-0.5">
              Browse and analyze your GitHub repositories
            </p>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2 border border-[#1f1f23] bg-[#111113] px-3 py-1.5 rounded-lg">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-5 h-5 rounded-full ring-1 ring-[#2a2a2e]"
                />
                <span className="text-[12px] text-[#555]">{user.username}</span>
                <CheckCircle2 size={10} className="text-[#4ade80]" />
              </div>
            )}
            <button
              onClick={() => fetchRepos(true)}
              disabled={refreshing}
              className="w-8 h-8 rounded-lg border border-[#1f1f23] bg-[#111113] flex items-center justify-center text-[#555] hover:text-[#ccc] hover:border-[#2a2a2e] transition-all disabled:opacity-50"
            >
              <RefreshCw
                size={13}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-6">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 size={22} className="animate-spin text-[#e5ff4a]" />
              <span className="text-[13px] text-[#444]">
                Loading repositories...
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
                  Failed to load repositories
                </div>
                <div className="text-[12px] text-[#7a3535]">{error}</div>
                <button
                  onClick={() => fetchRepos()}
                  className="mt-3 text-[12px] font-medium border border-[#3d1414] text-[#f87171] px-3 py-1.5 rounded-lg hover:bg-[#2a0a0a] transition-all"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  title="Total Repositories"
                  value={repos.length}
                  icon={GitBranch}
                  accent="text-[#e5ff4a]"
                />
                <StatCard
                  title="Public Repos"
                  value={publicCount}
                  icon={Globe}
                  accent="text-[#4ade80]"
                />
                <StatCard
                  title="Total Stars"
                  value={totalStars}
                  icon={Star}
                  accent="text-[#60a5fa]"
                />
              </div>

              {/* Search + filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="flex items-center gap-2 flex-1 border border-[#1f1f23] bg-[#111113] rounded-xl px-3.5 py-2.5 focus-within:border-[#2a2a2e] transition-all">
                  <Search size={13} className="text-[#444] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search repositories..."
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

                {/* Visibility filter */}
                <div className="flex items-center gap-1.5">
                  {VISIBILITY_FILTERS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setVisibility(f.id)}
                      className={`text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                        visibility === f.id
                          ? "bg-[#e5ff4a] text-[#09090b] border-[#e5ff4a]"
                          : "text-[#555] border-[#1f1f23] hover:text-[#ccc] hover:border-[#2a2a2e]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort + View toggle row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter size={12} className="text-[#444]" />
                  <span className="text-[11px] text-[#444]">Sort by</span>
                  <div className="flex gap-1.5">
                    {SORT_OPTIONS.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => {
                          if (sortBy === o.id)
                            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                          else {
                            setSortBy(o.id);
                            setSortDir("asc");
                          }
                        }}
                        className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
                          sortBy === o.id
                            ? "bg-[#111113] text-[#ccc] border-[#2a2a2e]"
                            : "text-[#555] border-[#1f1f23] hover:text-[#888] hover:border-[#2a2a2e]"
                        }`}
                      >
                        {o.label}
                        {sortBy === o.id &&
                          (sortDir === "asc" ? (
                            <SortAsc size={10} />
                          ) : (
                            <SortDesc size={10} />
                          ))}
                      </button>
                    ))}
                  </div>
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-1 border border-[#1f1f23] bg-[#111113] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      viewMode === "grid"
                        ? "bg-[#e5ff4a] text-[#09090b]"
                        : "text-[#555] hover:text-[#888]"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      viewMode === "list"
                        ? "bg-[#e5ff4a] text-[#09090b]"
                        : "text-[#555] hover:text-[#888]"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Result count */}
              <div className="flex items-center justify-between -mt-2">
                <span className="text-[11px] text-[#444]">
                  {filtered.length} repositor
                  {filtered.length !== 1 ? "ies" : "y"}
                  {search || visibility !== "ALL" ? " (filtered)" : ""}
                </span>
                {(search || visibility !== "ALL") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setVisibility("ALL");
                    }}
                    className="text-[11px] text-[#555] hover:text-[#ccc] transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="border border-[#1f1f23] rounded-xl py-16 text-center">
                  <GitBranch
                    size={22}
                    className="text-[#2a2a2e] mx-auto mb-3"
                  />
                  <div className="text-[13px] text-[#444]">
                    {repos.length === 0
                      ? "No repositories found. Make sure your GitHub is connected."
                      : "No repositories match your search or filters."}
                  </div>
                </div>
              )}

              {/* Grid view */}
              {filtered.length > 0 && viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((repo, i) => (
                    <RepoCard
                      key={repo.id}
                      repo={repo}
                      index={i}
                      onViewPRs={fetchPullRequests}
                    />
                  ))}
                </div>
              )}

              {/* List view */}
              {filtered.length > 0 && viewMode === "list" && (
                <div className="border border-[#1f1f23] rounded-xl overflow-hidden divide-y divide-[#1f1f23]">
                  {filtered.map((repo, i) => (
                    <RepoRow
                      key={repo.id}
                      repo={repo}
                      index={i}
                      onViewPRs={fetchPullRequests}
                    />
                  ))}
                </div>
              )}

              {/* PR Drawer */}
              <AnimatePresence>
                {selectedRepo && (
                  <div ref={prDrawerRef}>
                    <PRDrawer
                      repoName={selectedRepo.repo}
                      pullRequests={pullRequests}
                      loading={prLoading}
                      onClose={() => {
                        setSelectedRepo(null);
                        setPullRequests([]);
                      }}
                      onAnalyze={handleAnalyzePR}
                    />
                  </div>
                )}
              </AnimatePresence>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Repositories;