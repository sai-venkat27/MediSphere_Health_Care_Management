import React from 'react';
export default function Overview({ totalDoctors, totalPatients, activeAppointments }) {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Operational Performance Metrics</h2>
        <p className="text-slate-500 text-xs mt-0.5">Real-time summaries of system parameters.</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Staff Doctors</span>
          <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 mt-2">{totalDoctors}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-semibold">Patients Base Registry</span>
          <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 mt-2">{totalPatients}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirmed Bookings</span>
          <p className="text-4xl font-extrabold text-teal-600 mt-2">{activeAppointments}</p>
        </div>
      </div>
    </div>
  );
}
