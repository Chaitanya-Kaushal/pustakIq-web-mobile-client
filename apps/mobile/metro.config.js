const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

/**
 * Metro configuration for the PustakIQ monorepo.
 *
 * - watchFolders: let Metro see `packages/*` (theme, shared) at the repo root.
 * - nodeModulesPaths: resolve deps from both the app and the hoisted root
 *   node_modules created by npm workspaces.
 *
 * https://reactnative.dev/docs/metro
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    // Ensure a single copy of React / React Native is used across the workspace.
    disableHierarchicalLookup: false,
  },
};

module.exports = withNativeWind(mergeConfig(getDefaultConfig(projectRoot), config), {
  input: './global.css',
});
