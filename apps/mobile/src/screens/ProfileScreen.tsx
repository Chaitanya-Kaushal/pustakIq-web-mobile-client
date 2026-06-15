import React from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { currentUser } from '@pustakiq/shared';
import {
  AppHeader,
  Avatar,
  Button,
  Card,
  Icon,
  IconName,
  Screen,
  Text,
} from '../components';
import { AppNavProp } from '../navigation/types';
import { useAuth } from '../auth/AuthContext';

interface Row {
  icon: IconName;
  label: string;
  caption: string;
  onPress: () => void;
}

export function ProfileScreen() {
  const navigation = useNavigation<AppNavProp>();
  const { signOut } = useAuth();

  const rows: Row[] = [
    {
      icon: 'list',
      label: 'My Listings',
      caption: 'Manage the books you are selling',
      onPress: () => navigation.navigate('MyListings'),
    },
    {
      icon: 'add_circle',
      label: 'Sell a Book',
      caption: 'Create a new listing',
      onPress: () => navigation.navigate('CreateListing'),
    },
    {
      icon: 'school',
      label: 'Become a Tutor',
      caption: 'Create your tutor profile',
      onPress: () => navigation.navigate('BecomeTutor'),
    },
    {
      icon: 'storefront',
      label: 'Register Store',
      caption: 'List your book store',
      onPress: () => navigation.navigate('RegisterStore'),
    },
    {
      icon: 'notifications',
      label: 'Notifications',
      caption: 'Updates on your listings & leads',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      icon: 'settings',
      label: 'Settings',
      caption: 'Preferences and account',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  const confirmLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  return (
    <Screen>
      <AppHeader onPressNotifications={() => navigation.navigate('Notifications')} />
      <ScrollView contentContainerClassName="p-4 gap-6 pb-8" showsVerticalScrollIndicator={false}>
        <Card className="flex-row items-center gap-4">
          <Avatar uri={currentUser.profileImage} name={currentUser.name} size={64} />
          <View className="flex-1">
            <Text variant="headlineSm">{currentUser.name}</Text>
            <Text variant="bodyMd" color="onSurfaceVariant">
              {currentUser.mobile}
            </Text>
          </View>
          <Button label="Edit" variant="secondary" fullWidth={false} onPress={() => navigation.navigate('EditProfile')} />
        </Card>

        <View className="bg-surface-container-lowest rounded-card border border-outline-variant overflow-hidden">
          {rows.map((row) => (
            <Pressable
              key={row.label}
              className="flex-row items-center gap-4 p-4 border-b border-outline-variant"
              onPress={row.onPress}>
              <View className="w-10 h-10 rounded-lg bg-primary-fixed items-center justify-center">
                <Icon name={row.icon} size={22} color="primary" />
              </View>
              <View className="flex-1">
                <Text variant="bodyLg" weight="600">
                  {row.label}
                </Text>
                <Text variant="labelMd" color="onSurfaceVariant">
                  {row.caption}
                </Text>
              </View>
              <Icon name="chevron_right" size={22} color="onSurfaceVariant" />
            </Pressable>
          ))}
        </View>

        <Button label="Log Out" icon="logout" variant="ghost" onPress={confirmLogout} />
        <Text variant="labelMd" color="onSurfaceVariant" align="center">
          PustakIQ v0.1.0
        </Text>
      </ScrollView>
    </Screen>
  );
}
