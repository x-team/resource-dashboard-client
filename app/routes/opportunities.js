import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      opportunities: this.store.findAll('opportunity')
    });
  },
  setupController (controller, model) {
    controller.set('opportunities', model.opportunities);
  }
});

