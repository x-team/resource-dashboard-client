import { test } from 'qunit';
import moduleForAcceptance from 'resource-dashboard-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | opportunities');

test('visiting /opportunities', function(assert) {
  visit('/opportunities');

  andThen(function() {
    assert.equal(currentURL(), '/opportunities');
  });
});

test('visiting /opportunities', function(assert) {
  visit('/opportunities');

  andThen(() => {
    assert.equal(
      currentURL(),
      '/opportunities',
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
  const paginationElement = '[data-test=pagination]';

  visit('/opportunities');
  click(`${paginationElement} [data-test=2] a`);
  andThen(() => {
    assert.equal(
      currentURL(),
      '/opportunities?page=2',
      'URL change successfully when clicking on a page'
    );
    assert.ok(
      find(`${paginationElement} .active[data-test=2]`).length,
      'Clicking on Second page marks it as active'
    );
  });

  visit('/opportunities?page=2');
  andThen(() => {
    assert.ok(
      find(`${paginationElement} .active[data-test=2]`).length,
      'Active page changes based on url'
    );
  });

  visit('/opportunities');
  click('[data-test=pagination-next] a');
  andThen(() => {
    assert.equal(
      currentURL(),
      '/opportunities?page=2',
      'Clicking next page makes the URL change successfully'
    );
    assert.ok(
      find(`${paginationElement} .active[data-test=2]`).length,
      'Clicking next page marks the Second page as active'
    );
  });
});

test('Create', function(assert) {
  const modalEl = '[data-test=opportunity-form-modal]';
  visit('/opportunities');
  click('[data-test=opportunity-create-btn]');
  andThen(()=> {
    assert.ok(
      find(modalEl).length,
      'Modal is shown when clicking create'
    );

    click('[data-test=opportunity-cancel]');
    andThen(()=> {
      assert.ok(
        find(modalEl).length === 0,
        'Modal is hidden when clicking cancel create'
      );
    });
  });
});
