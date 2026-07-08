import React from 'react';


export default function DoctorsManager({ doctors, doctorForm, setDoctorForm, saveDoctor, deleteDoctor }) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
     
      {/* Form Card */}
      <div className="bg-white p-5 lg:p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          {doctorForm.id ? "✏️ Update Staff Profile" : "➕ Onboard New Doctor"}
        </h3>
        <form onSubmit={saveDoctor} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Doctor Full Name</label>
            <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" value={doctorForm.name} onChange={e => setDoctorForm({...doctorForm, name: e.target.value})} placeholder="Dr. Srinivas Rao" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Clinical Specialization</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500" value={doctorForm.specialty} onChange={e => setDoctorForm({...doctorForm, specialty: e.target.value})}>
              <option>Cardiology</option>
              <option>Pediatrics</option>
              <option>Neurology</option>
              <option>Dermatology</option>
            </select>
          </div>
          <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Experience (Years)</label>
            <input type="number" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" value={doctorForm.experience} onChange={e => setDoctorForm({...doctorForm, experience: parseInt(e.target.value) || ''})} placeholder="5" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Secure Email</label>
            <input type="email" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" value={doctorForm.email} onChange={e => setDoctorForm({...doctorForm, email: e.target.value})} placeholder="dr.rao@medisphere.com" />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 py-2 bg-teal-600 text-white font-medium rounded-lg text-sm transition hover:bg-teal-700 shadow-sm">Save Doctor</button>
            {doctorForm.id && (
              <button type="button" onClick={() => setDoctorForm({ id: null, name: '', specialty: 'Cardiology', experience: '', email: '' })} className="px-3 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg">Cancel</button>
            )}
          </div>
        </form>
      </div>


      {/* Table Card Container with overflow-x-auto to protect mobile scaling */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px] lg:min-w-full">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                            <tr>
                <th className="p-3 lg:p-4">Doctor Details</th>
                <th className="p-3 lg:p-4">Specialty</th>
                <th className="p-3 lg:p-4">Experience</th>
                <th className="p-3 lg:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {doctors.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/70">
                  <td className="p-3 lg:p-4">
                    <p className="font-semibold text-slate-900 text-xs lg:text-sm">{d.name}</p>
                    <p className="text-[10px] lg:text-xs text-slate-400 break-all">{d.email}</p>
                  </td>
                  <td className="p-3 lg:p-4">
                    <span className="px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-100 rounded-md text-[10px] lg:text-xs font-medium">{d.specialty}</span>
                  </td>
                  <td className="p-3 lg:p-4 font-medium text-slate-600 text-xs lg:text-sm">{d.experience} Yrs</td>
                  <td className="p-3 lg:p-4 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => setDoctorForm(d)} className="text-teal-600 hover:text-teal-800 font-semibold text-xs uppercase">Edit</button>
                    <button onClick={() => deleteDoctor(d.id)} className="text-rose-600 hover:text-rose-800 font-semibold text-xs uppercase">Delete</button>
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