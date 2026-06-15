import React from 'react';
import { Text as RNText, View } from 'react-native';
import { BookCondition, CONDITION_LABELS } from '@pustakiq/shared';

type Tone = 'primary' | 'success' | 'warning' | 'error' | 'neutral';

const TONE_BG: Record<Tone, string> = {
  primary: 'bg-[#EFF6FF]',
  success: 'bg-[#ECFDF5]',
  warning: 'bg-[#FEF9C3]',
  error: 'bg-error-container',
  neutral: 'bg-surface-container-high',
};

const TONE_TEXT: Record<Tone, string> = {
  primary: 'text-primary',
  success: 'text-[#00714d]',
  warning: 'text-[#854D0E]',
  error: 'text-on-error-container',
  neutral: 'text-on-surface-variant',
};

export interface BadgeProps {
  label: string;
  tone?: Tone;
  className?: string;
  uppercase?: boolean;
}

export function Badge({ label, tone = 'primary', className, uppercase }: BadgeProps) {
  return (
    <View className={`self-start rounded-lg px-2 py-1 ${TONE_BG[tone]} ${className ?? ''}`}>
      <RNText className={`text-[11px] font-semibold leading-[14px] ${TONE_TEXT[tone]}`}>
        {uppercase ? label.toUpperCase() : label}
      </RNText>
    </View>
  );
}

const CONDITION_TONE: Record<BookCondition, Tone> = {
  [BookCondition.NEW]: 'success',
  [BookCondition.LIKE_NEW]: 'success',
  [BookCondition.GOOD]: 'warning',
  [BookCondition.WORN]: 'error',
};

export function ConditionBadge({ condition }: { condition: BookCondition }) {
  return (
    <Badge label={CONDITION_LABELS[condition]} tone={CONDITION_TONE[condition]} uppercase />
  );
}
