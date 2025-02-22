import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from './-components/login-form';

const RouteComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 p-5 shadow rounded-2xl">
        {/* eslint-disable-next-line no-console */}
        <LoginForm onSubmit={console.log} />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_guest/login/')({ component: RouteComponent });
