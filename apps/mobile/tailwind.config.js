/**
 * NativeWind (Tailwind for React Native) config — "Bold Edtech" theme.
 *
 * Kept in lock-step with the website (apps/web globals.css): teal primary,
 * emerald secondary, amber accent and a deep-teal "night" surface for dark
 * hero bands. All previously-used token names are preserved so existing
 * classes keep working; only their values changed.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary — teal (Bold Edtech)
        primary: "#0D9488",
        "primary-dark": "#0F766E",
        "primary-container": "#0D9488",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#FFFFFF",
        "primary-soft": "#F0FDFA",
        "primary-fixed": "#CCFBF1",
        "primary-fixed-dim": "#5EEAD4",

        // Secondary — emerald
        secondary: "#059669",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#059669",
        "on-secondary-container": "#047857",
        "secondary-soft": "#ECFDF5",

        // Tertiary / accent — amber
        tertiary: "#F59E0B",
        "tertiary-container": "#F59E0B",
        "tertiary-fixed-dim": "#FCD34D",
        "on-tertiary-container": "#FFFFFF",
        accent: "#F59E0B",
        "accent-dark": "#D97706",
        "on-accent": "#FFFFFF",
        "accent-soft": "#FFFBEB",

        // Deep-teal "night" surfaces for dark hero bands (matches web)
        night: "#052E2A",
        "night-2": "#0A3F39",
        "night-soft": "#0F4D45",

        // Extra accents for colorful tiles/badges
        purple: "#8B5CF6",
        "purple-soft": "#F5F3FF",
        pink: "#EC4899",
        "pink-soft": "#FDF2F8",
        amber: "#F59E0B",
        "amber-soft": "#FFFBEB",

        // Surfaces — subtle teal tint (matches web)
        background: "#F3FAF8",
        surface: "#FFFFFF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F3FAF8",
        "surface-container": "#E9F5F2",
        "surface-container-high": "#E3EAE8",
        "surface-container-highest": "#D7E5E1",
        "surface-variant": "#E9F5F2",

        // Text
        "on-surface": "#0F172A",
        "on-surface-variant": "#475569",

        // Lines
        outline: "#94A3B8",
        "outline-variant": "#E3EAE8",

        // Status
        error: "#DC2626",
        "error-container": "#FEE2E2",
        "on-error-container": "#B91C1C",

        whatsapp: "#25D366",
      },
      borderRadius: {
        card: "20px",
        btn: "14px",
      },
      fontFamily: {
        sans: ["PlusJakartaSans-Regular"],
        medium: ["PlusJakartaSans-Medium"],
        semibold: ["PlusJakartaSans-SemiBold"],
        bold: ["PlusJakartaSans-Bold"],
        extrabold: ["PlusJakartaSans-ExtraBold"],
      },
    },
  },
  plugins: [],
};
