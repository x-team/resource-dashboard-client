import Ember from 'ember';

export default Ember.Component.extend({
  allSkills: Ember.computed('developers.[]', function() {
    let allSkills = this.get('developers').mapBy('skills');
    return _.chain(allSkills).flatten().sort().uniq(true).value();
  }),
  allAddresses: Ember.computed('developers.[]', function() {
    let allAddresses = this.get('developers').mapBy('address');
    return _.chain(allAddresses).sort().uniq(true).value();
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
      this.get('onFilter')(field, value);
    }
  }
});
