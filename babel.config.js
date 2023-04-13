module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: [
          "react-native-paper/babel",
          [
            "module:react-native-dotenv",
            {
              envName: "APP_ENV",
              moduleName: "@env",
              path: ".env",
            },
          ],
        ],
      },
      development: {
        plugins: [
          "react-native-paper/babel",
          [
            "module:react-native-dotenv",
            {
              envName: "APP_ENV",
              moduleName: "@env",
              path: ".env",
            },
          ],
        ],
      },
    },
  };
};
