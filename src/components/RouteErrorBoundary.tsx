import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import PlaceholderPanel from './PlaceholderPanel';

// Rendered by the router whenever a route throws while loading or rendering.
export default function RouteErrorBoundary() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return <PlaceholderPanel title="Something went wrong" subtitle={message} />;
}
