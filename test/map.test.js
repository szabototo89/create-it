import map from '../src/map';
import expect from 'expect';

describe('map() function', () => {
  const create = (...dependencies) => dependencies;

  it('should transform every dependency with passed function', () => {
    // arrange
    const underTest = map(value => value + 1)(create);

    // act
    const result = underTest(1, 2, 3);

    // assert
    expect(result).toEqual([2, 3, 4]);
  });
});
