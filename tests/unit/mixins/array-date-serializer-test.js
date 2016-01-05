import Ember from 'ember';
import moment from 'moment';
import { module, test } from 'qunit';
import ArrayDateSerializerMixin from '../../../mixins/array-date-serializer';

module('Unit | Mixin | array date serializer');

test('serializerQueryParams returns short date format when passing a date', function(assert) {
  let ArrayDateSerializerObject = Ember.Object.extend(ArrayDateSerializerMixin);
  let subject = ArrayDateSerializerObject.create();
  let result = subject.serializeQueryParam(new Date(Date.UTC(2000,0,1)));
  assert.equal(result, '01/01/2000');
});

test('serializerQueryParams returns array when passing an array', function(assert) {
  let ArrayDateSerializerObject = Ember.Object.extend(ArrayDateSerializerMixin);
  let subject = ArrayDateSerializerObject.create();
  let result = subject.serializeQueryParam([1,2], null, 'array');
  assert.ok(result instanceof Array);
});

test('deserializerQueryParams returns date object if a short date is passed', function(assert) {
  let ArrayDateSerializerObject = Ember.Object.extend(ArrayDateSerializerMixin);
  let subject = ArrayDateSerializerObject.create();
  let result = subject.deserializeQueryParam('01/01/2000');
  assert.ok(result instanceof Date);
});

test('deserializerQueryParams returns date object matches the date of the short date passed', function(assert) {
  let ArrayDateSerializerObject = Ember.Object.extend(ArrayDateSerializerMixin);
  let subject = ArrayDateSerializerObject.create();
  let result = subject.deserializeQueryParam('01/01/2000');
  assert.ok(moment.utc('01/01/2000', 'L').isSame(result));
});
