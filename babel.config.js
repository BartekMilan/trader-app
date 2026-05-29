// react-native-worklets plugin is REQUIRED by Reanimated 4 and MUST be the last plugin.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-worklets/plugin'], // keep LAST
  };
};
