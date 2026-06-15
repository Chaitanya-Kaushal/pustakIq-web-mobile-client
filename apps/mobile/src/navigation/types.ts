import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BookCategory } from '@pustakiq/shared';

/** Bottom tab navigator. */
export type TabParamList = {
  Home: undefined;
  Books: { category?: BookCategory } | undefined;
  Tutors: undefined;
  Stores: undefined;
  Profile: undefined;
};

/** Screens shown when signed OUT. */
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Otp: { mobile: string };
};

/** Root stack shown when signed IN — tabs plus pushed detail/flow screens. */
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  BookDetails: { bookId: string };
  TutorDetails: { tutorId: string };
  StoreDetails: { storeId: string };
  Search: undefined;
  Notifications: undefined;
  SchoolBookFinder: undefined;
  CreateListing: undefined;
  MyListings: undefined;
  BecomeTutor: undefined;
  RegisterStore: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

/**
 * Navigation prop usable from inside a tab screen: can switch tabs AND push
 * root-stack detail/flow screens.
 */
export type AppNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
