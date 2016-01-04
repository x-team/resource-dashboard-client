import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const modalEl = '[data-test=opportunity-form-modal]';
moduleForComponent('opportunity-form-modal', 'Integration | Component | opportunity form modal', {
  integration: true,
  beforeEach: function(){
    const locationStub = Ember.Service.extend({
      destinationElementId: 'ember-testing'
    });
    this.register('service:modal-dialog', locationStub);
  },
});

/* Create */
test('Modal is shown when clicking createModal', function(assert) {
  this.render(hbs`
    {{#opportunity-form-modal as |createModal editModal|}}
      <a onclick={{action createModal}}>action</a>
    {{/opportunity-form-modal}}
  `);
  this.$('a').click();
  assert.ok(Ember.$(modalEl).length);
});

test('Modal title is changed to creating a new opportunity when clicking create ', function(assert) {
  this.render(hbs`
    {{#opportunity-form-modal as |createModal editModal|}}
      <a onclick={{action createModal}}>action</a>
    {{/opportunity-form-modal}}
  `);
  this.$('a').click();
  assert.ok(Ember.$(`${modalEl} h2`).text().indexOf('Creating a new opportunity') > -1);
});

test('onadd is called after clicking save if save successed', function(assert) {
  this.set('mockOnAdd', () => {
    assert.ok(1);
  });
  this.render(hbs`
    {{#opportunity-form-modal onadd=(action mockOnAdd) as |createModal editModal|}}
      <a onclick={{action createModal}}>action</a>
    {{/opportunity-form-modal}}
  `);
  this.$('a').click();
  Ember.$(`${modalEl} [data-test=opportunity-save]`).click();
});

/* Edit */
test('Modal is shown when clicking editModal', function(assert) {
  this.render(hbs`
    {{#opportunity-form-modal as |createModal editModal|}}
      <a onclick={{action editModal}}>action</a>
    {{/opportunity-form-modal}}
  `);
  this.$('a').click();
  assert.ok(Ember.$(modalEl).length);
});

test('Modal title contains the clicked opportunity name when clicking on edit', function(assert) {
  const name = 'foo';
  this.set('opportunity', {name});
  this.render(hbs`
    {{#opportunity-form-modal as |createModal editModal|}}
      <a onclick={{action editModal opportunity}}>action</a>
    {{/opportunity-form-modal}}
  `);
  this.$('a').click();

  assert.ok(Ember.$(`${modalEl} h2`).text().indexOf(name) > -1);
});

test('opportunity name is populated with the clicked opportunity when clicking editModal', function(assert) {
  this.set('opportunity', {name: 'foo'});
  this.render(hbs`
    {{#opportunity-form-modal as |createModal editModal|}}
      <a onclick={{action editModal opportunity}}>action</a>
    {{/opportunity-form-modal}}
  `);
  this.$('a').click();
  assert.equal(Ember.$(`${modalEl} [data-test=opportunity-name] input`).val(), 'foo');
});
