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
  // Surfaces
  surface: '#faf8ff',
  surfaceDim: '#d9d9e5',
  surfaceBright: '#faf8ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f3fe',
  surfaceContainer: '#ededf9',
  surfaceContainerHigh: '#e7e7f3',
  surfaceContainerHighest: '#e1e2ed',
  surfaceVariant: '#e1e2ed',

  // On-surface text
  onSurface: '#191b23',
  onSurfaceVariant: '#434655',
  inverseSurface: '#2e3039',
  inverseOnSurface: '#f0f0fb',

  // Outlines / borders
  outline: '#737686',
  outlineVariant: '#c3c6d7',

  // Primary (brand blue)
  surfaceTint: '#0053db',
  primary: '#004ac6',
  onPrimary: '#ffffff',
  primaryContainer: '#2563eb',
  onPrimaryContainer: '#eeefff',
  inversePrimary: '#b4c5ff',
  primaryFixed: '#dbe1ff',
  primaryFixedDim: '#b4c5ff',
  onPrimaryFixed: '#00174b',
  onPrimaryFixedVariant: '#003ea8',

  // Secondary (success green)
  secondary: '#006c49',
  onSecondary: '#ffffff',
  secondaryContainer: '#6cf8bb',
  onSecondaryContainer: '#00714d',
  secondaryFixed: '#6ffbbe',
  secondaryFixedDim: '#4edea3',
  onSecondaryFixed: '#002113',
  onSecondaryFixedVariant: '#005236',

  // Tertiary (warm accent)
  tertiary: '#943700',
  onTertiary: '#ffffff',
  tertiaryContainer: '#bc4800',
  onTertiaryContainer: '#ffede6',
  tertiaryFixed: '#ffdbcd',
  tertiaryFixedDim: '#ffb596',
  onTertiaryFixed: '#360f00',
  onTertiaryFixedVariant: '#7d2d00',

  // Error
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  // Background
  background: '#faf8ff',
  onBackground: '#191b23',

  // Common
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // WhatsApp brand (used by the contact CTA on book/tutor/store details)
  whatsapp: '#25D366',
} as const;

export type ColorToken = keyof typeof colors;
