import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 1,
  itemsPerPage: 10,
  pagedDevelopers: Ember.computed('page', 'developers', function(){
    let page = this.get('page');
    let itemsPerPage = this.get('itemsPerPage');
    let developers = this.get('developers');

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    return developers.slice(start, end);
  }),
  actions: {
    selectPage: function(page) {
      this.transitionToRoute({queryParams: {page}});
    }
  }

});
