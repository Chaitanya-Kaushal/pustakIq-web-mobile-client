import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography } from '@pustakiq/theme';
import { Button, Card, Icon, Screen, Text } from '../components';
import { useAuth } from '../auth/AuthContext';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

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
    // On success the root navigator swaps to the signed-in stack automatically.
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerClassName="p-6 gap-6 grow justify-center"
          keyboardShouldPersistTaps="handled">
          <View className="items-center gap-2">
            <View className="w-14 h-14 rounded-card bg-primary-container items-center justify-center">
              <Icon name="school_filled" size={32} tint={colors.onPrimary} />
            </View>
            <Text variant="bodyLg" weight="700" color="primary">
              PustakIQ
            </Text>
          </View>

          <View className="gap-1">
            <Text variant="headlineLg">Welcome to PustakIQ</Text>
            <Text variant="bodyLg" color="onSurfaceVariant">
              India's Education Community Platform
            </Text>
          </View>

          <View className="gap-2">
            <Text variant="labelSm" color="onSurfaceVariant" className="tracking-[1px]">
              MOBILE NUMBER
            </Text>
            <View className="flex-row gap-3">
              <View className="px-4 h-[52px] rounded-btn border border-outline-variant bg-surface-container-lowest items-center justify-center">
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
                className="flex-1 h-[52px] rounded-btn border border-outline-variant bg-surface-container-lowest px-4"
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
          />

          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-outline-variant" />
            <Text variant="labelMd" color="onSurfaceVariant">
              OR
            </Text>
            <View className="flex-1 h-px bg-outline-variant" />
          </View>

          <Button
            label="Continue with Google"
            icon="google"
            variant="ghost"
            onPress={onGoogle}
            loading={loading === 'google'}
            className="bg-surface-container-lowest border border-outline-variant"
          />

          <View className="flex-row gap-3">
            <Card className="flex-1 items-center gap-2 bg-surface-container-low">
              <Icon name="menu_book" size={22} color="primary" />
              <Text variant="bodyMd" color="onSurfaceVariant">
                Access Books
              </Text>
            </Card>
            <Card className="flex-1 items-center gap-2 bg-surface-container-low">
              <Icon name="school" size={22} color="secondary" />
              <Text variant="bodyMd" color="onSurfaceVariant">
                Expert Tutors
              </Text>
            </Card>
          </View>

          <Text variant="labelMd" color="onSurfaceVariant" align="center" className="mt-3">
            By continuing, you agree to PustakIQ's Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
