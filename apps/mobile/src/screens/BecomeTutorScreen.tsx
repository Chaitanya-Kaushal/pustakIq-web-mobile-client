import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SUBJECTS,
  TEACHING_MODE_LABELS,
  TeachingMode,
} from '@pustakiq/shared';
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

type Props = NativeStackScreenProps<RootStackParamList, 'BecomeTutor'>;

export function BecomeTutorScreen({ navigation }: Props) {
  const [photo, setPhoto] = useState<string | undefined>();
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classes, setClasses] = useState('');
  const [mode, setMode] = useState<TeachingMode>(TeachingMode.BOTH);
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');

  const canSubmit = name.trim().length > 1 && subjects.length > 0 && phone.replace(/\D/g, '').length === 10;

  const toggleSubject = (s: string) =>
    setSubjects((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const onSubmit = () =>
    Alert.alert(
      'Profile submitted 🎉',
      'Your tutor profile has been submitted for review and will be published once approved.',
      [{ text: 'Done', onPress: () => navigation.goBack() }],
    );

  return (
    <Screen edges={['top', 'bottom']}>
      <DetailHeader
        title="Become a Tutor"
        onBack={() => navigation.goBack()}
        actions={[{ icon: 'close', onPress: () => navigation.goBack() }]}
      />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerClassName="p-4 gap-6 pb-8" keyboardShouldPersistTaps="handled">
          <View className="items-center">
            <ImageUploader variant="avatar" value={photo} onChange={setPhoto} size={104} label="Add your photo" />
          </View>
          <TextField label="Full Name" value={name} onChangeText={setName} placeholder="Dr. Anjali Verma" />
          <TextField label="Qualification" value={qualification} onChangeText={setQualification} placeholder="M.Sc. Physics, IIT Delhi" />
          <View className="flex-row gap-2">
            <TextField label="Experience (yrs)" value={experience} onChangeText={(t) => setExperience(t.replace(/[^0-9]/g, ''))} placeholder="8" keyboardType="number-pad" containerClassName="flex-1" />
            <TextField label="Phone" value={phone} onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="98765 43210" keyboardType="number-pad" containerClassName="flex-1" />
          </View>

          <SelectChips
            label="Subjects"
            multi
            value={subjects}
            onChange={toggleSubject}
            options={SUBJECTS.map((s) => ({ value: s, label: s }))}
          />

          <TextField label="Classes" value={classes} onChangeText={setClasses} placeholder="Class 9 – 12" />

          <SelectChips
            label="Teaching Mode"
            value={mode}
            onChange={setMode}
            options={Object.values(TeachingMode).map((m) => ({ value: m, label: TEACHING_MODE_LABELS[m] }))}
          />

          <TextField label="About You" value={bio} onChangeText={setBio} placeholder="Describe your teaching style and achievements." multiline />

          <Button label="Submit Profile" onPress={onSubmit} disabled={!canSubmit} />
          <Text variant="labelMd" color="onSurfaceVariant" align="center">
            Profiles are verified before going live.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
