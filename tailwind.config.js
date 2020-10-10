module.exports = {
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['OpenSans', 'Sans-serif'],
    }
  },
  variants: {},
  plugins: [],
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  }
};
