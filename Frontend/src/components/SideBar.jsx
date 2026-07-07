import React from 'react';

export default function Sidebar({ currentView, setCurrentView, setIsAuthenticated, activeDoctors, activePatients, activeAppointments }) {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-6">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">MediSphere</h1>
          <span className="text-xs font-semibold text-teal-400 bg-teal-950/50 px-2 py-0.5 rounded border border-teal-800">Admin Session</span>
        </div>
        <nav className="space-y-1.5">
          {[
            { id: 'overview', label: 'Dashboard Overview' },
            { id: 'doctors', label: 'Manage Doctors' },
            { id: 'patients', label: 'Manage Patients' },
            { id: 'appointments', label: 'Manage Appointments' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setCurrentView(item.id)} 
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${currentView === item.id ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <button 
        onClick={() => setIsAuthenticated(false)} 
        className="w-full py-2.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 border border-slate-700 hover:border-rose-900 rounded-lg transition text-sm font-medium"
      >
        Log Out Securely
      </button>
    </aside>
  );
}