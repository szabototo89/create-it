import createIt from '../src/createIt';
import expect from 'expect';

describe('createIt() function', () => {
  it('should return a function when nothing has been passed', () => {
    // act
    debugger;
    const result = createIt();

    // assert
    expect(result).toBeA(Function);
  });
}); 