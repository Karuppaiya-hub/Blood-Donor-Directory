export default function Sidebar({ page, setPage }) {
  const links = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'donors',    icon: '🩸', label: 'Donors'    },
    { id: 'add',       icon: '➕', label: 'Add Donor'  },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-20 sm:w-56 bg-gradient-to-b from-red-700 to-red-900 flex flex-col shadow-2xl z-40">
      {/* Logo */}
      <div className="px-4 py-6 border-b border-red-600/50">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-bounce">🩸</span>
          <div className="hidden sm:block">
            <p className="text-white font-extrabold text-sm leading-tight">A Drop of Hope</p>
            <p className="text-red-300 text-xs">Blood Directory</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 space-y-1 px-2">
        {links.map(l => (
          <button key={l.id} onClick={() => setPage(l.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
              ${page === l.id
                ? 'bg-white text-red-700 shadow-md'
                : 'text-red-100 hover:bg-red-600/50'}`}>
            <span className="text-xl">{l.icon}</span>
            <span className="hidden sm:block">{l.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-red-600/50 hidden sm:block">
        <p className="text-red-300 text-xs text-center">Save Lives · Give Blood</p>
      </div>
    </aside>
  );
}
