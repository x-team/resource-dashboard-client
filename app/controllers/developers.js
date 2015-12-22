import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    selectPage: function(page) {
      this.transitionToRoute({queryParams: {page}});
    }
  }

});
