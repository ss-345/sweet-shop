export default {
  testEnvironment: "node",
  testTimeout: 30000,
  extensionsToTreatAsEsm: [".js"],
  transform: {},
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/testSetup.js"],
};
