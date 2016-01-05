import Ember from 'ember';
import ArrayDateSerializer from '../mixins/array-date-serializer';

export default Ember.Route.extend(ArrayDateSerializer, {
  model() {
    return Ember.RSVP.hash({
      developers: this.store.findAll('developer')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      developers: model.developers
    });
  }

});
