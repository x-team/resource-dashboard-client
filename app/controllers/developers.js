import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page','fAddress','fTimezone','fRate','fNextAvailable', 'fSkills'],
  fSkills: [],
  page: 1,
  itemsPerPage: 10,
  pagedDevelopers: Ember.computed('filteredDevelopers.[]', 'page', 'itemsPerPage', function() {
    let page = this.get('page');
    let itemsPerPage = this.get('itemsPerPage');
    let filteredDevelopers = this.get('filteredDevelopers');

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    return filteredDevelopers.slice(start, end);
  }),
  filteredDevelopers: Ember.computed(
    'developers',
    'fSkills',
    'fAddress',
    'fTimezone',
    'fRate',
    'fNextAvailable',
    function() {
      let developers = this.get('developers');
      let skills = this.get('fSkills');
      let address = this.get('fAddress');
      let timezone = this.get('fTimezone');
      let maxRate = this.get('fRate');
      //let nextAvailable = this.get('nextAvailable');

      var filteredDevelopers = developers.filter(function(developer) {
        if(skills) {
          let foundSkills = _.intersection(skills, developer.get('skills'));
          //if not all skills are matched in the filter
          if(foundSkills.length < skills.length) {
            return false;
          }
        }
        if(address && developer.get('address') !== address) {
          return false;
        }
        if(timezone && developer.get('timezone') !== timezone) {
          return false;
        }
        if(maxRate && developer.get('rate') > maxRate) {
          return false;
        }

        return true;
      });

      return filteredDevelopers;
  }),
  actions: {
    selectPage(page) {
      this.transitionToRoute({queryParams: {page}});
    },
    filterDevelopers(field, value) {
      this.set(field, value);
    }
  }

});
