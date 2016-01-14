import Ember from 'ember';
import ErrorMessageDisplay from '../mixins/error-messages-display';

export default Ember.Controller.extend(ErrorMessageDisplay, {
  actions: {
    createUser() {
      let user = this.get('userToCreate');
      let userToSave = this.get('store').createRecord('user');
      userToSave.setProperties({
        name: user.get('name'),
        email: user.get('email')
      });
      userToSave.save().then(() => {
        this.send('hideCreateModal');
      },(error) => {
        this.showErrors(error);
        userToSave.destroyRecord();
      });
    },

    deleteUser(user) {
      user.destroyRecord().then(() => {
        this.get('users').removeObject(user);
        this.send('hideDeleteModal');
      }, (error)=> {
        this.showErrors(error);
        this.send('hideDeleteModal');
      });
    },

    showCreateModal() {
      this.setProperties({
        userToCreate: Ember.Object.create(),
        showCreateModal: true
      });
    },

    hideCreateModal() {
      this.setProperties({
        userToCreate: null,
        showCreateModal: false
      });
    },

    showDeleteModal(user) {
      this.setProperties({
        userToDelete: user,
        showDeleteModal: true
      });
    },

    hideDeleteModal() {
      this.setProperties({
        userToDelete: null,
        showDeleteModal: false
      });
    }
  }

});
