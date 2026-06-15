import React, { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, DetailHeader, Screen, Text } from '../components';
import { useAuth } from '../auth/AuthContext';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

const OTP_LENGTH = 6;

export function OtpScreen({ navigation, route }: Props) {
  const { mobile } = route.params;
  const { verifyOtp, requestOtp } = useAuth();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const onVerify = async () => {
    if (code.length !== OTP_LENGTH) return;
    setLoading(true);
    await verifyOtp(mobile, code);
    // Root navigator switches to the signed-in stack on success.
  };

  const onResend = async () => {
    if (seconds > 0) return;
    await requestOtp(mobile);
    setSeconds(30);
  };

  return (
    <Screen>
      <DetailHeader onBack={() => navigation.goBack()} />
      <View className="p-6 gap-6">
        <View className="gap-1">
          <Text variant="headlineLg">Verify your number</Text>
          <Text variant="bodyLg" color="onSurfaceVariant">
            Enter the 6-digit code sent to {mobile}
          </Text>
          <Text variant="labelMd" color="primary">
            (Demo: enter any 6 digits)
          </Text>
        </View>

        <Pressable className="flex-row justify-between gap-2" onPress={() => inputRef.current?.focus()}>
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <View
              key={i}
              className={
                i === code.length
                  ? 'flex-1 aspect-[0.85] rounded-btn border-2 border-primary bg-surface-container-lowest items-center justify-center'
                  : 'flex-1 aspect-[0.85] rounded-btn border-[1.5px] border-outline-variant bg-surface-container-lowest items-center justify-center'
              }>
              <Text variant="headlineMd">{code[i] ?? ''}</Text>
            </View>
          ))}
        </Pressable>

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={(t) => setCode(t.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH))}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          autoFocus
          className="absolute opacity-0 h-px w-px"
        />

        <Button
          label="Verify & Continue"
          onPress={onVerify}
          disabled={code.length !== OTP_LENGTH}
          loading={loading}
        />

        <Pressable onPress={onResend} disabled={seconds > 0} className="items-center">
          <Text
            variant="bodyMd"
            color={seconds > 0 ? 'onSurfaceVariant' : 'primary'}
            weight="600">
            {seconds > 0 ? `Resend code in ${seconds}s` : 'Resend code'}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
