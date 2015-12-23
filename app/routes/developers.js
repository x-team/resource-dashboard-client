import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      developers: this.store.findAll('developer')
    });
  },
  setupController (controller, model) {
    controller.setProperties({
      developers: model.developers,
      developersCount: model.developers.get('length')
    });
  }
});
