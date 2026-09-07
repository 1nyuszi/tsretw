1. Létrehoztam és kihúztam a Github repót


2. Projekt létrehozása a Vite segítségével
npm create vite@latest . -- --template react-ts


3. Installáltam néhány csomagot, pl a Tailwind
npm install -D tailwindcss postcss autoprefixer


4. Tailwind
npm install tailwindcss @tailwindcss/vite


5. Hozzáadtam a tailwind-et a vite.config.ts fájlhoz, így néz ki most:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})


6. src/index.css teljes tartalmának helyettesítése ezzel
@import "tailwindcss";


7. Próba, rendesen futnia kell és elérhetőnek lennie - alap projekt látszik
npm run dev


8. src/types/user.ts hozzáadása
export interface Company {
  name: string;
  catchPhrase: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: Company;
}

export type NewUserInput = Omit<User, 'id'>;


9. src/services/userService.ts hozzáadása
import { User, NewUserInput } from '../types/user';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  // GET: Fetch all users
  async getUsers(): Promise<User[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  // POST: Create new user
  async createUser(user: NewUserInput): Promise<User> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  // DELETE: Remove user
  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete user');
  },
};


10. src/App.tsx lecserélése
import React, { useEffect, useState } from 'react';
import { User, NewUserInput } from './types/user';
import { userService } from './services/userService';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<NewUserInput>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  // Load Initial Users
  useEffect(() => {
    userService
      .getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add User Handler
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      const createdUser = await userService.createUser(formData);
      // Generate unique ID for frontend list since JSONPlaceholder returns ID 11 for all POSTs
      const newUserWithId = { ...createdUser, id: Date.now() };
      setUsers([newUserWithId, ...users]);

      // Reset form
      setFormData({ name: '', username: '', email: '', phone: '', website: '' });
    } catch (err) {
      alert('Failed to add user');
    }
  };

  // Delete User Handler
  const handleDeleteUser = async (id: number) => {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  // Filtered Users List
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Directory</h1>
            <p className="text-sm text-gray-500">Manage directory records and system users</p>
          </div>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Add User Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
              >
                Create Record
              </button>
            </form>
          </div>

          {/* User Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading user records...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-gray-400">
                          No matching records found.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-400">@{user.username}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-700">{user.email}</div>
                            <div className="text-xs text-gray-400">{user.phone}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {user.company?.name || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1 px-3 rounded border border-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}


11. src/App.css és a teljes src/assets/ törlése, public/icons.svg törlése


