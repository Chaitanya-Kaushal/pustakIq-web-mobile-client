import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
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
    <Screen edges={['top']}>
      <View className="flex-1">
        <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
          {/* Banner hero */}
          {store.image ? (
            <Image source={{ uri: store.image }} className="h-56 w-full bg-surface-variant" />
          ) : (
            <View className="h-56 w-full items-center justify-center bg-primary-soft">
              <Icon name="storefront" size={56} color="primary" />
            </View>
          )}

          {/* Content sheet */}
          <View className="-mt-7 gap-4 rounded-t-[28px] bg-background p-4">
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
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
                <Icon name="location_on" size={20} color="primary" />
              </View>
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
              <Card className="flex-row items-center gap-3 bg-primary-soft">
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
          </View>
        </ScrollView>

        <View className="absolute left-3 top-1">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm shadow-black/10 active:opacity-80">
            <Icon name="arrow_back" size={20} color="onSurface" />
          </Pressable>
        </View>
      </View>

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
