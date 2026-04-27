import {
  index,
  layout,
  route,
  type RouteConfig
} from '@react-router/dev/routes';

export default [
  layout('routes/app-layout.tsx', [
    index('routes/index.tsx'),
    route('login', 'routes/login.tsx'),
    route('logout', 'routes/logout.tsx'),
    layout('routes/protected-layout.tsx', [
      index('routes/protected-index.tsx'),
      layout('routes/views-layout.tsx', [
        route('settings', 'routes/account/settings.tsx'),
        route('carrier-profile', 'routes/account/carrier-profile.tsx'),
        route('subscription', 'routes/account/subscription.tsx'),
        route('help-center', 'routes/account/help-center.tsx')
      ]),
      route('dashboard', 'routes/dashboard.tsx'),
      route('loads', 'routes/loads.tsx'),
      route('drivers', 'routes/drivers.tsx')
    ]),
    route('*', 'routes/not-found.tsx')
  ])
] satisfies RouteConfig;
