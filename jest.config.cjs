module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Simulate a browser-like environment
  testEnvironmentOptions: {
    url: 'http://localhost', // Set base URL for jsdom
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json', // Explicitly use your TypeScript config
      },
    ],
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS/SCSS imports
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/test/__mocks__/fileMock.ts', // Map static files to the mock
    '^@/(.*)$': '<rootDir>/src/$1', // Handle alias imports
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Jest setup file
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.ts'],
};
