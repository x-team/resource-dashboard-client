import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      opportunities: this.store.findAll('opportunity')
    });
  },

  setupController(controller, model) {
    controller.setProperties({
      opportunities: model.opportunities,
      opportunitiesCount: model.opportunities.get('length')
    });
  }
});
