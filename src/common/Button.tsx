import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color: "rose" | "green" | "neutral";
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ children, color, onClick, disabled }: ButtonProps) {
  const colorVariants = {
    green: "bg-green-600 hover:bg-green-500 focus:ring-green-400 active:bg-green-700 text-white",
    rose: "bg-rose-600 hover:bg-rose-500 focus:ring-rose-400 active:bg-rose-700 text-white",
    neutral: "bg-neutral-300 hover:bg-neutral-200 focus:ring-neutral-400 active:bg-neutral-400 text-neutral-800",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${colorVariants[color]} mt-4 block px-5 py-3 rounded-lg
      focus:outline-none focus:ring focus:ring-offset-2 focus:ring-opacity-50
      shadow-lg uppercase tracking-wider font-semibold text-sm sm:text-base`}
    >
      {children}
    </button>
  );
}

export default Button;
