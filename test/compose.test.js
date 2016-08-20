import compose from '../src/compose';
import expect from 'expect';

describe('compose() function', () => {
  const increment = (x) => x + 1;
  const decrement = (x) => x - 1; 

  it('should return an identitic function when not passing any arguments', () => {
    // act
    const result = compose(increment)(1);

    // assert
    expect(result).toBe(2);
  });

  it('should return a wrapped function when one argument', () => {
    // act
    const result = compose(decrement, increment)(1);

    // assert
    expect(result).toBe(1);
  });
});