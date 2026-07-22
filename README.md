# Uniogate Mobile App

Uniogate is an Expo-powered React Native mobile application for business payments, merchant onboarding, wallets, team management, and transaction operations. The app is configured for Android, iOS, and web through Expo Router and React Native.

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Application Flow](#application-flow)
- [Routing](#routing)
- [State Management](#state-management)
- [API Layer](#api-layer)
- [Design System and Assets](#design-system-and-assets)
- [Development Workflow](#development-workflow)
- [Testing and Quality Checks](#testing-and-quality-checks)
- [Build and Deployment](#build-and-deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

This repository contains the Uniogate merchant mobile app. It supports onboarding, OTP authentication, business profile creation, business switching, wallet balance views, payment collection methods, withdrawals, transaction details, KYC screens, account settings, support screens, and role/team management.

The project uses Expo Router as the app entry point and combines file-based routing for top-level app areas with a React Navigation native stack for the authenticated main experience.

## Core Features

- **Onboarding experience**: First-time users are routed through onboarding screens before authentication.
- **OTP-based authentication**: Users request and verify one-time passwords for sign-in or account creation.
- **Profile and business setup**: New owner users complete personal details, create a business profile, and receive an authenticated session.
- **Invited sales representative support**: Invited users can complete their profile and be joined to a business without creating a new business.
- **Session persistence**: Access tokens, refresh tokens, user data, and active roles are persisted with Zustand and AsyncStorage.
- **Automatic token refresh**: API requests attach bearer tokens and retry once after refreshing expired access tokens.
- **Business management**: Fetches business lists, switches active businesses, and supports inviting team members.
- **Wallet and balance screens**: Wallet lists, total balance, exchange rates, withdrawals, and settlement settings are represented in the app.
- **Payment flows**: Supports crypto payment screens, card/transfer steps, bank transfer, USSD payment, and tap-to-pay screens.
- **Team and roles**: Includes team member list/details, invitations, roles, permissions, and role creation screens.
- **Verification and KYC**: Includes personal verification, business verification, and KYC status screens.
- **Support and settings**: Includes profile, notifications, security, help center, and contact support screens.

## Tech Stack

| Area | Technology |
| --- | --- |
| Runtime | React Native 0.81, React 19, Expo SDK 54 |
| Navigation | Expo Router, React Navigation Native Stack, Bottom Tabs |
| Language | TypeScript |
| State | Zustand with persistence middleware |
| Storage | React Native AsyncStorage |
| Networking | Axios |
| UI | React Native Paper, Expo Linear Gradient, Expo Image, SVG, custom components |
| Feedback | React Native Toast Message, Expo Haptics |
| Fonts | Expo Font, Sora, Plus Jakarta Sans |
| Tooling | ESLint, Expo lint, EAS configuration |

## Project Structure

```text
.
├── api/                         # Axios client and backend service modules
├── app/                         # Expo Router routes and screen groups
│   ├── _layout.tsx              # Root layout, splash handling, providers, toast setup
│   ├── index.tsx                # Initial onboarding/auth redirect decision
│   ├── auth/                    # Authentication flow and auth screens
│   ├── main/                    # Authenticated application stack and screens
│   └── onboarding/              # First-run onboarding screens
├── assets/                      # Images, logos, icons, flags, and onboarding artwork
├── components/                  # Reusable UI, auth forms, icons, and feature components
├── constants/                   # Shared theme constants
├── context/                     # React context providers
├── data/                        # Static data used by screens and pickers
├── fonts/                       # Font loading helpers
├── hooks/                       # Shared React hooks
├── scripts/                     # Project maintenance scripts
├── stores/                      # Zustand stores
├── types/                       # TypeScript types and declarations
└── utils/                       # Utility functions and toast configuration
```

## Prerequisites

Install the following before running the project:

- **Node.js**: Use a modern LTS version compatible with Expo SDK 54.
- **npm**: The repository includes a `package-lock.json`, so npm is the expected package manager.
- **Expo CLI**: You can use it through `npx expo ...`; a global install is optional.
- **Android Studio**: Required for Android emulator builds and `npm run android`.
- **Xcode**: Required for iOS simulator/device builds and `npm run ios` on macOS.
- **Expo Go or development build**: Useful for local device testing.

## Getting Started

1. Clone the repository and enter the project directory.

   ```bash
   git clone <repository-url>
   cd mobile-app
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a local environment file.

   ```bash
   cp .env.example .env
   ```

   If `.env.example` is not available, create `.env` manually and add the variables listed in [Environment Variables](#environment-variables).

4. Start the Expo development server.

   ```bash
   npm start
   ```

5. Open the app using one of the options printed by Expo:

   - Press `a` for an Android emulator.
   - Press `i` for an iOS simulator on macOS.
   - Scan the QR code with Expo Go or a compatible development build.
   - Press `w` to open the web build.

## Environment Variables

The app reads backend configuration from Expo public environment variables.

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `EXPO_PUBLIC_BACKEND_URL` | Yes | Base URL used by the Axios API client for backend requests. | `https://api.example.com` |

Example `.env` file:

```bash
EXPO_PUBLIC_BACKEND_URL=https://api.example.com
```

> Variables prefixed with `EXPO_PUBLIC_` are exposed to the client bundle. Do not place secrets, private keys, service credentials, or production-only confidential values in these variables.

## Available Scripts

The following scripts are defined in `package.json`:

| Command | Description |
| --- | --- |
| `npm start` | Starts the Expo development server. |
| `npm run android` | Builds and runs the app on Android through Expo. |
| `npm run ios` | Builds and runs the app on iOS through Expo. |
| `npm run web` | Starts the Expo web development server. |
| `npm run lint` | Runs Expo's ESLint checks. |
| `npm run reset-project` | Runs the provided reset script for returning to a starter app structure. Use with care. |

## Application Flow

1. The root route checks AsyncStorage for `hasOnboarded`.
2. Users who have not completed onboarding are redirected to `/onboarding`.
3. Users who have completed onboarding are redirected to `/auth`.
4. OTP request and verification determine whether the user is existing, new, or invited.
5. Existing users receive an authenticated session after OTP verification.
6. New owner users complete profile details, then create a business.
7. Invited users complete profile details and can receive a session without creating a business.
8. Authenticated users enter the `/main` stack, where business data is fetched when an access token is present.

## Routing

Top-level routes are managed by Expo Router:

- `/` — Initial redirect gate.
- `/onboarding` — Onboarding flow.
- `/auth` — Authentication and profile setup flow.
- `/main` — Authenticated business dashboard and operations.
- `/modal` — Modal route example.

The authenticated area uses a native stack navigator with screens for overview, sales, balances, payments, withdrawals, transactions, team management, verification, settings, and support.

## State Management

### Auth Store

The auth store persists the current session with AsyncStorage and exposes helpers for:

- Reading the current access token, role, and user.
- Setting a full or partial session.
- Updating tokens after refresh.
- Logging out and clearing local session state.
- Checking whether the user is currently authenticated.

Persisted data is stored under the `unio-auth` key.

### Business Store

The business store manages:

- The list of businesses available to the user.
- Business loading state.
- Business fetch errors.
- Fetching businesses from the backend.
- Looking up the current business by ID.

## API Layer

API modules live in `api/` and share a common Axios client.

### Axios Client

The shared client:

- Uses `EXPO_PUBLIC_BACKEND_URL` as its base URL.
- Sends JSON requests by default.
- Attaches the persisted access token to outgoing requests.
- Handles `401` responses by attempting a refresh-token request.
- Queues concurrent requests while a refresh is already in progress.
- Clears the session and redirects to sign-in if refresh fails.

### Service Modules

- `api/otp.api.ts` — OTP request and verification.
- `api/onboarding.api.ts` — Profile completion and business creation.
- `api/businessService.api.ts` — Business listing, business switching, and team invitations.
- `api/walletService.api.ts` — Wallets, total balance, and rates.
- `api/logout.api.ts` — Backend logout and local session cleanup.

## Design System and Assets

The app uses custom reusable components, icon components, image assets, fonts, and static data files.

Notable locations:

- `components/ui/` — Reusable form controls, dropdowns, progress bars, step trackers, and cards.
- `components/auth/` — Authentication and onboarding form components.
- `components/icons/` — Custom SVG/icon components.
- `assets/logos/` — Payment and blockchain network logos.
- `assets/onboarding/` — Onboarding artwork.
- `assets/images/` — App icon, splash, and general images.
- `data/` — Payment methods, currencies, countries, states, team member mocks, transaction mocks, tiers, and USSD steps.

## Development Workflow

Recommended workflow for changes:

1. Create a feature branch.
2. Install dependencies with `npm install`.
3. Add or update code in the appropriate feature folder.
4. Run linting before committing.
5. Test the affected route on the relevant platform.
6. Commit using a clear message that describes the user-facing change.

Example:

```bash
git checkout -b feature/payment-flow-update
npm install
npm run lint
git add .
git commit -m "Improve payment flow validation"
```

## Testing and Quality Checks

This project currently exposes linting as its primary automated quality check:

```bash
npm run lint
```

For feature work, also manually validate the affected user flow in Expo on at least one target platform. Recommended smoke checks include:

- App starts without red screen errors.
- Onboarding redirects correctly for first-time users.
- OTP request and verification forms submit correctly against the configured backend.
- Authenticated sessions remain available after app restart.
- Expired access tokens refresh successfully.
- Main dashboard screens render after login.
- Payment and withdrawal flows navigate through their expected steps.

## Build and Deployment

The project includes `eas.json`, so EAS Build can be used for cloud builds.

Common commands:

```bash
npx eas build --platform android
npx eas build --platform ios
npx eas build --platform all
```

Before creating production builds:

- Confirm `EXPO_PUBLIC_BACKEND_URL` points to the correct environment.
- Verify Android package and iOS bundle configuration in `app.json`.
- Confirm app icons and splash assets exist and match branding requirements.
- Run linting and manually test the critical login and payment flows.

## Troubleshooting

### Metro or Expo cache issues

Restart the development server with a clean cache:

```bash
npx expo start --clear
```

### Environment variable is undefined

Confirm that `.env` exists and contains `EXPO_PUBLIC_BACKEND_URL`. Restart Expo after editing environment variables because Expo loads them at process start.

### API calls return unauthorized responses

Check that:

- The backend URL is correct.
- OTP verification returned valid tokens.
- Tokens are persisted in AsyncStorage.
- The refresh token endpoint is available at `/auth/token/refresh`.

### Android build fails

Try the following:

```bash
npx expo doctor
npm run android
```

Also confirm that Android Studio, SDKs, emulators, and environment variables such as `ANDROID_HOME` are correctly configured.

### iOS build fails

On macOS, verify that Xcode and command-line tools are installed, then rerun:

```bash
npm run ios
```

### Native dependency changes do not appear

If native dependencies or Expo plugins change, rebuild the native app rather than relying only on Expo Go.

## Contributing

- Keep TypeScript types updated when changing API contracts.
- Prefer reusable components in `components/ui/` for shared UI patterns.
- Keep backend calls inside `api/` service modules rather than directly in screens.
- Avoid storing secrets in public Expo environment variables.
- Run `npm run lint` before opening a pull request.
- Document new setup requirements or environment variables in this README.
