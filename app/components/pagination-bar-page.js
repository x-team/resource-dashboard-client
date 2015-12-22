import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: 'isCurrent:active',
  attributeBindings: ['page:data-test'],
  isCurrent: Ember.computed('currentPage', 'page', function(){
    return this.get('currentPage') === this.get('page');
  }),

  actions: {
    pageClicked() {
      this.get('action')(this.get('page'));
    }
  }

});
