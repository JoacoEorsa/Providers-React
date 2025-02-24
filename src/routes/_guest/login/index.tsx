import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from './-components/login-form';

const RouteComponent = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-96 rounded-2xl p-5 shadow">
        {/* eslint-disable-next-line no-console */}
        <LoginForm onSubmit={console.log} />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_guest/login/')({ component: RouteComponent });
