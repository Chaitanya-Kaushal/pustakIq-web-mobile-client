/**
 * NativeWind (Tailwind for React Native) config — "Vibrant & Friendly" refresh.
 *
 * Brighter blue primary, emerald + orange accents, crisp slate text and lighter
 * borders. All previously-used token names are preserved so existing classes
 * keep working; new accent tokens (accent, purple, pink, *-soft) are added.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary — bright friendly blue
        primary: "#2563EB",
        "primary-dark": "#1D4ED8",
        "primary-container": "#2563EB",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#FFFFFF",
        "primary-soft": "#EFF6FF",
        "primary-fixed": "#DBEAFE",
        "primary-fixed-dim": "#93C5FD",

        // Secondary — emerald
        secondary: "#10B981",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#10B981",
        "on-secondary-container": "#047857",
        "secondary-soft": "#ECFDF5",

        // Tertiary / accent — warm orange (friendly)
        tertiary: "#F97316",
        "tertiary-container": "#F97316",
        "tertiary-fixed-dim": "#FDBA74",
        "on-tertiary-container": "#FFFFFF",
        accent: "#F97316",
        "on-accent": "#FFFFFF",
        "accent-soft": "#FFF7ED",

        // Extra accents for colorful tiles/badges
        purple: "#8B5CF6",
        "purple-soft": "#F5F3FF",
        pink: "#EC4899",
        "pink-soft": "#FDF2F8",
        amber: "#F59E0B",
        "amber-soft": "#FFFBEB",

        // Surfaces
        background: "#F6F7FB",
        surface: "#FFFFFF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F8FAFC",
        "surface-container": "#F1F5F9",
        "surface-container-high": "#EEF2F7",
        "surface-container-highest": "#E2E8F0",
        "surface-variant": "#EEF2F7",

        // Text
        "on-surface": "#0F172A",
        "on-surface-variant": "#64748B",

        // Lines
        outline: "#94A3B8",
        "outline-variant": "#E5E9F0",

        // Status
        error: "#EF4444",
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
