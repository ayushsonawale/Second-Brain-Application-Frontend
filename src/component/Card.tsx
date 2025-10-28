import { NotebookIcon } from "../icons/NotebookIcon";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Linkedin";
}

export function Card({ title, link, type }: CardProps) {

  function normalizeYouTubeLink(url: string): string | null {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

  const embedUrl = type === "Youtube" ? normalizeYouTubeLink(link) : null;

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: "0 0 25px rgba(56,189,248,0.25)",
      }}
      transition={{ type: "spring", stiffness: 150 }}
      className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      {/* === Header === */}
      <div className="flex items-center gap-3 mb-3">
        <div className="text-cyan-400 shrink-0 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
          <NotebookIcon size="lg" />
        </div>
        <span
          className="font-semibold text-slate-200 truncate text-sm sm:text-base max-w-[200px] cursor-help hover:text-cyan-300 transition"
          title={title}
        >
          {title}
        </span>
      </div>

      {/* === Body === */}
      <div className="flex-1 rounded-xl overflow-hidden border border-white/10">
        {type === "Youtube" && embedUrl ? (
          <iframe
            className="w-full h-60 rounded-lg"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : type === "Youtube" ? (
          <div className="flex items-center justify-center h-60 text-slate-500 text-sm">
            ⚠️ Invalid YouTube link or embedding disabled
          </div>
        ) : null}

        {type === "Twitter" && (
          <div className="w-full h-60 overflow-auto bg-[#0a0d12] text-slate-300 rounded-xl p-3">
            <blockquote className="twitter-tweet w-full">
              <a href={link}></a>
            </blockquote>
          </div>
        )}

        {type === "Linkedin" && (
          <iframe
            src={link}
            className="w-full h-60 rounded-lg"
            frameBorder="0"
            allowFullScreen
            title="LinkedIn post"
          ></iframe>
        )}
      </div>

      {/* === Footer === */}
      <div className="pt-4 flex justify-between items-center text-xs text-slate-400">
        <span className="uppercase tracking-wider text-slate-500">{type}</span>
        <span className="bg-gradient-to-r from-cyan-400/20 to-indigo-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30 backdrop-blur-sm">
          AI Enhanced
        </span>
      </div>
    </motion.div>
  );
}
