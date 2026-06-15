import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { tutors, TEACHING_MODE_LABELS } from '@pustakiq/shared';
import {
  AppHeader,
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  RatingStars,
  Screen,
  SearchBar,
  Text,
} from '../components';
import { AppNavProp } from '../navigation/types';
import { callPhone, openWhatsApp } from '../utils/contact';

const FILTERS = ['Subject', 'Class', 'Area', 'Mode'];

export function TutorsScreen() {
  const navigation = useNavigation<AppNavProp>();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const data = useMemo(() => tutors, []);

  return (
    <Screen>
      <AppHeader onPressNotifications={() => navigation.navigate('Notifications')} />
      <ScrollView contentContainerClassName="p-4 gap-4 pb-8" showsVerticalScrollIndicator={false}>
        <SearchBar placeholder="Search tutors by name or subject..." showMic={false} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2">
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              selected={activeFilter === f}
              trailingIcon="keyboard_arrow_down"
              onPress={() => setActiveFilter((cur) => (cur === f ? null : f))}
            />
          ))}
        </ScrollView>

        <Text variant="labelMd" color="onSurfaceVariant">
          {data.length} tutors near you
        </Text>

        <View className="gap-4">
          {data.map((tutor) => (
            <Card key={tutor.id} onPress={() => navigation.navigate('TutorDetails', { tutorId: tutor.id })}>
              <View className="flex-row items-center gap-4">
                <Avatar uri={tutor.photo} name={tutor.name} size={64} />
                <View className="flex-1 gap-1">
                  <Text variant="bodyLg" weight="700" numberOfLines={1}>
                    {tutor.name}
                  </Text>
                  <Text variant="labelMd" color="onSurfaceVariant" numberOfLines={1}>
                    {tutor.qualification}
                  </Text>
                  <RatingStars rating={tutor.rating} reviewCount={tutor.reviewCount} />
                </View>
              </View>

              <View className="flex-row flex-wrap gap-2 mt-3">
                {tutor.subjects.map((s) => (
                  <Badge key={s} label={s} tone="primary" />
                ))}
                <Badge label={TEACHING_MODE_LABELS[tutor.mode]} tone="success" />
              </View>

              <View className="flex-row gap-3 mt-4">
                <Button label="Call" icon="call" variant="secondary" onPress={() => callPhone(tutor.phone)} className="flex-1" />
                <Button
                  label="WhatsApp"
                  icon="whatsapp"
                  variant="whatsapp"
                  onPress={() => openWhatsApp(tutor.whatsapp, `Hi ${tutor.name}, I found you on PustakIQ and would like to know your availability.`)}
                  className="flex-1"
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
