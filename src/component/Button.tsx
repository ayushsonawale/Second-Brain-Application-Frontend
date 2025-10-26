export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
}

const variantStyle = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-semibold hover:from-cyan-300 hover:to-indigo-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]",
  secondary:
    "bg-white/10 text-slate-300 border border-white/10 hover:border-cyan-400/30 hover:text-cyan-300",
};

const sizeStyle = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantStyle[props.variant]} ${sizeStyle[props.size]} ${
        props.fullWidth ? "w-full" : ""
      } flex items-center justify-center gap-2 transition-all duration-300 ${props.className || ""}`}
    >
      {props.startIcon && <span>{props.startIcon}</span>}
      <span>{props.text}</span>
      {props.endIcon && <span>{props.endIcon}</span>}
    </button>
  );
};
