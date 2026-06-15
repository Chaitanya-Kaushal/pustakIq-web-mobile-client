import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { books, stores, tutors } from '@pustakiq/shared';
import {
  BookListItem,
  Chip,
  DetailHeader,
  EmptyState,
  Screen,
  SearchBar,
  SectionHeader,
  StoreCard,
  Text,
  TutorCard,
} from '../components';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SUGGESTIONS = ['Class 10 Physics', 'HC Verma', 'JEE', 'Maths Tutor', 'DPS R.K. Puram'];

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return null;
    return {
      books: books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.subject ?? '').toLowerCase().includes(q),
      ),
      tutors: tutors.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.subjects.some((s) => s.toLowerCase().includes(q)),
      ),
      stores: stores.filter((s) => s.storeName.toLowerCase().includes(q)),
    };
  }, [q]);

  const empty =
    results &&
    results.books.length === 0 &&
    results.tutors.length === 0 &&
    results.stores.length === 0;

  return (
    <Screen>
      <View className="flex-row items-center pr-4">
        <DetailHeader onBack={() => navigation.goBack()} />
        <View className="flex-1">
          <SearchBar value={query} onChangeText={setQuery} showMic={false} />
        </View>
      </View>

      <ScrollView contentContainerClassName="p-4 gap-6" keyboardShouldPersistTaps="handled">
        {!results ? (
          <View className="gap-2">
            <Text variant="headlineSm">Popular searches</Text>
            <View className="flex-row flex-wrap gap-1">
              {SUGGESTIONS.map((s) => (
                <Chip key={s} label={s} onPress={() => setQuery(s)} />
              ))}
            </View>
          </View>
        ) : empty ? (
          <EmptyState icon="search" title="No results" message={`Nothing matched "${query}".`} />
        ) : (
          <>
            {results.books.length > 0 ? (
              <View className="gap-2">
                <SectionHeader title={`Books (${results.books.length})`} />
                <View className="gap-4">
                  {results.books.map((b) => (
                    <BookListItem
                      key={b.id}
                      book={b}
                      onPress={() => navigation.navigate('BookDetails', { bookId: b.id })}
                    />
                  ))}
                </View>
              </View>
            ) : null}

            {results.tutors.length > 0 ? (
              <View className="gap-2">
                <SectionHeader title={`Tutors (${results.tutors.length})`} />
                <View className="gap-4">
                  {results.tutors.map((t) => (
                    <TutorCard
                      key={t.id}
                      tutor={t}
                      onPress={() => navigation.navigate('TutorDetails', { tutorId: t.id })}
                    />
                  ))}
                </View>
              </View>
            ) : null}

            {results.stores.length > 0 ? (
              <View className="gap-2">
                <SectionHeader title={`Stores (${results.stores.length})`} />
                <View className="gap-4">
                  {results.stores.map((s) => (
                    <StoreCard
                      key={s.id}
                      store={s}
                      onPress={() => navigation.navigate('StoreDetails', { storeId: s.id })}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}
