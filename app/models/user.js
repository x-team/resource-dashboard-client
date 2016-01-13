import DS from 'ember-data';

export default DS.Model.extend({
  session: Ember.inject.service(),
  name: DS.attr('string'),
  email: DS.attr('string'),
  isCurrentUser: Ember.computed('email', 'session.data.authenticated.email', function() {
    return this.get('email') === this.get('session.data.authenticated.email');
  })
});
