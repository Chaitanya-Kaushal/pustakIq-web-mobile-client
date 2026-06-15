/**
 * PustakIQ color tokens — "Bold Edtech" theme.
 *
 * Kept in lock-step with the website (apps/web/src/app/globals.css) and the
 * mobile NativeWind config (apps/mobile/tailwind.config.js): teal `primary`,
 * emerald `secondary`, amber `tertiary` accent, deep-teal "night" surfaces.
 */
export const colors = {
  // Surfaces — subtle teal tint (kept in sync with tailwind.config.js)
  surface: '#ffffff',
  surfaceDim: '#d7e5e1',
  surfaceBright: '#ffffff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3faf8',
  surfaceContainer: '#e9f5f2',
  surfaceContainerHigh: '#e3eae8',
  surfaceContainerHighest: '#d7e5e1',
  surfaceVariant: '#e9f5f2',

  // On-surface text
  onSurface: '#0f172a',
  onSurfaceVariant: '#475569',
  inverseSurface: '#052e2a',
  inverseOnSurface: '#f3faf8',

  // Outlines / borders
  outline: '#94a3b8',
  outlineVariant: '#e3eae8',

  // Primary (teal)
  surfaceTint: '#0d9488',
  primary: '#0d9488',
  onPrimary: '#ffffff',
  primaryContainer: '#0d9488',
  onPrimaryContainer: '#ffffff',
  inversePrimary: '#5eead4',
  primaryFixed: '#ccfbf1',
  primaryFixedDim: '#5eead4',
  onPrimaryFixed: '#052e2a',
  onPrimaryFixedVariant: '#0f766e',

  // Secondary (emerald)
  secondary: '#059669',
  onSecondary: '#ffffff',
  secondaryContainer: '#059669',
  onSecondaryContainer: '#047857',
  secondaryFixed: '#a7f3d0',
  secondaryFixedDim: '#6ee7b7',
  onSecondaryFixed: '#022c22',
  onSecondaryFixedVariant: '#047857',

  // Tertiary (amber accent)
  tertiary: '#f59e0b',
  onTertiary: '#ffffff',
  tertiaryContainer: '#f59e0b',
  onTertiaryContainer: '#ffffff',
  tertiaryFixed: '#fef3c7',
  tertiaryFixedDim: '#fcd34d',
  onTertiaryFixed: '#451a03',
  onTertiaryFixedVariant: '#d97706',

  // Error
  error: '#dc2626',
  onError: '#ffffff',
  errorContainer: '#fee2e2',
  onErrorContainer: '#b91c1c',

  // Background
  background: '#f3faf8',
  onBackground: '#0f172a',

  // Common
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // WhatsApp brand (used by the contact CTA on book/tutor/store details)
  whatsapp: '#25D366',
} as const;

export type ColorToken = keyof typeof colors;
