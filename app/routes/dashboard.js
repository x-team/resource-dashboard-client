import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      developers: this.store.findAll('developer'),
      opportunities: this.store.findAll('opportunity'),
      graph: this.getGraphData()
    });
  },

  setupController (controller, model) {
    controller.set('developers', model.developers);
    controller.set('opportunities', model.opportunities);
    controller.set('graph', model.graph);
  },

  getGraphData() {
    let token = this.get('session.data.authenticated.token');
    return Ember.$.ajax({
      url: '/api/dashboard/graph',
      type: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(function(data) {
      return Ember.Object.create(data);
    });
  }
});
