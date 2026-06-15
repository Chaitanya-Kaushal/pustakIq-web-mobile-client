import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  BookCategory,
  getCityById,
  notifications,
  recentBooks,
  stores,
  tutors,
  currentUser,
} from '@pustakiq/shared';
import {
  AppHeader,
  BookCardCompact,
  CATEGORY_COLORS,
  CategoryTile,
  Screen,
  SearchBar,
  SectionHeader,
  StoreCard,
  Text,
  TutorCard,
} from '../components';
import { AppNavProp } from '../navigation/types';

export function HomeScreen() {
  const navigation = useNavigation<AppNavProp>();
  const unread = notifications.filter((n) => !n.isRead).length;
  const city = getCityById(currentUser.cityId ?? '');

  return (
    <Screen>
      <AppHeader
        locationLabel={city ? `${city.name}, India` : 'New Delhi, India'}
        unreadCount={unread}
        onPressNotifications={() => navigation.navigate('Notifications')}
      />
      <ScrollView
        contentContainerClassName="p-4 gap-7 pb-8"
        showsVerticalScrollIndicator={false}>
        {/* Friendly greeting */}
        <View className="gap-1">
          <Text variant="headlineLg">
            Hi, {currentUser.name.split(' ')[0]} 👋
          </Text>
          <Text variant="bodyLg" color="onSurfaceVariant">
            What would you like to learn today?
          </Text>
        </View>

        <SearchBar onPress={() => navigation.navigate('Search')} />

        {/* Explore categories */}
        <View>
          <SectionHeader title="Explore Categories" />
          <View className="flex-row justify-between">
            <CategoryTile
              label="School Books"
              icon="menu_book"
              {...CATEGORY_COLORS.schoolBooks}
              onPress={() => navigation.navigate('Books', { category: BookCategory.SCHOOL_BOOK })}
            />
            <CategoryTile
              label="Exam Books"
              icon="assignment"
              {...CATEGORY_COLORS.examBooks}
              onPress={() => navigation.navigate('Books', { category: BookCategory.EXAM_BOOK })}
            />
            <CategoryTile
              label="Tutors"
              icon="school"
              {...CATEGORY_COLORS.tutors}
              onPress={() => navigation.navigate('Tutors')}
            />
            <CategoryTile
              label="Book Stores"
              icon="storefront"
              {...CATEGORY_COLORS.stores}
              onPress={() => navigation.navigate('Stores')}
            />
          </View>
        </View>

        {/* Recently added books */}
        <View>
          <SectionHeader
            title="Recently Added Books"
            actionLabel="View All"
            onAction={() => navigation.navigate('Books')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-4 pr-4">
            {recentBooks.slice(0, 6).map((book) => (
              <BookCardCompact
                key={book.id}
                book={book}
                onPress={() => navigation.navigate('BookDetails', { bookId: book.id })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Verified tutors */}
        <View>
          <SectionHeader
            title="Verified Tutors Nearby"
            actionLabel="View All"
            onAction={() => navigation.navigate('Tutors')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-4 pr-4">
            {tutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                className="w-72"
                onPress={() => navigation.navigate('TutorDetails', { tutorId: tutor.id })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Top stores */}
        <View>
          <SectionHeader
            title="Top Book Stores"
            actionLabel="View All"
            onAction={() => navigation.navigate('Stores')}
          />
          <View className="gap-3">
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onPress={() => navigation.navigate('StoreDetails', { storeId: store.id })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
