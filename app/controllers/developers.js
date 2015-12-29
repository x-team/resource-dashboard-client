import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  queryParams: ['page','address','timezone','rate','nextAvailable', 'skills'],
  skills: [],
  page: 1,
  itemsPerPage: 10,

  pagedDevelopers: Ember.computed('filteredDevelopers.[]', 'page', 'itemsPerPage', function() {
    let page = this.get('page');
    let itemsPerPage = this.get('itemsPerPage');
    let filteredDevelopers = this.get('filteredDevelopers');

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let itemsShown = filteredDevelopers.slice(start, end);

    //force redirect to first page if current page has no items
    if(itemsShown.length === 0) {
      Ember.run.later(() => {
        this.set('page', 1);
      });
    }

    return itemsShown;
  }),

  filteredDevelopers: Ember.computed(
    'developers',
    'skills',
    'address',
    'timezone',
    'rate',
    'nextAvailable',
    function() {
      let developers = this.get('developers');
      let skills = this.get('skills');
      let address = this.get('address');
      let timezone = this.get('timezone');
      let maxRate = this.get('rate');
      let nextAvailable = this.get('nextAvailable');
      let isNextAvailableDefined = moment.isDate(nextAvailable);

      Ember.run.later(() => {
        if(!isNextAvailableDefined) {
          //clear querystring
          this.set('nextAvailable', undefined);
        }
      });


      let filteredDevelopers = developers.filter(function(developer) {
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
        if(isNextAvailableDefined) {
          let developerAvailableDate = developer.get('availableDate');
          let isDeveloperAvailable = developer.get('available');

          let momentDeveloperAvailableDate = moment.utc(developerAvailableDate);
          let momentDateSelected = moment.utc(nextAvailable);
          let isAvailableBefore = momentDateSelected.isAfter(momentDeveloperAvailableDate);

          if(developerAvailableDate && !isDeveloperAvailable && !isAvailableBefore) {
            return false;
          }
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
      this.setProperties({
        [field]: value,
        page: 1
      });
    }
  }

});
