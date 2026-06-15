import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { colors } from '@pustakiq/theme';
import { Icon } from './Icon';
import { Text } from './Text';

export interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  showMic?: boolean;
  /** When provided, the bar behaves as a button (e.g. navigate to search). */
  onPress?: () => void;
  className?: string;
}

const BAR =
  'flex-row items-center gap-3 rounded-btn border border-outline-variant bg-surface-container-lowest px-4 py-3 shadow-sm';

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search books, tutors, stores...',
  showMic = true,
  onPress,
  className,
}: SearchBarProps) {
  if (onPress) {
    return (
      <Pressable onPress={onPress} className={`${BAR} ${className ?? ''}`}>
        <Icon name="search" size={22} color="outline" />
        <Text variant="bodyLg" color="onSurfaceVariant" className="flex-1">
          {placeholder}
        </Text>
        {showMic ? <Icon name="mic" size={22} color="primary" /> : null}
      </Pressable>
    );
  }

  return (
    <View className={`${BAR} ${className ?? ''}`}>
      <Icon name="search" size={22} color="outline" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant}
        className="flex-1 p-0 text-base text-on-surface"
      />
      {showMic ? <Icon name="mic" size={22} color="primary" /> : null}
    </View>
  );
}
