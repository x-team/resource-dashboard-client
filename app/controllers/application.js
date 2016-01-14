import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  torii: Ember.inject.service(),
  notify: Ember.inject.service(),
  actions: {

    login() {
      let session = this.get('session');
      this.get('torii').open('google-oauth2-bearer').then((googleAuth) => {

        let googleToken = googleAuth.authorizationToken.access_token;
        console.log('Google authentication sucessful');

        session
          .authenticate('authenticator:token', { password: googleToken } )
          .then(() => {
            console.log('custom token authentication successful!');
          }, (error) => {
            this.get('notify').error(error.error);
          });
      }, (error) => {
        console.error(`Google auth failed: ${error.message}`);
      });
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
