import React from 'react';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { books, currentUser, ListingStatus } from '@pustakiq/shared';
import {
  Badge,
  BookListItem,
  Button,
  DetailHeader,
  EmptyState,
  Screen,
} from '../components';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MyListings'>;

const STATUS_TONE = {
  [ListingStatus.APPROVED]: 'success',
  [ListingStatus.PENDING]: 'warning',
  [ListingStatus.REJECTED]: 'error',
  [ListingStatus.SOLD]: 'neutral',
} as const;

export function MyListingsScreen({ navigation }: Props) {
  const mine = books.filter((b) => b.userId === currentUser.id);

  return (
    <Screen edges={['top', 'bottom']}>
      <DetailHeader
        title="My Listings"
        onBack={() => navigation.goBack()}
        actions={[{ icon: 'add', onPress: () => navigation.navigate('CreateListing') }]}
      />
      {mine.length === 0 ? (
        <View className="flex-1 justify-center p-6 gap-3">
          <EmptyState
            icon="list"
            title="No listings yet"
            message="Sell your used books and reach buyers near you."
          />
          <Button label="Sell a Book" icon="add" onPress={() => navigation.navigate('CreateListing')} />
        </View>
      ) : (
        <ScrollView contentContainerClassName="p-4 gap-3">
          {mine.map((b) => (
            <View key={b.id} className="gap-1">
              <Badge label={b.status} tone={STATUS_TONE[b.status]} />
              <BookListItem book={b} onPress={() => navigation.navigate('BookDetails', { bookId: b.id })} />
            </View>
          ))}
        </ScrollView>
      )}
    </Screen>
  );
}
