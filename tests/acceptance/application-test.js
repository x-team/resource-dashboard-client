import { test } from 'qunit';
import { invalidateSession } from 'resource-dashboard-client/tests/helpers/ember-simple-auth';
import moduleForAcceptance from 'resource-dashboard-client/tests/helpers/module-for-acceptance';

let application = null;
moduleForAcceptance('Acceptance | Application', {
  beforeEach: function() {

    application = this.application;
    server.createList('developer', 20);
    server.createList('opportunity', 20);
  }
});

test('visiting /', (assert) => {
  visit('/');

  andThen(() => {
    assert.equal(
      currentURL(),
      '/',
      'URL is set correctly'
    );
    assert.ok(
      find('[data-test=main-header-navigation]').length,
      'Header navigation is in place'
    );
    assert.ok(
      find('[data-test=main-footer-navigation]').length,
      'Footer navigation is in place'
    );
    assert.ok(
      find('[data-test=main-header-logout]').length,
      'Logout button is in place'
    );
    assert.equal(
      find('[data-test=summary-list]').length,
      3,
      '3 summaries lists are in place'
    );
    assert.equal(
      find('.summary-graph canvas').length,
      1,
      'summary graph is shown'
    );
  });
});

test('Header navigation', (assert) => {
  visit('/');

  andThen(() => {
    assert.equal(
      find('[data-test=main-header-navigation] a').length,
      4,
      'Contains 3 link'
    );
    assert.ok(
      find('[data-test=main-header-navigation-index]').length,
      'Contains dashboard link'
    );
    assert.ok(
      find('[data-test=main-header-navigation-developers]').length,
      'Contains developers link'
    );
    assert.ok(
      find('[data-test=main-header-navigation-opportunities]').length,
      'Contains opportunities link'
    );
    assert.ok(
      find('[data-test=main-header-navigation-users]').length,
      'Contains users link'
    );
  });

  click(`[data-test=main-header-navigation-index]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/',
      'Clicking dashboard link redirects to / page'
    );
  });

  click(`[data-test=main-header-navigation-developers]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/developers',
      'Clicking developers link redirects to /developers page'
    );
  });

  click(`[data-test=main-header-navigation-opportunities]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/opportunities',
      'Clicking dashboard link redirects to /opportunities page'
    );
  });

  click(`[data-test=main-header-navigation-users]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/users',
      'Clicking users link redirects to /users page'
    );
  });
});

test('Footer navigation', (assert) => {
  visit('/');

  andThen(() => {
    assert.equal(
      find('[data-test=main-footer-navigation] a').length,
      4,
      'Contains 4 link'
    );
    assert.ok(
      find('[data-test=main-footer-navigation-index]').length,
      'Contains dashboard link'
    );
    assert.ok(
      find('[data-test=main-footer-navigation-developers]').length,
      'Contains developers link'
    );
    assert.ok(
      find('[data-test=main-footer-navigation-opportunities]').length,
      'Contains opportunities link'
    );
    assert.ok(
      find('[data-test=main-footer-navigation-workable]').length,
      'Contains workable link'
    );
  });

  click(`[data-test=main-footer-navigation-index]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/',
      'Clicking dashboard link redirects to / page'
    );
  });

  click(`[data-test=main-footer-navigation-developers]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/developers',
      'Clicking developers link redirects to /developers page'
    );
  });

  click(`[data-test=main-footer-navigation-opportunities]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/opportunities',
      'Clicking dashboard link redirects to /opportunities page'
    );
  });
});

test('Opportunities summary list', (assert) => {
  let summaryListElement = '[data-test=summary-list]:nth-of-type(1)';

  visit('/');

  andThen(() => {
    assert.equal(
      find(`${summaryListElement} [data-test=summary-list-title]`).text(),
      'Opportunities',
      'Is first in order'
    );
    assert.ok(
      find(`${summaryListElement} [data-test=summary-list-item]`).length > 0,
      'Contains more than 0 items'
    );
  });

  click(`${summaryListElement} [data-test=summary-list-more]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/opportunities',
      'Clicking more link redirects to /opportunities page'
    );
  });
});

test('Newest Developers summary list', (assert) => {
  let summaryListElement = '[data-test=summary-list]:nth-of-type(2)';

  visit('/');

  andThen(() => {
    assert.equal(
      find(`${summaryListElement} [data-test=summary-list-title]`).text(),
      'Newest Developers',
      'Is first in order'
    );
    assert.ok(
      find(`${summaryListElement} [data-test=summary-list-item]`).length > 0,
      'Contains more than 0 items'
    );
  });

  click(`${summaryListElement} [data-test=summary-list-more]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/developers',
      'Clicking more link redirects to /developers page'
    );
  });
});

test('Available Soon Developers summary list', (assert) => {
  let summaryListElement = '[data-test=summary-list]:nth-of-type(3)';

  visit('/');

  andThen(() => {
    assert.equal(
      find(`${summaryListElement} [data-test=summary-list-title]`).text(),
      'Available Soon Developers',
      'Is first in order'
    );
    assert.ok(
      find(`${summaryListElement} [data-test=summary-list-item]`).length > 0,
      'Contains more than 0 items'
    );
  });

  click(`${summaryListElement} [data-test=summary-list-more]`);

  andThen(() => {
    assert.equal(
      currentURL(),
      '/developers',
      'Clicking more link redirects to /developers page'
    );
  });
});

test('Navbar empty when logged out', (assert)=> {
  invalidateSession(application);
  visit('/');
  andThen(()=> {
    assert.equal(
      find('[data-test=main-header-navigation] a').length,
      0,
      'Navbar contains no links'
    );
  });
});

test('Can\'t access developers when logged out', (assert)=> {
  invalidateSession(application);
  visit('/developers');
  andThen(()=> {
    assert.equal(
      currentURL(),
      '/login',
      'When accessing /developers redirected back to login when logged out'
    );
  });
});
