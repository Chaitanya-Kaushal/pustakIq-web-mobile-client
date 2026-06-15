import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography } from '@pustakiq/theme';
import { Button, GoogleLogo, Icon, IconName, Screen, Text } from '../components';
import { useAuth } from '../auth/AuthContext';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const FEATURES: { icon: IconName; label: string; tint: string; bg: string }[] = [
  { icon: 'menu_book', label: 'Books', tint: '#0D9488', bg: '#F0FDFA' },
  { icon: 'school', label: 'Tutors', tint: '#10B981', bg: '#ECFDF5' },
  { icon: 'storefront', label: 'Stores', tint: '#F59E0B', bg: '#FFFBEB' },
];

export function LoginScreen({ navigation }: Props) {
  const { requestOtp, signInWithGoogle } = useAuth();
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState<'otp' | 'google' | null>(null);

  const valid = mobile.replace(/\D/g, '').length === 10;

  const onContinue = async () => {
    if (!valid) return;
    setLoading('otp');
    const full = `+91${mobile.replace(/\D/g, '')}`;
    await requestOtp(full);
    setLoading(null);
    navigation.navigate('Otp', { mobile: full });
  };

  const onGoogle = async () => {
    setLoading('google');
    await signInWithGoogle();
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerClassName="px-6 pb-8 grow justify-center"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View className="items-center gap-3 pb-7">
            <View className="h-20 w-20 items-center justify-center rounded-[26px] bg-primary shadow-lg shadow-primary/30">
              <Icon name="school_filled" size={42} tint="#ffffff" />
            </View>
            <Text variant="headlineLg" align="center">
              Welcome to PustakIQ 👋
            </Text>
            <Text variant="bodyLg" color="onSurfaceVariant" align="center">
              India&apos;s Education Community Platform
            </Text>
          </View>

          {/* Colorful feature chips */}
          <View className="mb-7 flex-row justify-center gap-3">
            {FEATURES.map((f) => (
              <View
                key={f.label}
                className="flex-1 items-center gap-2 rounded-card border border-outline-variant bg-surface-container-lowest py-4 shadow-sm shadow-black/5">
                <View
                  className="h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: f.bg }}>
                  <Icon name={f.icon} size={22} tint={f.tint} />
                </View>
                <Text variant="labelMd" weight="600">
                  {f.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Mobile number */}
          <View className="gap-2">
            <Text variant="labelSm" color="onSurfaceVariant" className="tracking-[1px]">
              MOBILE NUMBER
            </Text>
            <View className="flex-row gap-3">
              <View className="h-[54px] items-center justify-center rounded-btn border border-outline-variant bg-surface-container-lowest px-4">
                <Text variant="bodyLg" weight="600">
                  +91
                </Text>
              </View>
              <TextInput
                value={mobile}
                onChangeText={(t) => setMobile(t.replace(/[^0-9]/g, '').slice(0, 10))}
                placeholder="98765 43210"
                placeholderTextColor={colors.onSurfaceVariant}
                keyboardType="number-pad"
                className="h-[54px] flex-1 rounded-btn border border-outline-variant bg-surface-container-lowest px-4"
                style={{ ...typography.bodyLg, color: colors.onSurface }}
                maxLength={10}
              />
            </View>
          </View>

          <Button
            label="Continue with Mobile Number"
            icon="phone_outline"
            onPress={onContinue}
            disabled={!valid}
            loading={loading === 'otp'}
            className="mt-5"
          />

          <View className="my-5 flex-row items-center gap-3">
            <View className="h-px flex-1 bg-outline-variant" />
            <Text variant="labelMd" color="onSurfaceVariant">
              OR
            </Text>
            <View className="h-px flex-1 bg-outline-variant" />
          </View>

          <Button
            label="Continue with Google"
            leading={<GoogleLogo size={20} />}
            variant="ghost"
            onPress={onGoogle}
            loading={loading === 'google'}
            className="border border-outline-variant bg-surface-container-lowest"
          />

          <Text variant="labelMd" color="onSurfaceVariant" align="center" className="mt-6">
            By continuing, you agree to PustakIQ&apos;s Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
