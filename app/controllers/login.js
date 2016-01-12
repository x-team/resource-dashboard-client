import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  torii: Ember.inject.service(),
  actions: {
    login: function() {

      let session = this.get('session');
      this.get('torii').open('google-oauth2-bearer').then((googleAuth) => {

        let googleToken = googleAuth.authorizationToken.access_token;
        console.log('Google authentication sucessful');

        session
          .authenticate('authenticator:token', { password: googleToken } )
          .then(function(){
            console.log('custom token authentication successful!');
          }, function (error) {
            console.log('custom token authentication failed!', error);
          });
      }, (error) => {
        console.error(`Google auth failed: ${error.message}`);
      });

    }
  }
});
