import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Icon, IconName, Text } from '../components';

const TABS: Record<
  string,
  { active: IconName; inactive: IconName; label: string }
> = {
  Home: { active: 'home_filled', inactive: 'home', label: 'Home' },
  Books: { active: 'menu_book', inactive: 'menu_book', label: 'Books' },
  Tutors: { active: 'school_filled', inactive: 'school', label: 'Tutors' },
  Stores: { active: 'storefront_filled', inactive: 'storefront', label: 'Stores' },
  Profile: { active: 'person_filled', inactive: 'person', label: 'Profile' },
};

const ORDER: (keyof typeof TABS)[] = ['Home', 'Books', 'Tutors', 'Stores', 'Profile'];

// Soft ambient shadow so the bar reads as a distinct floating surface.
const FLOAT_SHADOW = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.14,
  shadowRadius: 18,
  elevation: 14,
} as const;

/**
 * Floating bottom navigation — a substantial rounded white bar with five
 * evenly-spaced icon + label tabs. The active tab sits in a soft-blue rounded
 * highlight with an accent icon + label.
 */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeName = state.routes[state.index]?.name;

  const go = (name: string) => {
    const route = state.routes.find((r) => r.name === name);
    if (!route) return;
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    if (activeName !== name && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  };

  return (
    <View
      className="bg-transparent"
      style={{ paddingTop: 6, paddingBottom: insets.bottom + 14 }}>
      <View
        className="mx-4 flex-row items-center rounded-[26px] border border-outline-variant/70 bg-surface px-2 py-2"
        style={FLOAT_SHADOW}>
        {ORDER.map((name) => {
          const cfg = TABS[name];
          const active = activeName === name;
          return (
            <Pressable
              key={name}
              onPress={() => go(name)}
              className="flex-1 items-center gap-1 active:opacity-70">
              <View
                key={active ? 'on' : 'off'}
                style={[styles.pill, active && styles.pillActive]}>
                <Icon
                  name={active ? cfg.active : cfg.inactive}
                  size={23}
                  color={active ? 'primary' : 'onSurfaceVariant'}
                />
              </View>
              <Text
                variant="labelSm"
                weight={active ? '700' : '500'}
                color={active ? 'primary' : 'onSurfaceVariant'}>
                {cfg.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  pillActive: {
    backgroundColor: '#F0FDFA',
  },
});
