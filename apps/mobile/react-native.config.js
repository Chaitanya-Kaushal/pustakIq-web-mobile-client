/**
 * react-native-asset / autolinking config.
 *
 * Fonts placed in ./assets/fonts are copied into the native projects when you
 * run `npx react-native-asset`. Drop the Plus Jakarta Sans TTFs there
 * (see README → Fonts) and copy the react-native-vector-icons font set in too.
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
};
