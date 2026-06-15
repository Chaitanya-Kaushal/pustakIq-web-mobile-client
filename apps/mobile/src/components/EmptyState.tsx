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
      <View className="mb-2 h-24 w-24 items-center justify-center rounded-full bg-primary-soft">
        <Icon name={icon} size={40} color="primary" />
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
