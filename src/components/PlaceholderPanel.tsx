import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../routes/paths';

interface PlaceholderPanelProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

// Shared shell for the pages that are not implemented yet.
export default function PlaceholderPanel({ title, subtitle, children }: PlaceholderPanelProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        {children}
        <Link
          to={paths.users()}
          className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          &larr; Back to directory
        </Link>
      </div>
    </div>
  );
}
