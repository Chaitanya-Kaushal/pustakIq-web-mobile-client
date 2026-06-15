import React, { useState } from 'react';
import { Pressable, ScrollView, Switch, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@pustakiq/theme';
import { Icon, IconName, Screen, Text, DetailHeader } from '../components';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  return (
    <Screen edges={['top', 'bottom']}>
      <DetailHeader title="Settings" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerClassName="p-4 gap-6">
        <Group title="Preferences">
          <ToggleRow
            icon="notifications"
            label="Push Notifications"
            value={pushEnabled}
            onValueChange={setPushEnabled}
          />
          <ToggleRow
            icon="location_on"
            label="Use My Location"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            last
          />
        </Group>

        <Group title="About">
          <LinkRow icon="info" label="About PustakIQ" />
          <LinkRow icon="info" label="Terms of Service" />
          <LinkRow icon="info" label="Privacy Policy" last />
        </Group>

        <Text variant="labelMd" color="onSurfaceVariant" align="center">
          PustakIQ v0.1.0
        </Text>
      </ScrollView>
    </Screen>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-1">
      <Text variant="labelSm" color="onSurfaceVariant" className="tracking-wide ml-2">
        {title.toUpperCase()}
      </Text>
      <View className="rounded-card border border-outline-variant bg-surface-container-lowest overflow-hidden">
        {children}
      </View>
    </View>
  );
}

function ToggleRow({
  icon,
  label,
  value,
  onValueChange,
  last,
}: {
  icon: IconName;
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  last?: boolean;
}) {
  return (
    <View className={`flex-row items-center gap-4 p-4${!last ? ' border-b border-outline-variant' : ''}`}>
      <Icon name={icon} size={22} color="primary" />
      <Text variant="bodyLg" className="flex-1">
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: colors.primaryContainer, false: colors.outlineVariant }}
        thumbColor={colors.white}
      />
    </View>
  );
}

function LinkRow({ icon, label, last }: { icon: IconName; label: string; last?: boolean }) {
  return (
    <Pressable className={`flex-row items-center gap-4 p-4${!last ? ' border-b border-outline-variant' : ''}`}>
      <Icon name={icon} size={22} color="primary" />
      <Text variant="bodyLg" className="flex-1">
        {label}
      </Text>
      <Icon name="chevron_right" size={22} color="onSurfaceVariant" />
    </Pressable>
  );
}
