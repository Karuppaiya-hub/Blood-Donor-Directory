const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const groupStyle = {
  'A+':  { bar: 'bg-red-500',    bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-200' },
  'A-':  { bar: 'bg-red-700',    bg: 'bg-red-100',   text: 'text-red-800',    border: 'border-red-300' },
  'B+':  { bar: 'bg-blue-500',   bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-200' },
  'B-':  { bar: 'bg-blue-700',   bg: 'bg-blue-100',  text: 'text-blue-800',   border: 'border-blue-300' },
  'AB+': { bar: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  'AB-': { bar: 'bg-purple-700', bg: 'bg-purple-100',text: 'text-purple-800', border: 'border-purple-300' },
  'O+':  { bar: 'bg-green-500',  bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-200' },
  'O-':  { bar: 'bg-green-700',  bg: 'bg-green-100', text: 'text-green-800',  border: 'border-green-300' },
};

export default function Dashboard({ donors, setPage }) {
  const total = donors.length;
  const counts = BLOOD_GROUPS.reduce((acc, g) => {
    acc[g] = donors.filter(d => d.blood_group === g).length;
    return acc;
  }, {});

  const mostCommon = BLOOD_GROUPS.reduce((a, b) => counts[a] >= counts[b] ? a : b, 'A+');
  const uniqueColleges = new Set(donors.map(d => d.college).filter(Boolean)).size;
  const uniqueLocations = new Set(donors.map(d => d.location).filter(Boolean)).size;

  const stats = [
    { label: 'Total Donors',     value: total,          icon: '🩸', color: 'from-red-500 to-rose-600' },
    { label: 'Most Common',      value: mostCommon,     icon: '🏆', color: 'from-amber-500 to-orange-500' },
    { label: 'Colleges',         value: uniqueColleges, icon: '🎓', color: 'from-blue-500 to-blue-700' },
    { label: 'Locations',        value: uniqueLocations,icon: '🏙️', color: 'from-green-500 to-emerald-600' },
  ];

  const recentDonors = [...donors].slice(-5).reverse();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of your blood donor directory</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className={`h-1.5 w-full bg-gradient-to-r ${s.color}`} />
            <div className="p-5">
              <p className="text-3xl mb-2">{s.icon}</p>
              <p className="text-2xl font-extrabold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Group Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-700 mb-4">Blood Group Breakdown</h2>
          <div className="space-y-3">
            {BLOOD_GROUPS.map(g => {
              const pct = total ? Math.round((counts[g] / total) * 100) : 0;
              const s = groupStyle[g];
              return (
                <div key={g} className="flex items-center gap-3">
                  <span className={`w-10 text-xs font-bold text-center py-1 rounded-lg border ${s.bg} ${s.text} ${s.border}`}>{g}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className={`h-full rounded-full ${s.bar} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{counts[g]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Donors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-700">Recent Donors</h2>
            <button onClick={() => setPage('donors')} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">
              View All →
            </button>
          </div>
          {recentDonors.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No donors yet</p>
          ) : (
            <div className="space-y-3">
              {recentDonors.map(d => {
                const s = groupStyle[d.blood_group] || groupStyle['A+'];
                return (
                  <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
                    <span className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-extrabold border ${s.bg} ${s.text} ${s.border}`}>
                      {d.blood_group}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 truncate">{d.name}</p>
                      <p className="text-xs text-gray-400 truncate">{d.college || d.location || '—'}</p>
                    </div>
                    <p className="text-xs text-gray-400 shrink-0">📞 {d.contact}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
