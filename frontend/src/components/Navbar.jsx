export default function Navbar() {
  return (
    <nav className="relative bg-gradient-to-r from-red-700 via-red-500 to-rose-600 text-white px-6 py-5 shadow-lg overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-ping"
            style={{ width: 8 + i * 10, height: 8 + i * 10, top: `${10 + i * 12}%`, left: `${5 + i * 15}%`, animationDelay: `${i * 0.4}s`, animationDuration: '3s' }} />
        ))}
      </div>
      <div className="relative max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl animate-bounce">🩸</span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-wide leading-tight">Blood Donor Directory</h1>
            <p className="text-red-100 text-xs tracking-widest uppercase">Save Lives · Give Blood</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
          Live Directory
        </div>
      </div>
    </nav>
  );
}
