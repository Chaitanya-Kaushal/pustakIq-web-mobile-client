import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
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
  IconName,
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
    <Screen edges={['top']}>
      <View className="flex-1">
        <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View className="items-center gap-2 bg-primary-soft px-6 pb-12 pt-12">
            <View className="rounded-full border-4 border-white shadow-md shadow-black/10">
              <Avatar uri={tutor.photo} name={tutor.name} size={104} />
            </View>
            <Text variant="headlineMd" align="center" className="mt-1">
              {tutor.name}
            </Text>
            <Text variant="bodyMd" color="onSurfaceVariant" align="center">
              {tutor.qualification}
            </Text>
            <RatingStars rating={tutor.rating} reviewCount={tutor.reviewCount} />
          </View>

          {/* Content sheet */}
          <View className="-mt-7 gap-6 rounded-t-[28px] bg-background p-4">
            <View className="flex-row gap-3">
              <Stat icon="info" value={`${tutor.experienceYears} yrs`} label="Experience" bgClass="bg-primary-soft" color="primary" />
              <Stat icon="school" value={TEACHING_MODE_LABELS[tutor.mode]} label="Mode" bgClass="bg-secondary-soft" color="secondary" />
              <Stat icon="star" value={tutor.rating.toFixed(1)} label="Rating" bgClass="bg-accent-soft" color="tertiary" />
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
          </View>
        </ScrollView>

        <View className="absolute left-3 top-1">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm shadow-black/10 active:opacity-80">
            <Icon name="arrow_back" size={20} color="onSurface" />
          </Pressable>
        </View>
      </View>

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

function Stat({
  icon,
  value,
  label,
  bgClass,
  color,
}: {
  icon: IconName;
  value: string;
  label: string;
  bgClass: string;
  color: 'primary' | 'secondary' | 'tertiary';
}) {
  return (
    <Card className="flex-1 items-center gap-1">
      <View className={`h-10 w-10 items-center justify-center rounded-full ${bgClass}`}>
        <Icon name={icon} size={20} color={color} />
      </View>
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
