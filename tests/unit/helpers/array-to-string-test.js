import { arrayToString } from '../../../helpers/array-to-string';
import { module, test } from 'qunit';

module('Unit | Helper | array to string');

test('it returns empty string for empty array', function(assert) {
  let result = arrayToString([]);
  assert.equal(result, '');
});

test('it returns string representation of passed number', function(assert) {
  let result = arrayToString(42);
  assert.equal(result, '42');
});

test('it returns same value of passed string', function(assert) {
  let result = arrayToString('foo');
  assert.equal(result, 'foo');
});

test('it returns empty string for null', function(assert) {
  let result = arrayToString(null);
  assert.equal(result, '');
});

test('it returns empty string for undefined', function(assert) {
  let result = arrayToString(undefined);
  assert.equal(result, '');
});

test('it returns empty string for object', function(assert) {
  let result = arrayToString({a:1});
  assert.equal(result, '');
});

test('it returns string value without comma if only 1 value passed', function(assert) {
  let result = arrayToString(['foo']);
  assert.equal(result, 'foo');
});

test('it returns string value with comma separator if multiple values passed', function(assert) {
  let result = arrayToString(['foo', 'bar']);
  assert.equal(result, 'foo, bar');
});

test('it returns string value with comma separator if multiple values passed, including numbers', function(assert) {
  let result = arrayToString(['foo', 'bar', 2]);
  assert.equal(result, 'foo, bar, 2');
});
