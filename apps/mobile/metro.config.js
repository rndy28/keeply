/* eslint-disable @typescript-eslint/no-var-requires */
// Learn more: https://docs.expo.dev/guides/monorepos/

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (() => {
  const projectRoot = __dirname;
  const workspaceRoot = path.resolve(projectRoot, "../..");

  // Create the default Metro config
  const config = getDefaultConfig(projectRoot);

  const { transformer, resolver } = config;

  // Add the additional `cjs` extension to the resolver
  resolver.sourceExts.push("cjs");

  // 1. Watch all files within the monorepo
  config.watchFolders = [workspaceRoot];
  // 2. Let Metro know where to resolve packages and in what order
  resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules"), path.resolve(workspaceRoot, "node_modules")];
  // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  resolver.disableHierarchicalLookup = true;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
