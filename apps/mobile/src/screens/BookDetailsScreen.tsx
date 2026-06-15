import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@pustakiq/theme';
import {
  formatDate,
  formatPrice,
  getClassName,
  getBookById,
  getSchoolById,
} from '@pustakiq/shared';
import {
  Avatar,
  Badge,
  Button,
  Card,
  ConditionBadge,
  ContactBar,
  DetailHeader,
  EmptyState,
  Icon,
  RatingStars,
  Screen,
  Text,
} from '../components';
import { RootStackParamList } from '../navigation/types';
import { callPhone, openWhatsApp } from '../utils/contact';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetails'>;

export function BookDetailsScreen({ navigation, route }: Props) {
  const book = getBookById(route.params.bookId);

  if (!book) {
    return (
      <Screen>
        <DetailHeader onBack={() => navigation.goBack()} title="Book" />
        <EmptyState icon="menu_book" title="Listing not found" />
      </Screen>
    );
  }

  const school = book.schoolBook ? getSchoolById(book.schoolBook.schoolId) : undefined;
  const categoryLabel = book.examBook
    ? `${book.examBook.examType} • Exam Book`
    : `${getClassName(book.schoolBook?.classId)} • School Book`;
  const message = `Hi, is "${book.title}" still available on PustakIQ?`;

  return (
    <Screen edges={['top']}>
      <DetailHeader
        onBack={() => navigation.goBack()}
        actions={[
          { icon: 'bookmark', onPress: () => {} },
          { icon: 'share', onPress: () => {} },
        ]}
      />
      <ScrollView contentContainerClassName="p-4 gap-4 pb-8" showsVerticalScrollIndicator={false}>
        <View className="h-60 rounded-card bg-surface-container-high items-center justify-center overflow-hidden">
          <Image source={{ uri: book.images[0]?.imageUrl }} className="w-3/5 h-[90%]" resizeMode="contain" />
        </View>

        {/* Title card */}
        <Card className="gap-2">
          <View className="flex-row justify-between">
            <Badge label={categoryLabel} tone="primary" />
            <ConditionBadge condition={book.condition} />
          </View>
          <Text variant="headlineLg">{book.title}</Text>
          {school ? (
            <Text variant="bodyLg" color="onSurfaceVariant">
              {school.name}
            </Text>
          ) : null}

          <View className="flex-row justify-between items-end mt-3">
            <View>
              <Text variant="labelSm" color="onSurfaceVariant">
                PRICE
              </Text>
              <View className="flex-row items-baseline gap-2">
                <Text variant="headlineLg" color="primary">
                  {formatPrice(book.price)}
                </Text>
                {book.originalPrice ? (
                  <Text variant="bodyMd" color="onSurfaceVariant" className="line-through">
                    {formatPrice(book.originalPrice)}
                  </Text>
                ) : null}
              </View>
            </View>
            <View className="items-end gap-0.5">
              <Text variant="labelSm" color="onSurfaceVariant">
                POSTED ON
              </Text>
              <Text variant="bodyMd">{formatDate(book.createdAt)}</Text>
            </View>
          </View>
        </Card>

        {/* Seller card */}
        <Card className="flex-row items-center gap-3">
          <Avatar uri={book.seller.avatar} name={book.seller.name} size={48} />
          <View className="flex-1">
            <View className="flex-row items-center gap-1">
              <Text variant="bodyMd" weight="700">
                {book.seller.name}
              </Text>
              {book.seller.isTrusted ? <Icon name="verified" size={16} color="primary" /> : null}
            </View>
            <RatingStars rating={book.seller.rating} reviewCount={book.seller.reviewCount} />
          </View>
          <Button label="View Profile" variant="secondary" fullWidth={false} onPress={() => {}} />
        </Card>

        {/* Description */}
        <View className="gap-2">
          <Text variant="headlineSm">Description</Text>
          <Text variant="bodyMd" color="onSurfaceVariant" className="leading-[22px]">
            {book.description}
          </Text>
        </View>

        {/* Specs */}
        <View className="flex-row gap-3">
          <Card className="flex-1 gap-1">
            <Icon name="menu_book" size={22} color="primary" />
            <Text variant="bodyMd" weight="700">
              {book.pageCount ?? '—'} Pages
            </Text>
            <Text variant="labelMd" color="onSurfaceVariant">
              Pages
            </Text>
          </Card>
          <Card className="flex-1 gap-1">
            <Icon name="info" size={22} color="primary" />
            <Text variant="bodyMd" weight="700">
              {book.language ?? 'English'}
            </Text>
            <Text variant="labelMd" color="onSurfaceVariant">
              Language
            </Text>
          </Card>
        </View>

        {/* Safety tip */}
        <Card className="flex-row gap-3 border-tertiary-fixed-dim" style={{ backgroundColor: '#bc480014' }}>
          <Icon name="info" size={20} tint={colors.tertiary} />
          <View className="flex-1">
            <Text variant="bodyMd" weight="700" style={{ color: colors.tertiary }}>
              Safety Tip
            </Text>
            <Text variant="labelMd" color="onSurfaceVariant">
              Always meet the seller in public places and inspect the book before making payment.
            </Text>
          </View>
        </Card>
      </ScrollView>

      <ContactBar
        callLabel="Call Seller"
        onCall={() => callPhone(book.seller.phone)}
        onWhatsApp={() => openWhatsApp(book.seller.whatsapp, message)}
      />
    </Screen>
  );
}
