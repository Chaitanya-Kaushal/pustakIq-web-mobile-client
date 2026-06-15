import React from 'react';
import { Pressable, View } from 'react-native';
import { colors } from '@pustakiq/theme';
import { Text } from './Text';
import { Icon, IconName } from './Icon';

export interface CategoryTileProps {
  label: string;
  icon: IconName;
  tint: string;
  background: string;
  onPress?: () => void;
}

export function CategoryTile({ label, icon, tint, background, onPress }: CategoryTileProps) {
  return (
    <Pressable onPress={onPress} className="w-[72px] items-center gap-2">
      <View
        className="h-16 w-16 items-center justify-center rounded-2xl"
        style={{ backgroundColor: background }}>
        <Icon name={icon} size={28} tint={tint} />
      </View>
      <Text variant="labelSm" align="center">
        {label}
      </Text>
    </Pressable>
  );
}

export const CATEGORY_COLORS = {
  schoolBooks: { tint: colors.primary, background: '#EAF1FF' },
  examBooks: { tint: colors.secondary, background: '#E6F8F0' },
  tutors: { tint: colors.tertiary, background: '#FFEDE6' },
  stores: { tint: colors.onSurfaceVariant, background: colors.surfaceContainerHigh },
};
