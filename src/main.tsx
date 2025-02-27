import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { Toaster } from '@/components/ui/toast';
import { queryClient } from '@/config/queryClient';
import { router } from '@/config/router';
import { getSentryErrorHandlers, initializeSentry } from '@/config/sentry';
import { I18nextProvider } from '@/i18n';
import reportWebVitals from '@/reportWebVitals';

import '@/styles.css';

initializeSentry();

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement, getSentryErrorHandlers());

  root.render(
    <StrictMode>
      <I18nextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </I18nextProvider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
