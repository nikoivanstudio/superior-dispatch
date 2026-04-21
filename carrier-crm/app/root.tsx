import { Outlet, Scripts, ScrollRestoration } from 'react-router';
import { AppProvider } from '@/shared/lib/providers/app-provider';
import '../src/index.css';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>carrier-crm</title>
      </head>
      <body>
        <AppProvider>
          <div id="root">
            <Outlet />
          </div>
          <ScrollRestoration />
          <Scripts />
        </AppProvider>
      </body>
    </html>
  );
}
