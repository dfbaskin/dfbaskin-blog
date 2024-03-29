import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://dfbaskin.com",
  integrations: [mdx(), sitemap()],
  output: "server",
  adapter: cloudflare(),
  image: {
    service: {
      entrypoint: "./src/services/passThroughImageService",
    },
  },
  // vite: {
  //   build: {
  //     minify: false,
  //   },
  // },
});
