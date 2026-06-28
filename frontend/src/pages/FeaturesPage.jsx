import { useState } from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  ShieldCheck,
  Zap,
  Brain,
  ArrowRight,
  Check,
} from "lucide-react";

const FeaturesPage = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      icon: GitBranch,
      title: "GitHub OAuth",
      desc: "One-click authentication",
      longDesc:
        "Secure repository authentication powered by GitHub OAuth. No API keys, no complicated setup — just click 'Connect GitHub' and you're ready to roll.",
      benefits: [
        "Instant authentication",
        "Access all your repos",
        "Multi-org support",
        "Zero storage of credentials",
      ],
      color: "#60a5fa",
    },
    {
      icon: Brain,
      title: "AI Code Review",
      desc: "Senior engineer feedback",
      longDesc:
        "Gemini-powered analysis that understands logic bugs, anti-patterns, security risks, and architectural issues. Gets smarter with every review.",
      benefits: [
        "Deep code understanding",
        "Logic bug detection",
        "Anti-pattern flagging",
        "Architecture insights",
      ],
      color: "#e5ff4a",
    },
    {
      icon: ShieldCheck,
      title: "Security Analysis",
      desc: "OWASP-aligned scanning",
      longDesc:
        "Automated detection of vulnerabilities, injection attacks, token mishandling, and risky code patterns. OWASP Top 10 coverage.",
      benefits: [
        "Vulnerability scanning",
        "Secret detection",
        "Injection prevention",
        "Risk scoring",
      ],
      color: "#f87171",
    },
    {
      icon: Zap,
      title: "Fast Reviews",
      desc: "Results in under 10 seconds",
      longDesc:
        "No waiting for teammates to free up their calendar. Every PR analyzed in seconds, with actionable feedback ready to implement.",
      benefits: [
        "Sub-10s analysis",
        "Real-time feedback",
        "No queue delays",
        "CI/CD integration",
      ],
      color: "#fbbf24",
    },
  ];

  const FEATURE = features[selectedFeature];
  const Icon = FEATURE.icon;

  return (
    <div
      className="min-h-screen bg-[#09090b] text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Nav */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-[#1f1f23]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#e5ff4a] rounded-lg flex items-center justify-center text-sm font-bold text-[#09090b]">
            C
          </div>
          <span className="text-lg font-semibold">CodeSentinel</span>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="text-sm text-[#ccc] border border-[#2a2a2e] px-4 py-2 rounded-lg hover:border-[#555] transition-all"
        >
          Back to Home
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            Everything you need for smarter code reviews
          </h1>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Powerful features designed to catch bugs, prevent security issues,
            and maintain code quality across your entire team.
          </p>
        </motion.div>

        {/* Feature selector + detail */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Feature list */}
          <div className="space-y-2 lg:order-1">
            {features.map((f, i) => {
              const FeatureIcon = f.icon;
              const isActive = i === selectedFeature;
              return (
                <motion.button
                  key={i}
                  onClick={() => setSelectedFeature(i)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg border transition-all text-left ${
                    isActive
                      ? "bg-[#e5ff4a] text-[#09090b] border-[#e5ff4a]"
                      : "border-[#1f1f23] bg-[#111113] text-[#ccc] hover:border-[#2a2a2e]"
                  }`}
                >
                  <FeatureIcon size={16} />
                  <div>
                    <div className="text-[13px] font-semibold">{f.title}</div>
                    <div className="text-[11px] text-opacity-70">{f.desc}</div>
                  </div>
                  {isActive && (
                    <ArrowRight size={14} className="ml-auto shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Detail */}
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="border border-[#1f1f23] rounded-2xl p-8 bg-[#111113]">
              <div
                className="w-14 h-14 rounded-xl bg-[#1f1f23] flex items-center justify-center mb-6"
                style={{ color: FEATURE.color }}
              >
                <Icon size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-3">{FEATURE.title}</h2>
              <p className="text-[#888] text-lg mb-8">{FEATURE.longDesc}</p>

              <div className="mb-8">
                <div className="text-[11px] text-[#444] uppercase tracking-wider mb-4">
                  Key Benefits
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {FEATURE.benefits.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-[13px] text-[#ccc]"
                    >
                      <Check size={13} style={{ color: FEATURE.color }} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#e5ff4a] text-[#09090b] font-semibold py-3 rounded-lg hover:bg-[#d4ee35] transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-6xl mx-auto px-10 py-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          How CodeSentinel compares
        </h2>
        <div className="border border-[#1f1f23] rounded-2xl overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#1f1f23] bg-[#111113]">
                <th className="px-6 py-3 text-left font-semibold text-[#ccc]">
                  Capability
                </th>
                <th className="px-6 py-3 text-center font-semibold text-[#e5ff4a]">
                  CodeSentinel
                </th>
                <th className="px-6 py-3 text-center font-semibold text-[#444]">
                  Manual Review
                </th>
                <th className="px-6 py-3 text-center font-semibold text-[#444]">
                  Other Tools
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f23]">
              {[
                {
                  cap: "Security Analysis",
                  cs: true,
                  manual: false,
                  other: true,
                },
                { cap: "Speed (<10s)", cs: true, manual: false, other: false },
                {
                  cap: "Logic Bug Detection",
                  cs: true,
                  manual: true,
                  other: false,
                },
                {
                  cap: "Architecture Review",
                  cs: true,
                  manual: true,
                  other: false,
                },
                {
                  cap: "Always Available",
                  cs: true,
                  manual: false,
                  other: true,
                },
                {
                  cap: "No Context Switching",
                  cs: true,
                  manual: false,
                  other: true,
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#111113]">
                  <td className="px-6 py-4 font-medium text-[#ccc]">
                    {row.cap}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.cs ? (
                      <Check size={16} className="text-[#4ade80] mx-auto" />
                    ) : (
                      <span className="text-[#333]">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-[#555]">
                    {row.manual ? (
                      <Check size={16} className="text-[#555] mx-auto" />
                    ) : (
                      <span className="text-[#333]">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-[#555]">
                    {row.other ? (
                      <Check size={16} className="text-[#555] mx-auto" />
                    ) : (
                      <span className="text-[#333]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-10 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to ship smarter code?</h2>
        <p className="text-[#888] mb-8">
          Connect GitHub and run your first AI review in 30 seconds.
        </p>
        <a
          href={`${import.meta.env.VITE_API_URL}/auth/github`}
          className="bg-[#e5ff4a] text-[#09090b] font-bold px-8 py-4 rounded-lg hover:bg-[#d4ee35] transition-all inline-flex items-center gap-2"
        >
          Get Started
          <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
};

export default FeaturesPage;
