import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color: "rose" | "green";
  onClick?: () => void;
}

function Button({ children, color, onClick }: ButtonProps) {
  const colorVariants = {
    green: "bg-green-600 hover:bg-green-500 focus:ring-green-400 active:bg-green-700",
    rose: "bg-rose-600 hover:bg-rose-500 focus:ring-rose-400 active:bg-rose-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${colorVariants[color]} mt-4 block px-5 py-3 rounded-lg focus:outline-none
      focus:ring focus:ring-offset-2 focus:ring-opacity-50
      text-white shadow-lg uppercase tracking-wider
      font-semibold text-sm sm:text-base`}
    >
      {children}
    </button>
  );
}

export default Button;
