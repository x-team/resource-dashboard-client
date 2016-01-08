import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  'date-from': faker.date.past,
  'date-to': faker.date.future,
  name: faker.name.title,
  skills: ['Javascript']
});
