import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@pustakiq/theme';
import {
  discountPercent,
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
  IconName,
  RatingStars,
  Screen,
  Text,
} from '../components';
import { RootStackParamList } from '../navigation/types';
import { callPhone, openWhatsApp } from '../utils/contact';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetails'>;

function CircleButton({ icon, onPress }: { icon: IconName; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm shadow-black/10 active:opacity-80">
      <Icon name={icon} size={20} color="onSurface" />
    </Pressable>
  );
}

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
  const discount = discountPercent(book.price, book.originalPrice);
  const message = `Hi, is "${book.title}" still available on PustakIQ?`;

  return (
    <Screen edges={['top']}>
      <View className="flex-1">
        <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View className="h-80 items-center justify-center bg-primary-soft">
            <Image
              source={{ uri: book.images[0]?.imageUrl }}
              className="h-60 w-44 rounded-xl"
              resizeMode="contain"
            />
            {discount ? (
              <View className="absolute right-4 top-4 rounded-full bg-tertiary px-3 py-1.5">
                <Text variant="labelSm" style={{ color: '#fff' }}>
                  {discount}% OFF
                </Text>
              </View>
            ) : null}
          </View>

          {/* Content sheet pulled up over the hero */}
          <View className="-mt-7 gap-4 rounded-t-[28px] bg-background p-4">
            <View className="flex-row justify-between">
              <Badge label={categoryLabel} tone="primary" />
              <ConditionBadge condition={book.condition} />
            </View>

            <Text variant="headlineLg">{book.title}</Text>
            {school ? (
              <Text variant="bodyLg" color="onSurfaceVariant" className="-mt-2">
                {school.name}
              </Text>
            ) : null}

            {/* Price card */}
            <Card className="flex-row items-end justify-between">
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
                  POSTED
                </Text>
                <Text variant="bodyMd">{formatDate(book.createdAt)}</Text>
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

            {/* Specs */}
            <View className="flex-row gap-3">
              <Card className="flex-1 items-center gap-1">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
                  <Icon name="menu_book" size={20} color="primary" />
                </View>
                <Text variant="bodyMd" weight="700">
                  {book.pageCount ?? '—'}
                </Text>
                <Text variant="labelMd" color="onSurfaceVariant">
                  Pages
                </Text>
              </Card>
              <Card className="flex-1 items-center gap-1">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-secondary-soft">
                  <Icon name="info" size={20} color="secondary" />
                </View>
                <Text variant="bodyMd" weight="700">
                  {book.language ?? 'English'}
                </Text>
                <Text variant="labelMd" color="onSurfaceVariant">
                  Language
                </Text>
              </Card>
              <Card className="flex-1 items-center gap-1">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-accent-soft">
                  <Icon name="verified" size={20} color="tertiary" />
                </View>
                <Text variant="bodyMd" weight="700">
                  {book.condition === 'NEW' ? 'New' : 'Used'}
                </Text>
                <Text variant="labelMd" color="onSurfaceVariant">
                  Condition
                </Text>
              </Card>
            </View>

            {/* Description */}
            <View className="gap-2">
              <Text variant="headlineSm">Description</Text>
              <Text variant="bodyMd" color="onSurfaceVariant" className="leading-[22px]">
                {book.description}
              </Text>
            </View>

            {/* Safety tip */}
            <Card
              className="flex-row gap-3 border-tertiary-fixed-dim"
              style={{ backgroundColor: '#fff7ed' }}>
              <Icon name="info" size={20} tint={colors.tertiary} />
              <View className="flex-1">
                <Text variant="bodyMd" weight="700" style={{ color: colors.tertiary }}>
                  Safety Tip
                </Text>
                <Text variant="labelMd" color="onSurfaceVariant">
                  Always meet the seller in a public place and inspect the book before making payment.
                </Text>
              </View>
            </Card>
          </View>
        </ScrollView>

        {/* Floating header buttons over the hero */}
        <View className="absolute left-3 right-3 top-1 flex-row justify-between">
          <CircleButton icon="arrow_back" onPress={() => navigation.goBack()} />
          <View className="flex-row gap-2">
            <CircleButton icon="bookmark" onPress={() => {}} />
            <CircleButton icon="share" onPress={() => {}} />
          </View>
        </View>
      </View>

      <ContactBar
        callLabel="Call Seller"
        onCall={() => callPhone(book.seller.phone)}
        onWhatsApp={() => openWhatsApp(book.seller.whatsapp, message)}
      />
    </Screen>
  );
}
