import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  profileUrl: DS.attr('string'),
  imageUrl: DS.attr('string'),
  skills: DS.attr(),
  location: DS.attr('string'),
  timezone: DS.attr('string'),
  rate: DS.attr('string'),
  nextAvailable: DS.attr('date')
});
