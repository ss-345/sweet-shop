export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.js"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "json"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(js|jsx)",
    "<rootDir>/src/**/*.(test|spec).(js|jsx)",
  ],
};
