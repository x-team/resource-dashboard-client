import Ember from 'ember';

export default Ember.Component.extend({
  allSkills: Ember.computed('developers.[]', function() {
    let allSkills = this.get('developers').mapBy('skills');
    return _.chain(allSkills).flatten().uniq(false).value();
  }),
  allLocations: Ember.computed('developers.[]', function() {
    let allLocations = this.get('developers').mapBy('location');
    return _.uniq(allLocations, false);
  }),
  allTimezones: Ember.computed('developers.[]', function() {
    let allTimezones = this.get('developers').mapBy('timezone');
    return _.uniq(allTimezones, false);
  }),
  allRates: Ember.computed('developers.[]', function() {
    let allRates = this.get('developers').mapBy('rate');
    return _.uniq(allRates, false);
  }),
  actions: {
    select(item) {
      this.set('item', item);
    }
  }
});
