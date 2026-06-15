import React from 'react';
import { Image, View } from 'react-native';
import { Text } from './Text';

export interface AvatarProps {
  uri?: string;
  name: string;
  size?: number;
}

/** Circular avatar; falls back to initials when no photo is available. */
export function Avatar({ uri, name, size = 48 }: AvatarProps) {
  const dimension = { width: size, height: size };
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={dimension}
        className="rounded-full bg-surface-container-high"
      />
    );
  }
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <View
      style={dimension}
      className="items-center justify-center rounded-full bg-primary-fixed">
      <Text variant="bodyLg" weight="700" color="primary">
        {initials}
      </Text>
    </View>
  );
}
