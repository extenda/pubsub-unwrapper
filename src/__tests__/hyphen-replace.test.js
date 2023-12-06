const {underscoreToHyphen, hyphenToUnderscore} = require('../hyphen-replace');

describe('hyphen util', () => {
  it('converts hyphen to underscore', () => {
    const str = 'this-is-a-text';
    expect(hyphenToUnderscore(str)).toEqual('this_is_a_text');
  });

  it('converts underscore to hyphen', () => {
    const str = 'this_is_a_text';
    expect(underscoreToHyphen(str)).toEqual('this-is-a-text');
  });

  it('does not fail on empty input', () => {
    expect(hyphenToUnderscore('')).toEqual('');
    expect(hyphenToUnderscore()).toEqual('');
    expect(underscoreToHyphen()).toEqual('');
    expect(underscoreToHyphen()).toEqual('');
  });
});
