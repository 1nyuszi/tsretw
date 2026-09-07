import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import RouteErrorBoundary from '../components/RouteErrorBoundary';
import UserListPage from '../pages/UserListPage';
import { ROUTE_PATTERNS } from './paths';

// The default route ships in the main bundle; secondary pages are code-split.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <UserListPage /> },
      {
        path: ROUTE_PATTERNS.viewUser,
        lazy: async () => ({ Component: (await import('../pages/ViewUserPage')).default }),
      },
      {
        path: ROUTE_PATTERNS.editUser,
        lazy: async () => ({ Component: (await import('../pages/EditUserPage')).default }),
      },
      {
        path: ROUTE_PATTERNS.help,
        lazy: async () => ({ Component: (await import('../pages/HelpPage')).default }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('../pages/NotFoundPage')).default }),
      },
    ],
  },
]);
