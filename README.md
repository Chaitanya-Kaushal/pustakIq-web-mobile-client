# PustakIQ

India's hyperlocal **education community platform** — connecting parents, students,
tutors and book stores around a school-first / exam-first discovery model
(`Location → School → Class → Books` and `Location → Exam → Books`).

This repository is a **monorepo**. The mobile app is built first; the website,
admin dashboard and backend are planned to drop in alongside it and share the
same domain types and design tokens.

> 📌 The product is a **discovery + lead-generation** platform. Buyers contact
> sellers/tutors/stores directly via **Call / WhatsApp** — there is no in-app
> cart or payment in the MVP (payments arrive in a later roadmap version).

---

## Monorepo layout

```
pustakiq/
├── apps/
│   ├── mobile/          # React Native CLI app (Android + iOS)
│   └── web/             # Next.js 16 website (App Router, Tailwind v4)
├── packages/
│   ├── shared/          # Domain types, enums, mock data, format helpers
│   └── theme/           # Design tokens from DESIGN.md (colors, type, spacing)
├── package.json         # npm workspaces root
├── turbo.json           # Turborepo task pipeline
└── tsconfig.base.json   # Shared TS config + path aliases
```

Future apps slot in cleanly: `apps/admin` (Next.js) and `apps/api` (NestJS) —
all importing from `@pustakiq/shared`.

Workspace packages:

| Package | Import | Purpose |
|---|---|---|
| `@pustakiq/shared` | types, enums, mock data, `formatPrice`, … | shared by mobile **and** web |
| `@pustakiq/theme` | `colors`, `typography`, `spacing`, `radius`, `shadows` | mobile design system (RN) |
| `@pustakiq/mobile` | the React Native app | — |
| `@pustakiq/web` | the Next.js website | — |

We use **npm workspaces** (not pnpm/yarn) deliberately: pnpm's symlink layout
breaks Metro and CocoaPods in bare React Native. The website reuses
`@pustakiq/shared` for its types and mock data (so the same books/tutors/stores
render on both); its design tokens live in `apps/web/src/app/globals.css`
(Tailwind v4 `@theme`), mirroring DESIGN.md.

We use **npm workspaces** (not pnpm/yarn) deliberately: pnpm's symlink layout
breaks Metro and CocoaPods in bare React Native.

---

## Tech

- **React Native 0.86** (bare CLI, TypeScript) — single codebase → Android + iOS
- **NativeWind v4** (Tailwind CSS for React Native) — styling via `className`
- **React Navigation 7** — native-stack + bottom-tabs
- **react-native-vector-icons** (MaterialCommunityIcons)
- **AsyncStorage** — persists the (stubbed) session
- **Turborepo** — task orchestration

Styling uses **Tailwind classes** (`className`) via NativeWind. Design tokens live
in `apps/mobile/tailwind.config.js` (mirroring DESIGN.md), so classes like
`bg-primary-container` and `text-on-surface-variant` match the palette. The typed
`Text` and `Icon` components are kept as design-system primitives (typography +
icon font); everything else uses `className`. Dynamic values (safe-area insets,
computed colors, `useWindowDimensions`) stay as inline `style`.

Auth is **stubbed**: the Mobile-OTP and Google flows render their real UI but
resolve to a mock user (any 6-digit OTP passes). Wire the real
`/auth/*` endpoints later — see `apps/mobile/src/auth/AuthContext.tsx`.

---

## Website (`apps/web`)

A **Next.js 16** site (App Router, **TypeScript**, **Tailwind CSS v4**), light
theme, built for discovery / SEO / lead-gen per the PRD. Like the app, contact
is **Call / WhatsApp** — no cart.

Run it (from repo root):

```bash
npm run web            # dev server → http://localhost:3000
npm run web:build      # production build (prerenders all pages)
npm run web:start      # serve the production build
```

Pages: Home, Books (`/books` with `?q=`/`?category=` filters) + book detail,
Tutors + detail, Stores + detail, **School pages** (`/schools/[slug]`),
**Exam pages** (`/exam-books/[exam]`), Blog + posts, About, Contact, plus a
generated `sitemap.xml`. Most pages are statically generated (SSG) from
`@pustakiq/shared` mock data; swap `apps/web/src/lib/data.ts` for an API client
when the backend lands.

Design tokens live in `apps/web/src/app/globals.css` (Tailwind v4 `@theme`),
mirroring DESIGN.md. Icons use `lucide-react`; font is Plus Jakarta Sans via
`next/font`.

---

## Prerequisites

