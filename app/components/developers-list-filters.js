import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    select(item) {
      this.set('item', item);
    }
  }
});
