var env = require('./environment.js');

exports.config = {
  seleniumAddress: env.seleniumAddress,
  framework: 'jasmine2',

  specs: ['spec-ui/scenarios/**/*.js'],

  baseUrl: env.baseUrl
};