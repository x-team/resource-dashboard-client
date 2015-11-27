import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      developers: this.store.findAll('developer'),
      opportunities: this.store.findAll('opportunity')
    });
  },
  setupController (controller, model) {
    controller.set('developers', model.developers);
    controller.set('opportunities', model.opportunities);
  }
});
