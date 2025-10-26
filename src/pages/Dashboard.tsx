import { Button } from "../component/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../component/Card";
import { CreateContentModal } from "../component/CreateContentModal";
import { useState } from "react";
import { Sidebar } from "../component/Sidebar";
import { useContent } from "../hooks/useContent";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();
  const { platform } = useParams();

  const filteredContents = platform
    ? contents.filter((content:any) => content.type.toLowerCase() === platform)
    : contents;

  return (
    <div className="relative flex min-h-screen bg-[#05070a] text-slate-100 overflow-hidden font-inter">
      {/* === Cinematic Background Glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.08),transparent_30%)] pointer-events-none" />
      <motion.div
        className="absolute top-[-15%] left-[10%] w-[900px] h-[900px] bg-gradient-to-br from-cyan-500/15 via-indigo-500/15 to-purple-600/15 rounded-full blur-3xl opacity-50 -z-10"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      />

      {/* === Sidebar === */}
      <Sidebar />

      {/* === Main Section === */}
      <div className="flex-1 ml-72 px-10 py-14 relative z-10 overflow-x-hidden">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        {/* === Header === */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
              Second Brain
            </span>
          </motion.h1>

          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                startIcon={<ShareIcon size="md" />}
                size="sm"
                variant="secondary"
                text="Share"
                className="bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10 rounded-xl backdrop-blur-md"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={() => setModalOpen(true)}
                startIcon={<PlusIcon size="md" />}
                size="sm"
                variant="primary"
                text="Add"
                className="bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              />
            </motion.div>
          </div>
        </div>

        {/* === AI Tagline === */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-slate-400 text-lg mb-12 max-w-2xl"
        >
          Welcome back, <span className="text-cyan-400 font-medium">Ayush</span>.  
          Let’s enhance your ideas with{" "}
          <span className="text-cyan-400">AI-powered memory and insight</span>.
        </motion.p>

        {/* === Content Grid (3-card layout, cinematic depth) === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pb-20"
        >
          {filteredContents.length > 0 ? (
            filteredContents.map(({ type, link, title }, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.04,
                  y: -6,
                  boxShadow: "0 0 35px rgba(56,189,248,0.25)",
                }}
                transition={{ type: "spring", stiffness: 140 }}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-400 overflow-hidden flex flex-col justify-between"
              >
                {/* Card Inner */}
                <motion.div
                  className="h-[280px] overflow-hidden rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card title={title} link={link} type={type} />
                </motion.div>

                {/* Card Footer */}
                <div className="pt-5 flex flex-wrap justify-between items-center gap-2 text-xs text-slate-400">
                  <span className="truncate max-w-[60%]">{type}</span>
                  <span className="bg-gradient-to-r from-cyan-400/20 to-indigo-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30 backdrop-blur-sm">
                    AI Enhanced
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-lg col-span-full text-center py-16">
              No content found for{" "}
              <span className="text-cyan-400">{platform || "all sources"}</span>.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
