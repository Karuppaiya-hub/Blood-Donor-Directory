import { useState, useEffect } from 'react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const empty = { name: '', blood_group: 'A+', contact: '', college: '', location: '' };

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 placeholder-gray-400";

export default function DonorForm({ onSubmit, initial, onCancel }) {
  const [form, setForm] = useState(empty);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setForm(initial || empty); }, [initial]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(empty);
    if (!initial) { setSubmitted(true); setTimeout(() => setSubmitted(false), 2000); }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Form header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-500 px-6 py-4">
        <h2 className="text-white text-lg font-bold">
          {initial ? '✏️ Edit Donor' : '➕ Add New Donor'}
        </h2>
        <p className="text-red-100 text-xs mt-0.5">
          {initial ? 'Update donor information below' : 'Fill in the details to register a donor'}
        </p>
      </div>

      <form onSubmit={submit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name *</label>
            <input required name="name" value={form.name} onChange={handle} placeholder="e.g. John Smith" className={inputCls} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Blood Group *</label>
            <select name="blood_group" value={form.blood_group} onChange={handle} className={inputCls}>
              {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact Number *</label>
            <input required name="contact" value={form.contact} onChange={handle} placeholder="e.g. +91 9876543210" className={inputCls} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">College Name</label>
            <input name="college" value={form.college} onChange={handle} placeholder="e.g. MIT College" className={inputCls} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</label>
            <input name="location" value={form.location} onChange={handle} placeholder="City / District" className={inputCls} />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 shadow-sm
              ${submitted ? 'bg-green-500 text-white scale-95' : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-md'}`}>
            {submitted ? '✅ Added!' : initial ? '💾 Update Donor' : '🩸 Add Donor'}
          </button>
          {initial && (
            <button type="button" onClick={onCancel}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all duration-200">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
