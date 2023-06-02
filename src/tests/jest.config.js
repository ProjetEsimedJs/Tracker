const config = {
    globalSetup: '..src/tests/setup.js',
    globalTeardown: './tests/teardown.js',
    verbose: true,
    globals: {
      apiUrl: 'http://localhost:3000',
    },
  };


  module.exports = config;