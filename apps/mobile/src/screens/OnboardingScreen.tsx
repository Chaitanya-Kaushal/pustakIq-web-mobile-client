import React, { useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, IconName, Screen, Text } from '../components';
import { useAuth } from '../auth/AuthContext';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

interface Slide {
  icon: IconName;
  tint: string;
  bg: string;
  title: string;
  body: string;
}

const SLIDES: Slide[] = [
  {
    icon: 'menu_book',
    tint: '#2563EB',
    bg: '#EFF6FF',
    title: 'Buy & Sell School Books 📚',
    body: 'Save money by buying and selling books within your local community.',
  },
  {
    icon: 'school',
    tint: '#10B981',
    bg: '#ECFDF5',
    title: 'Find Verified Tutors Nearby 🎓',
    body: 'Connect with experienced tutors for school subjects and exam preparation.',
  },
  {
    icon: 'storefront',
    tint: '#F97316',
    bg: '#FFF7ED',
    title: 'Discover Trusted Book Stores 🛍️',
    body: 'Locate stores near you for new & used books, exam guides and stationery.',
  },
];

export function OnboardingScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const { completeOnboarding } = useAuth();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const finish = async () => {
    await completeOnboarding();
    navigation.replace('Login');
  };

  const onNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      finish();
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <Screen>
      <View className="items-end px-4 py-3">
        <Pressable onPress={finish} hitSlop={8}>
          <Text variant="bodyLg" weight="600" color="onSurfaceVariant">
            Skip
          </Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.title}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        renderItem={({ item }) => (
          <View className="items-center justify-center gap-4 px-8" style={{ width }}>
            {/* Layered circular illustration */}
            <View
              className="mb-8 h-64 w-64 items-center justify-center rounded-full"
              style={{ backgroundColor: item.bg }}>
              <View
                className="h-44 w-44 items-center justify-center rounded-full"
                style={{ backgroundColor: '#ffffff' }}>
                <Icon name={item.icon} size={84} tint={item.tint} />
              </View>
            </View>
            <Text variant="headlineLg" align="center">
              {item.title}
            </Text>
            <Text variant="bodyLg" color="onSurfaceVariant" align="center">
              {item.body}
            </Text>
          </View>
        )}
      />

      <View className="p-4 gap-6">
        <View className="flex-row justify-center gap-2">
          {SLIDES.map((_, i) => (
            <View
              key={i}
              className={
                i === index
                  ? 'w-6 h-2 rounded-full bg-primary'
                  : 'w-2 h-2 rounded-full bg-outline-variant'
              }
            />
          ))}
        </View>
        <Button
          label={index === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          iconRight="chevron_right"
          onPress={onNext}
        />
      </View>
    </Screen>
  );
}
