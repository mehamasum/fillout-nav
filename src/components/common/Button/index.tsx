import type { ReactNode } from 'react';

interface ButtonProps {
  icon: ReactNode;
  text: string | ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

function Button({
  icon,
  text,
  onClick,
  ariaLabel = 'Button',
  disabled = false
}: ButtonProps) {
  return (
    <button
      className="cursor-pointer inline-flex items-center px-3 py-2 text-black leading-4 font-medium capitalize bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-fillout-blue-600 shadow-sm transition-all duration-200"
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      disabled={disabled}
      type="button"
    >
      <span className="inline-flex gap-2 items-center">{icon} {text}</span>
    </button>
  );
}

export default Button;