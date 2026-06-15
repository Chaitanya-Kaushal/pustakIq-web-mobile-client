/**
 * NativeWind (Tailwind for React Native) config.
 *
 * Colors mirror packages/theme (DESIGN.md) so existing semantic names map 1:1
 * to utility classes — e.g. `bg-primary-container`, `text-on-surface-variant`.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#004ac6",
        "primary-container": "#2563eb",
        "on-primary": "#ffffff",
        "on-primary-container": "#eeefff",
        "primary-fixed": "#dbe1ff",
        "primary-fixed-dim": "#b4c5ff",

        secondary: "#006c49",
        "on-secondary": "#ffffff",
        "secondary-container": "#6cf8bb",
        "on-secondary-container": "#00714d",

        tertiary: "#943700",
        "tertiary-container": "#bc4800",
        "tertiary-fixed-dim": "#ffb596",
        "on-tertiary-container": "#ffede6",

        // Surfaces
        background: "#faf8ff",
        surface: "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3fe",
        "surface-container": "#ededf9",
        "surface-container-high": "#e7e7f3",
        "surface-container-highest": "#e1e2ed",
        "surface-variant": "#e1e2ed",

        // Text
        "on-surface": "#191b23",
        "on-surface-variant": "#434655",

        // Lines
        outline: "#737686",
        "outline-variant": "#c3c6d7",

        // Status
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Brand extras
        whatsapp: "#25D366",
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
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
