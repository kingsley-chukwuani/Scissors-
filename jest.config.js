module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};