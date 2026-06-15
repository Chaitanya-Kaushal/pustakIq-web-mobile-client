import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Icon, Text } from '../components';

/** Branded splash shown while the session is being restored. */
export function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-5 bg-primary px-8">
      {/* Floating translucent accent chips */}
      <View className="absolute left-9 top-24 h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
        <Icon name="menu_book" size={26} tint="#ffffff" />
      </View>
      <View className="absolute right-10 top-36 h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
        <Icon name="lightbulb" size={22} tint="#ffffff" />
      </View>
      <View className="absolute bottom-44 left-12 h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
        <Icon name="storefront" size={22} tint="#ffffff" />
      </View>
      <View className="absolute bottom-52 right-12 h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
        <Icon name="school" size={26} tint="#ffffff" />
      </View>

      {/* Logo */}
      <View className="h-28 w-28 items-center justify-center rounded-[34px] bg-white/15">
        <Icon name="school_filled" size={60} tint="#ffffff" />
      </View>
      <Text variant="headlineLg" color="onPrimary">
        PustakIQ
      </Text>
      <Text variant="bodyLg" align="center" style={{ color: 'rgba(255,255,255,0.85)' }}>
        Everything for Your School Journey
      </Text>

      <View className="mt-8 items-center gap-3">
        <ActivityIndicator color="#ffffff" size="large" />
        <Text variant="labelSm" className="tracking-[2px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
          INITIALIZING
        </Text>
      </View>
    </View>
  );
}
