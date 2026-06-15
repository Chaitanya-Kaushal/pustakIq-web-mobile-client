import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { colors, typography, TextVariant, ColorToken } from '@pustakiq/theme';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: ColorToken;
  weight?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
}

/**
 * Typed text primitive. Applies a typography token + semantic color so screens
 * never hand-roll font sizes. Defaults to bodyMd / onSurface.
 */
export function Text({
  variant = 'bodyMd',
  color = 'onSurface',
  weight,
  align,
  style,
  ...rest
}: TextProps) {
  return (
    <RNText
      style={[
        typography[variant],
        { color: colors[color] },
        weight ? { fontWeight: weight } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
      {...rest}
    />
  );
}
