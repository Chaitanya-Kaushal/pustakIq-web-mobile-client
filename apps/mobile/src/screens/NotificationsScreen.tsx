import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatDate, notifications as seed, AppNotification } from '@pustakiq/shared';
import { Card, DetailHeader, EmptyState, Icon, Screen, Text } from '../components';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

export function NotificationsScreen({ navigation }: Props) {
  const [items, setItems] = useState<AppNotification[]>(seed);

  const markAllRead = () =>
    setItems((list) => list.map((n) => ({ ...n, isRead: true })));

  return (
    <Screen>
      <DetailHeader
        title="Notifications"
        onBack={() => navigation.goBack()}
        actions={[{ icon: 'check', onPress: markAllRead }]}
      />
      {items.length === 0 ? (
        <EmptyState icon="notifications" title="No notifications" message="You're all caught up." />
      ) : (
        <ScrollView contentContainerClassName="p-4 gap-3">
          {items.map((n) => (
            <Card
              key={n.id}
              className={`flex-row gap-3 ${!n.isRead ? 'border-primary-fixed-dim' : ''}`}
              style={!n.isRead ? { backgroundColor: '#dbe1ff55' } : undefined}
            >
              <View
                className={`h-10 w-10 rounded-full items-center justify-center ${
                  !n.isRead ? 'bg-surface-container-lowest' : 'bg-surface-container-high'
                }`}
              >
                <Icon name="bell_badge" size={20} color={n.isRead ? 'onSurfaceVariant' : 'primary'} />
              </View>
              <View className="flex-1 gap-0.5">
                <Text variant="bodyMd" weight="700">
                  {n.title}
                </Text>
                <Text variant="bodyMd" color="onSurfaceVariant">
                  {n.body}
                </Text>
                <Text variant="labelMd" color="onSurfaceVariant" className="mt-1">
                  {formatDate(n.createdAt)}
                </Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      )}
    </Screen>
  );
}
