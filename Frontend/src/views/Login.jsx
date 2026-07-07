import React from 'react';

export default function Login({ loginCredentials, setLoginCredentials, handleLogin, authError }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-teal-600 mb-2">MediSphere</h2>
        <p className="text-center text-slate-500 mb-6 text-sm font-medium">ADMIN SECURE PORTAL CONTROL</p>
        
        {authError && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-600 border border-rose-200 text-sm rounded-lg font-medium">
            {authError}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" 
              value={loginCredentials.username} 
              onChange={e => setLoginCredentials({...loginCredentials, username: e.target.value})} 
              placeholder="admin" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" 
              value={loginCredentials.password} 
              onChange={e => setLoginCredentials({...loginCredentials, password: e.target.value})} 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition shadow-md">
            Authenticate Portal
          </button>
        </form>
      </div>
    </div>
  );
}