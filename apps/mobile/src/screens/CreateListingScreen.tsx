import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  BookCategory,
  BookCondition,
  CONDITION_LABELS,
  EXAM_TYPES,
  EXAM_TYPE_LABELS,
  ExamType,
  ListingType,
} from '@pustakiq/shared';
import {
  Button,
  DetailHeader,
  Icon,
  Screen,
  SelectChips,
  Text,
  TextField,
} from '../components';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateListing'>;

export function CreateListingScreen({ navigation }: Props) {
  const [listingType, setListingType] = useState<ListingType>(ListingType.INDIVIDUAL_BOOK);
  const [category, setCategory] = useState<BookCategory>(BookCategory.SCHOOL_BOOK);
  const [condition, setCondition] = useState<BookCondition>(BookCondition.GOOD);
  const [examType, setExamType] = useState<ExamType | null>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [school, setSchool] = useState('');
  const [klass, setKlass] = useState('');
  const [description, setDescription] = useState('');

  const canSubmit = title.trim().length > 2 && price.trim().length > 0;

  const onSubmit = () => {
    Alert.alert(
      'Listing submitted 🎉',
      'Your book has been submitted for review. It will go live once approved.',
      [{ text: 'Done', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <DetailHeader
        title="Sell a Book"
        onBack={() => navigation.goBack()}
        actions={[{ icon: 'close', onPress: () => navigation.goBack() }]}
      />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerClassName="p-4 gap-6 pb-8" keyboardShouldPersistTaps="handled">
          {/* Photos */}
          <View className="flex-row gap-2">
            {[0, 1, 2].map((i) => (
              <Pressable
                key={i}
                className="h-[88px] w-[88px] items-center justify-center rounded-card border-[1.5px] border-dashed border-outline-variant bg-surface-container-low"
                onPress={() => Alert.alert('Add photo', 'Image picker coming soon.')}>
                <Icon name={i === 0 ? 'camera' : 'image'} size={24} color="onSurfaceVariant" />
              </Pressable>
            ))}
          </View>

          <SelectChips
            label="Listing Type"
            value={listingType}
            onChange={setListingType}
            options={[
              { value: ListingType.INDIVIDUAL_BOOK, label: 'Individual Book' },
              { value: ListingType.BOOK_SET, label: 'Complete Set' },
            ]}
          />

          <SelectChips
            label="Category"
            value={category}
            onChange={setCategory}
            options={[
              { value: BookCategory.SCHOOL_BOOK, label: 'School Book' },
              { value: BookCategory.EXAM_BOOK, label: 'Exam Book' },
            ]}
          />

          <TextField label="Title" value={title} onChangeText={setTitle} placeholder="e.g. Concepts of Physics Vol 1" />

          {category === BookCategory.SCHOOL_BOOK ? (
            <View className="flex-row gap-2">
              <TextField label="School" value={school} onChangeText={setSchool} placeholder="School name" containerClassName="flex-1" />
              <TextField label="Class" value={klass} onChangeText={setKlass} placeholder="Class 10" containerClassName="w-[110px]" />
            </View>
          ) : (
            <SelectChips
              label="Exam Type"
              value={examType}
              onChange={setExamType}
              options={EXAM_TYPES.map((e) => ({ value: e, label: EXAM_TYPE_LABELS[e] }))}
            />
          )}

          <TextField label="Price (₹)" value={price} onChangeText={(t) => setPrice(t.replace(/[^0-9]/g, ''))} placeholder="450" keyboardType="number-pad" />

          <SelectChips
            label="Condition"
            value={condition}
            onChange={setCondition}
            options={Object.values(BookCondition).map((c) => ({ value: c, label: CONDITION_LABELS[c] }))}
          />

          <TextField label="Description" value={description} onChangeText={setDescription} placeholder="Describe the book's condition, edition, etc." multiline />

          <Button label="Submit for Review" onPress={onSubmit} disabled={!canSubmit} />
          <Text variant="labelMd" color="onSurfaceVariant" align="center">
            Listings are reviewed before going live.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
