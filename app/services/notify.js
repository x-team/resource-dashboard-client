import Ember from 'ember';

export default Ember.Service.extend({
  info(message) {
    window.toastr.info(message);
  },
  error(message) {
    window.toastr.error(message);
  },
  success(message) {
    window.toastr.success(message);
  }
});
