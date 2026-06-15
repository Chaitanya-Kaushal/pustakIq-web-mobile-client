# Fonts

Place the **Plus Jakarta Sans** TTF files here, then run
`npx react-native-asset` from `apps/mobile` to link them into iOS & Android.

Required files (download from https://fonts.google.com/specimen/Plus+Jakarta+Sans):

- `PlusJakartaSans-Regular.ttf`
- `PlusJakartaSans-Medium.ttf`
- `PlusJakartaSans-SemiBold.ttf`
- `PlusJakartaSans-Bold.ttf`
- `PlusJakartaSans-ExtraBold.ttf`

These PostScript names must match `packages/theme/src/typography.ts`.

Until the TTFs are added, text falls back to the system font (the app still runs).

For **react-native-vector-icons**, also follow its linking steps (README → Icons).
