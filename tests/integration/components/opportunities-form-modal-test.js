import { moduleForComponent } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('opportunities-form-modal', 'Integration | Component | opportunities form modal', {
  integration: true
});

skip('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{opportunities-form-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#opportunities-form-modal}}
      template block text
    {{/opportunities-form-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
