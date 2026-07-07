import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Login from './views/Login';
import Overview from './views/Overview';
import DoctorsManager from './views/DoctorsManager';
import PatientsManager from './views/PatientsManager';
import AppointmentsManager from './views/AppointmentsManager';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [currentView, setCurrentView] = useState('overview');

  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Srinivas Rao", specialty: "Cardiology", experience: 12, email: "srinivas.cardio@medisphere.com" },
    { id: 2, name: "Dr. Ayesha Khan", specialty: "Pediatrics", experience: 8, email: "ayesha.ped@medisphere.com" }
  ]);
  const [patients, setPatients] = useState([
    { id: 1, name: "Sai Venkat", age: 21, bloodGroup: "O+", phone: "9876543210" },
    { id: 2, name: "Ananya Mishra", age: 34, bloodGroup: "A-", phone: "8765432109" }
  ]);
  const [appointments, setAppointments] = useState([
    { id: 1, doctorId: 1, patientId: 1, date: "2026-07-10", timeSlot: "10:30 AM", status: "CONFIRMED" }
  ]);

  const [doctorForm, setDoctorForm] = useState({ id: null, name: '', specialty: 'Cardiology', experience: '', email: '' });
  const [patientForm, setPatientForm] = useState({ id: null, name: '', age: '', bloodGroup: 'O+', phone: '' });
  const [bookingForm, setBookingForm] = useState({ doctorId: '', patientId: '', date: '', timeSlot: '09:00 AM' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginCredentials.username === 'admin' && loginCredentials.password === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else { setAuthError('Invalid Admin Username or Password.'); }
  };

  const saveDoctor = (e) => {
    e.preventDefault();
    if (!doctorForm.name || !doctorForm.experience || !doctorForm.email) return;
    if (doctorForm.id) { setDoctors(doctors.map(d => d.id === doctorForm.id ? doctorForm : d)); }
    else { setDoctors([...doctors, { ...doctorForm, id: Date.now() }]); }
    setDoctorForm({ id: null, name: '', specialty: 'Cardiology', experience: '', email: '' });
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter(d => d.id !== id));
    setAppointments(appointments.filter(a => a.doctorId !== id));
  };

  const savePatient = (e) => {
    e.preventDefault();
    if (!patientForm.name || !patientForm.age || !patientForm.phone) return;
    if (patientForm.id) { setPatients(patients.map(p => p.id === patientForm.id ? patientForm : p)); }
    else { setPatients([...patients, { ...patientForm, id: Date.now() }]); }
    setPatientForm({ id: null, name: '', age: '', bloodGroup: 'O+', phone: '' });
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    setAppointments(appointments.filter(a => a.patientId !== id));
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    if (!bookingForm.doctorId || !bookingForm.patientId || !bookingForm.date) return;
    const isConflict = appointments.some(a => a.doctorId === parseInt(bookingForm.doctorId) && a.date === bookingForm.date && a.timeSlot === bookingForm.timeSlot && a.status !== 'CANCELLED');
    if (isConflict) { alert("⚠️ Scheduling Conflict: Doctor already booked."); return; }
    setAppointments([...appointments, { id: Date.now(), doctorId: parseInt(bookingForm.doctorId), patientId: parseInt(bookingForm.patientId), date: bookingForm.date, timeSlot: bookingForm.timeSlot, status: 'CONFIRMED' }]);
    alert("Appointment booked successfully!");
  };

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  if (!isAuthenticated) {
    return <Login loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} handleLogin={handleLogin} authError={authError} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} setIsAuthenticated={setIsAuthenticated} />
      <main className="flex-1 p-8 overflow-y-auto">
        {currentView === 'overview' && <Overview totalDoctors={doctors.length} totalPatients={patients.length} activeAppointments={appointments.filter(a => a.status === 'CONFIRMED').length} />}
        {currentView === 'doctors' && <DoctorsManager doctors={doctors} doctorForm={doctorForm} setDoctorForm={setDoctorForm} saveDoctor={saveDoctor} deleteDoctor={deleteDoctor} />}
        {currentView === 'patients' && <PatientsManager patients={patients} patientForm={patientForm} setPatientForm={setPatientForm} savePatient={savePatient} deletePatient={deletePatient} />}
        {currentView === 'appointments' && <AppointmentsManager appointments={appointments} doctors={doctors} patients={patients} bookingForm={bookingForm} setBookingForm={setBookingForm} bookAppointment={bookAppointment} updateStatus={updateStatus} />}
      </main>
    </div>
  );
}