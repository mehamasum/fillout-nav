export default function ContextMenuItem({
  icon,
  text,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`cursor-pointer flex items-center px-2 py-1.5 mb-0.5 text-sm capitalize rounded-sm focus:outline-none focus:ring-0 ${danger ? "hover:bg-red-100 focus:bg-red-100": "hover:bg-gray-100 focus:bg-gray-100"}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <span aria-hidden="true">{icon}</span> <span className={`mx-1.5 font-medium ${danger ? "text-fillout-red-500": "text-fillout-zinc-900"}`}>{text}</span>
    </div>
  );
}