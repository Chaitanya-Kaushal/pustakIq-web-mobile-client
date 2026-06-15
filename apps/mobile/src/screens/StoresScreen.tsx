import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stores } from '@pustakiq/shared';
import {
  AppHeader,
  Chip,
  Screen,
  SearchBar,
  StoreCard,
  Text,
} from '../components';
import { AppNavProp } from '../navigation/types';

const FILTERS = ['Area', 'Category', 'Open Now'];

export function StoresScreen() {
  const navigation = useNavigation<AppNavProp>();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <Screen>
      <AppHeader onPressNotifications={() => navigation.navigate('Notifications')} />
      <ScrollView contentContainerClassName="p-4 gap-4 pb-8" showsVerticalScrollIndicator={false}>
        <SearchBar placeholder="Search book stores near you..." showMic={false} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2">
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              selected={activeFilter === f}
              trailingIcon="keyboard_arrow_down"
              onPress={() => setActiveFilter((cur) => (cur === f ? null : f))}
            />
          ))}
        </ScrollView>

        <Text variant="labelMd" color="onSurfaceVariant">
          {stores.length} stores near you
        </Text>

        <View className="gap-3">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onPress={() => navigation.navigate('StoreDetails', { storeId: store.id })}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
