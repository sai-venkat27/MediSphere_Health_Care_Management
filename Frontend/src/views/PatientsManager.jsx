import React from 'react';


export default function PatientsManager({ patients, patientForm, setPatientForm, savePatient, deletePatient }) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
     
      {/* Form Card */}
      <div className="bg-white p-5 lg:p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          {patientForm.id ? "✏️ Update Medical Registry" : "➕ File New Patient Record"}
        </h3>
        <form onSubmit={savePatient} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Patient Name</label>
            <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" value={patientForm.name} onChange={e => setPatientForm({...patientForm, name: e.target.value})} placeholder="Sai Venkat" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Age</label>
              <input type="number" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" value={patientForm.age} onChange={e => setPatientForm({...patientForm, age: parseInt(e.target.value) || ''})} placeholder="21" />
            </div>
            <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Blood Group</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500" value={patientForm.bloodGroup} onChange={e => setPatientForm({...patientForm, bloodGroup: e.target.value})}>
                <option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>AB+</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Contact Phone</label>
            <input type="tel" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" value={patientForm.phone} onChange={e => setPatientForm({...patientForm, phone: e.target.value})} placeholder="9876543210" />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 py-2 bg-teal-600 text-white font-medium rounded-lg text-sm transition hover:bg-teal-700 shadow-sm">Save Patient</button>
            {patientForm.id && (
              <button type="button" onClick={() => setPatientForm({ id: null, name: '', age: '', bloodGroup: 'O+', phone: '' })} className="px-3 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg">Cancel</button>
            )}
          </div>
        </form>
      </div>


      {/* Table Container with overflow scroll tracking protection */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px] lg:min-w-full">
                        <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
              <tr>
                <th className="p-3 lg:p-4">Patient Name</th>
                <th className="p-3 lg:p-4">Age / Blood</th>
                <th className="p-3 lg:p-4">Contact Phone</th>
                <th className="p-3 lg:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {patients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/70">
                  <td className="p-3 lg:p-4 font-semibold text-slate-900 text-xs lg:text-sm">{p.name}</td>
                  <td className="p-3 lg:p-4 text-slate-600 text-xs lg:text-sm">Age {p.age} • <span className="font-bold text-[10px] text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded">{p.bloodGroup}</span></td>
                  <td className="p-3 lg:p-4 font-medium text-slate-600 text-xs lg:text-sm">{p.phone}</td>
                  <td className="p-3 lg:p-4 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => setPatientForm(p)} className="text-teal-600 hover:text-teal-800 font-semibold text-xs uppercase">Edit</button>
                    <button onClick={() => deletePatient(p.id)} className="text-rose-600 hover:text-rose-800 font-semibold text-xs uppercase">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
