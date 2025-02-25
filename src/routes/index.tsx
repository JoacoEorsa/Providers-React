import { createFileRoute, Navigate } from '@tanstack/react-router';

import { useUserStore } from '@/stores';

const RouteComponent = () => {
  const token = useUserStore((s) => {
    return s.token;
  });

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/login" />;
};

export const Route = createFileRoute('/')({ component: RouteComponent });
