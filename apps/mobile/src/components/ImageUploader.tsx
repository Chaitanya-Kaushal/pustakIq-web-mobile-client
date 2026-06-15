import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { Icon } from './Icon';
import { Text } from './Text';
import { pickImages } from '../utils/imagePicker';

export interface ImageUploaderProps {
  value?: string;
  onChange: (uri?: string) => void;
  variant?: 'avatar' | 'banner';
  size?: number;
  label?: string;
}

/** Single-image uploader. `avatar` = circular; `banner` = wide rounded card. */
export function ImageUploader({
  value,
  onChange,
  variant = 'avatar',
  size = 96,
  label,
}: ImageUploaderProps) {
  const pick = async () => {
    const imgs = await pickImages(1);
    if (imgs[0]) onChange(imgs[0].uri);
  };

  if (variant === 'avatar') {
    return (
      <View className="items-center gap-2">
        <Pressable onPress={pick} className="active:opacity-90" style={{ width: size, height: size }}>
          {value ? (
            <Image source={{ uri: value }} style={{ width: size, height: size }} className="rounded-full bg-surface-container-high" />
          ) : (
            <View style={{ width: size, height: size }} className="items-center justify-center rounded-full border-2 border-dashed border-primary/40 bg-primary-soft">
              <Icon name="camera" size={28} color="primary" />
            </View>
          )}
          <View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-primary-container">
            <Icon name="camera" size={16} tint="#ffffff" />
          </View>
        </Pressable>
        {label ? (
          <Text variant="labelMd" color="primary" weight="600">
            {label}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <Pressable onPress={pick} className="active:opacity-95">
      {value ? (
        <View className="aspect-video w-full overflow-hidden rounded-card">
          <Image source={{ uri: value }} className="h-full w-full bg-surface-container-high" />
          <View className="absolute bottom-3 right-3 flex-row items-center gap-1 rounded-full bg-black/55 px-3 py-1.5">
            <Icon name="camera" size={14} tint="#ffffff" />
            <Text variant="labelSm" style={{ color: '#fff' }}>
              Change
            </Text>
          </View>
        </View>
      ) : (
        <View className="aspect-video w-full items-center justify-center gap-2 rounded-card border-2 border-dashed border-primary/30 bg-primary-soft">
          <Icon name="image" size={32} color="primary" />
          <Text variant="bodyMd" color="primary" weight="600">
            {label ?? 'Add a photo'}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
