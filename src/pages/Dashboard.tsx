import { Button } from "../component/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../component/Card";
import { CreateContentModal } from "../component/CreateContentModal";
import { useState } from "react";
import { Sidebar } from "../component/Sidebar";
import { useContent } from "../hooks/useContent";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { DeleteIcon } from "../icons/DeleteIcon";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; id?: string }>({ open: false });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const contents = useContent();
  const { platform } = useParams();

  const filteredContents = platform
    ? contents.filter((content: any) => content.type.toLowerCase() === platform)
    : contents;

  // === Delete Function ===
  async function handleDelete(contentId: string) {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("token") },
        data: { contentId },
      });
      setConfirmDelete({ open: false });
      setToastMessage("🗑️ Content deleted successfully!");
      setTimeout(() => setToastMessage(null), 3000);
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete content. Try again.");
    }
  }

  // === Share Function ===
  function handleShare(link: string) {
    navigator.clipboard.writeText(link);
    setToastMessage("🔗 Link copied to clipboard!");
    setTimeout(() => setToastMessage(null), 3000);
  }

  return (
    <div className="flex min-h-screen bg-[#05070a] text-slate-100 font-inter overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.08),transparent_30%)] pointer-events-none" />

      <Sidebar />

      <main className="flex-1 ml-72 px-10 py-14 relative z-10">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Sticky Buttons */}
        <div className="fixed top-6 right-10 z-30 flex gap-4 bg-[#05070a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(56,189,248,0.2)] px-5 py-3">
          <Button
            startIcon={<ShareIcon size="md" />}
            size="sm"
            variant="secondary"
            text="Share"
            className="bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10 rounded-xl backdrop-blur-md"
          />
          <Button
            onClick={() => setModalOpen(true)}
            startIcon={<PlusIcon size="md" />}
            size="sm"
            variant="primary"
            text="Add"
            className="bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-black font-semibold rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.25)]"
          />
        </div>

        {/* Header */}
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4 mt-10">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
            Second Brain
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">
          Welcome back, <span className="text-cyan-400 font-medium">Ayush</span>.  
          Let’s enhance your ideas with{" "}
          <span className="text-cyan-400">AI-powered memory and insight</span>.
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pb-20">
          {filteredContents.length > 0 ? (
            filteredContents.map(({ _id, type, link, title }: any, index: number) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-400 overflow-hidden flex flex-col justify-between"
              >
                {/* Hover Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleShare(link)}
                    className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 transition"
                    title="Copy link"
                  >
                    <ShareIcon size="sm" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete({ open: true, id: _id })}
                    className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 transition"
                    title="Delete"
                  >
                    <DeleteIcon size="sm" />
                  </button>
                </div>

                {/* Card */}
                <div className="h-[280px] overflow-hidden rounded-2xl">
                  <Card title={title} link={link} type={type} />
                </div>

                <div className="pt-5 flex justify-between items-center text-xs text-slate-400">
                  <span>{type}</span>
                  <span className="bg-gradient-to-r from-cyan-400/20 to-indigo-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30 backdrop-blur-sm">
                    AI Enhanced
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-lg col-span-full text-center py-16">
              No content found for{" "}
              <span className="text-cyan-400">{platform || "all sources"}</span>.
            </p>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {confirmDelete.open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0b0f17] border border-white/10 p-8 rounded-2xl shadow-xl max-w-sm w-full text-center"
              >
                <h2 className="text-2xl font-semibold mb-2 text-cyan-400">Delete Content?</h2>
                <p className="text-slate-400 mb-6">
                  Are you sure you want to delete this item? This action cannot be undone.
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setConfirmDelete({ open: false })}
                    className="px-5 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/40 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(confirmDelete.id!)}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/10 text-slate-100 px-6 py-3 rounded-xl shadow-lg z-40"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Dashboard;
