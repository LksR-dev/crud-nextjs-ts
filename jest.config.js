/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	roots: ['<rootDir>'],
	modulePaths: ['.'], // <-- This will be set to 'baseUrl' value
	setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
};
