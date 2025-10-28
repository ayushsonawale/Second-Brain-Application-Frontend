import { useNavigate } from "react-router-dom";
import { Cpu, Activity, Sparkles, BookOpen, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


export const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const orb = (key: string, size: number, left: string, top: string, colorFrom: string, colorTo: string, delay = 0) => (
    <motion.div
      key={key}
      initial={{ scale: 0.6, opacity: 0.25 }}
      animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 20, 0], opacity: [0.25, 0.6, 0.25] }}
      transition={{ repeat: Infinity, duration: 10 + Math.random() * 10, delay, ease: "easeInOut" }}
      className="pointer-events-none absolute rounded-full filter blur-3xl mix-blend-screen"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: `radial-gradient(circle at 30% 30%, ${colorFrom}, ${colorTo})`,
      }}
    />
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0f14] text-slate-100">

      <div className="absolute inset-0 -z-10">
        {orb("o1", 680, "-10%", "-20%", "rgba(58, 123, 213, 0.12)", "rgba(124, 58, 237, 0.08)", 0)}
        {orb("o2", 520, "60%", "-10%", "rgba(0, 212, 255, 0.08)", "rgba(88, 28, 135, 0.06)", 2)}
        {orb("o3", 420, "20%", "55%", "rgba(255, 68, 204, 0.06)", "rgba(58, 123, 213, 0.04)", 4)}
        {orb("o4", 300, "75%", "65%", "rgba(120, 255, 195, 0.05)", "rgba(0, 212, 255, 0.03)", 6)}
      </div>


      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-black/60 shadow-lg" : "bg-black/30"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-gradient-to-br from-indigo-400 to-cyan-300 p-2 rounded-md shadow-md">
              <Cpu className="text-black" size={20} />
            </div>
            <div>
              <div className="text-white font-extrabold tracking-tight text-lg">Second Brain</div>
              <div className="text-slate-300 text-xs -mt-0.5">AI Knowledge Workspace</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="text-slate-200 hover:text-white text-sm font-medium transition"
            >
              Sign in
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-black px-4 py-2 rounded-lg font-semibold shadow-lg transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>


      <header className="relative pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 px-3 py-1 rounded-full">
                <Sparkles className="text-cyan-300" size={16} />
                <span className="text-sm text-cyan-200">New — AI-first knowledge workflows</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
                Your personal AI memory — <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300">fast, searchable, and private</span>.
              </h1>

              <p className="text-slate-300 max-w-2xl text-base md:text-lg">
                Capture notes, summarize long reads, and retrieve ideas instantly with semantic search — all protected with your account.
                Built for creators, engineers, and curious minds.
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 rounded-xl font-semibold text-black shadow-2xl hover:scale-105 transition"
                >
                  Get started — it's free
                </button>

                <button
                  onClick={() => navigate("/signin")}
                  className="inline-flex items-center gap-2 border border-slate-700 text-slate-200 px-5 py-3 rounded-xl hover:border-slate-500 transition"
                >
                  Sign in
                </button>
              </div>

              <div className="flex gap-6 items-center mt-6 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <Activity className="text-cyan-300" size={16} /> <span>Realtime indexing</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-cyan-300" size={16} /> <span>Smart organization</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-cyan-300" size={16} /> <span>Secure & private</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Mockup Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center md:justify-end"
            >
              <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-white/6 to-white/3 border border-white/6 rounded-2xl p-5 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-slate-400">Workspace</div>
                      <div className="text-sm font-semibold text-white">Research AI Ethics</div>
                    </div>
                    <div className="text-xs text-slate-400">Synced • 4 notes</div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-indigo-700/30 to-cyan-600/30 rounded-md p-3">
                      <div className="text-xs text-slate-300">Summarized</div>
                      <div className="text-sm text-white font-medium">Key takeaways on Differential Privacy</div>
                    </div>

                    <div className="bg-black/20 rounded-md p-3">
                      <div className="text-xs text-slate-400">Snippet</div>
                      <div className="text-sm text-slate-200">“Differential privacy adds noise to outputs to protect individuals...”</div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="px-2 py-1 bg-white/6 rounded">#ai</div>
                      <div className="px-2 py-1 bg-white/6 rounded">#privacy</div>
                      <div className="px-2 py-1 bg-white/6 rounded">#research</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <div>Updated 2d ago</div>
                    <div className="flex items-center gap-3">
                      <button className="text-slate-300 text-sm px-3 py-1 rounded bg-white/3 hover:bg-white/4 transition">Open</button>
                      <button className="text-slate-300 text-sm px-3 py-1 rounded bg-white/3 hover:bg-white/4 transition">Share</button>
                    </div>
                  </div>
                </div>

                {/* small stats */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="bg-white/4 p-3 rounded-lg text-center">
                    <div className="text-white font-semibold">1.2k</div>
                    <div className="text-slate-400 text-xs">Notes</div>
                  </div>
                  <div className="bg-white/4 p-3 rounded-lg text-center">
                    <div className="text-white font-semibold">87</div>
                    <div className="text-slate-400 text-xs">Tags</div>
                  </div>
                  <div className="bg-white/4 p-3 rounded-lg text-center">
                    <div className="text-white font-semibold">98ms</div>
                    <div className="text-slate-400 text-xs">Search</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ===== Features / Capabilities ===== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Sparkles className="text-cyan-300" size={22} />,
              title: "AI Summaries",
              desc: "Instantly compress long text or videos into short, actionable insights.",
            },
            {
              icon: <BookOpen className="text-cyan-300" size={22} />,
              title: "Smart Graph",
              desc: "Automatically links related notes so you discover connections effortlessly.",
            },
            {
              icon: <Activity className="text-cyan-300" size={22} />,
              title: "Realtime Indexing",
              desc: "New content is indexed instantly for lightning-fast semantic search.",
            },
          ].map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * idx, duration: 0.6 }}
              className="bg-gradient-to-br from-white/3 to-black/10 border border-white/6 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">{f.icon}<div className="text-white font-semibold">{f.title}</div></div>
              <div className="text-slate-300 text-sm">{f.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Large */}
        <div className="mt-10 bg-gradient-to-r from-indigo-900/30 to-cyan-900/20 border border-white/6 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white text-lg font-bold">Start building your Second Brain</div>
            <div className="text-slate-300 text-sm mt-1">AI-first workflows, private storage, and fast retrieval — ready to use.</div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-3 rounded-lg font-semibold text-black shadow-lg">Create account</button>
            <button onClick={() => navigate("/signin")} className="px-4 py-3 rounded-lg border border-white/6 text-slate-200">Sign in</button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-white/6 mt-16 pt-10 pb-8 text-center text-slate-400">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">© {new Date().getFullYear()} Second Brain — Built with AI.</div>
            <div className="flex items-center gap-4 text-sm">
              <a className="hover:text-white transition">Privacy</a>
              <a className="hover:text-white transition">Terms</a>
              <a className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
