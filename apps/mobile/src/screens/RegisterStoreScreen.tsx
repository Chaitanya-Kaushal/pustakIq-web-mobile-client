import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { STORE_CATEGORY_LABELS, StoreCategory } from '@pustakiq/shared';
import {
  Button,
  DetailHeader,
  ImageUploader,
  Screen,
  SelectChips,
  Text,
  TextField,
} from '../components';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterStore'>;

export function RegisterStoreScreen({ navigation }: Props) {
  const [image, setImage] = useState<string | undefined>();
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [categories, setCategories] = useState<StoreCategory[]>([]);

  const canSubmit =
    storeName.trim().length > 1 &&
    phone.replace(/\D/g, '').length === 10 &&
    categories.length > 0;

  const toggle = (c: StoreCategory) =>
    setCategories((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));

  const onSubmit = () =>
    Alert.alert(
      'Store submitted 🎉',
      'Your store has been submitted for review and will be published once approved.',
      [{ text: 'Done', onPress: () => navigation.goBack() }],
    );

  return (
    <Screen edges={['top', 'bottom']}>
      <DetailHeader
        title="Register Store"
        onBack={() => navigation.goBack()}
        actions={[{ icon: 'close', onPress: () => navigation.goBack() }]}
      />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerClassName="p-4 gap-6 pb-8" keyboardShouldPersistTaps="handled">
          <ImageUploader variant="banner" value={image} onChange={setImage} label="Add a store photo" />
          <TextField label="Store Name" value={storeName} onChangeText={setStoreName} placeholder="Universal Book Stall" />
          <TextField label="Owner Name" value={ownerName} onChangeText={setOwnerName} placeholder="Mohan Lal" />
          <TextField label="Phone" value={phone} onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="98765 43210" keyboardType="number-pad" />
          <TextField label="Address" value={address} onChangeText={setAddress} placeholder="Shop no, street, area, city" multiline />

          <SelectChips
            label="Categories"
            multi
            value={categories}
            onChange={toggle}
            options={Object.values(StoreCategory).map((c) => ({ value: c, label: STORE_CATEGORY_LABELS[c] }))}
          />

          <Button label="Submit Store" onPress={onSubmit} disabled={!canSubmit} />
          <Text variant="labelMd" color="onSurfaceVariant" align="center">
            Stores are verified before going live.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
