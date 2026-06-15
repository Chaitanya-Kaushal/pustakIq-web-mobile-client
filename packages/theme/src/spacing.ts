/** 8px soft-grid spacing scale (DESIGN.md → Layout & Spacing). */
export const spacing = {
  base: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  /** Standard mobile side margin. */
  marginMobile: 16,
  /** Gutter between grid items on mobile. */
  gutterMobile: 12,
} as const;

/**
 * Corner radii. DESIGN.md: cards 16px, buttons/inputs 12px,
 * chips full-pill. Small components 8px.
 */
export const radius = {
  sm: 8,
  button: 12,
  input: 12,
  card: 16,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/** Minimum touch target per DESIGN.md accessibility note. */
export const touchTarget = 48;

export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radius;
