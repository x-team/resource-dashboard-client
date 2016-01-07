import Ember from 'ember';

export default Ember.Controller.extend({
  newOpportunitiesSortFields: ['createdAt:desc'],
  newDevelopersSortFields: ['createdAt:desc'],

  sortedNewOpportunities: Ember.computed.sort('opportunities', 'newOpportunitiesSortFields'),
  sortedNewDevelopers: Ember.computed.sort('developers', 'newDevelopersSortFields'),

  recentOpportunities: Ember.computed('sortedNewOpportunities.[]', function() {
    return this.get('sortedNewOpportunities').slice(0,5);
  }),

  recentDevelopers: Ember.computed('sortedNewDevelopers.[]', function() {
    return this.get('sortedNewDevelopers').slice(0,5);
  }),

  availableSoonDevelopers: Ember.computed('developers.[]', function() {
    let today = new Date();
    let busyDevelopers = this.get('developers').sortBy('availableDate').filter((developer) => {
      let isFuture = developer.get('availableDate') > today;
      return isFuture && !developer.get('available');
    });
    return busyDevelopers.slice(0,5);
  })
});
