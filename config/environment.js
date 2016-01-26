/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    api: {
      host: 'http://localhost:8000'
    },
    modulePrefix: 'resource-dashboard-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    'ember-cli-mirage': {
      enabled: false
    },
    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline'"
    },
    moment: {
      outputFormat: 'L'
    },
    'ember-simple-auth': {
      routeAfterAuthentication: 'dashboard'
    },
    'ember-simple-auth-token': {
      serverTokenEndpoint: '/api/users/getToken',
      identificationField: 'email'
    },
    torii: {
      providers: {
        'google-oauth2-bearer': {
          apiKey: process.env.GOOGLE_API_KEY,
          redirectUri: 'http://localhost:4200'
        }
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['ember-cli-mirage'].enabled = true;
  }

  if (environment === 'production') {
    ENV.api.host = 'https://resource-dashboard-server.herokuapp.com',
    ENV['ember-simple-auth-token'].serverTokenEndpoint = 'https://resource-dashboard-server.herokuapp.com/api/users/getToken';
    ENV.torii.providers['google-oauth2-bearer'].redirectUri = 'https://resource-dashboard-client.herokuapp.com';
  }

  return ENV;
};
