import { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Donors from './pages/Donors';
import DonorForm from './components/DonorForm';
import { getDonors, createDonor } from './api';

export default function App() {
  const [ready, setReady]       = useState(false);
  const [page, setPage]         = useState('dashboard');
  const [donors, setDonors]     = useState([]);
  const [showForm, setShowForm] = useState(false);

  const load = () => getDonors().then(setDonors);
  useEffect(() => { load(); }, []);

  const handlePageChange = (p) => {
    setPage(p);
    if (p === 'add') { setShowForm(true); setPage('donors'); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!ready && <Splash onDone={() => setReady(true)} />}

      <div className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'} flex`}>
        <Sidebar page={page} setPage={handlePageChange} />

        {/* Main content */}
        <div className="flex-1 ml-20 sm:ml-56 min-h-screen">
          {/* Top bar */}
          <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                {page === 'dashboard' ? 'Overview' : 'Manage Donors'}
              </p>
              <h2 className="text-lg font-bold text-gray-800 capitalize">{page}</h2>
            </div>
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-red-600 font-semibold">{donors.length} Donors</span>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">
            {page === 'dashboard' && (
              <Dashboard donors={donors} setPage={setPage} />
            )}
            {page === 'donors' && (
              <Donors donors={donors} onRefresh={load} showForm={showForm} setShowForm={setShowForm} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
