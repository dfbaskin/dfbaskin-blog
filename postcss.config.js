const isProduction = process.env.NODE_ENV === "production";

const tailwind = require("tailwindcss");
const nested = require("postcss-nested");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.html", "./src/**/*.jsx?", "./src/**/*.css"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = () => ({
  plugins: [tailwind, nested, autoprefixer, isProduction && purgecss],
});
