# Frontend

React + Vite + TS frontend for the Nano-powered Notification Assistant.


---


# Pulse Frontend (React + Vite + TS)

Minimal B2C UI for the Notification Assistant:
- Onboarding (Register / Login)
- **App Linking** page (Instagram, Snapchat, Gmail, X)
- **Notifications** page with **modes**: silent / push / digest
- **Mark all read** (and purge on backend)


## Backend endpoints
- POST `/auth/register` → { token }
- POST `/auth/login` → { token }

## Run
```bash
npm install
npm run dev
Open in browser: http://localhost:5173


## Key Screens

### Register / Login
Simple forms that POST to /auth/register and /auth/login.
Store session token in store/session.


## OAuth Flow (client-first)
User clicks “Link” on an app card.
Client opens the provider’s OAuth auth URL.
Provider returns to your frontend callback.
Frontend POSTs /api/apps/{app}/link with:
userId (from session), providerUserId, scopesCsv


## Styling
Keep it minimal and responsive.
Consider adding loading states & toasts for better UX.
Use a unified mode switch component for Silent / Push / Digest.
