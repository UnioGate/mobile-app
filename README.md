# Uniogate Mobile App

Uniogate is an Expo and React Native mobile application for managing a business's payment activity. It provides onboarding and OTP sign-in, a business overview, payment collection flows, wallet and balance views, bank-account management, withdrawals, transaction history, team management, and verification/settings screens.

The project runs on Android, iOS, and the web from one TypeScript codebase. It uses Expo Router for the application entry point and React Navigation native stacks for the onboarding, authentication, and signed-in experiences.

## Contents

- [Capabilities](#capabilities)
- [Technology](#technology)
- [Prerequisites](#prerequisites)
- [Installation and configuration](#installation-and-configuration)
- [Run the app](#run-the-app)
- [Available commands](#available-commands)
- [Project structure](#project-structure)
- [Application flow](#application-flow)
- [Backend integration](#backend-integration)
- [State, networking, and persistence](#state-networking-and-persistence)
- [Development notes](#development-notes)
- [Troubleshooting](#troubleshooting)

## Capabilities

### Access and onboarding

- Two-step product onboarding, remembered locally after completion.
- OTP request and verification for sign-in and registration.
- Personal-profile completion and business creation for owners.
- Support for invited sales representatives, who can receive a session as part of profile completion.
- Persisted authentication state with logout support and automatic redirect to sign-in when a session can no longer be refreshed.

### Payments and sales

- Create sales/payment sessions.
- Collect through card, bank transfer, USSD, and crypto-oriented payment flows.
- Poll or retrieve an individual sale and manually confirm eligible pending sales.
- Browse transaction history and inspect transaction details.
- View sales-oriented overview data, including today's confirmed sales calculated from sale history.

### Wallets, settlement, and withdrawals

- Fetch business wallets, total NGN balance, and currency exchange rates.
- Display balance, payment methods, and settlement settings.
- Add, resolve, list, and delete bank accounts.
- Withdraw NGN to a bank account, withdraw crypto to an external address, or off-ramp crypto to NGN through a bank.
- View off-ramp history and mark an off-ramp as complete where permitted by the backend.

### Business administration

- List and switch between businesses.
- Invite team members and view team-member details.
- Access roles and permissions, business information, personal/business verification, transaction limits, security, notification, support, and help-center screens.

## Technology

| Area | Tools |
| --- | --- |
| Runtime | Expo SDK 54, React 19, React Native 0.81 |
| Navigation | Expo Router and React Navigation native stacks |
| Language | TypeScript with strict type checking |
| Server communication | Axios |
| Client state | Zustand; authentication is persisted with AsyncStorage |
| UI and device APIs | React Native Paper, Reanimated, Lottie, Expo Font, NetInfo, React Native SVG, and Expo modules |
| Quality checks | ESLint through Expo |

## Prerequisites

- **Node.js 20 LTS or newer** is recommended for the Expo SDK used by this project.
- npm (included with Node.js). This repository includes `package-lock.json`, so use `npm ci` for a reproducible install.
- For native builds, install the platform tooling described by Expo:
  - Android Studio and an Android emulator/device for Android.
  - Xcode and a simulator/device for iOS (macOS only).
- A reachable Uniogate backend URL. The mobile client does not provide a local backend.

## Installation and configuration

1. Clone the repository and enter it:

   ```bash
   git clone <repository-url>
   cd mobile-app
   ```

2. Install the locked dependency set:

   ```bash
   npm ci
   ```

3. Create a local environment file named `.env` in the repository root:

   ```dotenv
   EXPO_PUBLIC_BACKEND_URL=https://your-api.example.com
   ```

   `EXPO_PUBLIC_BACKEND_URL` is the Axios base URL for every API request. Do not put secrets in an `EXPO_PUBLIC_` variable: Expo makes these values available to the client bundle.

4. Start the development server:

   ```bash
   npm start
   ```

> **Backend requirement:** Configure a server compatible with the endpoints in [Backend integration](#backend-integration) before attempting authenticated flows. The app expects JSON responses that contain the fields consumed by the API modules.

## Run the app

Start Expo and select a target from the interactive terminal UI:

```bash
npm start
```

Or start a specific target directly:

```bash
# Android native development build
npm run android

# iOS native development build (macOS required)
npm run ios

# Web development server
npm run web
```

For device testing, Expo's terminal UI can open a development build or Expo Go when the installed dependencies and native capabilities are supported by that client.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Expo development server. |
| `npm run android` | Build and launch the Android app with Expo. |
| `npm run ios` | Build and launch the iOS app with Expo. |
| `npm run web` | Start the app for the web. |
| `npm run lint` | Run Expo's ESLint integration. |
| `npm run reset-project` | Run the Expo starter reset script. This is a destructive scaffolding utility; do not run it on an active checkout unless that is explicitly intended. |

## Project structure

```text
app/                     Route entry points, navigation stacks, and screens
  auth/                  OTP sign-in, account creation, and profile screens
  onboarding/            First-run onboarding screens
  main/                  Authenticated business, payment, wallet, and settings screens
api/                     Axios client plus backend endpoint wrappers
assets/                  Images, icons, logos, animations, and onboarding artwork
components/              Shared UI, auth, network, transaction, and icon components
context/                 Network and multi-step-flow React contexts
data/                    Static payment, currency, network, tier, and mock data
fonts/                   Expo font registration
hooks/                   Theme and countdown hooks
stores/                  Zustand stores for auth, wallets, sales, banks, business, and tiers
types/                   Shared TypeScript domain and API types
utils/                   Utility functions and toast configuration
```

The `@/` import alias resolves to the repository root. For example, `@/api/axios` resolves to `api/axios.ts`.

## Application flow

1. **Launch:** The root route checks network availability and reads the `hasOnboarded` flag from AsyncStorage. First-time users are sent to onboarding; returning users are sent to authentication.
2. **Onboarding:** The onboarding stack presents two introductory screens. Completion is persisted locally by the UI flow.
3. **Authentication:** The authentication experience uses a step context to coordinate sign-in, OTP, account creation, and personal-information steps.
4. **Session creation:** OTP verification establishes a session for existing users. New owners complete a profile and create a business; invited representatives can receive their session during profile completion.
5. **Authenticated area:** The main stack requires an access token. It loads businesses and banks for signed-in users; owner sessions additionally load bank accounts and wallets.
6. **Session expiry:** Requests include the current bearer token. On a `401`, the client performs one refresh request and retries queued requests with the resulting access token. If refresh fails, local auth state is cleared and the user is returned to sign-in.

## Backend integration

All requests use `EXPO_PUBLIC_BACKEND_URL` as their base URL, send JSON, and time out after 10 seconds. The Axios interceptor adds `Authorization: Bearer <accessToken>` whenever a session exists.

| Area | Client endpoints |
| --- | --- |
| Authentication | `POST /auth/otp/request`, `POST /auth/otp/verify`, `POST /auth/token/refresh`, `POST /auth/logout` |
| Onboarding | `POST /onboarding/complete-profile`, `POST /onboarding/create-business`, `POST /onboarding/invite-sales-rep` |
| Businesses | `GET /business/list`, `POST /business/switch` |
| Sales | `POST /sales/create`, `GET /sales/:id`, `GET /sales/list`, `PUT /sales/:id/confirm` |
| Wallets | `GET /wallets`, `GET /wallets/total-balance`, `GET /wallets/rates` |
| Bank accounts | `GET /bank-accounts/banks`, `GET/POST /bank-accounts`, `POST /bank-accounts/resolve`, `DELETE /bank-accounts/:id` |
| Withdrawals | `POST /withdraw/bank`, `POST /withdraw/crypto`, `POST /withdraw/offramp`, `GET /withdraw/offramp/history`, `PUT /withdraw/offramp/:id/complete` |

The client expects a refresh response to contain `accessToken` and `refreshToken`. Login and business-creation responses are also expected to provide user/role/session information used by the relevant screens. Keep backend response shapes aligned with the TypeScript types in `types/types.ts` and the return-value handling in `api/`.

## State, networking, and persistence

- **Authentication:** `stores/authStore.ts` persists access tokens, refresh tokens, user data, and the active business role under the AsyncStorage key `unio-auth`.
- **Business context:** The business store retrieves available businesses. Switching businesses replaces the access token with one scoped to the selected business role.
- **Wallet data:** Wallets, balance, and rates are kept in the wallet store. Rates are cached for 25 minutes after their recorded fetch timestamp.
- **Sales data:** The sales store holds in-progress sale data, payment-session state, timeout state, and sales history. It derives today's confirmed sales and their total locally.
- **Bank data:** Bank accounts and bank lists are stored in the bank store; it also fetches a public Nigerian-bank-logo JSON resource for display.
- **Connectivity:** `NetworkProvider` listens to React Native NetInfo. The root route renders an offline screen when the app starts without connectivity, and a global network modal can be displayed when connectivity is lost later.
- **Feedback and theming:** The root layout registers fonts, controls the native and animated splash screens, provides the system light/dark navigation theme, and mounts the shared toast configuration.

## Development notes

### Navigation

The Expo Router root layout defines the high-level routes (`index`, `onboarding`, `auth`, and `main`). Each feature area then uses a native stack navigator to register its screens. Add a screen to the appropriate stack when adding a route that needs to be reachable through that experience.

### TypeScript and imports

TypeScript strict mode is enabled. Place reusable API/domain types in `types/` and prefer the `@/` alias over long relative import paths.

### Environment variables

Restart Expo after changing `.env` values. Values prefixed with `EXPO_PUBLIC_` are intentionally public at runtime, so backend URLs are appropriate but API secrets and private credentials are not.

### Linting

Run the lint check before submitting changes:

```bash
npm run lint
```

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Requests fail immediately or use an unexpected host | Confirm `.env` exists, `EXPO_PUBLIC_BACKEND_URL` is set to the correct URL, and restart Expo. |
| The app redirects to sign-in | The access token may be absent, expired, or unable to refresh. Confirm the refresh-token endpoint and response fields. |
| Native app cannot connect to a local backend | A device cannot reach its own `localhost` as your development machine. Use a LAN-reachable host/IP or an HTTPS tunnel as appropriate. |
| Offline UI is shown | Verify the device/emulator network connection and whether its internet reachability is being reported by NetInfo. |
| Android or iOS build cannot start | Check the relevant Expo, Android Studio, or Xcode setup and ensure a device/emulator is available. |

## Further reading

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [React Native documentation](https://reactnative.dev/docs/getting-started)
- [Zustand documentation](https://zustand.docs.pmnd.rs/)
