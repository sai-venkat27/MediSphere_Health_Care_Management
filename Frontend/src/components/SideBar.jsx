import React, { useState } from 'react';


export default function Sidebar({ currentView, setCurrentView, onLogout, userRole, userName }) {
const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = userRole === 'ADMIN';


  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-slate-800 shrink-0">
      <div className="flex flex-col lg:block">
       
        {/* Navigation Branding Strip */}
        <div className="flex items-center justify-between lg:block mb-4 lg:mb-8">
          <div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">MediSphere</h1>
            <div className="text-[10px] mt-1 flex items-center gap-1.5">
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase border ${
                isAdmin ? 'bg-rose-950/40 text-rose-300 border-rose-900' : 'bg-teal-950/40 text-teal-300 border-teal-900'
              }`}>
                {userRole}
              </span>
              <span className="text-slate-400 truncate max-w-[100px]">({userName})</span>
            </div>
          </div>
         
          {/* Mobile Hamburger Menu Toggle Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white rounded bg-slate-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
                      <nav className={`flex-col gap-1.5 ${mobileOpen ? 'flex' : 'hidden lg:flex'}`}>
          {isAdmin ? (
            /* Admin Actions */
            <>
              <button onClick={() => { setCurrentView('overview'); setMobileOpen(false); }} className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === 'overview' ? 'bg-teal-600 text-white shadow' : 'hover:bg-slate-800'}`}>Dashboard</button>
              <button onClick={() => { setCurrentView('doctors'); setMobileOpen(false); }} className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === 'doctors' ? 'bg-teal-600 text-white shadow' : 'hover:bg-slate-800'}`}>Doctors</button>
              <button onClick={() => { setCurrentView('patients'); setMobileOpen(false); }} className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === 'patients' ? 'bg-teal-600 text-white shadow' : 'hover:bg-slate-800'}`}>Patients</button>
              <button onClick={() => { setCurrentView('appointments'); setMobileOpen(false); }} className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === 'appointments' ? 'bg-teal-600 text-white shadow' : 'hover:bg-slate-800'}`}>Appointments</button>
            </>
          ) : (
            /* Regular Patient Actions */
            <>
              <button onClick={() => { setCurrentView('my-bookings'); setMobileOpen(false); }} className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === 'my-bookings' ? 'bg-teal-600 text-white shadow' : 'hover:bg-slate-800'}`}>My Appointments</button>
              <button onClick={() => { setCurrentView('user-book'); setMobileOpen(false); }} className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === 'user-book' ? 'bg-teal-600 text-white shadow' : 'hover:bg-slate-800'}`}>Book Appointment</button>
            </>
          )}
        </nav>
      </div>
      <button onClick={onLogout} className={`mt-4 w-full py-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg text-sm font-medium border border-slate-700 hover:border-rose-900 hover:bg-rose-950 hover:text-rose-300 transition ${mobileOpen ? 'block' : 'hidden lg:block'}`}>
        Log Out
      </button>
    </aside>
  );
}
