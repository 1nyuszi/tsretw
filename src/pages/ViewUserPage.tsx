import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../services/userService';
import type { User } from '../types/user';
import PlaceholderPanel from '../components/PlaceholderPanel';

export default function ViewUserPage() {
  const [user, setUser] = useState<User>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  // Load user data
  useEffect(() => {
    userService
      .getUser(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <PlaceholderPanel title={`${user.username ?? 'Unknown User'} (#${user.id ?? 0})`} subtitle="User details">
      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading user data...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : (
      <div>
        <dl className="text-sm">
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">User ID</dt>
          <dd className="text-gray-900 font-semibold">{user.id}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Name</dt>
          <dd className="text-gray-900 font-semibold">{user.name}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Username</dt>
          <dd className="text-gray-900 font-semibold">{user.username}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">E-mail</dt>
          <dd className="text-gray-900 font-semibold">{user.email}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</dt>
          <dd className="text-gray-900 font-semibold">{user.phone}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Website</dt>
          <dd className="text-gray-900 font-semibold">{user.website}</dd>
        </dl>
        <h2>Address</h2>
        <dl className="text-sm">
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Street</dt>
          <dd className="text-gray-900 font-semibold">{user.address?.street}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Suite</dt>
          <dd className="text-gray-900 font-semibold">{user.address?.suite}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">City</dt>
          <dd className="text-gray-900 font-semibold">{user.address?.city}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Zipcode</dt>
          <dd className="text-gray-900 font-semibold">{user.address?.zipcode}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Latitude</dt>
          <dd className="text-gray-900 font-semibold">{user.address?.geo?.lat}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Longitude</dt>
          <dd className="text-gray-900 font-semibold">{user.address?.geo?.lng}</dd>
        </dl>
        <h2>Company</h2>
        <dl className="text-sm">
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Name</dt>
          <dd className="text-gray-900 font-semibold">{user.company?.name}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">Catchphrase</dt>
          <dd className="text-gray-900 font-semibold">{user.company?.catchPhrase}</dd>
          <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">BS</dt>
          <dd className="text-gray-900 font-semibold">{user.company?.bs}</dd>
        </dl>
      </div>
      )}
    </PlaceholderPanel>
  );
}
