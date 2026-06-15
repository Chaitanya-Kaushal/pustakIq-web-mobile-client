import React from 'react';
import { Pressable, View } from 'react-native';
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
    <Pressable onPress={onPress} className="w-[76px] items-center gap-2 active:opacity-80">
      <View
        className="h-[68px] w-[68px] items-center justify-center rounded-[22px]"
        style={{ backgroundColor: background }}>
        <Icon name={icon} size={30} tint={tint} />
      </View>
      <Text variant="labelSm" weight="600" align="center">
        {label}
      </Text>
    </Pressable>
  );
}

export const CATEGORY_COLORS = {
  schoolBooks: { tint: '#0D9488', background: '#F0FDFA' },
  examBooks: { tint: '#10B981', background: '#ECFDF5' },
  tutors: { tint: '#F59E0B', background: '#FFFBEB' },
  stores: { tint: '#8B5CF6', background: '#F5F3FF' },
};
