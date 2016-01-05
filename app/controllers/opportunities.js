import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 1,
  itemsPerPage: 10,
  savedOpportunities: Ember.computed('opportunities.@each.isNew', function() {
    return this.get('opportunities').filter((opportunity) => !opportunity.get('isNew'));
  }),
  pagedOpportunities: Ember.computed('page', 'savedOpportunities.[]', function(){
    let page = this.get('page');
    let itemsPerPage = this.get('itemsPerPage');
    let opportunities = this.get('savedOpportunities').filter((opportunity) => !opportunity.get('isNew'));

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
      this.get('opportunities').addObject(opportunity);
    },
    deleteOpportunity(opportunity) {
      opportunity.destroyRecord().then(() => {
        this.get('opportunities').removeObject(opportunity);
        this.send('closeDeleteOpportunityModal');
      });
    },
    showDeleteOpportunityModal(opportunity) {
      this.setProperties({
        opportunityToDelete: opportunity,
        showDeleteModal: true
      });
    },
    closeDeleteOpportunityModal() {
      this.setProperties({
        opportunityToDelete: null,
        showDeleteModal: false
      });
    }
  }
});
