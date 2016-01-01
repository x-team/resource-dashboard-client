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

  allSkills: Ember.computed('opportunities.[]', function() {
    let allSkills = this.get('opportunities').mapBy('skills');
    return _.chain(allSkills).flatten().sort().uniq(true).filter(a => a).value();
  }),

  actions: {
    selectPage(page) {
      this.transitionToRoute({ queryParams: {page}});
    },
    addOpportunity(opportunity) {
      this.get('opportunities').addObject(opportunity)
    }
  }
});
