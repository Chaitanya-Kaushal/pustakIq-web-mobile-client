/**
 * PustakIQ color tokens.
 *
 * Source of truth: stitch_pustakiq_education_platform_ui/pustakiq/DESIGN.md
 * (Material 3 token set used verbatim by the Stitch HTML mockups).
 *
 * Semantic note: `primary` (#004ac6) is the deep brand blue used for the logo,
 * prices and active text. `primaryContainer` (#2563eb) is the brighter blue used
 * for filled buttons / pressed surfaces — this is the "Primary Blue #2563EB"
 * referenced in the DESIGN.md prose.
 */
export const colors = {
  // Surfaces — "Vibrant & Friendly" refresh (kept in sync with tailwind.config.js)
  surface: '#ffffff',
  surfaceDim: '#e2e8f0',
  surfaceBright: '#ffffff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f8fafc',
  surfaceContainer: '#f1f5f9',
  surfaceContainerHigh: '#eef2f7',
  surfaceContainerHighest: '#e2e8f0',
  surfaceVariant: '#eef2f7',

  // On-surface text
  onSurface: '#0f172a',
  onSurfaceVariant: '#64748b',
  inverseSurface: '#1e293b',
  inverseOnSurface: '#f8fafc',

  // Outlines / borders
  outline: '#94a3b8',
  outlineVariant: '#e5e9f0',

  // Primary (bright friendly blue)
  surfaceTint: '#2563eb',
  primary: '#2563eb',
  onPrimary: '#ffffff',
  primaryContainer: '#2563eb',
  onPrimaryContainer: '#ffffff',
  inversePrimary: '#93c5fd',
  primaryFixed: '#dbeafe',
  primaryFixedDim: '#93c5fd',
  onPrimaryFixed: '#0a1f44',
  onPrimaryFixedVariant: '#1d4ed8',

  // Secondary (emerald)
  secondary: '#10b981',
  onSecondary: '#ffffff',
  secondaryContainer: '#10b981',
  onSecondaryContainer: '#047857',
  secondaryFixed: '#a7f3d0',
  secondaryFixedDim: '#6ee7b7',
  onSecondaryFixed: '#022c22',
  onSecondaryFixedVariant: '#047857',

  // Tertiary (warm orange)
  tertiary: '#f97316',
  onTertiary: '#ffffff',
  tertiaryContainer: '#f97316',
  onTertiaryContainer: '#ffffff',
  tertiaryFixed: '#ffedd5',
  tertiaryFixedDim: '#fdba74',
  onTertiaryFixed: '#431407',
  onTertiaryFixedVariant: '#c2410c',

  // Error
  error: '#ef4444',
  onError: '#ffffff',
  errorContainer: '#fee2e2',
  onErrorContainer: '#b91c1c',

  // Background
  background: '#f6f7fb',
  onBackground: '#0f172a',

  // Common
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // WhatsApp brand (used by the contact CTA on book/tutor/store details)
  whatsapp: '#25D366',
} as const;

export type ColorToken = keyof typeof colors;
