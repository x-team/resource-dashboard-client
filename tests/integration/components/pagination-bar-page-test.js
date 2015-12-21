import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pagination-bar-page', 'Integration | Component | pagination bar page', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{pagination-bar-page}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#pagination-bar-page}}
      template block text
    {{/pagination-bar-page}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
