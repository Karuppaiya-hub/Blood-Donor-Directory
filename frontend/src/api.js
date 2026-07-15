const BASE = 'http://127.0.0.1:8000/api';

export const getDonors = (blood_group = '') =>
  fetch(`${BASE}/donors/${blood_group ? `?blood_group=${blood_group}` : ''}`).then(r => r.json());

export const createDonor = (data) =>
  fetch(`${BASE}/donors/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());

export const updateDonor = (id, data) =>
  fetch(`${BASE}/donors/${id}/`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());

export const deleteDonor = (id) =>
  fetch(`${BASE}/donors/${id}/`, { method: 'DELETE' });
