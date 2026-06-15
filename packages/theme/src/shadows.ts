import { Platform } from 'react-native';

/**
 * "Soft-Focus" ambient shadow from DESIGN.md:
 * 0px 4px 12px rgba(17, 24, 39, 0.05).
 * Returns RN-compatible elevation/shadow props per platform.
 */
export const shadows = {
  none: {},
  soft: Platform.select({
    ios: {
      shadowColor: '#111827',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }) as object,
  card: Platform.select({
    ios: {
      shadowColor: '#111827',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: {
      elevation: 1,
    },
    default: {},
  }) as object,
  raised: Platform.select({
    ios: {
      shadowColor: '#111827',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
    },
    android: {
      elevation: 6,
    },
    default: {},
  }) as object,
} as const;
