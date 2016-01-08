import Ember from 'ember';

export default Ember.Mixin.create({
  notify: Ember.inject.service('notify'),
  showErrors(err) {
    let errors = err.errors;
    let notify = this.get('notify');
    let anyErrorsFound = false;

    Object.keys(errors).forEach((error) => {
      if(errors[error].message) {
        notify.error(errors[error].message);
        anyErrorsFound = true;
      }
    });

    if(!anyErrorsFound) {
      notify.error('Something happened while processing your request');
    }
  }

});
