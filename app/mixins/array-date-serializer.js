import Ember from 'ember';
import moment from 'moment';

export default Ember.Mixin.create({
  //default serialize for array is comma seperated, deosn't work with arrays & ember-select
  serializeQueryParam(value, urlKey, defaultValueType) {
    if (defaultValueType === 'array') {
      return value;
    }
    if(moment.isDate(value)) {
      return moment.utc(value).format('L');
    }
    return this._super.call(this, ...arguments);
  },

  deserializeQueryParam(value, urlKey, defaultValueType) {
    if (defaultValueType === 'array') {
      return value;
    }

    let dateObj = moment.utc(value, 'L');
    let noDefault = !defaultValueType || defaultValueType === 'undefined';
    if(noDefault && dateObj.isValid()) {
      return dateObj.toDate();
    }

    return this._super.call(this, ...arguments);
  }
});
