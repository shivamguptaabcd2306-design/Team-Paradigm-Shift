export default function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${
        active ? "border-cyan-400 text-[#E7ECF5]" : "border-transparent text-[#7C8AA3] hover:text-[#B7C0D1]"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
