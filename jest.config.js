module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/components/$1',
    '@layouts/(.*)': '<rootDir>/layouts/$1'
  }
}
