import { Person } from './person.model';

describe('Person', () => {
  it('should create an instance', () => {
    expect(new Person()).toBeTruthy();
  });
});
