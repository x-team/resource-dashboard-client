import Ember from 'ember';

export default Ember.Component.extend({
  isOpportunityType: Ember.computed('type', function () {
    return this.get('type') === 'opportunity';
  }),

  isDeveloperType: Ember.computed('type', function () {
    return this.get('type') === 'developer';
  })
});
