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
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`cursor-pointer flex items-center px-3 py-1.5 my-1 text-sm capitalize rounded-sm focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-blue-500 ${danger ? "hover:bg-red-100": "hover:bg-gray-100"}`}
      onClick={onClick}
    >
      <span aria-hidden="true">{icon}</span> <span className={`mx-1.5 font-medium ${danger ? "text-fillout-danger": "text-fillout-dark"}`}>{text}</span>
    </div>
  );
}