import React from 'react';
import { View } from 'react-native';
import { Chip } from './Chip';
import { Text } from './Text';

export interface Option<T extends string> {
  value: T;
  label: string;
}

export interface SelectChipsProps<T extends string> {
  label: string;
  options: Option<T>[];
  value: T | T[] | null;
  onChange: (value: T) => void;
  multi?: boolean;
}

/** Labelled row of selectable pill chips for choosing enum values in forms. */
export function SelectChips<T extends string>({
  label,
  options,
  value,
  onChange,
  multi,
}: SelectChipsProps<T>) {
  const isSelected = (v: T) =>
    multi ? Array.isArray(value) && value.includes(v) : value === v;

  return (
    <View className="gap-2">
      <Text variant="labelSm" color="onSurfaceVariant" className="tracking-wider">
        {label.toUpperCase()}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            selected={isSelected(opt.value)}
            onPress={() => onChange(opt.value)}
          />
        ))}
      </View>
    </View>
  );
}
