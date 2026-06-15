import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { books, BookCategory } from '@pustakiq/shared';
import {
  AppHeader,
  BookListItem,
  Chip,
  EmptyState,
  Icon,
  Screen,
  SearchBar,
  Text,
} from '../components';
import { AppNavProp, TabParamList } from '../navigation/types';

const FILTERS = ['Class', 'Subject', 'Condition', 'Price'];

export function BooksScreen() {
  const navigation = useNavigation<AppNavProp>();
  const route = useRoute<RouteProp<TabParamList, 'Books'>>();
  const [tab, setTab] = useState<BookCategory>(
    route.params?.category ?? BookCategory.SCHOOL_BOOK,
  );

  const data = useMemo(() => books.filter((b) => b.category === tab), [tab]);

  return (
    <Screen>
      <AppHeader onPressNotifications={() => navigation.navigate('Notifications')} />
      <ScrollView
        contentContainerClassName="pb-8"
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}>
        <View className="p-4 pb-3">
          <SearchBar
            placeholder="Search by book name, author, or school..."
            onPress={() => navigation.navigate('Search')}
            showMic={false}
          />
        </View>

        {/* Sticky tabs + filters */}
        <View className="bg-background px-4">
          <View className="flex-row gap-6 border-b border-outline-variant">
            <TabButton
              label="School Books"
              active={tab === BookCategory.SCHOOL_BOOK}
              onPress={() => setTab(BookCategory.SCHOOL_BOOK)}
            />
            <TabButton
              label="Exam Books"
              active={tab === BookCategory.EXAM_BOOK}
              onPress={() => setTab(BookCategory.EXAM_BOOK)}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 py-3">
            {FILTERS.map((f, i) => (
              <Chip key={f} label={f} selected={i === 0} trailingIcon="keyboard_arrow_down" />
            ))}
            <Chip label="More" trailingIcon="tune" />
          </ScrollView>
        </View>

        {tab === BookCategory.SCHOOL_BOOK ? (
          <Pressable
            className="flex-row items-center gap-3 mx-4 mt-3 p-4 rounded-card bg-primary-fixed"
            onPress={() => navigation.navigate('SchoolBookFinder')}>
            <Icon name="school" size={22} color="primary" />
            <View className="flex-1">
              <Text variant="bodyMd" weight="700">
                Browse by School
              </Text>
              <Text variant="labelMd" color="onSurfaceVariant">
                State → City → Area → School → Class
              </Text>
            </View>
            <Icon name="chevron_right" size={22} color="onSurfaceVariant" />
          </Pressable>
        ) : null}

        <View className="p-4 gap-4">
          {data.length === 0 ? (
            <EmptyState icon="menu_book" title="No books yet" message="Be the first to list one." />
          ) : (
            data.map((book) => (
              <BookListItem
                key={book.id}
                book={book}
                onPress={() => navigation.navigate('BookDetails', { bookId: book.id })}
              />
            ))
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`py-3 ${active ? 'border-b-2 border-primary -mb-px' : ''}`}>
      <Text
        variant="bodyLg"
        weight={active ? '700' : '500'}
        color={active ? 'primary' : 'onSurfaceVariant'}>
        {label}
      </Text>
    </Pressable>
  );
}
