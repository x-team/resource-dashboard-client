import Ember from 'ember';
import moment from 'moment';
import ErrorMessageDisplay from '../mixins/error-messages-display';

export default Ember.Controller.extend(ErrorMessageDisplay, {
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
    },

    showEditModal(developer) {
      let editedDeveloper = Ember.Object.create({
        availableDate: developer.get('availableDate'),
        rate: developer.get('rate')
      });

      this.setProperties({
        developerToSave: developer,
        editedDeveloper: editedDeveloper,
        showEditModal: true
      });
    },

    closeEditModal() {
      this.setProperties({
        editedDeveloper: null,
        developerToSave: null,
        showEditModal: false
      });
    },

    saveEditModal(developer) {
      let developerToSave = this.get('developerToSave');

      developerToSave.setProperties({
        availableDate: developer.get('availableDate'),
        rate: developer.get('rate')
      });

      developerToSave.save().then(()=> {
        this.send('closeEditModal');
      }, (error)=> {
        this.showErrors(error);
        developerToSave.rollbackAttributes();
      });

    }
  }

});
