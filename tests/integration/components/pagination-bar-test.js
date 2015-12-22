import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pagination-bar', 'Integration | Component | pagination bar', {
  integration: true
});

test('previous page is disabled if first page is selected', function(assert) {
  this.render(hbs`{{pagination-bar page=1 totalItemsCount=50}}`);
  assert.ok(this.$().find('.pagination li[data-test=pagination-prev]').hasClass('disabled'));
});

test('next page is disabled if last page is selected', function(assert) {
  this.render(hbs`{{pagination-bar page=3 totalItemsCount=30 itemsPerPage=10}}`);
  assert.ok(this.$().find('.pagination li[data-test=pagination-next]').hasClass('disabled'));
});

test('ellipsis will be shown if total number of pages is more than maxPages', function(assert) {
  this.render(hbs`{{pagination-bar page=1 totalItemsCount=100 itemsPerPage=10 maxPagesShown=5}}`);
  assert.ok(this.$().find('.pagination li[data-test=pagination-ellipsis]').length > 0);
});

test('hide pagination if total numbers of pages is 1', function(assert) {
  this.render(hbs`{{pagination-bar page=1 totalItemsCount=10 itemsPerPage=10}}`);
  assert.equal(this.$().find('.pagination').length, 0);
});

test('hide pagination details when passing hide-details as true', function(assert) {
  this.render(hbs`{{pagination-bar hide-details=true}}`);
  assert.equal(this.$().find('[data-test=pagination-details]').length, 0);
});

test('selected page should have class of active', function(assert) {
  this.render(hbs`{{pagination-bar page=2 totalItemsCount=30}}`);
  assert.equal(this.$().find('.pagination li.active a').text(), '2');
});

test('clicking on a page should fire onSelect callback with that page number', function(assert) {
  this.set('mockPageSelect', (page) => {
    assert.equal(page, 3);
  });

  this.render(hbs`{{pagination-bar page=2 totalItemsCount=30 itemsPerPage=10 onSelect=(action mockPageSelect)}}`);

  this.$().find('.pagination li[data-test=3] a').click();
});

test('clicking on next page should fire onSelect callback with the next page number', function(assert) {
  this.set('mockPageSelect', (page) => {
    assert.equal(page, 3);
  });

  this.render(hbs`{{pagination-bar page=2 totalItemsCount=30 itemsPerPage=10 onSelect=(action mockPageSelect)}}`);

  this.$().find('.pagination li[data-test=pagination-next] a').click();
});

test('clicking on prev page should fire onSelect callback with the previous page number', function(assert) {
  this.set('mockPageSelect', (page) => {
    assert.equal(page, 1);
  });

  this.render(hbs`{{pagination-bar page=2 totalItemsCount=30 itemsPerPage=10 onSelect=(action mockPageSelect)}}`);

  this.$().find('.pagination li[data-test=pagination-prev] a').click();
});
