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
      developers: this.store.query('developer', {page}),
      page
    });
  },
  setupController (controller, model) {
    controller.setProperties({
      developers: model.developers,
      page: model.page,
      totalItemsCount: model.developers.get('meta.totalItemsCount')
    });
  }
});
