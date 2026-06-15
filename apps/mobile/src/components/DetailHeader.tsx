import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './Text';
import { Icon, IconName } from './Icon';

export interface DetailHeaderAction {
  icon: IconName;
  onPress: () => void;
}

export interface DetailHeaderProps {
  title?: string;
  onBack: () => void;
  actions?: DetailHeaderAction[];
  /** Transparent variant for image-led detail screens. */
  transparent?: boolean;
}

export function DetailHeader({
  title,
  onBack,
  actions = [],
  transparent,
}: DetailHeaderProps) {
  return (
    <View
      className={`h-14 flex-row items-center px-2 ${
        transparent ? '' : 'border-b border-outline-variant bg-surface'
      }`}>
      <Pressable
        onPress={onBack}
        hitSlop={8}
        className="h-11 w-11 items-center justify-center">
        <Icon name="arrow_back" size={24} color="onSurface" />
      </Pressable>
      {title ? (
        <Text variant="headlineSm" numberOfLines={1} className="mx-2 flex-1">
          {title}
        </Text>
      ) : (
        <View className="mx-2 flex-1" />
      )}
      <View className="flex-row">
        {actions.map((action, idx) => (
          <Pressable
            key={idx}
            onPress={action.onPress}
            hitSlop={8}
            className="h-11 w-11 items-center justify-center">
            <Icon name={action.icon} size={22} color="onSurface" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
