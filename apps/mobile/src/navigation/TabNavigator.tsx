import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, typography } from '@pustakiq/theme';
import { Icon, IconName } from '../components';
import { TabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { BooksScreen } from '../screens/BooksScreen';
import { TutorsScreen } from '../screens/TutorsScreen';
import { StoresScreen } from '../screens/StoresScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, { active: IconName; inactive: IconName }> = {
  Home: { active: 'home_filled', inactive: 'home' },
  Books: { active: 'menu_book', inactive: 'menu_book' },
  Tutors: { active: 'school_filled', inactive: 'school' },
  Stores: { active: 'storefront_filled', inactive: 'storefront' },
  Profile: { active: 'person_filled', inactive: 'person' },
};

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: typography.labelSm,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.outlineVariant,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarIcon: ({ focused, color }) => {
          const set = ICONS[route.name];
          return <Icon name={focused ? set.active : set.inactive} size={24} tint={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Books" component={BooksScreen} />
      <Tab.Screen name="Tutors" component={TutorsScreen} />
      <Tab.Screen name="Stores" component={StoresScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
