import { useState } from 'react';
import DonorCard from '../components/DonorCard';
import DonorForm from '../components/DonorForm';
import { createDonor, updateDonor, deleteDonor } from '../api';

const BLOOD_GROUPS = ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Donors({ donors, onRefresh, showForm, setShowForm }) {
  const [filter, setFilter]   = useState('');
  const [editing, setEditing] = useState(null);
  const [visible, setVisible] = useState(true);

  const reload = () => { setVisible(false); onRefresh(); setTimeout(() => setVisible(true), 80); };

  const handleAdd    = async (data) => { await createDonor(data); setShowForm(false); reload(); };
  const handleUpdate = async (data) => { await updateDonor(editing.id, data); setEditing(null); reload(); };
  const handleDelete = async (id)   => { await deleteDonor(id); reload(); };

  const filtered = filter ? donors.filter(d => d.blood_group === filter) : donors;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Donors</h1>
          <p className="text-gray-400 text-sm mt-0.5">{filtered.length} donor{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm active:scale-95 transition-all duration-150">
          ➕ Add Donor
        </button>
      </div>

      {/* Add / Edit Form */}
      {(showForm || editing) && (
        <DonorForm
          onSubmit={editing ? handleUpdate : handleAdd}
          initial={editing}
          onCancel={() => { setEditing(null); setShowForm(false); }}
        />
      )}

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {BLOOD_GROUPS.map(g => (
          <button key={g} onClick={() => setFilter(g)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 active:scale-95
              ${filter === g ? 'bg-red-600 text-white border-red-600 shadow' : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'}`}>
            {g || 'All'}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-300 space-y-3">
          <span className="text-6xl">🩸</span>
          <p className="text-lg font-semibold text-gray-400">No donors found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((d, i) => (
            <div key={d.id} className="transition-all duration-500"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: `${i * 50}ms` }}>
              <DonorCard donor={d} onEdit={(d) => { setEditing(d); setShowForm(false); }} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
