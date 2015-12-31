import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  showModal: false,
  isEdit: false,
  actions: {
    createModal() {
      var opportunity = this.get('store').createRecord('opportunity');
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
      var opportunity = this.get('opportunity');
      if(this.get('isEdit')) {
        opportunity.rollbackAttributes();
      }
      else {
        opportunity.destroyRecord();
      }
      this.set('showModal', false);
    },
    save() {
      var opportunity = this.get('opportunity');
      opportunity.save().then(() => {
        this.set('showModal', false);
      });
      return false;
    }
  }
});
