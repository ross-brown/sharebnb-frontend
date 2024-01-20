import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color: "rose" | "green";
  onClick?: () => void;
}

function Button({ children, color, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`mt-4 block px-5 py-3 rounded-lg
      bg-${color}-600 hover:bg-${color}-500 focus:outline-none
      focus:ring focus:ring-offset-2 focus:ring-${color}-400
      focus:ring-opacity-50 active:bg-${color}-700
      text-white shadow-lg uppercase tracking-wider
      font-semibold text-sm sm:text-base`}
    >
      {children}
    </button>
  );
}

export default Button;
