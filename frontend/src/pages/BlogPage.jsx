import { useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const categories = ["All", "AI", "Security", "GitHub", "Engineering"];

  const posts = [
    {
      title: "How AI Is Revolutionizing Pull Request Reviews",
      category: "AI",
      date: "Jan 15, 2026",
      readTime: "5 min",
      desc: "Explore how AI-powered review systems help developers catch bugs, improve code quality and reduce review time.",
    },
    {
      title: "Top 10 GitHub PR Review Best Practices",
      category: "GitHub",
      date: "Jan 12, 2026",
      readTime: "4 min",
      desc: "A practical guide for engineering teams looking to improve collaboration and review quality.",
    },
    {
      title: "Common Security Vulnerabilities Found In Pull Requests",
      category: "Security",
      date: "Jan 8, 2026",
      readTime: "6 min",
      desc: "Discover the most frequent security flaws AI can identify before they reach production.",
    },
    {
      title: "Building CodeSentinel: Behind The Scenes",
      category: "Engineering",
      date: "Jan 5, 2026",
      readTime: "7 min",
      desc: "A deep dive into how CodeSentinel was built using React, Express, MongoDB and Groq AI.",
    },
    {
      title: "Groq vs Traditional Static Analysis",
      category: "AI",
      date: "Dec 28, 2025",
      readTime: "5 min",
      desc: "Comparing rule-based analysis with modern AI reasoning systems.",
    },
    {
      title: "Scaling Engineering Teams With Automation",
      category: "Engineering",
      date: "Dec 20, 2025",
      readTime: "8 min",
      desc: "Why engineering leaders are investing heavily in automation and AI tooling.",
    },
  ];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setSuccess(false);
      setMessage("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/subscribers`, {
        email,
      });

      setSuccess(true);

      setMessage(res.data.message);

      setEmail("");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setSuccess(false);

      setMessage(err.response?.data?.message || "Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

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

      <section className="max-w-6xl mx-auto px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#111113] border border-[#1f1f23] rounded-full px-4 py-2 text-sm text-[#888] mb-6">
            <Tag size={14} />
            Engineering Blog
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Insights on AI, Security & Engineering
          </h1>

          <p className="text-[#888] text-lg max-w-2xl">
            Explore best practices, security insights and modern engineering
            workflows powered by AI.
          </p>
        </motion.div>
      </section>

      {/* FEATURED */}

      <section className="max-w-6xl mx-auto px-10 pb-20">
        <motion.div
          whileHover={{ y: -4 }}
          className="border border-[#1f1f23] rounded-3xl overflow-hidden bg-[#111113]"
        >
          <div className="p-10">
            <span className="text-[#e5ff4a] text-sm font-medium">
              FEATURED ARTICLE
            </span>

            <h2 className="text-4xl font-bold mt-4 mb-4">
              How AI Is Transforming Software Development
            </h2>

            <p className="text-[#888] mb-6 max-w-3xl">
              AI is rapidly changing how engineering teams write, review, secure
              and deploy software.
            </p>

            <button
              onClick={() => alert(" Blog articles are coming soon!")}
              className="inline-flex items-center gap-2 text-[#e5ff4a] font-semibold"
            >
              Read Article
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>
      {/* CATEGORY FILTERS */}
      <section className="max-w-6xl mx-auto px-10 pb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeCategory === category
                  ? "bg-[#e5ff4a] text-black border-[#e5ff4a]"
                  : "border-[#1f1f23] text-[#888] hover:border-[#444]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-6xl mx-auto px-10 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.title}
              whileHover={{ y: -6 }}
              className="border border-[#1f1f23] rounded-2xl bg-[#111113] p-6"
            >
              <div className="flex items-center gap-3 text-xs text-[#666] mb-4">
                <span className="text-[#e5ff4a]">{post.category}</span>

                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  {post.date}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">{post.title}</h3>

              <p className="text-[#888] text-sm mb-6">{post.desc}</p>

              <button
                onClick={() =>
                  alert("Full articles are coming in a future update.")
                }
                className="text-[#e5ff4a] font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Read More
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-4xl mx-auto px-10 pb-24">
        <div className="border border-[#1f1f23] rounded-3xl bg-[#111113] p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>

          <p className="text-[#888] mb-8">
            Get the latest articles on AI, security and software engineering.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#09090b] border border-[#1f1f23] px-5 py-3 rounded-xl outline-none w-full md:w-96 focus:border-[#e5ff4a]"
            />

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-[#e5ff4a] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#d4ee35] transition-all disabled:opacity-60 flex items-center justify-center gap-2 min-w-[150px]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>

          {message && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className={`mt-6 flex items-center justify-center gap-2 text-sm ${
                success ? "text-green-400" : "text-red-400"
              }`}
            >
              {success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}

              {message}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-10 pb-24 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to improve your code reviews?
        </h2>

        <p className="text-[#888] mb-8">
          Connect GitHub and experience AI-powered pull request reviews.
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

export default BlogPage;
