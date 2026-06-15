import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@pustakiq/theme';
import { Button } from './Button';

export interface ContactBarProps {
  callLabel?: string;
  onCall: () => void;
  onWhatsApp: () => void;
  /** Optional extra action (e.g. Directions for stores). */
  onDirections?: () => void;
}

/** Sticky bottom bar with Call + WhatsApp CTAs (PRD contact model). */
export function ContactBar({
  callLabel = 'Call',
  onCall,
  onWhatsApp,
  onDirections,
}: ContactBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-row gap-3 border-t border-outline-variant bg-surface px-4 pt-3"
      style={{ paddingBottom: spacing.sm + insets.bottom }}>
      <Button label={callLabel} icon="call" onPress={onCall} className="flex-1" />
      <Button
        label="WhatsApp"
        icon="whatsapp"
        variant="whatsapp"
        onPress={onWhatsApp}
        className="flex-1"
      />
      {onDirections ? (
        <Button
          label=""
          icon="directions"
          variant="ghost"
          onPress={onDirections}
          fullWidth={false}
        />
      ) : null}
    </View>
  );
}
