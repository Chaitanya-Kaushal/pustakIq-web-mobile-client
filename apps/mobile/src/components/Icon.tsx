import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, ColorToken } from '@pustakiq/theme';

/**
 * Semantic icon names used across the app, mapped to MaterialCommunityIcons
 * glyphs. Names mirror the Material Symbols used in the Stitch mockups so the
 * call sites read the same as the design.
 */
const ICONS = {
  location_on: 'map-marker',
  search: 'magnify',
  mic: 'microphone',
  notifications: 'bell-outline',
  menu_book: 'book-open-variant',
  assignment: 'clipboard-text-outline',
  school: 'school-outline',
  school_filled: 'school',
  storefront: 'storefront-outline',
  storefront_filled: 'storefront',
  home: 'home-outline',
  home_filled: 'home',
  person: 'account-outline',
  person_filled: 'account',
  star: 'star',
  star_outline: 'star-outline',
  directions_walk: 'walk',
  local_offer: 'tag-outline',
  add_shopping_cart: 'cart-plus',
  keyboard_arrow_down: 'chevron-down',
  chevron_right: 'chevron-right',
  arrow_back: 'arrow-left',
  tune: 'tune-variant',
  bookmark: 'bookmark-outline',
  share: 'share-variant',
  call: 'phone',
  whatsapp: 'whatsapp',
  directions: 'directions',
  verified: 'check-decagram',
  info: 'information-outline',
  add: 'plus',
  add_circle: 'plus-circle',
  close: 'close',
  check: 'check',
  edit: 'pencil-outline',
  logout: 'logout',
  settings: 'cog-outline',
  list: 'format-list-bulleted',
  google: 'google',
  phone_outline: 'cellphone',
  lightbulb: 'lightbulb-outline',
  backpack: 'bag-personal-outline',
  camera: 'camera-outline',
  image: 'image-outline',
  chevron_left: 'chevron-left',
  map: 'map-outline',
  filter: 'filter-variant',
  bell_badge: 'bell-badge-outline',
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: ColorToken;
  /** Raw color override (wins over `color` token). */
  tint?: string;
}

export function Icon({ name, size = 24, color = 'onSurface', tint }: IconProps) {
  return (
    <MaterialCommunityIcons
      name={ICONS[name]}
      size={size}
      color={tint ?? colors[color]}
    />
  );
}
