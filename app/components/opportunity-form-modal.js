import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  showModal: false,
  isEdit: false,
  actions: {
    createModal() {
      let opportunity = this.get('store').createRecord('opportunity');
      this.setProperties({
        opportunity,
        isEdit: false,
        showModal: true
      });
    },
    editModal(opportunity) {
      this.setProperties({
        opportunity,
        isEdit: true,
        showModal: true
      });
    },
    closeModal() {
      let opportunity = this.get('opportunity');
      if(this.get('isEdit')) {
        opportunity.rollbackAttributes();
      }
      else {
        opportunity.destroyRecord();
      }
      this.set('showModal', false);
    },
    save() {
      let opportunity = this.get('opportunity');
      let isEdit = this.get('isEdit');

      opportunity.save().then((opportunity)=>{
        if(!isEdit) {
          this.get('onadd')(opportunity);
        }
        this.set('showModal', false);
      }, ()=>{
        if(isEdit) {
          opportunity.rollbackAttributes();
        }
        else {
          opportunity.destroyRecord();
        }
        this.set('showModal', false);
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
