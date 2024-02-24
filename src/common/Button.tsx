import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color: "rose" | "green" | "neutral";
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit";
}

function Button({ children, color, onClick, disabled, type }: ButtonProps) {
  const colorVariants = {
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-400 active:bg-green-700 text-white",
    rose: "bg-rose-600 hover:bg-rose-700 focus:ring-rose-400 active:bg-rose-700 text-white",
    neutral: "bg-neutral-300 hover:bg-neutral-400 focus:ring-neutral-400 active:bg-neutral-400 text-neutral-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${colorVariants[color]} mt-4 block px-5 py-3 rounded-lg
      focus:outline-none focus:ring focus:ring-offset-2 focus:ring-opacity-50 disabled:opacity-50
      shadow-lg uppercase tracking-wider font-semibold text-sm sm:text-base cursor-pointer`}
    >
      {children}
    </button>
  );
}

export default Button;
