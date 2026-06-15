import { Alert, Linking } from 'react-native';

async function open(url: string, fallback: string) {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Not available', fallback);
    }
  } catch {
    Alert.alert('Something went wrong', fallback);
  }
}

/** Dial a phone number. */
export function callPhone(phone: string) {
  open(`tel:${phone}`, 'Unable to start a call on this device.');
}

/** Open a WhatsApp chat, optionally with a prefilled message. */
export function openWhatsApp(phone: string, message?: string) {
  const clean = phone.replace(/[^\d+]/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  open(`whatsapp://send?phone=${clean}${text}`, 'WhatsApp is not installed.');
}

/** Open maps directions to a coordinate or address. */
export function openDirections(opts: {
  latitude?: number;
  longitude?: number;
  label?: string;
}) {
  const { latitude, longitude, label } = opts;
  const query =
    latitude != null && longitude != null
      ? `${latitude},${longitude}`
      : encodeURIComponent(label ?? '');
  open(
    `https://www.google.com/maps/dir/?api=1&destination=${query}`,
    'Unable to open maps.',
  );
}
