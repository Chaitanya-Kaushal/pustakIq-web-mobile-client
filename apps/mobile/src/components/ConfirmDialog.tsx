import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Button } from './Button';
import { Icon, IconName } from './Icon';
import { Text } from './Text';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: IconName;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Render the confirm action in the reddish danger style. */
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Centred confirmation dialog with a dimmed backdrop, a tinted icon badge and
 * Cancel / Confirm actions. A friendlier, on-brand replacement for the native
 * `Alert.alert`.
 */
export function ConfirmDialog({
  visible,
  title,
  message,
  icon = 'logout',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}>
      <Pressable
        className="flex-1 items-center justify-center px-8"
        style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)' }}
        onPress={onCancel}>
        {/* Stop propagation so taps on the card don't dismiss the dialog. */}
        <Pressable
          className="w-full rounded-card p-6"
          style={{
            backgroundColor: '#F3FAF8',
            borderWidth: 1,
            borderColor: '#D7E5E1',
          }}
          onPress={() => {}}>
          <View className="items-center gap-3">
            <View
              className={`h-16 w-16 items-center justify-center rounded-full ${
                danger ? 'bg-error-container' : 'bg-primary-fixed'
              }`}>
              <Icon name={icon} size={30} color={danger ? 'error' : 'primary'} />
            </View>
            <Text variant="headlineSm" align="center">
              {title}
            </Text>
            <Text variant="bodyMd" color="onSurfaceVariant" align="center">
              {message}
            </Text>
          </View>

          <View className="mt-6 flex-row gap-3">
            <View className="flex-1">
              <Button label={cancelLabel} variant="ghost" onPress={onCancel} />
            </View>
            <View className="flex-1">
              <Button
                label={confirmLabel}
                variant={danger ? 'danger' : 'primary'}
                onPress={onConfirm}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
