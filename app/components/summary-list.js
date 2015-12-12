import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['summary-list'],
  attributeBindings: ['data-test'],
  'data-test': 'summary-list'
});
