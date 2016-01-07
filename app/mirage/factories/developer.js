import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  available: faker.random.boolean,
  'available-date': faker.date.future,
  name: faker.name.firstName,
  'first-name': faker.name.firstName,
  'last-name': faker.name.lastName,
  'created-at': faker.date.past,
  'updated-at': faker.date.past,
  location: faker.address.country,
  rate() {
    var rateSample = [25, 30, 50, 100];
    return _.sample(rateSample);
  },
  timezone() {
    let timezoneSample = ['UTC', 'CST', 'CT', 'ECT', 'CEST', 'EAT'];
    return _.sample(timezoneSample);
  },
  address() {
    let countrySample = [
      'Albania',
      'Angola',
      'Egypt',
      'Eritrea'
    ];
    return _.sample(countrySample);
  },
  skills() {
    let skillsSample = ['Javascript', 'React', 'Ember', 'Angular', '.NET', 'Java', 'Ruby', 'Rails', 'Underscore', 'Lodash', 'Backend'];

    return _.sample(skillsSample, _.random(1, skillsSample.length));
  }
});
