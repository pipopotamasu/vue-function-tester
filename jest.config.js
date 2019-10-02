/* globals module */
module.exports = {
	moduleFileExtensions: ['js', 'ts', 'vue'],
	testPathIgnorePatterns: ['/node_modules/'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
		'.*\\.(vue)$': 'vue-jest'
	},
	moduleNameMapper: {
		'^@src/(.+)': '<rootDir>/src/$1',
		'^vue$': 'vue/dist/vue.common.js',
		'^@spec/(.+)': '<rootDir>/spec/$1'
	},
	testMatch:  ['<rootDir>/spec/**/?(*.)(spec|test).(js|ts)?(x)'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts'
	],
};