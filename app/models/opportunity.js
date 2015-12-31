import DS from 'ember-data';

export default DS.Model.extend({
  dateFrom: DS.attr('date'),
  dateTo: DS.attr('date'),
  name: DS.attr('string'),
  skills: DS.attr()
});
