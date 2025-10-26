// Sidebar.tsx
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BrainIcon } from "../icons/BrainIcon";
import { SideBarItem } from "./SidebarItem";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { text: "Twitter", icon: <TwitterIcon />, path: "/dashboard/twitter" },
    { text: "Youtube", icon: <YoutubeIcon />, path: "/dashboard/youtube" },
    { text: "Linkedin", icon: <LinkedinIcon />, path: "/dashboard/linkedin" },
  ];

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 top-0 h-screen w-72 z-50 p-6 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0b1321]/60 to-[#0f172a]/70 border-r border-white/10 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.15)]"
    >
      {/* Logo / Header */}
      <Link
        to="/dashboard"
        className="flex items-center text-2xl font-semibold tracking-tight mb-10 text-slate-200 hover:text-cyan-400 transition-colors"
      >
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="pr-2 text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
        >
          <BrainIcon size="lg" />
        </motion.div>
        Second Brain
      </Link>

      {/* Navigation Items */}
      <div className="flex flex-col space-y-2">
        {items.map(({ text, icon, path }) => (
          <SideBarItem
            key={text}
            text={text}
            icon={icon}
            onClick={() => navigate(path)}
            isActive={location.pathname === path}
          />
        ))}
      </div>

      {/* Footer / Tagline */}
      <div className="absolute bottom-8 left-0 right-0 px-6 text-xs text-slate-500">
        <p className="border-t border-white/10 pt-4 text-center">
          🧠 Powered by <span className="text-cyan-400">AI</span>
        </p>
      </div>
    </motion.div>
  );
}
