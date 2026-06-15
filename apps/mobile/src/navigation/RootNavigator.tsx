import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { colors } from '@pustakiq/theme';
import { useAuth } from '../auth/AuthContext';
import { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import { AuthNavigator } from './AuthNavigator';
import { SplashScreen } from '../screens/SplashScreen';
import { BookDetailsScreen } from '../screens/BookDetailsScreen';
import { TutorDetailsScreen } from '../screens/TutorDetailsScreen';
import { StoreDetailsScreen } from '../screens/StoreDetailsScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { SchoolBookFinderScreen } from '../screens/SchoolBookFinderScreen';
import { CreateListingScreen } from '../screens/CreateListingScreen';
import { MyListingsScreen } from '../screens/MyListingsScreen';
import { BecomeTutorScreen } from '../screens/BecomeTutorScreen';
import { RegisterStoreScreen } from '../screens/RegisterStoreScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.onSurface,
    primary: colors.primary,
    border: colors.outlineVariant,
  },
};

export function RootNavigator() {
  const { user, bootstrapping } = useAuth();

  if (bootstrapping) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
          <Stack.Screen name="TutorDetails" component={TutorDetailsScreen} />
          <Stack.Screen name="StoreDetails" component={StoreDetailsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="SchoolBookFinder" component={SchoolBookFinderScreen} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="CreateListing" component={CreateListingScreen} />
            <Stack.Screen name="BecomeTutor" component={BecomeTutorScreen} />
            <Stack.Screen name="RegisterStore" component={RegisterStoreScreen} />
          </Stack.Group>
          <Stack.Screen name="MyListings" component={MyListingsScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
