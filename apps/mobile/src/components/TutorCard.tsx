import React from 'react';
import { View } from 'react-native';
import { TutorProfile } from '@pustakiq/shared';
import { Text } from './Text';
import { Card } from './Card';
import { Avatar } from './Avatar';
import { RatingStars } from './RatingStars';

export interface TutorCardProps {
  tutor: TutorProfile;
  onPress?: () => void;
  className?: string;
}

export function TutorCard({ tutor, onPress, className }: TutorCardProps) {
  return (
    <Card onPress={onPress} className={`flex-row items-center gap-4 ${className ?? ''}`}>
      <Avatar uri={tutor.photo} name={tutor.name} size={64} />
      <View className="flex-1 gap-1">
        <Text variant="bodyMd" weight="700" numberOfLines={1}>
          {tutor.name}
        </Text>
        <Text variant="labelMd" color="onSurfaceVariant" numberOfLines={1}>
          {tutor.subjects.join(', ')} • {tutor.experienceYears} Years Exp.
        </Text>
        <RatingStars rating={tutor.rating} reviewCount={tutor.reviewCount} />
      </View>
    </Card>
  );
}
