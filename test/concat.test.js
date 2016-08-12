import concat from '../src/concat';
import expect from 'expect';

describe('concat() function', () => {
  const create = (...dependencies) => dependencies;

  it('should append actualDependencies to dependencies', () => {
    // arrange
    const actualDependencies = [1, 2];
    const dependencies = [3, 4, 5];
    const underTest = concat(...actualDependencies);

    // act
    const result = underTest(create)(...dependencies);

    // assert
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});