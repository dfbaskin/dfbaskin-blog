module.exports = {
  theme: {
    extend: {},
    fontFamily: {
      serif: ["Crimson Pro", "serif"],
      mono: ["Roboto Mono", "monospace"],
    },
  },
  variants: {},
  plugins: [],
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
