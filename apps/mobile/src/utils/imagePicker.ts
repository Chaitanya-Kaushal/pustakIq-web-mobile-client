import { ActionSheetIOS, Alert, Platform } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  type Asset,
} from 'react-native-image-picker';

export interface PickedImage {
  uri: string;
}

function toImages(assets?: Asset[]): PickedImage[] {
  return (assets ?? [])
    .map((a) => a.uri)
    .filter((u): u is string => !!u)
    .map((uri) => ({ uri }));
}

async function fromLibrary(limit: number): Promise<PickedImage[]> {
  const res = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: limit,
    quality: 0.8,
  });
  if (res.didCancel) return [];
  if (res.errorCode) {
    Alert.alert('Could not open gallery', res.errorMessage ?? 'Please try again.');
    return [];
  }
  return toImages(res.assets);
}

async function fromCamera(): Promise<PickedImage[]> {
  const res = await launchCamera({ mediaType: 'photo', quality: 0.8, saveToPhotos: false });
  if (res.didCancel) return [];
  if (res.errorCode) {
    Alert.alert('Could not open camera', res.errorMessage ?? 'Please try again.');
    return [];
  }
  return toImages(res.assets);
}

/**
 * Prompt the user to choose Camera or Gallery, then return the picked image(s).
 * @param limit max images to select from the gallery (1 = single).
 */
export function pickImages(limit = 1): Promise<PickedImage[]> {
  return new Promise((resolve) => {
    const onChoose = async (choice: 'camera' | 'library' | 'cancel') => {
      if (choice === 'camera') resolve(await fromCamera());
      else if (choice === 'library') resolve(await fromLibrary(limit));
      else resolve([]);
    };

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Take Photo', 'Choose from Gallery', 'Cancel'],
          cancelButtonIndex: 2,
        },
        (i) => onChoose(i === 0 ? 'camera' : i === 1 ? 'library' : 'cancel'),
      );
    } else {
      Alert.alert('Add photo', 'Where would you like to add a photo from?', [
        { text: 'Take Photo', onPress: () => onChoose('camera') },
        { text: 'Choose from Gallery', onPress: () => onChoose('library') },
        { text: 'Cancel', style: 'cancel', onPress: () => onChoose('cancel') },
      ]);
    }
  });
}
