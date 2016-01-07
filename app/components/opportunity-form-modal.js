import Ember from 'ember';
import ErrorMessageDisplay from '../mixins/error-messages-display';

export default Ember.Component.extend(ErrorMessageDisplay, {
  store: Ember.inject.service('store'),
  notify: Ember.inject.service('notify'),
  showModal: false,
  actions: {

    createModal() {
      this.setProperties({
        opportunity: Ember.Object.create(),
        editedOpportunity: null,
        showModal: true
      });
    },

    editModal(opportunity) {
      this.setProperties({
        opportunity: Ember.Object.create({
          name: opportunity.get('name'),
          dateFrom: opportunity.get('dateFrom'),
          dateTo: opportunity.get('dateTo'),
          skills: opportunity.get('skills')
        }),
        editedOpportunity: opportunity,
        showModal: true
      });
    },

    closeModal() {
      this.setProperties({
        editedOpportunity: null,
        opportunity: null,
        showModal: false
      });
    },

    save() {
      let opportunity = this.get('opportunity');
      let opportunityToSave = this.get('editedOpportunity');
      let isEdit = !!opportunityToSave;
      if(!isEdit) {
        opportunityToSave = this.get('store').createRecord('opportunity');
      }

      opportunityToSave.setProperties({
        name: opportunity.get('name'),
        dateFrom: opportunity.get('dateFrom'),
        dateTo: opportunity.get('dateTo'),
        skills: opportunity.get('skills')
      });

      opportunityToSave.save().then(()=>{
        this.send('closeModal');
      }, (error)=>{
        this.showErrors(error);
        if(isEdit) {
          opportunityToSave.rollbackAttributes();
        }
        else {
          opportunityToSave.destroyRecord();
        }
      });

      return false;
    },

    createSkill(dropdown, e) {
      if(e.keyCode !== 13) {return;}
      let newSkill = e.target.value;
      let selectedSkills = Array.from(this.get('opportunity.skills') || []); //Array.from weird workaround to make the update works
      if (newSkill.length > 0 && this.get('allSkills').indexOf(newSkill) === -1 && selectedSkills.indexOf(newSkill) === -1) {
        selectedSkills.push(newSkill);
        this.set('opportunity.skills', selectedSkills);
      }
    }
  }
});
