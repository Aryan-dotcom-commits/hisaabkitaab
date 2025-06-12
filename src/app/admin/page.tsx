// app/components/AdminDashboard.tsx
'use client';
import { useState } from 'react';
import { Home, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6 text-black">Admin Panel</h2>
        <nav className="space-y-2">
          <button
            className={`flex items-center gap-2 p-2 w-full rounded-md hover:bg-black ${
              activePage === 'dashboard' ? 'bg-black font-semibold' : ''
            }`}
            onClick={() => setActivePage('dashboard')}
          >
            <Home size={18} /> Dashboard
          </button>
          <button
            className={`flex items-center gap-2 p-2 w-full rounded-md hover:bg-black ${
              activePage === 'users' ? 'bg-black font-semibold' : ''
            }`}
            onClick={() => setActivePage('users')}
          >
            <Users size={18} /> Users
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activePage === 'dashboard' && <DashboardView />}
        {activePage === 'users' && <UsersView />}
      </main>
    </div>
  );
}

function DashboardView() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Dashboard Overview</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow text-black">Total Users: 123</div>
        <div className="bg-white p-6 rounded-xl shadow text-black">Other Metric: 456</div>
      </div>
    </div>
  );
}

function UsersView() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="space-y-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add User</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete User</button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">View Users</button>
      </div>
    </div>
  );
}
