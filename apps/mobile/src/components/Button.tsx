import React from 'react';
import { ActivityIndicator, Pressable, View, ViewStyle } from 'react-native';
import { colors } from '@pustakiq/theme';
import { Text } from './Text';
import { Icon, IconName } from './Icon';
import type { ColorToken } from '@pustakiq/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'danger';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: IconName;
  /** Custom leading element (e.g. a multi-colour logo) shown instead of `icon`. */
  leading?: React.ReactNode;
  iconRight?: IconName;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_BG: Record<Variant, string> = {
  primary: 'bg-primary shadow-sm shadow-primary/30',
  secondary: 'border-[1.5px] border-primary/30 bg-primary-soft',
  ghost: 'bg-surface-container',
  whatsapp: 'bg-whatsapp shadow-sm shadow-whatsapp/30',
  danger: 'bg-error-container',
};

// Borders set via inline style — NativeWind silently drops arbitrary/opacity
// border colors here, falling back to default black.
const VARIANT_STYLE: Partial<Record<Variant, ViewStyle>> = {
  danger: { borderWidth: 1, borderColor: '#F4AEAE' },
};

const VARIANT_FG: Record<Variant, ColorToken> = {
  primary: 'onPrimary',
  secondary: 'primary',
  ghost: 'onSurface',
  whatsapp: 'white',
  danger: 'error',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  leading,
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
      style={VARIANT_STYLE[variant]}
      className={[
        'min-h-[52px] flex-row items-center justify-center rounded-full px-6 active:opacity-90',
        VARIANT_BG[variant],
        fullWidth ? 'self-stretch' : '',
        disabled || loading ? 'opacity-50' : '',
        className ?? '',
      ].join(' ')}>
      {loading ? (
        <ActivityIndicator color={colors[fg]} />
      ) : (
        <View className="flex-row items-center gap-2">
          {leading ?? (icon ? <Icon name={icon} size={20} tint={colors[fg]} /> : null)}
          <Text variant="bodyLg" weight="700" color={fg}>
            {label}
          </Text>
          {iconRight ? <Icon name={iconRight} size={20} tint={colors[fg]} /> : null}
        </View>
      )}
    </Pressable>
  );
}
