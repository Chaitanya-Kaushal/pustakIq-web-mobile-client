import React from 'react';
import { Image, View } from 'react-native';
import { StoreProfile } from '@pustakiq/shared';
import { Text } from './Text';
import { Card } from './Card';
import { Badge } from './Badge';
import { Icon } from './Icon';

export interface StoreCardProps {
  store: StoreProfile;
  onPress?: () => void;
}

export function StoreCard({ store, onPress }: StoreCardProps) {
  return (
    <Card onPress={onPress} className="flex-row items-center gap-4">
      {store.image ? (
        <Image
          source={{ uri: store.image }}
          className="h-[72px] w-[72px] rounded-lg bg-surface-variant"
        />
      ) : (
        <View className="h-[72px] w-[72px] items-center justify-center rounded-lg bg-surface-variant">
          <Icon name="storefront" size={28} color="onSurfaceVariant" />
        </View>
      )}
      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text variant="bodyMd" weight="700" numberOfLines={1} className="flex-1">
            {store.storeName}
          </Text>
          <Badge
            label={store.isOpen ? 'OPEN' : 'CLOSED'}
            tone={store.isOpen ? 'success' : 'neutral'}
          />
        </View>
        <Text variant="labelMd" color="onSurfaceVariant" numberOfLines={1}>
          {store.address}
        </Text>
        <View className="mt-0.5 flex-row gap-4">
          {store.distanceLabel ? (
            <View className="flex-row items-center gap-1">
              <Icon name="directions_walk" size={16} color="onSurfaceVariant" />
              <Text variant="labelSm" color="onSurfaceVariant">
                {store.distanceLabel}
              </Text>
            </View>
          ) : null}
          {store.offer ? (
            <View className="flex-row items-center gap-1">
              <Icon name="local_offer" size={16} color="primary" />
              <Text variant="labelSm" color="primary">
                {store.offer}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
