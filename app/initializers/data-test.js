import Ember from 'ember';

export function initialize() {
  // Allow data-test attribute usage in {{link-to}} elements
  // It helps you to create hook for integration tests
  Ember.LinkComponent.reopen({
    attributeBindings: ['data-test']
  });
}

export default {
  name: 'data-test',
  initialize
};
