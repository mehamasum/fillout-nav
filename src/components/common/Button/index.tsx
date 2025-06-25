export default function Button({
  icon,
  text,
  onClick
}: {
  icon: React.ReactNode,
  text: string | React.ReactNode,
  onClick: () => void
}){
  return (
    <button 
      className="cursor-pointer inline-flex items-center px-3 py-2 text-black leading-4 font-medium capitalize bg-white rounded-md hover:bg-gray-50 border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
      onClick={onClick}
>
      <span className="inline-flex gap-2 items-center">{icon} {text}</span>
    </button>
  );
};