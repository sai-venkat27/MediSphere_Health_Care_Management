import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import Login from './views/Login';
import Overview from './views/Overview';
import DoctorsManager from './views/DoctorsManager';
import PatientsManager from './views/PatientsManager';
import AppointmentsManager from './views/AppointmentsManager';

export default function App() {
  // --- USER AUTHENTICATION STATES ---
  const [currentUser, setCurrentUser] = useState(null); // Stores logged-in user object: { id, name, username, role }
  const [usersList, setUsersList] = useState([
    { id: 'admin-1', name: 'System Admin', username: 'admin', password: 'admin123', role: 'ADMIN' },
    { id: 'u-1', name: 'Sai Venkat', username: 'sai27', password: 'password123', role: 'USER' }
  ]);
  const [authError, setAuthError] = useState('');
  
  // --- CUSTOM COMPONENT BANNER NOTIFICATIONS ---
  const [toast, setToast] = useState(null); // Custom popup banner state: { message, type }

  // --- CORE VIEW STATE ---
  const [currentView, setCurrentView] = useState('overview');

  // --- APPLICATION MEMORY ARRAYS ---
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Srinivas Rao", specialty: "Cardiology", experience: 12, email: "srinivas.cardio@medisphere.com" },
    { id: 2, name: "Dr. Ayesha Khan", specialty: "Pediatrics", experience: 8, email: "ayesha.ped@medisphere.com" }
  ]);
  
  const [patients, setPatients] = useState([
    { id: 'u-1', name: "Sai Venkat", age: 21, bloodGroup: "O+", phone: "9876543210" }
  ]);
  
  const [appointments, setAppointments] = useState([
    { id: 1, doctorId: 1, patientId: 'u-1', date: "2026-07-10", timeSlot: "10:30 AM", status: "CONFIRMED", paymentMethod: "CASH" }
  ]);

  // --- FORM INPUT UTILITIES ---
  const [doctorForm, setDoctorForm] = useState({ id: null, name: '', specialty: 'Cardiology', experience: '', email: '' });
  const [patientForm, setPatientForm] = useState({ id: null, name: '', age: '', bloodGroup: 'O+', phone: '' });
  const [bookingForm, setBookingForm] = useState({ doctorId: '', patientId: '', date: '', timeSlot: '09:00 AM' });

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = (username, password) => {
    const foundUser = usersList.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setAuthError('');
      // Route user immediately based on access role privileges
      setCurrentView(foundUser.role === 'ADMIN' ? 'overview' : 'my-bookings');
      triggerToast(`Welcome, ${foundUser.name}! Signed in successfully.`);
    } else {
      setAuthError('Invalid credentials. Access Denied.');
      triggerToast('Authentication failed. Check your inputs.', 'error');
    }
  };

  const handleSignup = (newUserPayload) => {
    const exists = usersList.some(u => u.username.toLowerCase() === newUserPayload.username.toLowerCase());
    if (exists) {
      setAuthError('Username already taken.');
      triggerToast('Username already taken.', 'error');
      return false;
    }

    const assignedId = 'u-' + Date.now();
    const systemUser = {
      id: assignedId,
      name: newUserPayload.name,
      username: newUserPayload.username,
      password: newUserPayload.password,
      role: 'USER'
    };

    // 1. Commit to credentials authentication list
    setUsersList([...usersList, systemUser]);

    // 2. Map directly into patient data records
    const profileRecord = {
      id: assignedId,
      name: newUserPayload.name,
      age: parseInt(newUserPayload.age) || 22,
      bloodGroup: newUserPayload.bloodGroup,
      phone: newUserPayload.phone
    };
    setPatients([...patients, profileRecord]);

    // 3. Authenticate session automatically
    setCurrentUser(systemUser);
    setAuthError('');
    setCurrentView('my-bookings');
    triggerToast('Account registered successfully!');
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('overview');
    triggerToast('Successfully signed out.');
  };

  const saveDoctor = (e) => {
    e.preventDefault();
    if (currentUser?.role !== 'ADMIN') return;
    if (!doctorForm.name || !doctorForm.experience || !doctorForm.email) return;
    
    if (doctorForm.id) { 
      setDoctors(doctors.map(d => d.id === doctorForm.id ? doctorForm : d)); 
      triggerToast('Doctor profile updated.');
    } else { 
      setDoctors([...doctors, { ...doctorForm, id: Date.now() }]); 
      triggerToast('New doctor profile saved.');
    }
    setDoctorForm({ id: null, name: '', specialty: 'Cardiology', experience: '', email: '' });
  };

  const deleteDoctor = (id) => {
    if (currentUser?.role !== 'ADMIN') return;
    setDoctors(doctors.filter(d => d.id !== id));
    setAppointments(appointments.filter(a => a.doctorId !== id));
    triggerToast('Doctor profile deleted.');
  };

  const savePatient = (e) => {
    e.preventDefault();
    if (currentUser?.role !== 'ADMIN') return;
    if (!patientForm.name || !patientForm.age || !patientForm.phone) return;
    
    if (patientForm.id) { 
      setPatients(patients.map(p => p.id === patientForm.id ? patientForm : p)); 
      triggerToast('Patient record updated.');
    } else { 
      setPatients([...patients, { ...patientForm, id: Date.now() }]); 
      triggerToast('New patient record filed.');
    }
    setPatientForm({ id: null, name: '', age: '', bloodGroup: 'O+', phone: '' });
  };

  const deletePatient = (id) => {
    if (currentUser?.role !== 'ADMIN') return;
    setPatients(patients.filter(p => p.id !== id));
    setAppointments(appointments.filter(a => a.patientId !== id));
    triggerToast('Patient profile deleted.');
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    if (!bookingForm.doctorId || !bookingForm.patientId || !bookingForm.date) return;
    
    const isConflict = appointments.some(a => 
      a.doctorId === parseInt(bookingForm.doctorId) && 
      a.date === bookingForm.date && 
      a.timeSlot === bookingForm.timeSlot && 
      a.status !== 'CANCELLED'
    );
    
    if (isConflict) { 
      triggerToast("⚠️ Scheduling Conflict: Doctor already booked.", "error");
      return; 
    }

    setAppointments([...appointments, { 
      id: Date.now(), 
      doctorId: parseInt(bookingForm.doctorId), 
      patientId: bookingForm.patientId, 
      date: bookingForm.date, 
      timeSlot: bookingForm.timeSlot, 
      status: 'CONFIRMED',
      paymentMethod: 'CASH'
    }]);
    
    triggerToast("Appointment booked successfully!");
    setBookingForm({ doctorId: '', patientId: '', date: '', timeSlot: '09:00 AM' });
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
    triggerToast('Appointment has been cancelled.');
  };

  const updateStatus = (id, newStatus) => {
    if (currentUser?.role !== 'ADMIN') return;
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
    triggerToast(`Appointment marked as ${newStatus}.`);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} onSignup={handleSignup} authError={authError} />;
  }

  const isAdmin = currentUser.role === 'ADMIN';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 text-slate-800 font-sans relative">
      
      {/* Toast Alert Header Popups */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border flex items-center gap-3 transition-all ${
          toast.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onLogout={handleLogout} 
        userRole={currentUser.role}
        userName={currentUser.name}
      />
      
      {/* MAIN VIEWPORT MATRIX */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        
        {/* --- ADMIN RESTRICTED MODULE VIEWS --- */}
        {isAdmin && (
          <>
            {currentView === 'overview' && (
              <Overview 
                totalDoctors={doctors.length} 
                totalPatients={patients.length} 
                activeAppointments={appointments.filter(a => a.status === 'CONFIRMED').length} 
              />
            )}
            {currentView === 'doctors' && (
              <DoctorsManager 
                doctors={doctors} 
                doctorForm={doctorForm} 
                setDoctorForm={setDoctorForm} 
                saveDoctor={saveDoctor} 
                deleteDoctor={deleteDoctor} 
              />
            )}
            {currentView === 'patients' && (
              <PatientsManager 
                patients={patients} 
                patientForm={patientForm} 
                setPatientForm={setPatientForm} 
                savePatient={savePatient} 
                deletePatient={deletePatient} 
              />
            )}
            {currentView === 'appointments' && (
              <AppointmentsManager 
                appointments={appointments} 
                doctors={doctors} 
                patients={patients} 
                bookingForm={bookingForm} 
                setBookingForm={setBookingForm} 
                bookAppointment={bookAppointment} 
                updateStatus={updateStatus} 
              />
            )}
          </>
        )}

        {/* --- USER / PATIENT REGISTERED MODULE VIEWS --- */}
        {!isAdmin && (
          <>
            {/* USER VIEW 1: CASH BOOKING */}
            {currentView === 'user-book' && (
              <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">📅 Book Medical Appointment</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  bookingForm.patientId = currentUser.id;
                  bookAppointment(e);
                  setCurrentView('my-bookings');
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Select Medical Specialist</label>
                    <select required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={bookingForm.doctorId} onChange={e => setBookingForm({...bookingForm, doctorId: e.target.value})}>
                      <option value="">-- Choose Doctor --</option>
                      {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Target Date</label>
                    <input type="date" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Preferred Time Window</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={bookingForm.timeSlot} onChange={e => setBookingForm({...bookingForm, timeSlot: e.target.value})}>
                      <option>09:00 AM</option><option>10:30 AM</option><option>02:00 PM</option><option>04:30 PM</option>
                    </select>
                  </div>
                  
                  {/* FORCED PAYMENT CONTEXT BAR */}
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                    <p className="font-bold uppercase">Payment Gateway Status: Cash Only</p>
                    <p className="mt-0.5 opacity-90">This appointment configuration will be booked with zero upfront digital fees. Settlement must be paid via Cash directly to the receptionist at the clinic counter.</p>
                  </div>

                  <button type="submit" className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg text-sm transition shadow">
                    Confirm Appointment Slot
                  </button>
                </form>
              </div>
            )}

            {/* USER VIEW 2: SCHEDULING HISTORY */}
            {currentView === 'my-bookings' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">My Medical Bookings History</h3>
                  <button onClick={() => setCurrentView('user-book')} className="px-3 py-1.5 bg-teal-600 text-white font-medium text-xs rounded-lg hover:bg-teal-700 transition">
                    + Book New Slot
                  </button>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase border-b border-slate-200">
                      <tr><th className="p-4">Doctor</th><th className="p-4">Date & Time</th><th className="p-4">Method</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {appointments.filter(a => a.patientId === currentUser.id).length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-400">No appointments scheduled yet.</td></tr>
                      ) : (
                        appointments.filter(a => a.patientId === currentUser.id).map(a => {
                          const matchedDoc = doctors.find(d => d.id === a.doctorId) || { name: 'Staff Doctor' };
                          return (
                            <tr key={a.id} className="hover:bg-slate-50/50">
                              <td className="p-4 font-semibold text-slate-900">{matchedDoc.name}</td>
                              <td className="p-4 text-slate-600">{a.date} at <span className="font-medium text-teal-600">{a.timeSlot}</span></td>
                              <td className="p-4"><span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 rounded uppercase">CASH</span></td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                                  a.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                                  a.status === 'COMPLETED' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 
                                  'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>{a.status}</span>
                              </td>
                              <td className="p-4 text-right">
                                {a.status === 'CONFIRMED' && (
                                  <button onClick={() => cancelAppointment(a.id)} className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline">
                                    Cancel
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}