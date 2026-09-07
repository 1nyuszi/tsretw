import { useParams } from 'react-router-dom';
import PlaceholderPanel from '../components/PlaceholderPanel';

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PlaceholderPanel title="Edit User" subtitle="Modify an existing directory record">
      <dl className="text-sm">
        <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">User ID</dt>
        <dd className="text-gray-900 font-semibold">{id}</dd>
      </dl>
    </PlaceholderPanel>
  );
}
