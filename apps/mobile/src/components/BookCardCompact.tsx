import React from 'react';
import { Image, View } from 'react-native';
import {
  BookListing,
  formatPrice,
  getClassName,
  ListingStatus,
} from '@pustakiq/shared';
import { Text } from './Text';
import { Card } from './Card';

export interface BookCardCompactProps {
  book: BookListing;
  onPress?: () => void;
}

/** Poster-style card used in the Home horizontal rails. */
export function BookCardCompact({ book, onPress }: BookCardCompactProps) {
  const isNew = book.status === ListingStatus.APPROVED && book.isFeatured;
  const subtitle = book.examBook
    ? `${book.examBook.examType} • ${book.subject ?? ''}`
    : `${getClassName(book.schoolBook?.classId)} • ${book.subject ?? ''}`;

  return (
    <Card className="w-40 overflow-hidden" padded={false} onPress={onPress}>
      <View className="aspect-[3/4] w-full">
        <Image
          source={{ uri: book.images[0]?.imageUrl }}
          className="h-full w-full bg-surface-variant"
        />
        {isNew ? (
          <View className="absolute right-2 top-2 rounded-lg bg-white/90 px-2 py-0.5">
            <Text variant="labelSm" color="primary">
              NEW
            </Text>
          </View>
        ) : null}
      </View>
      <View className="gap-0.5 p-3">
        <Text variant="bodyMd" numberOfLines={1}>
          {book.title}
        </Text>
        <Text variant="labelMd" color="onSurfaceVariant" numberOfLines={1}>
          {subtitle}
        </Text>
        <View className="mt-1 flex-row items-center gap-2">
          <Text variant="bodyMd" weight="700" color="primary">
            {formatPrice(book.price)}
          </Text>
          {book.originalPrice ? (
            <Text variant="labelSm" color="onSurfaceVariant" className="line-through">
              {formatPrice(book.originalPrice)}
            </Text>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
