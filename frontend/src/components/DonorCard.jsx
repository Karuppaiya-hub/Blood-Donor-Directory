import { useState } from 'react';

const groupStyle = {
  'A+':  'from-red-500 to-rose-600',
  'A-':  'from-red-600 to-red-800',
  'B+':  'from-blue-500 to-blue-700',
  'B-':  'from-blue-700 to-blue-900',
  'AB+': 'from-purple-500 to-purple-700',
  'AB-': 'from-purple-700 to-purple-900',
  'O+':  'from-green-500 to-emerald-600',
  'O-':  'from-green-700 to-green-900',
};

export default function DonorCard({ donor, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Top color bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${groupStyle[donor.blood_group] || 'from-gray-400 to-gray-600'}`} />

      <div className="p-5 flex flex-col gap-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-red-600 transition-colors duration-200">
            {donor.name}
          </h3>
          <span className={`bg-gradient-to-br ${groupStyle[donor.blood_group] || 'from-gray-400 to-gray-600'} text-white text-sm font-extrabold px-3 py-1 rounded-full shadow-sm`}>
            {donor.blood_group}
          </span>
        </div>

        {/* Info rows */}
        <div className="space-y-1.5 text-sm text-gray-600">
          <p className="flex items-center gap-2"><span className="text-base">📞</span>{donor.contact}</p>
          {donor.college  && <p className="flex items-center gap-2"><span className="text-base">🎓</span>{donor.college}</p>}
          {donor.location && <p className="flex items-center gap-2"><span className="text-base">🏙️</span>{donor.location}</p>}

        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button onClick={() => onEdit(donor)}
            className="flex-1 text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-xl hover:bg-amber-100 active:scale-95 transition-all duration-150">
            ✏️ Edit
          </button>
          {confirmDelete ? (
            <div className="flex gap-1 flex-1">
              <button onClick={() => onDelete(donor.id)}
                className="flex-1 text-sm font-medium bg-red-600 text-white px-3 py-1.5 rounded-xl hover:bg-red-700 active:scale-95 transition-all duration-150">
                Confirm
              </button>
              <button onClick={() => setConfirmDelete(false)}
                className="flex-1 text-sm font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl hover:bg-gray-200 active:scale-95 transition-all duration-150">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)}
              className="flex-1 text-sm font-medium bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-xl hover:bg-red-100 active:scale-95 transition-all duration-150">
              🗑️ Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
