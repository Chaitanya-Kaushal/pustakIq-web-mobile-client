import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getStoreById, STORE_CATEGORY_LABELS } from '@pustakiq/shared';
import {
  Badge,
  Card,
  ContactBar,
  DetailHeader,
  EmptyState,
  Icon,
  RatingStars,
  Screen,
  Text,
} from '../components';
import { RootStackParamList } from '../navigation/types';
import { callPhone, openDirections, openWhatsApp } from '../utils/contact';

type Props = NativeStackScreenProps<RootStackParamList, 'StoreDetails'>;

export function StoreDetailsScreen({ navigation, route }: Props) {
  const store = getStoreById(route.params.storeId);

  if (!store) {
    return (
      <Screen>
        <DetailHeader onBack={() => navigation.goBack()} title="Store" />
        <EmptyState icon="storefront" title="Store not found" />
      </Screen>
    );
  }

  return (
    <Screen>
      <DetailHeader onBack={() => navigation.goBack()} title="Store" />
      <ScrollView contentContainerClassName="p-4 gap-4 pb-8" showsVerticalScrollIndicator={false}>
        {store.image ? (
          <Image source={{ uri: store.image }} className="w-full h-[180px] rounded-card bg-surface-variant" />
        ) : null}

        <View className="flex-row items-start gap-3">
          <View className="flex-1">
            <Text variant="headlineMd">{store.storeName}</Text>
            <Text variant="bodyMd" color="onSurfaceVariant">
              Owner: {store.ownerName}
            </Text>
          </View>
          <Badge label={store.isOpen ? 'OPEN' : 'CLOSED'} tone={store.isOpen ? 'success' : 'neutral'} />
        </View>

        <RatingStars rating={store.rating} reviewCount={store.reviewCount} />

        <Card className="flex-row items-center gap-3">
          <Icon name="location_on" size={22} color="primary" />
          <View className="flex-1">
            <Text variant="bodyMd" weight="600">
              {store.address}
            </Text>
            {store.distanceLabel ? (
              <Text variant="labelMd" color="onSurfaceVariant">
                {store.distanceLabel} away
              </Text>
            ) : null}
          </View>
        </Card>

        {store.offer ? (
          <Card className="flex-row items-center gap-3 bg-primary-fixed">
            <Icon name="local_offer" size={20} color="primary" />
            <Text variant="bodyMd" weight="700" color="primary">
              {store.offer}
            </Text>
          </Card>
        ) : null}

        <View className="gap-3">
          <Text variant="headlineSm">Categories</Text>
          <View className="flex-row flex-wrap gap-2">
            {store.categories.map((c) => (
              <Badge key={c} label={STORE_CATEGORY_LABELS[c]} tone="primary" />
            ))}
          </View>
        </View>
      </ScrollView>

      <ContactBar
        callLabel="Call Store"
        onCall={() => callPhone(store.phone)}
        onWhatsApp={() => openWhatsApp(store.whatsapp, `Hi, I'd like to enquire about books at ${store.storeName}.`)}
        onDirections={() =>
          openDirections({
            latitude: store.latitude,
            longitude: store.longitude,
            label: store.address,
          })
        }
      />
    </Screen>
  );
}
