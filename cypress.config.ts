import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

if (!process.env.CI) {
  dotenv.config();
  console.log("Loaded BASE_URL:", process.env.BASE_URL);
}

export default defineConfig({
  projectId: "nspuun",
  env: {
    BASE_URL: process.env.BASE_URL, // This reads from .env file
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
