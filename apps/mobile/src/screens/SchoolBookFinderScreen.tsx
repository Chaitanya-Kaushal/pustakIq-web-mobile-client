import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  areas,
  books,
  cities,
  CLASS_LEVELS,
  getClassName,
  schools,
  states,
} from '@pustakiq/shared';
import {
  BookListItem,
  Chip,
  DetailHeader,
  EmptyState,
  Icon,
  Screen,
  Text,
} from '../components';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SchoolBookFinder'>;

interface Selection {
  stateId?: string;
  cityId?: string;
  areaId?: string;
  schoolId?: string;
  classId?: string;
}

const STEP_TITLES = ['Select State', 'Select City', 'Select Area', 'Select School', 'Select Class'];

export function SchoolBookFinderScreen({ navigation }: Props) {
  const [sel, setSel] = useState<Selection>({});

  const step = !sel.stateId
    ? 0
    : !sel.cityId
    ? 1
    : !sel.areaId
    ? 2
    : !sel.schoolId
    ? 3
    : !sel.classId
    ? 4
    : 5;

  const options = useMemo(() => {
    switch (step) {
      case 0:
        return states.map((s) => ({ id: s.id, name: s.name }));
      case 1:
        return cities.filter((c) => c.stateId === sel.stateId);
      case 2:
        return areas.filter((a) => a.cityId === sel.cityId);
      case 3:
        return schools.filter((s) => s.areaId === sel.areaId);
      case 4:
        return CLASS_LEVELS;
      default:
        return [];
    }
  }, [step, sel]);

  const results = useMemo(() => {
    if (step < 5) return [];
    return books.filter(
      (b) => b.schoolBook?.schoolId === sel.schoolId && b.schoolBook?.classId === sel.classId,
    );
  }, [step, sel]);

  const pick = (id: string) => {
    setSel((cur) => {
      if (step === 0) return { stateId: id };
      if (step === 1) return { ...cur, cityId: id };
      if (step === 2) return { ...cur, areaId: id };
      if (step === 3) return { ...cur, schoolId: id };
      return { ...cur, classId: id };
    });
  };

  const crumbs: { label: string; reset: Selection }[] = [];
  if (sel.stateId)
    crumbs.push({ label: states.find((s) => s.id === sel.stateId)!.name, reset: { stateId: sel.stateId } });
  if (sel.cityId)
    crumbs.push({ label: cities.find((c) => c.id === sel.cityId)!.name, reset: { stateId: sel.stateId, cityId: sel.cityId } });
  if (sel.areaId)
    crumbs.push({ label: areas.find((a) => a.id === sel.areaId)!.name, reset: { stateId: sel.stateId, cityId: sel.cityId, areaId: sel.areaId } });
  if (sel.schoolId)
    crumbs.push({ label: schools.find((s) => s.id === sel.schoolId)!.name, reset: { ...sel, classId: undefined } });
  if (sel.classId) crumbs.push({ label: getClassName(sel.classId), reset: sel });

  return (
    <Screen>
      <DetailHeader title="Browse by School" onBack={() => navigation.goBack()} />

      {crumbs.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-1 px-4 py-2">
          {crumbs.map((c, i) => (
            <Chip key={i} label={c.label} selected trailingIcon="close" onPress={() => setSel(c.reset)} />
          ))}
        </ScrollView>
      ) : null}

      <ScrollView contentContainerClassName="p-4 gap-3">
        {step < 5 ? (
          <>
            <Text variant="headlineSm">{STEP_TITLES[step]}</Text>
            <View className="gap-2">
              {options.map((opt) => (
                <Pressable
                  key={opt.id}
                  className="flex-row items-center justify-between p-4 rounded-card border border-outline-variant bg-surface-container-lowest"
                  onPress={() => pick(opt.id)}>
                  <Text variant="bodyLg">{opt.name}</Text>
                  <Icon name="chevron_right" size={22} color="onSurfaceVariant" />
                </Pressable>
              ))}
            </View>
          </>
        ) : results.length === 0 ? (
          <EmptyState
            icon="menu_book"
            title="No books listed yet"
            message="No listings for this school & class right now. Check back soon."
          />
        ) : (
          <>
            <Text variant="headlineSm">{results.length} books found</Text>
            <View className="gap-2">
              {results.map((b) => (
                <BookListItem
                  key={b.id}
                  book={b}
                  onPress={() => navigation.navigate('BookDetails', { bookId: b.id })}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </Screen>
  );
}
