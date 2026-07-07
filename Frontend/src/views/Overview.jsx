import React from 'react';

export default function Overview({ totalDoctors, totalPatients, activeAppointments }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Metrics Matrix</h2>
        <p className="text-slate-500 text-sm mt-0.5">Real-time infrastructure performance summary indicators.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Staff Doctors</span>
          <p className="text-4xl font-extrabold text-slate-900 mt-1">{totalDoctors}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Patient Base</span>
          <p className="text-4xl font-extrabold text-slate-900 mt-1">{totalPatients}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Scheduled Bookings</span>
          <p className="text-4xl font-extrabold text-teal-600 mt-1">{activeAppointments}</p>
        </div>
      </div>
    </div>
  );
}