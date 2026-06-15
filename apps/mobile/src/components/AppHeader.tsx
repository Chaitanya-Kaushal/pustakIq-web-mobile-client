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
        className="h-10 w-10 items-center justify-center rounded-full bg-primary-soft active:opacity-80"
        onPress={onPressNotifications}
        hitSlop={8}>
        <Icon name="notifications" size={22} color="primary" />
        {unreadCount > 0 ? (
          <View className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border border-surface bg-error" />
        ) : null}
      </Pressable>
    </View>
  );
}
