import React, { useState } from 'react';


export default function Login({ onLogin, onSignup, authError }) {
  const [isSignup, setIsSignup] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', username: '', password: '', age: '', bloodGroup: 'O+', phone: '' });


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-8 relative overflow-hidden">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-900/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-900/10 rounded-full filter blur-3xl"></div>


      <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">MediSphere</h2>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-semibold">Healthcare Management System</p>
        </div>


        {authError && (
         <div className="mb-4 p-3 rounded-lg text-xs font-semibold text-center border bg-rose-950/40 text-rose-300 border-rose-800">
            {authError}
          </div>
        )}


        {/* Secure Access Navigation Split Mode */}
        <div className="flex border-b border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setIsSignup(false)}
            className={`flex-1 pb-3 text-sm font-bold tracking-wide transition-all ${!isSignup ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-500 hover:text-slate-400'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(true)}
            className={`flex-1 pb-3 text-sm font-bold tracking-wide transition-all ${isSignup ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-500 hover:text-slate-400'}`}
          >
            Create Account
          </button>
        </div>


        {/* LOGIN FORM VIEW */}
        {!isSignup ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin(loginForm.username, loginForm.password);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">Username</label>
                          <input
                type="text"
                required
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                value={loginForm.username}
                onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                placeholder="Enter account username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">Password</label>
              <input
                type="password"
                required
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-semibold rounded-lg transition shadow-md"
            >
              Sign In to Dashboard
            </button>
          </form>
        ) : (
          /* REGULAR USER SIGNUP VIEW */
          <form
            onSubmit={(e) => {
                            e.preventDefault();
              const ok = onSignup(signupForm);
              if(ok) setIsSignup(false);
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-0.5 uppercase">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-teal-500"
                value={signupForm.name}
                onChange={e => setSignupForm({...signupForm, name: e.target.value})}
                placeholder="Enter FullName"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-0.5 uppercase">Username</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-teal-500"
                  value={signupForm.username}
                  onChange={e => setSignupForm({...signupForm, username: e.target.value})}
                  placeholder="username"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-0.5 uppercase">Password</label>
                            <input
                  type="password"
                  required
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-teal-500"
                  value={signupForm.password}
                  onChange={e => setSignupForm({...signupForm, password: e.target.value})}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-0.5 uppercase">Age</label>
                <input
                  type="number"
                  required
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-teal-500"
                  value={signupForm.age}
                  onChange={e => setSignupForm({...signupForm, age: e.target.value})}
                  placeholder="age"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-0.5 uppercase">Blood Group</label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 text-slate-150 px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-teal-500 bg-slate-900 text-slate-100"
                  value={signupForm.bloodGroup}
                  onChange={e => setSignupForm({...signupForm, bloodGroup: e.target.value})}
                >
                                    <option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>AB+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-0.5 uppercase">Contact Number</label>
              <input
                type="tel"
                required
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-teal-500"
                value={signupForm.phone}
                onChange={e => setSignupForm({...signupForm, phone: e.target.value})}
                placeholder="98********"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-semibold rounded-lg transition shadow-md mt-2"
            >
              Sign Up & Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
