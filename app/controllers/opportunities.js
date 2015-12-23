import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 1,
  itemsPerPage: 10,
  pagedOpportunities: Ember.computed('page', 'opportunities', function(){
    let page = this.get('page');
    let itemsPerPage = this.get('itemsPerPage');
    let opportunities = this.get('opportunities');

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    return opportunities.slice(start, end);
  }),

  actions: {
    selectPage: function(page) {
      this.transitionToRoute({ queryParams: {page}});
    }
  }
});
