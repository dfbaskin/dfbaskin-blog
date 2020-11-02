module.exports = {
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Crimson Text", "Sans-serif"],
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
