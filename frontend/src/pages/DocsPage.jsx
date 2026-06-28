import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Workflow,
  Shield,
  Brain,
  Server,
  Database,
  GitBranch,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const sections = [
    {
      icon: BookOpen,
      title: "Getting Started",
      content: {
        heading: "Get up and running in 30 seconds",
        description:
          "CodeSentinel integrates directly with GitHub and starts analyzing pull requests instantly using AI.",
        steps: [
          "Connect GitHub using OAuth",
          "Select a repository",
          "Choose a Pull Request",
          "Generate AI Review",
          "View security and quality insights",
        ],
      },
    },
    {
      icon: Workflow,
      title: "Review Pipeline",
      content: {
        heading: "How a review is generated",
        description:
          "Every review passes through a multi-stage pipeline before results are delivered.",
        steps: [
          "PR Diff Extraction",
          "Context Analysis",
          "Gemini AI Review",
          "Security Scanning",
          "Risk Scoring",
          "Final Report Generation",
        ],
      },
    },
    {
      icon: Brain,
      title: "AI Engine",
      content: {
        heading: "Gemini-Powered Analysis",
        description:
          "CodeSentinel uses Google's Gemini models to understand code context, architecture and security risks.",
        steps: [
          "Logic Bug Detection",
          "Code Smell Detection",
          "Architecture Review",
          "Performance Analysis",
          "Best Practice Recommendations",
        ],
      },
    },
    {
      icon: Shield,
      title: "Security",
      content: {
        heading: "Built-in Security Checks",
        description:
          "Every PR is scanned for vulnerabilities and risky coding patterns.",
        steps: [
          "OWASP Top 10 Checks",
          "Token Leakage Detection",
          "Injection Prevention",
          "Hardcoded Secret Detection",
          "Risk Severity Classification",
        ],
      },
    },
  ];

  const faqData = [
    {
      q: "How long does a review take?",
      a: "Most reviews are completed within 10 seconds depending on PR size.",
    },
    {
      q: "Does CodeSentinel store source code?",
      a: "No. Analysis is performed on pull request diffs and no repository code is permanently stored.",
    },
    {
      q: "Which AI model powers reviews?",
      a: "Google Gemini powers code understanding, security analysis and review generation.",
    },
    {
      q: "Can CodeSentinel detect security issues?",
      a: "Yes. It checks for common vulnerabilities, secrets, injection risks and insecure coding practices.",
    },
  ];

  const current = sections[activeSection];
  const Icon = current.icon;

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* NAVBAR */}
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

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#111113] border border-[#1f1f23] rounded-full px-4 py-2 text-sm text-[#888] mb-6">
            <BookOpen size={14} />
            Documentation
          </div>

          <h1 className="text-5xl font-bold mb-5">
            Learn how CodeSentinel works
          </h1>

          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Everything you need to understand the architecture, AI workflow,
            security model and review engine behind CodeSentinel.
          </p>
        </motion.div>
      </section>

      {/* INTERACTIVE DOCS */}
      <section className="max-w-6xl mx-auto px-10 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* SIDEBAR */}
          <div className="space-y-2">
            {sections.map((section, index) => {
              const SectionIcon = section.icon;

              return (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    activeSection === index
                      ? "bg-[#e5ff4a] text-black border-[#e5ff4a]"
                      : "bg-[#111113] border-[#1f1f23] text-[#ccc]"
                  }`}
                >
                  <SectionIcon size={18} />
                  {section.title}
                </button>
              );
            })}
          </div>

          {/* CONTENT */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 border border-[#1f1f23] rounded-2xl p-8 bg-[#111113]"
          >
            <div className="w-14 h-14 rounded-xl bg-[#1f1f23] flex items-center justify-center mb-6 text-[#e5ff4a]">
              <Icon size={28} />
            </div>

            <h2 className="text-3xl font-bold mb-4">
              {current.content.heading}
            </h2>

            <p className="text-[#888] mb-8">{current.content.description}</p>

            <div className="space-y-4">
              {current.content.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#1f1f23]"
                >
                  <CheckCircle2 size={16} className="text-[#e5ff4a]" />
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ARCHITECTURE */}
      <section className="max-w-6xl mx-auto px-10 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          System Architecture
        </h2>

        <div className="grid md:grid-cols-5 gap-4 items-center">
          {[
            {
              icon: GitBranch,
              title: "GitHub",
            },
            {
              icon: Server,
              title: "Express API",
            },
            {
              icon: Brain,
              title: "Groq AI",
            },
            {
              icon: Database,
              title: "MongoDB",
            },
            {
              icon: Shield,
              title: "Security Layer",
            },
          ].map((item, index) => {
            const ItemIcon = item.icon;

            return (
              <div key={index} className="relative">
                <div className="bg-[#111113] border border-[#1f1f23] rounded-xl p-6 text-center">
                  <ItemIcon size={30} className="mx-auto mb-3 text-[#e5ff4a]" />
                  <div className="font-medium">{item.title}</div>
                </div>

                {index !== 4 && (
                  <ArrowRight
                    size={18}
                    className="hidden md:block absolute -right-6 top-1/2 text-[#666]"
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* AI ANALYSIS */}
      <section className="max-w-6xl mx-auto px-10 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          What Our AI Detects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Logic Bugs",
              desc: "Detects faulty conditions, broken loops and unexpected edge cases.",
              example: "if(user.role = 'admin')",
            },
            {
              title: "Security Risks",
              desc: "Identifies injections, exposed secrets and unsafe code patterns.",
              example: "eval(userInput)",
            },
            {
              title: "Code Smells",
              desc: "Flags duplicate code, poor naming and maintainability issues.",
              example: "Duplicate business logic",
            },
            {
              title: "Performance Issues",
              desc: "Highlights expensive operations and scalability bottlenecks.",
              example: "Nested loops O(n²)",
            },
          ].map((item) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={item.title}
              className="bg-[#111113] border border-[#1f1f23] rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p className="text-[#888] mb-4">{item.desc}</p>

              <div className="bg-[#09090b] border border-[#1f1f23] rounded-lg p-3 text-[#e5ff4a] font-mono text-sm">
                {item.example}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* API REFERENCE */}
      <section className="max-w-6xl mx-auto px-10 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">API Reference</h2>

        <div className="space-y-4">
          {[
            {
              method: "GET",
              endpoint: "/api/github/repos",
              purpose: "Fetch user repositories",
            },
            {
              method: "GET",
              endpoint: "/api/github/prs",
              purpose: "Retrieve pull requests",
            },
            {
              method: "POST",
              endpoint: "/api/review/analyze",
              purpose: "Generate AI review",
            },
            {
              method: "GET",
              endpoint: "/api/review/history",
              purpose: "Fetch review history",
            },
          ].map((api) => (
            <div
              key={api.endpoint}
              className="bg-[#111113] border border-[#1f1f23] rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <span className="text-[#e5ff4a] font-mono mr-3">
                  {api.method}
                </span>

                <span className="font-mono">{api.endpoint}</span>
              </div>

              <span className="text-[#888] text-sm">{api.purpose}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-10 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-[#1f1f23] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex justify-between items-center p-5 bg-[#111113]"
              >
                <span className="font-medium">{faq.q}</span>

                {openFaq === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {openFaq === index && (
                <div className="p-5 text-[#888] border-t border-[#1f1f23]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-10 pb-24 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to analyze your first PR?
        </h2>

        <p className="text-[#888] mb-8">
          Connect GitHub and start reviewing code with AI-powered insights.
        </p>

        <a
          href={`${import.meta.env.VITE_API_URL}/auth/github`}
          className="bg-[#e5ff4a] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#d4ee35] transition-all inline-flex items-center gap-2 hover:gap-3"
        >
          Connect GitHub
          <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
};

export default DocsPage;
