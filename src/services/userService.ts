import type { User, NewUserInput } from '../types/user';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  // GET: Fetch all users
  async getUsers(): Promise<User[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  // GET: Fetch one user
  async getUser(id: number): Promise<User> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
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