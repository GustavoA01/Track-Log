import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: [
    "<rootDir>/src/components/tests/**/*.spec.{ts,tsx}",
    "<rootDir>/src/features/**/tests/**/*.spec.{ts,tsx}",
    "<rootDir>/src/utils/tests/**/*.spec.{ts,tsx}",
    "<rootDir>/src/services/tests/**/*.spec.{ts,tsx}",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@wrksz/themes/client$":
      "<rootDir>/src/components/tests/__mocks__/wrksz-themes-client.ts",
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/src/components/ui/"],
};

export default createJestConfig(config);
