import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  available: DS.attr('boolean'),
  availableDate: DS.attr('date'),
  name: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  profileUrl: DS.attr('string'),
  imageUrl: DS.attr('string'),
  address: DS.attr('string'),
  location: DS.attr('string'),
  timezone: DS.attr('string'),
  rate: DS.attr('number'),
  skills: DS.attr(),
  isAvailable: Ember.computed('availableDate', function() {
    let availableDate = this.get('availableDate');
    return !availableDate || moment().isAfter(availableDate);
  })
});
