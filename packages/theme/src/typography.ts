/**
 * Typography tokens — Plus Jakarta Sans.
 *
 * Font-family strings match the PostScript names of the bundled TTFs
 * (see apps/mobile/react-native.config.js / Info.plist linking). On web the
 * variable font is loaded and `fontWeight` is used directly.
 */
export const fontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
} as const;

export type TextVariant =
  | 'headlineLg'
  | 'headlineMd'
  | 'headlineSm'
  | 'bodyLg'
  | 'bodyMd'
  | 'labelMd'
  | 'labelSm';

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight:
    | '400'
    | '500'
    | '600'
    | '700'
    | '800';
  lineHeight: number;
  letterSpacing?: number;
}

export const typography: Record<TextVariant, TypographyStyle> = {
  headlineLg: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.56, // -0.02em * 28
  },
  headlineMd: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.22, // -0.01em * 22
  },
  headlineSm: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodyLg: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  labelMd: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.12, // 0.01em * 12
  },
  labelSm: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14,
  },
};
