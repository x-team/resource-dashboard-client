import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['summary-item, list-group-item'],

  isOpportunityType: Ember.computed('type', function () {
    return this.get('type') === 'opportunity';
  }),

  isDeveloperType: Ember.computed('type', function () {
    return this.get('type') === 'developer';
  })
});
