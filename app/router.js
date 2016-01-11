import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('authenticated', { path: '' }, function() {
    this.route('dashboard', {resetNamespace: true, path: ''});
    this.route('developers', {resetNamespace: true});
    this.route('opportunities', {resetNamespace: true});
  });
  this.route('login');
});

export default Router;
