// Single source of truth for route paths.
// Patterns are used by the router, builders by links/navigate calls.
export const ROUTE_PATTERNS = {
  users: '/',
  viewUser: '/view/:id',
  editUser: '/edit/:id',
  help: '/help',
} as const;

export const paths = {
  users: () => '/',
  viewUser: (id: number | string) => `/view/${id}`,
  editUser: (id: number | string) => `/edit/${id}`,
  help: () => '/help',
};
