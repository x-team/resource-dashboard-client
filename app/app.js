import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

// Allow data-test attribute usage in {{link-to}} elements
// It helps you to create hook for integration tests
Ember.LinkComponent.reopen({
  attributeBindings: ['data-test']
});

loadInitializers(App, config.modulePrefix);

export default App;
