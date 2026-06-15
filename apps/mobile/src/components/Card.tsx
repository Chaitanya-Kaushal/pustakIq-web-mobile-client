import React from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

export interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  /** Escape hatch for dynamic styles (e.g. translucent backgrounds). */
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  elevated?: boolean;
}

/** Surface container card: 16px radius, 1px border, optional soft shadow. */
export function Card({
  children,
  onPress,
  className,
  style,
  padded = true,
  elevated = false,
}: CardProps) {
  const classes = [
    'rounded-card border border-outline-variant bg-surface-container-lowest',
    'shadow-sm shadow-black/5',
    padded ? 'p-4' : '',
    elevated ? 'shadow-md shadow-primary/10' : '',
    className ?? '',
  ].join(' ');

  if (onPress) {
    return (
      <Pressable onPress={onPress} className={`${classes} active:opacity-95`} style={style}>
        {children}
      </Pressable>
    );
  }
  return (
    <View className={classes} style={style}>
      {children}
    </View>
  );
}
