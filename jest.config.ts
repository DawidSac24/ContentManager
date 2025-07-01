import { defaults } from "ts-jest/presets";
import type { Config } from "jest";

const config: Config = {
  ...defaults,
  verbose: true,
  testEnvironment: "node",
  setupFiles: ["fake-indexeddb/auto"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
};

export default config;
