import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GitBranch, ShieldCheck, Zap, Brain } from "lucide-react";

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ backgroundColor: "#111113" }}
    className="bg-[#09090b] p-7 transition-colors"
  >
    <div className="w-9 h-9 bg-[#161618] border border-[#2a2a2e] rounded-lg flex items-center justify-center mb-4 text-[#e5ff4a]">
      {icon}
    </div>
    <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
    <p className="text-xs text-[#555] leading-relaxed">{desc}</p>
  </motion.div>
);

const ScoreBar = ({ label, value, color }) => (
  <div className="flex items-center gap-2 my-1">
    <span className="text-[#444] text-[10px] w-16 shrink-0">{label}</span>
    <div className="flex-1 h-1 bg-[#1f1f23] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
    <span className="text-[10px] w-5 text-right" style={{ color }}>
      {value}
    </span>
  </div>
);

const LandingPage = () => {
  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-[18px] border-b border-[#1f1f23]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#e5ff4a] rounded-lg flex items-center justify-center text-sm font-bold text-[#09090b]">
            C
          </div>
          <span className="text-[17px] font-semibold tracking-tight">
            CodeSentinel
          </span>
        </div>

        <div className="hidden md:flex gap-8">
          <Link
            to="/features"
            className="text-[13px] text-[#888] hover:text-white transition-colors"
          >
            Features
          </Link>

          <Link
            to="/pricing"
            className="text-[13px] text-[#888] hover:text-white transition-colors"
          >
            Pricing
          </Link>

          <Link
            to="/docs"
            className="text-[13px] text-[#888] hover:text-white transition-colors"
          >
            Docs
          </Link>

          <Link
            to="/blog"
            className="text-[13px] text-[#888] hover:text-white transition-colors"
          >
            Blog
          </Link>
        </div>

        <button
          onClick={handleGitHubLogin}
          className="text-[13px] font-semibold bg-[#e5ff4a] text-[#09090b] px-[18px] py-2 rounded-lg hover:bg-[#d4ee35] transition-all"
        >
          Connect GitHub
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-10 py-[72px] grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-1.5 border border-[#2a2a2e] bg-[#111113] px-3 py-1.5 rounded-full text-xs text-[#888] mb-7">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e5ff4a]" />
            AI-Powered PR Intelligence
          </div>

          <h1 className="text-[48px] font-semibold leading-[1.08] tracking-[-1.5px] mb-5">
            Ship cleaner code.
            <br />
            <span className="text-[#e5ff4a]">Let AI review</span>
            <br />
            your PRs.
          </h1>

          <p className="text-[15px] text-[#888] leading-[1.7] mb-9 max-w-[420px]">
            CodeSentinel connects to GitHub, analyzes pull requests using AI,
            detects bugs, security issues, and provides senior-engineer-level
            feedback — instantly.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={handleGitHubLogin}
              className="flex items-center gap-2 bg-[#e5ff4a] text-[#09090b] font-semibold text-sm px-6 py-3 rounded-[9px] hover:bg-[#d4ee35] hover:-translate-y-px transition-all"
            >
              <GitBranch size={16} />
              Connect GitHub
            </button>
          </div>

          <div className="flex flex-wrap gap-5">
            {[
              "GitHub OAuth",
              "AI PR Review",
              "Security Analysis",
              "Code Smell Detection",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-xs text-[#555]"
              >
                <span className="text-[#e5ff4a]">✓</span> {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-[#111113] border border-[#1f1f23] rounded-[14px] overflow-hidden"
        >
          <div className="flex items-center gap-2 px-[18px] py-3.5 border-b border-[#1f1f23] bg-[#0d0d10]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
            <span className="ml-1.5 text-xs text-[#444] font-mono">
              codesentinel — review
            </span>
          </div>

          <div className="p-5 font-mono text-xs leading-[1.8]">
            <p className="text-[#444]">$ codesentinel review octo/api#142</p>
            <p className="text-[#ccc]">→ Fetching PR diff...</p>
            <p className="text-[#ccc]">→ Running AI analysis...</p>
            <p className="text-[#ccc]">→ Scanning for vulnerabilities...</p>
            <p className="text-[#4ade80]">✓ Analysis complete</p>

            <hr className="border-[#1f1f23] my-3" />

            <div className="flex justify-between mb-3">
              <span className="text-[#ccc] text-[11px]">REVIEW SCORE</span>
              <span className="text-[#4ade80] text-[11px]">82 / 100</span>
            </div>

            <ScoreBar label="Security" value={78} color="#4ade80" />
            <ScoreBar label="Quality" value={85} color="#4ade80" />
            <ScoreBar label="Coverage" value={60} color="#fbbf24" />

            <hr className="border-[#1f1f23] my-3" />

            <p className="text-[#fbbf24]">⚠ 3 Code Smells detected</p>

            {[
              {
                level: "CRITICAL",
                file: "auth.js:45",
                color: "text-[#f87171]",
                msg: "Token refresh race condition",
              },
              {
                level: "WARNING",
                file: "utils.js:88",
                color: "text-[#fbbf24]",
                msg: "Duplicate parsing logic detected",
              },
              {
                level: "INFO",
                file: "api.js:22",
                color: "text-[#60a5fa]",
                msg: "Consider adding request timeout",
              },
            ].map(({ level, file, color, msg }) => (
              <div key={file} className="mt-2">
                <p className={color}>
                  [{level}] {file}
                </p>
                <p className="text-[#444] pl-0.5 text-[11px]">{msg}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trusted logos */}
      <div className="max-w-[1100px] mx-auto px-10 pb-14">
        <p className="text-[11px] text-[#444] text-center mb-5 tracking-widest uppercase">
          Trusted by engineering teams worldwide
        </p>
        <div className="flex border border-[#1f1f23] rounded-[10px] overflow-hidden">
          {["STRIPE", "VERCEL", "LINEAR", "FIGMA", "NOTION", "SUPABASE"].map(
            (name, i, arr) => (
              <div
                key={name}
                className={`flex-1 flex items-center justify-center py-4 text-[11px] font-semibold text-[#2a2a2e] tracking-widest ${i < arr.length - 1 ? "border-r border-[#1f1f23]" : ""}`}
              >
                {name}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-[1100px] mx-auto px-10 pb-14">
        <div className="grid grid-cols-3 border border-[#1f1f23] rounded-xl overflow-hidden divide-x divide-[#1f1f23]">
          {[
            { num: "80%", label: "Reduction in PR review time" },
            { num: "1000+", label: "Pull requests analyzed daily" },
            { num: "<10s", label: "Average review turnaround" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-[#09090b] py-8 text-center">
              <div className="text-[40px] font-semibold text-[#e5ff4a] tracking-tight leading-none mb-1.5">
                {num}
              </div>
              <div className="text-xs text-[#555]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="max-w-[1100px] mx-auto px-10 pb-16">
        <p className="text-[11px] text-[#555] tracking-widest uppercase mb-3">
          Platform
        </p>
        <h2 className="text-[30px] font-semibold tracking-tight mb-10 leading-snug">
          Everything your team needs
          <br />
          for confident shipping
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#1f1f23] border border-[#1f1f23] rounded-xl overflow-hidden">
          <FeatureCard
            icon={<GitBranch size={18} />}
            title="GitHub OAuth"
            desc="One-click auth. Secure repository access and PR integration across all your orgs."
          />
          <FeatureCard
            icon={<Brain size={18} />}
            title="AI Code Review"
            desc="Senior-engineer-level feedback on every PR. Logic bugs, anti-patterns, and architecture insights."
          />
          <FeatureCard
            icon={<ShieldCheck size={18} />}
            title="Security Analysis"
            desc="OWASP-aligned vulnerability scanning. Secrets, injections, and risky patterns flagged instantly."
          />
          <FeatureCard
            icon={<Zap size={18} />}
            title="Fast Reviews"
            desc="Full analysis in under 10 seconds. No waiting for reviewers to free up their calendar."
          />
        </div>
      </section>

      {/* CTA */}
      <div className="mx-10 mb-10 bg-[#111113] border border-[#1f1f23] rounded-2xl px-16 py-14 text-center">
        <h2 className="text-[32px] font-semibold tracking-tight mb-3">
          Start reviewing smarter today
        </h2>
        <p className="text-sm text-[#666] mb-8">
          Connect your GitHub in 30 seconds. No credit card required.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleGitHubLogin}
            className="flex items-center gap-2 bg-[#e5ff4a] text-[#09090b] font-semibold text-sm px-6 py-3 rounded-[9px] hover:bg-[#d4ee35] hover:-translate-y-px transition-all"
          >
            <GitBranch size={16} />
            Connect GitHub — it's free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-10 py-5 border-t border-[#1f1f23] flex items-center justify-between">
        <span className="text-xs text-[#333]">
          © 2026 CodeSentinel. All rights reserved.
        </span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Docs", "Status"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-[#333] hover:text-[#666] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
