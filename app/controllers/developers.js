import Ember from 'ember';

export default Ember.Controller.extend({
  names: ['do', 'does', 'did', 'very long optionvery long option'],
  queryParams: ['page','skill','location','timezone','rate','nextAvailable'],
  page: 1,
  itemsPerPage: 10,
  pagedDevelopers: Ember.computed('filteredDevelopers.[]', 'page', 'itemsPerPage', function(){
    let page = this.get('page');
    let itemsPerPage = this.get('itemsPerPage');
    let filteredDevelopers = this.get('filteredDevelopers');

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    return filteredDevelopers.slice(start, end);
  }),
  filteredDevelopers: Ember.computed(
    'developers',
    'skill',
    'location',
    'timezone',
    'rate',
    'nextAvailable',
    function() {
      let developers = this.get('developers');
      let skill = this.get('skill');
      let location = this.get('location');
      let timezone = this.get('timezone');
      let maxRate = this.get('rate');
      //let nextAvailable = this.get('nextAvailable');

      var filteredDevelopers = developers.filter(function(developer) {
        if(skill && !developer.get('skills').contains(skill)) {
          return false;
        }
        if(location && developer.get('location') !== location) {
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
