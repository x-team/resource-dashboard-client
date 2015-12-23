import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pagination-bar-page', 'Integration | Component | pagination bar page', {
  integration: true
});

test('will have class of active if currentPage equals to page', function(assert) {
  this.render(hbs`{{pagination-bar-page page=2 currentPage=2 }}`);
  assert.ok(this.$().find('li').hasClass('active'));
});

test('will not have class of active if currentPage is not equal to page', function(assert) {
  this.render(hbs`{{pagination-bar-page page=1 currentPage=2 }}`);
  assert.notOk(this.$().find('li').hasClass('active'));
});

test('on click will fire call action with the page number ', function(assert) {
  this.set('mockAction', (page) => {
    assert.ok(page, 1);
  });
  this.render(hbs`{{pagination-bar-page page=1 currentPage=2 action=(action mockAction)}}`);
  assert.notOk(this.$().find('li').hasClass('active'));
});
