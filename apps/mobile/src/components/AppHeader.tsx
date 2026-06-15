import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './Text';
import { Icon } from './Icon';

export interface AppHeaderProps {
  locationLabel?: string;
  unreadCount?: number;
  onPressLocation?: () => void;
  onPressNotifications?: () => void;
}

/** Brand header used across the bottom-tab screens. */
export function AppHeader({
  locationLabel = 'New Delhi, India',
  unreadCount = 0,
  onPressLocation,
  onPressNotifications,
}: AppHeaderProps) {
  return (
    <View className="h-[60px] flex-row items-center justify-between border-b border-outline-variant bg-surface px-4">
      <Pressable
        className="flex-1 flex-row items-center gap-2"
        onPress={onPressLocation}
        hitSlop={8}>
        <Icon name="location_on" size={22} color="primary" />
        <View>
          <Text variant="labelSm" color="onSurfaceVariant">
            Your Location
          </Text>
          <Text variant="bodyMd" weight="700">
            {locationLabel}
          </Text>
        </View>
      </Pressable>

      <Text variant="headlineMd" color="primary">
        PustakIQ
      </Text>

      <Pressable
        className="h-10 w-10 items-center justify-center"
        onPress={onPressNotifications}
        hitSlop={8}>
        <Icon name="notifications" size={24} color="primary" />
        {unreadCount > 0 ? (
          <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
        ) : null}
      </Pressable>
    </View>
  );
}
