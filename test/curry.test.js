import curry from '../src/curry';
import expect from 'expect';

describe('curry() function', () => {
  it('should create the function curried version when passing the addition operand', () => {
    // arrange
    const f = (a, b) => a + b;

    // act
    const result = curry(f); 

    // assert
    expect(result(1)(3)).toBe(f(1, 3));
  });

  it('should create the function curried version when passing several parameters', () => {
    // arrange
    const f = (a, b, c, d) => a + b + c + d;

    // act
    const result = curry(f); 

    // assert
    expect(result(1)(1)(1)(1)).toBe(4);
  });

  it('should create the function curried version when passing only one parameter', () => {
    // arrange
    const id = (a) => a;

    // act
    const result = curry(id); 

    // assert
    expect(result('hello')).toBe('hello');
  });
});