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
      className="flex items-center px-3 py-1.5 text-sm capitalize hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {icon} <span className={`mx-1.5 font-medium ${danger ? "text-fillout-danger": "text-fillout-dark"}`}>{text}</span>
    </div>
  );
}