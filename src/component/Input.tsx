import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  type: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-400 
          focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/40 
          shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-300"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-500/10 opacity-0 hover:opacity-100 blur-md transition-all duration-500 pointer-events-none"></div>
      </div>
    );
  }
);

Input.displayName = "Input";
