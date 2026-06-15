/**
 * Domain types for PustakIQ.
 *
 * Mirrors the database structure in prd.md §13D so these types can be shared
 * across the mobile app, public website, admin dashboard and (eventually) the
 * NestJS API DTOs.
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum ListingType {
  BOOK_SET = 'BOOK_SET',
  INDIVIDUAL_BOOK = 'INDIVIDUAL_BOOK',
}

export enum BookCategory {
  SCHOOL_BOOK = 'SCHOOL_BOOK',
  EXAM_BOOK = 'EXAM_BOOK',
}

export enum ListingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SOLD = 'SOLD',
}

export enum ExamType {
  JEE = 'JEE',
  NEET = 'NEET',
  UPSC = 'UPSC',
  SSC = 'SSC',
  CAT = 'CAT',
  BANKING = 'BANKING',
  GATE = 'GATE',
}

/** Physical condition of a used book (drives the catalog/detail badges). */
export enum BookCondition {
  NEW = 'NEW',
  LIKE_NEW = 'LIKE_NEW',
  GOOD = 'GOOD',
  WORN = 'WORN',
}

export enum TeachingMode {
  HOME_TUITION = 'HOME_TUITION',
  ONLINE = 'ONLINE',
  BOTH = 'BOTH',
}

export enum StoreCategory {
  NEW_BOOKS = 'NEW_BOOKS',
  USED_BOOKS = 'USED_BOOKS',
  SCHOOL_BOOKS = 'SCHOOL_BOOKS',
  EXAM_BOOKS = 'EXAM_BOOKS',
  STATIONERY = 'STATIONERY',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// ---------------------------------------------------------------------------
// Location hierarchy
// ---------------------------------------------------------------------------

export interface State {
  id: string;
  name: string;
}

export interface City {
  id: string;
  stateId: string;
  name: string;
}

export interface Area {
  id: string;
  cityId: string;
  name: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  cityId: string;
  areaId: string;
  logo?: string;
}

export interface ClassLevel {
  id: string;
  /** e.g. "Nursery", "LKG", "Class 1" … "Class 12" */
  name: string;
  /** Sort order for display. */
  order: number;
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  profileImage?: string;
  cityId?: string;
  areaId?: string;
  role: UserRole;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Book listings
// ---------------------------------------------------------------------------

export interface BookImage {
  id: string;
  listingId: string;
  imageUrl: string;
}

export interface SchoolBookDetails {
  schoolId: string;
  classId: string;
  academicYear: string;
}

export interface ExamBookDetails {
  examType: ExamType;
}

export interface BookListing {
  id: string;
  userId: string;
  listingType: ListingType;
  category: BookCategory;
  title: string;
  description: string;
  price: number;
  /** Optional original/MRP price, drives the strikethrough in the UI. */
  originalPrice?: number;
  condition: BookCondition;
  cityId: string;
  areaId: string;
  status: ListingStatus;
  createdAt: string;
  images: BookImage[];
  /** Present when category === SCHOOL_BOOK. */
  schoolBook?: SchoolBookDetails;
  /** Present when category === EXAM_BOOK. */
  examBook?: ExamBookDetails;

  // ---- Denormalised display fields (resolved server-side / in mock data) ----
  subject?: string;
  pageCount?: number;
  language?: string;
  isFeatured?: boolean;
  seller: SellerSummary;
}

export interface SellerSummary {
  id: string;
  name: string;
  avatar?: string;
  isTrusted: boolean;
  rating: number;
  reviewCount: number;
  phone: string;
  whatsapp: string;
}

// ---------------------------------------------------------------------------
// Tutors
// ---------------------------------------------------------------------------

export interface TutorProfile {
  id: string;
  userId: string;
  name: string;
  photo?: string;
  qualification: string;
  experienceYears: number;
  bio: string;
  subjects: string[];
  classes: string[];
  mode: TeachingMode;
  cityId: string;
  areaId: string;
  status: ApprovalStatus;
  rating: number;
  reviewCount: number;
  phone: string;
  whatsapp: string;
  /** True for exam-prep tutors (JEE/NEET/UPSC…), false for school tutors. */
  isExamTutor: boolean;
}

// ---------------------------------------------------------------------------
// Stores
// ---------------------------------------------------------------------------

export interface StoreProfile {
  id: string;
  userId: string;
  storeName: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  address: string;
  cityId: string;
  areaId: string;
  categories: StoreCategory[];
  image?: string;
  status: ApprovalStatus;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  /** Walking distance label, e.g. "500m", "1.2km". */
  distanceLabel?: string;
  /** Highlight chip, e.g. "10% Off", "Free Delivery". */
  offer?: string;
  latitude?: number;
  longitude?: number;
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}
