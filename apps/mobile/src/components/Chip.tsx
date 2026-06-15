import React from 'react';
import { Pressable } from 'react-native';
import { colors } from '@pustakiq/theme';
import { Text } from './Text';
import { Icon, IconName } from './Icon';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  trailingIcon?: IconName;
}

/** Pill-shaped filter chip (DESIGN.md → full-radius chips). */
export function Chip({ label, selected, onPress, trailingIcon }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-1 rounded-full px-4 py-2 ${
        selected ? 'bg-primary-container' : 'bg-surface-container-high'
      }`}>
      <Text
        variant="labelMd"
        weight="600"
        color={selected ? 'onPrimaryContainer' : 'onSurfaceVariant'}>
        {label}
      </Text>
      {trailingIcon ? (
        <Icon
          name={trailingIcon}
          size={16}
          tint={selected ? colors.onPrimaryContainer : colors.onSurfaceVariant}
        />
      ) : null}
    </Pressable>
  );
}
