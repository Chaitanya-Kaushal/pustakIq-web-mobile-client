import React from 'react';
import { View } from 'react-native';
import { Icon } from './Icon';
import { Text } from './Text';

export interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export function RatingStars({ rating, reviewCount, size = 16 }: RatingStarsProps) {
  return (
    <View className="flex-row items-center gap-1">
      <Icon name="star" size={size} tint="#F59E0B" />
      <Text variant="labelSm">{rating.toFixed(1)}</Text>
      {reviewCount != null ? (
        <Text variant="labelSm" color="onSurfaceVariant">
          ({reviewCount}+)
        </Text>
      ) : null}
    </View>
  );
}
