import React from 'react';
import { Image, View } from 'react-native';
import { colors } from '@pustakiq/theme';
import {
  BookListing,
  formatPrice,
  getClassName,
  getSchoolById,
} from '@pustakiq/shared';
import { Text } from './Text';
import { Badge, ConditionBadge } from './Badge';
import { Icon } from './Icon';
import { Card } from './Card';

export interface BookListItemProps {
  book: BookListing;
  onPress?: () => void;
}

/** Horizontal "Zepto-density" catalog row. */
export function BookListItem({ book, onPress }: BookListItemProps) {
  const school = book.schoolBook ? getSchoolById(book.schoolBook.schoolId) : undefined;
  const subtitle = book.examBook
    ? `${book.examBook.examType} Preparation`
    : school?.name ?? '';
  const classLabel = book.schoolBook
    ? getClassName(book.schoolBook.classId)
    : book.examBook?.examType;

  return (
    <Card
      className="min-h-[140px] flex-row items-stretch overflow-hidden shadow-sm"
      padded={false}
      onPress={onPress}>
      {/* Fixed-width left column; height driven by the text body (row stretch). */}
      <View className="w-[120px] bg-surface-variant">
        {/* Absolute + explicit size so it never inflates the card height. */}
        <Image
          source={{ uri: book.images[0]?.imageUrl }}
          className="absolute left-0 top-0 h-full w-full"
        />
        <View className="absolute left-2 top-2">
          <ConditionBadge condition={book.condition} />
        </View>
      </View>
      <View className="flex-1 justify-between gap-3 p-4">
        <View>
          <Text variant="headlineSm" numberOfLines={2}>
            {book.title}
          </Text>
          <Text variant="bodyMd" color="onSurfaceVariant" numberOfLines={1} className="mt-0.5">
            {subtitle}
          </Text>
          <View className="mt-2 flex-row flex-wrap gap-2">
            {classLabel ? <Badge label={classLabel} tone="primary" /> : null}
            {book.subject ? <Badge label={book.subject} tone="success" /> : null}
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text variant="headlineMd" color="primary">
            {formatPrice(book.price)}
          </Text>
          <View className="h-10 w-10 items-center justify-center rounded-btn bg-primary-container">
            <Icon name="chevron_right" size={22} tint={colors.onPrimary} />
          </View>
        </View>
      </View>
    </Card>
  );
}
