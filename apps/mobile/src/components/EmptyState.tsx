import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { Icon, IconName } from './Icon';

export interface EmptyStateProps {
  icon: IconName;
  title: string;
  message?: string;
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <View className="items-center gap-3 p-8">
      <View className="mb-2 h-[88px] w-[88px] items-center justify-center rounded-full bg-surface-container-high">
        <Icon name={icon} size={36} color="onSurfaceVariant" />
      </View>
      <Text variant="headlineSm" align="center">
        {title}
      </Text>
      {message ? (
        <Text variant="bodyMd" color="onSurfaceVariant" align="center">
          {message}
        </Text>
      ) : null}
    </View>
  );
}
