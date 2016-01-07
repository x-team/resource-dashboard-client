import { test } from 'qunit';
import moduleForAcceptance from 'resource-dashboard-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | developers', {
  beforeEach: function() {
    server.createList('developer', 50);
    server.createList('opportunity', 50);
  }
});

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

test('Filtering', function(assert) {
  let filteringElement = '[data-test=developersFilter]';
  let filterSkillsElement = `${filteringElement} [data-test=filter-skills] > div`;
  let filterAddressElement = `${filteringElement} [data-test=filter-address] > div`;
  let filterTimezoneElement = `${filteringElement} [data-test=filter-timezone] > div`;
  let filterRateElement = `${filteringElement} [data-test=filter-rate] > div`;

  /* Test Skills Filter*/
  visit('/developers');
  selectChoose(filterSkillsElement, 'Ruby');
  andThen(() => {
    let developerSkills = find('[data-test=developer-skills]').map(function() {
      return $(this).text();
    });
    let allSkillsHasRuby = _.all(developerSkills, function(item) {
      return item.indexOf('Ruby') > -1;
    });
    assert.ok(allSkillsHasRuby, 'All developers displayed are filtered by skill=Rails');
    assert.equal(
      currentURL(),
      '/developers?skills[]=Ruby',
      'URL is set correctly when filtering with skill=Ruby'
    );
  });

  selectChoose(filterSkillsElement, 'Angular');
  andThen(() => {
    let developerSkills = find('[data-test=developer-skills]').map(function() {
      return $(this).text();
    });
    let allSkillsHasRubyAndAngular = _.all(developerSkills, function(item) {
      return item.indexOf('Ruby') > -1 && item.indexOf('Angular') > -1;
    });
    assert.ok(allSkillsHasRubyAndAngular, 'All developers displayed are filtered by skill that contains both Rails & Angular');
    assert.equal(
      currentURL(),
      '/developers?skills[]=Ruby&skills[]=Angular',
      'URL is set correctly when filtering with skills=Ruby,Angular'
    );
  });

  /* Test Address Filter */
  visit('/developers');
  selectChoose(filterAddressElement, 'Egypt');
  andThen(() => {
    let developerAddresses = find('[data-test=developer-address]').map(function() {
      return $(this).text();
    });
    let allAddressesHasEgypt = _.all(developerAddresses, function(item) {
      return item.indexOf('Egypt') > -1;
    });
    assert.ok(allAddressesHasEgypt, 'All developers displayed are filtered by address=Egypt');
    assert.equal(
      currentURL(),
      '/developers?address=Egypt',
      'URL is set correctly when filtering with address=Egypt'
    );
  });

  /* Test Timezone Filter */
  visit('/developers');
  selectChoose(filterTimezoneElement, 'CEST');
  andThen(() => {
    let developerTimezones = find('[data-test=developer-timezone]').map(function() {
      return $(this).text();
    });
    let allTimezonesHasCEST = _.all(developerTimezones, function(item) {
      return item.indexOf('CEST') > -1;
    });
    assert.ok(allTimezonesHasCEST, 'All developers displayed are filtered by timezone=CEST');
    assert.equal(
      currentURL(),
      '/developers?timezone=CEST',
      'URL is set correctly when filtering with timezone=CEST'
    );
  });

  /* Test Max Rate Filter */
  visit('/developers');
  selectChoose(filterRateElement, 30);
  andThen(() => {
    let developerTimezones = find('[data-test=developer-rate]').map(function() {
      return parseInt($(this).text().trim());
    });
    let allRatesAreBellow30 = _.all(developerTimezones, function(item) {
      return item <= 30;
    });
    assert.ok(allRatesAreBellow30, 'All developers displayed are filtered by rate and for it to be bellow or equal 30');
    assert.equal(
      currentURL(),
      '/developers?rate=30',
      'URL is set correctly when filtering with rate=30'
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

  visit('/developers?page=150');
  andThen(() => {
    assert.equal(
      currentURL(),
      '/developers',
      'redirects back to first page if page exceeds max number of pages'
    );
  });
});
