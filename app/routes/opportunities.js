import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model(params) {
    var page = +params.page || 1;

    return Ember.RSVP.hash({
      opportunities: this.store.query('opportunity', {page}),
      page
    });
  },

  setupController(controller, model) {
    controller.setProperties({
      opportunities: model.opportunities,
      page: model.page,
      totalItemsCount: model.opportunities.get('meta.totalItemsCount')
    });
  }
});

