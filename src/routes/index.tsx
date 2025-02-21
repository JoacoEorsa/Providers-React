import { createFileRoute, Navigate } from '@tanstack/react-router';

const RouteComponent = () => {
  const loggedIn = false;

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/login" />;
};

export const Route = createFileRoute('/')({ component: RouteComponent });
