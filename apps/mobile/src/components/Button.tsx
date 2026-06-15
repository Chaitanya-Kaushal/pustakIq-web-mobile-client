import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { colors } from '@pustakiq/theme';
import { Text } from './Text';
import { Icon, IconName } from './Icon';
import type { ColorToken } from '@pustakiq/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: IconName;
  iconRight?: IconName;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_BG: Record<Variant, string> = {
  primary: 'bg-primary-container',
  secondary: 'border-[1.5px] border-primary bg-transparent',
  ghost: 'bg-surface-container-high',
  whatsapp: 'bg-whatsapp',
};

const VARIANT_FG: Record<Variant, ColorToken> = {
  primary: 'onPrimary',
  secondary: 'primary',
  ghost: 'onSurface',
  whatsapp: 'white',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconRight,
  disabled,
  loading,
  fullWidth = true,
  className,
}: ButtonProps) {
  const fg = VARIANT_FG[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={[
        'min-h-[48px] flex-row items-center justify-center rounded-btn px-6 active:opacity-90',
        VARIANT_BG[variant],
        fullWidth ? 'self-stretch' : '',
        disabled || loading ? 'opacity-50' : '',
        className ?? '',
      ].join(' ')}>
      {loading ? (
        <ActivityIndicator color={colors[fg]} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon ? <Icon name={icon} size={20} tint={colors[fg]} /> : null}
          <Text variant="bodyLg" weight="700" color={fg}>
            {label}
          </Text>
          {iconRight ? <Icon name={iconRight} size={20} tint={colors[fg]} /> : null}
        </View>
      )}
    </Pressable>
  );
}
