import Ember from 'ember';

export function arrayToString([value]) {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (!Array.isArray(value)) {
    return '';
  }
  return value.join(', ');
}

export default Ember.Helper.helper(arrayToString);
