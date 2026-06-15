import {
  BookCondition,
  ExamType,
  StoreCategory,
  TeachingMode,
  ClassLevel,
} from './types';

/** Human-readable labels for enums (used by chips, filters, badges). */

export const CONDITION_LABELS: Record<BookCondition, string> = {
  [BookCondition.NEW]: 'New',
  [BookCondition.LIKE_NEW]: 'Like New',
  [BookCondition.GOOD]: 'Good',
  [BookCondition.WORN]: 'Worn',
};

export const EXAM_TYPE_LABELS: Record<ExamType, string> = {
  [ExamType.JEE]: 'JEE',
  [ExamType.NEET]: 'NEET',
  [ExamType.UPSC]: 'UPSC',
  [ExamType.SSC]: 'SSC',
  [ExamType.CAT]: 'CAT',
  [ExamType.BANKING]: 'Banking',
  [ExamType.GATE]: 'GATE',
};

export const STORE_CATEGORY_LABELS: Record<StoreCategory, string> = {
  [StoreCategory.NEW_BOOKS]: 'New Books',
  [StoreCategory.USED_BOOKS]: 'Used Books',
  [StoreCategory.SCHOOL_BOOKS]: 'School Books',
  [StoreCategory.EXAM_BOOKS]: 'Exam Books',
  [StoreCategory.STATIONERY]: 'Stationery',
};

export const TEACHING_MODE_LABELS: Record<TeachingMode, string> = {
  [TeachingMode.HOME_TUITION]: 'Home Tuition',
  [TeachingMode.ONLINE]: 'Online',
  [TeachingMode.BOTH]: 'Home & Online',
};

export const EXAM_TYPES: ExamType[] = [
  ExamType.JEE,
  ExamType.NEET,
  ExamType.UPSC,
  ExamType.SSC,
  ExamType.CAT,
  ExamType.BANKING,
  ExamType.GATE,
];

/** Class hierarchy from prd.md §13D (Nursery → Class 12). */
export const CLASS_LEVELS: ClassLevel[] = [
  { id: 'cls-nursery', name: 'Nursery', order: 0 },
  { id: 'cls-lkg', name: 'LKG', order: 1 },
  { id: 'cls-ukg', name: 'UKG', order: 2 },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `cls-${i + 1}`,
    name: `Class ${i + 1}`,
    order: i + 3,
  })),
];

/** Resolve a human class label (e.g. "cls-10" → "Class 10"). */
export function getClassName(classId?: string): string {
  if (!classId) return '';
  return CLASS_LEVELS.find((c) => c.id === classId)?.name ?? classId;
}

/** Common school subjects used in filters and tutor tags. */
export const SUBJECTS = [
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Social Studies',
  'History',
  'Geography',
  'Hindi',
  'Computer Science',
] as const;
