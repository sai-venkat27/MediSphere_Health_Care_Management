import React from 'react';

export default function AppointmentsManager({ appointments, doctors, patients, bookingForm, setBookingForm, bookAppointment, updateStatus }) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">📅 Direct Appointment Booking Engine</h3>
        <form onSubmit={bookAppointment} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Select Medical Officer</label>
            <select required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={bookingForm.doctorId} onChange={e => setBookingForm({...bookingForm, doctorId: e.target.value})}>
              <option value="">-- Choose Doctor --</option>
              {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Select Patient Holder</label>
            <select required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={bookingForm.patientId} onChange={e => setBookingForm({...bookingForm, patientId: e.target.value})}>
              <option value="">-- Choose Patient --</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Target Date</label>
            <input type="date" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Time Slot Unit</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={bookingForm.timeSlot} onChange={e => setBookingForm({...bookingForm, timeSlot: e.target.value})}>
              <option>09:00 AM</option><option>10:30 AM</option><option>02:00 PM</option><option>04:30 PM</option>
            </select>
          </div>
          <button type="submit" className="md:col-span-4 w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-lg shadow-sm mt-2">
            Execute Appointment Allocation Slot
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200"><h3 className="font-bold text-slate-800">Operational Booking Ledger Matrix</h3></div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
            <tr><th className="p-4">Assigned Doctor</th><th className="p-4">Patient Case</th><th className="p-4">Schedule Window</th><th className="p-4">Current Status</th><th className="p-4 text-right">State Lifecycle Controls</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {appointments.map(a => {
              const doc = doctors.find(d => d.id === a.doctorId) || { name: 'Unknown Staff' };
              const pat = patients.find(p => p.id === a.patientId) || { name: 'Unknown Patient' };
              return (
                <tr key={a.id} className="hover:bg-slate-50/70">
                  <td className="p-4 font-semibold text-slate-900">{doc.name}</td>
                  <td className="p-4 text-slate-700">{pat.name}</td>
                  <td className="p-4 font-medium text-slate-600">{a.date} at <span className="text-teal-600 font-semibold">{a.timeSlot}</span></td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${a.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : a.status === 'COMPLETED' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>{a.status}</span>
                  </td>
                  <td className="p-4 text-right space-x-1">
                    {a.status === 'CONFIRMED' && (
                      <>
                        <button onClick={() => updateStatus(a.id, 'COMPLETED')} className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-semibold rounded transition">Mark Completed</button>
                        <button onClick={() => updateStatus(a.id, 'CANCELLED')} className="px-2.5 py-1 bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-700 text-xs font-semibold rounded transition">Cancel Slot</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}