module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "alias": {
          "@utils": ["./src/utils"],
          "@components": ["./src/components"]
        }
      }]
    ]
  };
};
