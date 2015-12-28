import Ember from 'ember';

export default Ember.Component.extend({
  allSkills: Ember.computed('developers.[]', function() {
    let allSkills = this.get('developers').mapBy('skills');
    return _.chain(allSkills).flatten().sort().uniq(true).value();
  }),
  allLocations: Ember.computed('developers.[]', function() {
    let allLocations = this.get('developers').mapBy('location');
    return _.chain(allLocations).sort().uniq(true).value();
  }),
  allTimezones: Ember.computed('developers.[]', function() {
    let allTimezones = this.get('developers').mapBy('timezone');
    return _.chain(allTimezones).sort().uniq(true).value();
  }),
  allRates: Ember.computed('developers.[]', function() {
    let allRates = this.get('developers').mapBy('rate');
    return _.chain(allRates).sort().uniq(true).value();
  }),
  actions: {
    select(field, value) {
      value = value || undefined;
      console.log(field, value);
      this.get('onFilter')(field, value)
    }
  }
});
