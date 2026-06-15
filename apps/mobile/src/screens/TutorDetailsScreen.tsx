import React from 'react';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTutorById, TEACHING_MODE_LABELS } from '@pustakiq/shared';
import {
  Avatar,
  Badge,
  Card,
  ContactBar,
  DetailHeader,
  EmptyState,
  Icon,
  RatingStars,
  Screen,
  Text,
} from '../components';
import { RootStackParamList } from '../navigation/types';
import { callPhone, openWhatsApp } from '../utils/contact';

type Props = NativeStackScreenProps<RootStackParamList, 'TutorDetails'>;

export function TutorDetailsScreen({ navigation, route }: Props) {
  const tutor = getTutorById(route.params.tutorId);

  if (!tutor) {
    return (
      <Screen>
        <DetailHeader onBack={() => navigation.goBack()} title="Tutor" />
        <EmptyState icon="school" title="Tutor not found" />
      </Screen>
    );
  }

  return (
    <Screen>
      <DetailHeader onBack={() => navigation.goBack()} title="Tutor Profile" />
      <ScrollView contentContainerClassName="p-4 gap-6 pb-8" showsVerticalScrollIndicator={false}>
        <Card className="items-center gap-2">
          <Avatar uri={tutor.photo} name={tutor.name} size={88} />
          <Text variant="headlineMd" align="center">
            {tutor.name}
          </Text>
          <Text variant="bodyMd" color="onSurfaceVariant" align="center">
            {tutor.qualification}
          </Text>
          <RatingStars rating={tutor.rating} reviewCount={tutor.reviewCount} />
        </Card>

        <View className="flex-row gap-3">
          <Stat icon="info" value={`${tutor.experienceYears} yrs`} label="Experience" />
          <Stat icon="school" value={TEACHING_MODE_LABELS[tutor.mode]} label="Mode" />
          <Stat icon="star" value={tutor.rating.toFixed(1)} label="Rating" />
        </View>

        <Section title="Subjects">
          <View className="flex-row flex-wrap gap-2">
            {tutor.subjects.map((s) => (
              <Badge key={s} label={s} tone="primary" />
            ))}
          </View>
        </Section>

        <Section title="Classes">
          <View className="flex-row flex-wrap gap-2">
            {tutor.classes.map((c) => (
              <Badge key={c} label={c} tone="success" />
            ))}
          </View>
        </Section>

        <Section title="About">
          <Text variant="bodyMd" color="onSurfaceVariant" className="leading-[22px]">
            {tutor.bio}
          </Text>
        </Section>
      </ScrollView>

      <ContactBar
        callLabel="Call Tutor"
        onCall={() => callPhone(tutor.phone)}
        onWhatsApp={() =>
          openWhatsApp(
            tutor.whatsapp,
            `Hi ${tutor.name}, I found you on PustakIQ and would like to know your availability.`,
          )
        }
      />
    </Screen>
  );
}

function Stat({ icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <Card className="flex-1 items-center gap-1">
      <Icon name={icon} size={20} color="primary" />
      <Text variant="bodyMd" weight="700" align="center" numberOfLines={1}>
        {value}
      </Text>
      <Text variant="labelMd" color="onSurfaceVariant">
        {label}
      </Text>
    </Card>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text variant="headlineSm">{title}</Text>
      {children}
    </View>
  );
}
