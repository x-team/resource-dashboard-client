import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['summary-list-item, list-group-item'],
  attributeBindings: ['data-test'],
  'data-test': 'summary-list-item',

  isOpportunityType: Ember.computed('type', function () {
    return this.get('type') === 'opportunity';
  }),

  isDeveloperType: Ember.computed('type', function () {
    return this.get('type') === 'developer';
  })
});
