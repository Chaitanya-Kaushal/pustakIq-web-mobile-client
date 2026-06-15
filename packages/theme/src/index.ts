export { colors } from './colors';
export type { ColorToken } from './colors';

export { fontFamily, typography } from './typography';
export type { TextVariant, TypographyStyle } from './typography';

export { spacing, radius, touchTarget } from './spacing';
export type { Spacing, Radius } from './spacing';

export { shadows } from './shadows';

import { colors } from './colors';
import { typography, fontFamily } from './typography';
import { spacing, radius, touchTarget } from './spacing';
import { shadows } from './shadows';

/** Convenience aggregate used by the mobile ThemeProvider. */
export const theme = {
  colors,
  typography,
  fontFamily,
  spacing,
  radius,
  touchTarget,
  shadows,
} as const;

export type Theme = typeof theme;
