import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  actions: {
    sessionRequiresAuthentication: function() {
      this.get('session')
        .authenticate('simple-auth-authenticator:jwt', { password: ''} )
        .then(function(){
          console.log('custom token authentication successful!');
        }, function (error) {
          console.log('custom token authentication failed!', error);

        });
    }
  }
});
