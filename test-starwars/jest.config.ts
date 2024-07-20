import type { Config } from '@jest/types';
import nextJest from 'next/jest';

// Initialize nextJest with the root directory
const createJestConfig = nextJest({
  dir: './',
});

// Define custom Jest configuration
const customJestConfig: Config.InitialOptions = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
};

// Export the Jest configuration
export default createJestConfig(customJestConfig);
