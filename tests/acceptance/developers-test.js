import { test } from 'qunit';
import moduleForAcceptance from 'resource-dashboard-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | developers');

test('visiting /developers', function(assert) {
  visit('/developers');

  andThen(() => {
    assert.equal(
      currentURL(),
      '/developers',
      'URL is set correctly'
    );
    assert.ok(
      find('[data-test=pagination]').length,
      'Pagination is in place'
    );
    assert.ok(
      find('[data-test=pagination] .active[data-test=1]').length,
      'First page is active'
    );
  });
});

test('Pagination', function(assert) {
  let paginationElement = '[data-test=pagination]';

  visit('/developers');
  click(`${paginationElement} [data-test=2] a`);
  andThen(() => {
    assert.equal(
      currentURL(),
      '/developers?page=2',
      'URL change successfully when clicking on a page'
    );
    assert.ok(
      find(`${paginationElement} .active[data-test=2]`).length,
      'Clicking on Second page marks it as active'
    );
  });

  visit('/developers?page=3');
  andThen(() => {
    assert.ok(
      find(`${paginationElement} .active[data-test=3]`).length,
      'Active page changes based on url'
    );
  });

  visit('/developers');
  click('[data-test=pagination-next] a');
  andThen(() => {
    assert.equal(
      currentURL(),
      '/developers?page=2',
      'Clicking next page makes the URL change successfully'
    );
    assert.ok(
      find(`${paginationElement} .active[data-test=2]`).length,
      'Clicking next page marks the Second page as active'
    );
  });
});
