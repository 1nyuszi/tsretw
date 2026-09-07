import { useParams } from 'react-router-dom';
import PlaceholderPanel from '../components/PlaceholderPanel';

export default function ViewUserPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PlaceholderPanel title="View User" subtitle="Read-only details of a single directory record">
      <dl className="text-sm">
        <dt className="text-xs font-medium text-gray-600 uppercase tracking-wider">User ID</dt>
        <dd className="text-gray-900 font-semibold">{id}</dd>
      </dl>
    </PlaceholderPanel>
  );
}
