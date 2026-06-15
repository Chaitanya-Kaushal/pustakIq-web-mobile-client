import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@pustakiq/theme';
import { Text } from './Text';

export interface TextFieldProps extends TextInputProps {
  label: string;
  helper?: string;
  containerClassName?: string;
}

export function TextField({
  label,
  helper,
  containerClassName,
  multiline,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <View className={`gap-2 ${containerClassName ?? ''}`}>
      <Text variant="labelSm" color="onSurfaceVariant" className="tracking-wider">
        {label.toUpperCase()}
      </Text>
      <TextInput
        placeholderTextColor={colors.onSurfaceVariant}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'auto'}
        className={[
          'rounded-btn border border-outline-variant bg-surface-container-lowest px-4 text-base text-on-surface focus:border-2 focus:border-primary',
          multiline ? 'min-h-[110px] pt-3' : 'min-h-[52px]',
          className ?? '',
        ].join(' ')}
        {...rest}
      />
      {helper ? (
        <Text variant="labelMd" color="onSurfaceVariant">
          {helper}
        </Text>
      ) : null}
    </View>
  );
}
