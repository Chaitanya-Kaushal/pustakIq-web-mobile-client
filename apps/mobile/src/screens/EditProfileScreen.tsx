import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { currentUser } from '@pustakiq/shared';
import { Button, DetailHeader, ImageUploader, Screen, TextField } from '../components';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export function EditProfileScreen({ navigation }: Props) {
  const [photo, setPhoto] = useState<string | undefined>(currentUser.profileImage);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email ?? '');
  const [city, setCity] = useState('New Delhi');
  const [area, setArea] = useState('R.K. Puram');

  const onSave = () =>
    Alert.alert('Saved', 'Your profile has been updated.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);

  return (
    <Screen edges={['top', 'bottom']}>
      <DetailHeader title="Edit Profile" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerClassName="p-4 gap-6 pb-8" keyboardShouldPersistTaps="handled">
          <View className="items-center">
            <ImageUploader
              variant="avatar"
              value={photo}
              onChange={setPhoto}
              size={104}
              label="Change Photo"
            />
          </View>

          <TextField label="Full Name" value={name} onChangeText={setName} />
          <TextField label="Mobile" value={currentUser.mobile} editable={false} />
          <TextField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <View className="flex-row gap-2">
            <TextField label="City" value={city} onChangeText={setCity} containerClassName="flex-1" />
            <TextField label="Area" value={area} onChangeText={setArea} containerClassName="flex-1" />
          </View>

          <Button label="Save Changes" onPress={onSave} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
