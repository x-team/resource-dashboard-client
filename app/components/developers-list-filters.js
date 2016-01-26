import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['data-test'],
  'data-test': 'developersFilter',

  allSkills: Ember.computed('developers.[]', function() {
    let allSkills = this.get('developers').mapBy('skills');
    return _.chain(allSkills).flatten().reject(x => !x).sort().uniq(true).value();
  }),
  allAddresses: Ember.computed('developers.[]', function() {
    let allAddresses = this.get('developers').mapBy('address');
    return _.chain(allAddresses).reject(x => !x).sort().uniq(true).value();
  }),
  allTimezones: Ember.computed('developers.[]', function() {
    let allTimezones = this.get('developers').mapBy('timezone');
    return _.chain(allTimezones).reject(x => !x).sort().uniq(true).value();
  }),
  allRates: Ember.computed('developers.@each.rate', function() {
    let allRates = this.get('developers').mapBy('rate');
    return _.chain(allRates).reject(x => !x).sort().uniq(true).value();
  }),
  actions: {
    select(field, value) {
      value = value || undefined;
      this.get('onFilter')(field, value);
    }
  }
});
