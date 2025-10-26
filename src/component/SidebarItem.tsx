// SidebarItem.tsx
export function SideBarItem({ text, icon, onClick, isActive }: any) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-cyan-500/20 to-indigo-600/10 border border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
          : "hover:bg-white/5 text-slate-300 border border-transparent hover:border-white/10"
      }`}
    >
      <div
        className={`text-cyan-300 transition-transform duration-300 group-hover:scale-110 ${
          isActive ? "drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]" : ""
        }`}
      >
        {icon}
      </div>
      <span className="font-medium tracking-wide">{text}</span>
    </div>
  );
}
