import { useState, useEffect } from 'react';
import DonorForm from '../components/DonorForm';
import DonorCard from '../components/DonorCard';
import { getDonors, createDonor, updateDonor, deleteDonor } from '../api';

const BLOOD_GROUPS = ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const groupBg = {
  'A+': 'bg-red-50 border-red-200 text-red-700',
  'A-': 'bg-red-100 border-red-300 text-red-800',
  'B+': 'bg-blue-50 border-blue-200 text-blue-700',
  'B-': 'bg-blue-100 border-blue-300 text-blue-800',
  'AB+': 'bg-purple-50 border-purple-200 text-purple-700',
  'AB-': 'bg-purple-100 border-purple-300 text-purple-800',
  'O+': 'bg-green-50 border-green-200 text-green-700',
  'O-': 'bg-green-100 border-green-300 text-green-800',
};

export default function Home() {
  const [donors, setDonors] = useState([]);
  const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState(null);
  const [visible, setVisible] = useState(false);

  const load = (bg = filter) => getDonors(bg).then((data) => {
    setDonors(data);
    setVisible(false);
    setTimeout(() => setVisible(true), 50);
  });

  useEffect(() => { load(); setVisible(true); }, []);

  const handleFilter = (bg) => { setFilter(bg); load(bg); };
  const handleAdd = async (data) => { await createDonor(data); load(); };
  const handleUpdate = async (data) => { await updateDonor(editing.id, data); setEditing(null); load(); };
  const handleDelete = async (id) => { await deleteDonor(id); load(); };

  const counts = BLOOD_GROUPS.slice(1).reduce((acc, g) => {
    acc[g] = donors.filter(d => d.blood_group === g).length;
    return acc;
  }, {});

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Hero Stats Banner */}
      <div className="bg-gradient-to-br from-red-50 to-rose-100 border border-red-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest">Total Registered</p>
          <p className="text-5xl font-extrabold text-red-600 leading-none">{donors.length}</p>
          <p className="text-gray-500 text-sm mt-1">donors in the directory</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {BLOOD_GROUPS.slice(1).map(g => (
            <div key={g} className={`flex flex-col items-center px-3 py-2 rounded-xl border text-xs font-bold ${groupBg[g]}`}>
              <span className="text-lg">{counts[g] || 0}</span>
              <span>{g}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Form */}
      <DonorForm
        onSubmit={editing ? handleUpdate : handleAdd}
        initial={editing}
        onCancel={() => setEditing(null)}
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="text-lg font-bold text-gray-700">
          {filter ? `Showing: ${filter} Donors` : 'All Donors'}
          <span className="ml-2 text-sm font-normal text-gray-400">({donors.length} found)</span>
        </h2>
        <div className="sm:ml-auto flex flex-wrap gap-2">
          <button onClick={() => handleFilter('')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 active:scale-95
              ${filter === '' ? 'bg-red-600 text-white border-red-600 shadow' : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'}`}>
            All
          </button>
          {BLOOD_GROUPS.slice(1).map(g => (
            <button key={g} onClick={() => handleFilter(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 active:scale-95
                ${filter === g ? 'bg-red-600 text-white border-red-600 shadow' : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'}`}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Donor Grid */}
      {donors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-3">
          <span className="text-6xl">🩸</span>
          <p className="text-lg font-medium">No donors found</p>
          <p className="text-sm">Add a donor using the form above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {donors.map((d, i) => (
            <div key={d.id}
              className="transition-all duration-500"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${i * 60}ms` }}>
              <DonorCard donor={d} onEdit={setEditing} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
