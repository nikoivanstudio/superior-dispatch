# Carrier CRM SSR Auth Migration Plan

## Goal

Migrate `carrier-crm` from a plain Vite SPA to `react-router` framework mode with `ssr: true`, using server-side auth validation against `alex-dispatch-backend`.

Target auth model:

- `carrier-crm` runs as an SSR app
- `alex-dispatch-backend` remains the auth authority
- auth cookie is shared across CRM and API subdomains
- protected routes are guarded on the server before rendering

## Current Status

### Done

- [x] Chosen target architecture: `react-router` framework mode with `ssr: true`
- [x] Chosen auth approach: shared cookie domain, backend remains source of truth
- [x] Confirmed backend cookie should not be host-only
- [x] Added configurable cookie domain on backend through env
- [x] Chosen dev domains:
  - CRM: `http://crm.localtest.me:5173`
  - API: `http://api.localtest.me:3001`
- [x] Configured frontend dev server to open on `crm.localtest.me`
- [x] Backend is reachable on `api.localtest.me`
- [x] Enabled backend CORS for CRM origin with `credentials: true`
- [x] Verified login response sets auth cookie
- [x] Verified cookie is visible in browser for `crm.localtest.me`
- [x] Verified browser requests with `credentials: "include"` work against backend

### In Progress

- [ ] Verify authenticated SSR behavior and session lifecycle in `carrier-crm`

### Not Started

- [ ] Verify refresh behavior on protected URLs
- [ ] Verify expired-session behavior
- [ ] Verify protected route behavior with a valid authenticated cookie
- [ ] Verify logout clears access in browser end-to-end

## Architectural Decisions

### Auth Source of Truth

Use backend auth state, not local frontend state.

- Cookie is stored by browser
- Backend validates session/token
- CRM SSR layer checks auth by calling backend `/auth/me`

### SSR Validation Strategy

Preferred approach:

- protect private route tree with React Router `middleware`
- read incoming request cookies on CRM server
- forward cookie header to backend `/auth/me`
- redirect to `/login` on `401`
- continue request on `200`

Fallback if middleware becomes inconvenient:

- use protected layout `loader`

### Route Structure

Planned route split:

- public routes
  - `/login`
- protected routes
  - `/`
  - `/dashboard`
  - `/loads`
  - `/drivers`
  - `/settings`

The protected branch should have one auth boundary, not per-page auth checks.

## Backend Checklist

### Completed

- [x] `COOKIE_DOMAIN` added in backend env
- [x] CORS enabled with CRM origin
- [x] `credentials: true` enabled in CORS
- [x] Cookie behavior verified in browser

### Next Backend Tasks

- [ ] Confirm final backend cookie settings for dev and prod
- [ ] Confirm prod cookie domain strategy, e.g. `.example.com`
- [ ] Confirm prod `Secure` behavior over HTTPS

## Carrier CRM Migration Steps

### Phase 1. Framework Mode Setup

- [x] Install and configure React Router framework tooling
- [x] Add `react-router.config.ts`
- [x] Switch Vite config to React Router framework plugin
- [x] Replace manual browser-router bootstrap
- [x] Create `app/root.tsx`
- [x] Create `app/routes.ts`

### Phase 2. SSR Skeleton

- [x] Make SSR app render without auth first
- [x] Add base document shell in `app/root.tsx`
- [x] Move current top-level UI into route modules
- [x] Add a simple public route
- [x] Add a simple protected route shell

### Phase 3. Server Auth Boundary

- [x] Create `app/lib/auth.server.ts`
- [x] Implement helper to call backend `/auth/me` using incoming request cookies
- [x] Create user context for route middleware/loader access
- [x] Add protected route middleware
- [x] Redirect unauthenticated users to `/login`
- [x] Support `redirectTo` query parameter

### Phase 4. Auth Routes

- [x] Create `/login` route
- [x] If authenticated, redirect away from `/login`
- [x] Add login form flow or temporary login bridge
- [x] Create `/logout` action route

### Phase 5. App Integration

- [x] Move CRM layout under protected branch
- [x] Reuse existing widgets/components
- [x] Integrate `react-query` in the root/provider layer
- [x] Wire business pages under protected routes

### Phase 6. Verification

- [x] Direct request to protected URL when logged out redirects before render
- [x] Logout route clears auth cookie at backend HTTP level
- [ ] Direct request to protected URL when logged in renders correctly
- [ ] Browser refresh on protected page preserves session
- [ ] Expired session returns user to login
- [ ] Logout clears access

## Immediate Next Step

Next conversation should continue with:

- verifying authenticated SSR behavior with a real logged-in browser session

Start from:

1. sign in through `/login` with a valid account
2. verify SSR render on `/`, `/loads`, `/drivers`, `/settings` after login
3. verify refresh, expired session handling, and logout in browser

## Notes For Future Dialogs

- Dev cookie-sharing is already confirmed working with:
  - `crm.localtest.me`
  - `api.localtest.me`
  - `COOKIE_DOMAIN=.localtest.me`
- The backend already exposes `GET /auth/me`
- The backend auth cookie is named `access_token`
- The backend currently appears to be the correct auth authority for SSR validation
- `carrier-crm` now uses a protected layout middleware that forwards request cookies to backend `/auth/me`
- `carrier-crm` login form now submits to backend `POST /signin` through a server action and preserves `redirectTo`
- `alex-dispatch-backend` now exposes `POST /logout`, and `carrier-crm` proxies logout through `/logout`
- Direct unauthenticated SSR request to `/` was verified to return `302` to `/login?redirectTo=%2F`
- Avoid reintroducing client-only auth guards as the primary protection mechanism
