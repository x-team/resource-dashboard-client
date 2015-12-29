import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      developers: this.store.findAll('developer')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      developers: model.developers
    });
  },

  //default serialize for array is comma seperated, deosn't work with arrays & ember-select
  serializeQueryParam(value, urlKey, defaultValueType) {
     if (defaultValueType === 'array') {
       return value;
     }
     return '' + value;
  },

  deserializeQueryParam(value, urlKey, defaultValueType) {
    if (defaultValueType === 'array') {
      return value;
    }

    if (defaultValueType === 'boolean') {
      return (value === 'true') ? true : false;
    } else if (defaultValueType === 'number') {
      return (Number(value)).valueOf();
    }
    return value;
  }
});
