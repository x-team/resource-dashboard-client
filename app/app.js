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

loadInitializers(App, config.modulePrefix);

// Fixtures setup
import Pretender from 'pretender';
import opportunitiesFixtures from './fixtures/opportunities';
import developersFixtures from './fixtures/developers';

new Pretender(function() {
  this.get('/api/opportunities', () => {
    return [200, {
      'Content-Type': 'application/json'
    }, opportunitiesFixtures];
  });

  this.get('/api/developers', () => {
    return [200, {
      'Content-Type': 'application/json'
    }, developersFixtures];
  });
});

export default App;
