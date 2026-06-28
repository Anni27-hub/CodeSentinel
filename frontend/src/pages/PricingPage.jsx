import { motion } from "framer-motion";
import { Check, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showProModal, setShowProModal] = useState(false);
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for students and individual developers.",
      features: [
        "20 AI Reviews / Month",
        "GitHub OAuth",
        "Review History",
        "Basic Security Analysis",
      ],
    },
    {
      name: "Pro",
      price: "$9",
      popular: true,
      desc: "Built for engineers who review code every day.",
      features: [
        "Unlimited Reviews",
        "Advanced AI Analysis",
        "Code Smell Detection",
        "Risk Scoring",
        "Priority Processing",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Designed for large teams and organizations.",
      features: [
        "Unlimited Everything",
        "Team Analytics",
        "Custom Integrations",
        "Dedicated Support",
        "Private Deployment",
      ],
    },
  ];

  const faqData = [
    {
      q: "Can I use CodeSentinel for free?",
      a: "Yes. The Free plan includes GitHub integration and limited AI reviews every month.",
    },
    {
      q: "How are reviews generated?",
      a: "CodeSentinel analyzes pull request diffs using Groq-powered LLMs and security scanning techniques.",
    },
    {
      q: "Can I upgrade later?",
      a: "Absolutely. You can move between plans anytime.",
    },
    {
      q: "Do you support teams?",
      a: "Yes. Team-level dashboards and analytics are included in Enterprise.",
    },
  ];

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
          <h1 className="text-5xl font-bold mb-5">
            Pricing built for every developer
          </h1>

          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Start for free and scale your code review workflow as your team
            grows.
          </p>
        </motion.div>
      </section>

      {/* PRICING CARDS */}
      <section className="max-w-6xl mx-auto px-10 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -8 }}
              className={`border rounded-2xl p-8 ${
                plan.popular ? "border-[#e5ff4a]" : "border-[#1f1f23]"
              }`}
            >
              {plan.popular && (
                <div className="inline-block px-3 py-1 rounded-full bg-[#e5ff4a] text-black text-xs font-semibold mb-4">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

              <div className="text-5xl font-bold mb-4">{plan.price}</div>

              <p className="text-[#888] mb-8">{plan.desc}</p>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check size={16} className="text-[#e5ff4a]" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  if (plan.name === "Free") {
                    window.location.href = "/dashboard";
                  }

                  if (plan.name === "Pro") {
                    setShowProModal(true);
                  }

                  if (plan.name === "Enterprise") {
                    setShowEnterpriseModal(true);
                  }
                }}
                className="w-full bg-[#e5ff4a] text-black py-3 rounded-lg font-semibold hover:bg-[#d4ee35] transition-all"
              >
                {plan.name === "Free"
                  ? "Get Started"
                  : plan.name === "Pro"
                    ? "Upgrade to Pro"
                    : "Contact Sales"}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="max-w-6xl mx-auto px-10 pb-24">
        <h2 className="text-3xl font-bold text-center mb-10">Compare Plans</h2>

        <div className="border border-[#1f1f23] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111113] border-b border-[#1f1f23]">
                <th className="px-6 py-4 text-left">Feature</th>
                <th className="px-6 py-4 text-center">Free</th>
                <th className="px-6 py-4 text-center">Pro</th>
                <th className="px-6 py-4 text-center">Enterprise</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["AI Reviews", "20/mo", "Unlimited", "Unlimited"],
                ["Security Analysis", "✓", "✓", "✓"],
                ["Code Smells", "-", "✓", "✓"],
                ["Risk Scoring", "-", "✓", "✓"],
                ["Team Analytics", "-", "-", "✓"],
                ["Custom Integrations", "-", "-", "✓"],
              ].map((row, i) => (
                <tr key={i} className="border-b border-[#1f1f23]">
                  <td className="px-6 py-4">{row[0]}</td>
                  <td className="px-6 py-4 text-center">{row[1]}</td>
                  <td className="px-6 py-4 text-center">{row[2]}</td>
                  <td className="px-6 py-4 text-center">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-10 pb-24">
        <h2 className="text-3xl font-bold text-center mb-10">
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
                <span>{faq.q}</span>

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
        <h2 className="text-4xl font-bold mb-4">Ready to review smarter?</h2>

        <p className="text-[#888] mb-8">
          Join developers using AI-powered code reviews.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-[#e5ff4a] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#d4ee35] transition-all inline-flex items-center gap-2"
        >
          Start Free
          <ArrowRight size={16} />
        </button>
      </section>
      {/* PRO MODAL */}
      {showProModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111113] border border-[#1f1f23] rounded-2xl p-8 w-full max-w-lg"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e5ff4a] text-black text-xs font-bold mb-4">
              COMING SOON
            </div>

            <h2 className="text-3xl font-bold mb-4">CodeSentinel Pro</h2>

            <p className="text-[#888] mb-6">
              We're currently building premium features for professional
              developers and teams.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Unlimited AI Reviews
              </div>

              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Advanced Security Analysis
              </div>

              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Team Collaboration Tools
              </div>

              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Priority Processing
              </div>

              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Risk Scoring Dashboard
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  window.open(
                    "mailto:agarwalanish270902@gmail.com?subject=CodeSentinel Pro Waitlist",
                  )
                }
                className="flex-1 bg-[#e5ff4a] text-black py-3 rounded-lg font-semibold hover:bg-[#d4ee35]"
              >
                Join Waitlist
              </button>

              <button
                onClick={() => setShowProModal(false)}
                className="px-6 border border-[#2a2a2e] rounded-lg hover:border-[#555]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* ENTERPRISE MODAL */}
      {showEnterpriseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111113] border border-[#1f1f23] rounded-2xl p-8 w-full max-w-lg"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e5ff4a] text-black text-xs font-bold mb-4">
              ENTERPRISE
            </div>

            <h2 className="text-3xl font-bold mb-4">Contact Sales</h2>

            <p className="text-[#888] mb-6">
              Need custom integrations, private deployment, or team-wide AI
              review workflows?
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Unlimited Reviews
              </div>

              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Team Analytics
              </div>

              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Custom Integrations
              </div>

              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Dedicated Support
              </div>

              <div className="flex gap-3">
                <Check className="text-[#e5ff4a]" size={18} />
                Private Deployment
              </div>
            </div>

            <div className="bg-[#09090b] border border-[#1f1f23] rounded-xl p-4 mb-6">
              <p className="text-sm text-[#888] mb-1">Contact Email</p>

              <p className="font-semibold">agarwalanish270902@gmail.com</p>
            </div>

            <button
              onClick={() => setShowEnterpriseModal(false)}
              className="w-full bg-[#e5ff4a] text-black py-3 rounded-lg font-semibold hover:bg-[#d4ee35]"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
