import { test } from 'qunit';
import moduleForAcceptance from 'resource-dashboard-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | users', {
  beforeEach: function() {
    server.createList('user', 50);
  }
});

test('Create Modal', function(assert) {
  const modalEl = '[data-test=user-create-modal]';
  visit('/users');
  click('[data-test=user-create-btn]');
  andThen(()=> {
    assert.ok(
      find(modalEl).length,
      'Modal is shown when clicking create'
    );

    click('[data-test=user-create-cancel]');
    andThen(()=> {
      assert.ok(
        find(modalEl).length === 0,
        'Modal is hidden when clicking cancel create'
      );
    });
  });
});

test('Delete Modal', function(assert) {
  const modalEl = '[data-test=user-delete-modal]';
  visit('/users');

  andThen(()=> {
    let firstRow = find('[data-test=users-table] tr:first-child');
    let email = firstRow.find('[data-test=user-field-email]').text().trim();

    click(firstRow.find('[data-test=user-delete-btn]'));

    andThen(() => {
      assert.ok(
        find(modalEl).length,
        'Modal is shown when clicking delete'
      );

      assert.equal(
        find(`${modalEl} p b`).text().trim(),
        email,
        'User being deleted is shown in the confirm delete modal'
      );
    });

  });
});
