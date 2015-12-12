import Ember from 'ember';
import DataTestInitializer from '../../../initializers/data-test';
import { module, skip } from 'qunit';

let application;

module('Unit | Initializer | data test', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
skip('it works', function(assert) {
  DataTestInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
