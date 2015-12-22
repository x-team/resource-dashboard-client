import Ember from 'ember';

export default Ember.Controller.extend({
  selectedPage: 1,
  actions: {
    selectPage: function(page) {
      this.transitionToRoute('developers',{queryParams: {page}});
    }
  }

});
