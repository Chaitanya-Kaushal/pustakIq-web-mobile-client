import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '@pustakiq/theme';
import { Icon, Text } from '../components';

/** Branded splash shown while the session is being restored. */
export function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-around bg-background py-16">
      {/* Floating decorative icons echoing the mockup */}
      <Icon name="menu_book" size={40} color="outline" />
      <View className="items-center gap-3">
        <View className="flex-row items-center gap-2">
          <Icon name="school_filled" size={40} color="primary" />
          <Text variant="headlineLg" color="primary">
            PustakIQ
          </Text>
        </View>
        <Text variant="bodyLg" color="onSurfaceVariant" align="center">
          Everything for Your School Journey
        </Text>
      </View>
      <View className="items-center gap-3">
        <ActivityIndicator color={colors.primary} size="large" />
        <Text variant="labelSm" color="onSurfaceVariant" className="tracking-[2px]">
          INITIALIZING
        </Text>
      </View>
    </View>
  );
}
