import React from 'react';
import { View } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@pustakiq/theme';

export interface ScreenProps {
  children: React.ReactNode;
  /** Which safe-area edges to pad. Defaults to top only (tab bar handles bottom). */
  edges?: Edge[];
  className?: string;
  backgroundColor?: string;
}

/** Standard screen container with safe-area handling and brand background. */
export function Screen({
  children,
  edges = ['top'],
  className,
  backgroundColor = colors.background,
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor }}>
      <View className={`flex-1 ${className ?? ''}`}>{children}</View>
    </SafeAreaView>
  );
}
