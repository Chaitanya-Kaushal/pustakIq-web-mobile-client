import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { Icon } from './Icon';
import { Text } from './Text';
import { pickImages } from '../utils/imagePicker';

export interface MultiImagePickerProps {
  value: string[];
  onChange: (uris: string[]) => void;
  max?: number;
}

/**
 * Flipkart-style multi-image picker: a horizontal strip of thumbnails with a
 * remove button on each, the first marked "Cover", plus an add tile.
 */
export function MultiImagePicker({ value, onChange, max = 6 }: MultiImagePickerProps) {
  const remaining = Math.max(0, max - value.length);

  const add = async () => {
    if (remaining === 0) return;
    const imgs = await pickImages(remaining);
    if (imgs.length) onChange([...value, ...imgs.map((i) => i.uri)].slice(0, max));
  };

  const removeAt = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text variant="labelSm" color="onSurfaceVariant" className="tracking-wider">
          PHOTOS
        </Text>
        <Text variant="labelSm" color="onSurfaceVariant">
          {value.length}/{max}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3">
        {value.map((uri, idx) => (
          <View key={`${uri}-${idx}`} className="h-24 w-24">
            <Image source={{ uri }} className="h-24 w-24 rounded-2xl bg-surface-container-high" />
            <Pressable
              onPress={() => removeAt(idx)}
              hitSlop={8}
              className="absolute -right-1.5 -top-1.5 h-6 w-6 items-center justify-center rounded-full border-2 border-surface bg-error">
              <Icon name="close" size={14} tint="#ffffff" />
            </Pressable>
            {idx === 0 ? (
              <View className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5">
                <Text variant="labelSm" style={{ color: '#fff' }}>
                  Cover
                </Text>
              </View>
            ) : null}
          </View>
        ))}

        {remaining > 0 ? (
          <Pressable
            onPress={add}
            className="h-24 w-24 items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-primary/40 bg-primary-soft active:opacity-80">
            <Icon name="add" size={24} color="primary" />
            <Text variant="labelSm" color="primary" weight="600">
              Add
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>

      <Text variant="labelMd" color="onSurfaceVariant">
        Add up to {max} photos. The first is your cover image.
      </Text>
    </View>
  );
}
