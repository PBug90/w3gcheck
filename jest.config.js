module.exports =
{
  testRegex: '.*.test.js',
  collectCoverageFrom: [
    'app/src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleDirectories: ['node_modules', 'app/src'],
  transform: {
    '\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
         '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
