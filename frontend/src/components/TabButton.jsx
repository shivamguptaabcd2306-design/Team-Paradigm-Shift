export default function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
        active
          ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          : "border border-transparent text-[#7C8AA3] hover:text-[#E7ECF5] hover:bg-white/5"
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? "text-cyan-400" : "text-[#7C8AA3]"}`} />
      {label}
    </button>
  );
}
