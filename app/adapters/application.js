import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.api.host,
  authorizer: 'authorizer:token',
  namespace: 'api'
});
