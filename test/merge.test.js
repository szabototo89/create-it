import merge from '../src/merge';
import expect from 'expect';

describe('merge() function', () => {
  const create = (...dependencies) => dependencies;

  it('should merge actual dependencies into dependencies when there is no naming conflict between them', () => {
    // arrange
    const actualDependencies = {
      a: 1,
      b: 2
    };

    const dependencies = {
      c: 3,
      d: 4
    };

    const underTest = merge(actualDependencies);

    // act
    const result = underTest(create)(dependencies);

    // assert
    expect(result).toEqual([{
      a: 1,
      b: 2,
      c: 3,
      d: 4
    }]);
  });

  it('should merge multiple actual dependencies when there is more actual', () => {
    // arrange
    const actualDependencies = [
      { a: 1, b: 2 },
      { c: 3, d: 4 }
    ];

    const dependencies = { c: 3, d: 4 };

    const underTest = merge(...actualDependencies);

    // act
    const result = underTest(create)(dependencies);

    // assert
    expect(result).toEqual([
      { a: 1, b: 2, c: 3, d: 4 },
      { c: 3, d: 4 }
    ]);
  });

  it('should merge multiple actual dependencies when there is less actual', () => {
    // arrange
    const actualDependencies = { c: 3, d: 4 };

    const dependencies = [
      { a: 1, b: 2 },
      { c: 3, d: 4 }
    ];

    const underTest = merge(actualDependencies);

    // act
    const result = underTest(create)(...dependencies);

    // assert
    expect(result).toEqual([
      { a: 1, b: 2, c: 3, d: 4 },
      { c: 3, d: 4 }
    ]);
  });
});