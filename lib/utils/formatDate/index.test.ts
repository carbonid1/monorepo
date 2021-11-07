import faker from 'faker';
import formatDate from '.';

describe('formatDate function', () => {
  it('returns N/A if a timestamp is not provided', () => {
    expect(formatDate(undefined)).toEqual('N/A');
  });

  it('returns a formatted date', () => {
    faker.seed(1);
    expect(formatDate(faker.date.past().getTime())).toEqual('June 8th 2021');
    expect(formatDate(faker.date.past().getTime())).toEqual('November 8th 2020');
  });
});
