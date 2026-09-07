import { NavLink, Outlet } from 'react-router-dom';
import { paths } from '../routes/paths';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`;

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2">
          <span className="mr-4 font-bold text-gray-900">TSRETW</span>
          <NavLink to={paths.users()} end className={navLinkClass}>
            Directory
          </NavLink>
          <NavLink to={paths.help()} className={navLinkClass}>
            Help
          </NavLink>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
