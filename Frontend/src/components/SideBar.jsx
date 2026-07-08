import React from 'react';

export default function Sidebar({ currentView, setCurrentView, setIsAuthenticated }) {
  return (
    // 1. Changed w-64 to w-full by default, and lg:w-64 for large desktop screens
    // 2. Changed flex-col to flex-col lg:flex-col, and adjusted padding dynamically
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-slate-800">
      <div className="flex flex-col lg:block">
        
        {/* Header Section: Aligns nicely on mobile row layouts */}
        <div className="flex items-center justify-between lg:block mb-4 lg:mb-8">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-wide">MediSphere</h1>
            <span className="text-[10px] font-semibold text-teal-400 bg-teal-950/50 px-2 py-0.5 rounded border border-teal-800">Admin Session</span>
          </div>
        </div>

        {/* Navigation Items: Displays as a grid/scrollable row on mobile, stack on desktop */}
        <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
          {[
            { id: 'overview', label: 'Dashboard' },
            { id: 'doctors', label: 'Doctors' },
            { id: 'patients', label: 'Patients' },
            { id: 'appointments', label: 'Appointments' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setCurrentView(item.id)} 
              className={`whitespace-nowrap text-xs lg:text-sm text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg font-medium transition-all ${currentView === item.id ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button: Margins self-adjust based on responsive constraints */}
      <button 
        onClick={() => setIsAuthenticated(false)} 
        className="mt-3 lg:mt-0 w-full py-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 border border-slate-700 hover:border-rose-900 rounded-lg transition text-xs lg:text-sm font-medium"
      >
        Log Out
      </button>
    </aside>
  );
}