| Tool | Notes |
|---|---|
| **Node ≥ 22.11** | Node 26 works. |
| **Watchman** | `brew install watchman` (recommended for Metro). |
| **Xcode** (full) + CocoaPods | iOS builds. CocoaPods needs Ruby ≥ 2.7 — use `rbenv`/`brew` Ruby, not system 2.6. |
| **JDK 17** + Android Studio (SDK + an emulator) | Android builds. |

Follow the official environment guide:
<https://reactnative.dev/docs/set-up-your-environment> (React Native CLI tab).

---

## Setup

```bash
# from the repo root
npm install            # installs all workspaces + links shared/theme
```

### iOS native deps (first time + after adding native modules)

```bash
cd apps/mobile/ios
bundle install         # once
bundle exec pod install
cd ..
```

### Icons (already wired)

Icons use **react-native-vector-icons** (MaterialCommunityIcons — see
`apps/mobile/src/components/Icon.tsx`).

- **Android:** the font is committed at
  `apps/mobile/android/app/src/main/assets/fonts/MaterialCommunityIcons.ttf`.
  Gradle packages everything under `src/main/assets`, so icons work on every
  build with no extra step. (We bundle the `.ttf` directly rather than via
  `fonts.gradle`, which was unreliable with vector-icons 10.3 + Gradle 9.)
  If you add another icon family, copy its `.ttf` from
  `node_modules/react-native-vector-icons/Fonts/` into that folder and rebuild.
- **iOS (later):** add the `.ttf`s to the Xcode project + `UIAppFonts` in
  `Info.plist`, or run `npx react-native-asset` once.

> Changing icon fonts requires a **native rebuild** (`npm run mobile:android`),
> not just a Metro reload — fonts are loaded from native assets.

### Fonts (optional polish)

The design specifies **Plus Jakarta Sans**. The app runs without it (text falls
back to the system font). To match the design exactly, download the
[Plus Jakarta Sans TTFs](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
into `apps/mobile/assets/fonts/` (filenames in
[assets/fonts/README.md](apps/mobile/assets/fonts/README.md)) and run
`cd apps/mobile && npx react-native-asset`.

---

## Run

```bash
# Start Metro (from repo root)
npm run mobile

# In another terminal — build & launch
npm run mobile:ios        # or:  npm run mobile:android
```

Or from `apps/mobile`: `npm start`, then `npm run ios` / `npm run android`.

---

## Quality checks

```bash
# from apps/mobile
npm run typecheck     # tsc --noEmit         (app)
npm test              # jest                 (shared-helper smoke tests)
npm run lint          # eslint

# from repo root (via Turborepo)
npm run typecheck     # typechecks every workspace
```

CI-equivalent sanity bundle (no simulator needed):

```bash
cd apps/mobile
npx react-native bundle --platform ios --dev true \
  --entry-file index.js --bundle-output /tmp/pustakiq.ios.bundle \
  --assets-dest /tmp/pustakiq-assets
```

---

## App structure (`apps/mobile/src`)

```
auth/           AuthContext (stub: OTP + Google → mock user, AsyncStorage)
components/      Design-system primitives + domain cards
                (Text, Icon, Button, Card, Chip, Badge, SearchBar, TextField,
                 SelectChips, BookCard*, TutorCard, StoreCard, ContactBar, …)
navigation/      RootNavigator (auth ⇄ signed-in), TabNavigator, AuthNavigator
screens/         All app screens (see below)
utils/           contact.ts — Call / WhatsApp / Directions via Linking
```

### Screens

| Area | Screens |
|---|---|
| Auth | Splash, Onboarding, Login, OTP |
| Tabs | Home, Books (School/Exam tabs), Tutors, Stores, Profile |
| Books | Book Details, **Browse by School** (State→City→Area→School→Class), Search |
| Detail | Tutor Details, Store Details |
| Profile | My Listings, Sell a Book, Become a Tutor, Register Store, Edit Profile, Settings, Notifications |

Screens with mockups (Splash, Onboarding, Login, Home, Books, Book Details) are
built faithful to `stitch_pustakiq_education_platform_ui/`; the rest are derived
from the PRD.

---

## Roadmap / next steps

- Replace stub auth with real OTP + Google (`/auth/login`, `/auth/verify-otp`, `/auth/google`).
- Swap `@pustakiq/shared` mock selectors for an API client (NestJS backend).
- Add `apps/web` + `apps/admin` (Next.js) and `apps/api` (NestJS) to the monorepo.
- Image upload for listings (replace the photo-picker placeholders).
- Functional filters (Class/Subject/Condition/Price) backed by Meilisearch.

See [prd.md](prd.md) for the full product spec and future versions.
