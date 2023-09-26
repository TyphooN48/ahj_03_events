import randomMinMaxNot from '../utils';

test('function randomMinMaxNot should generate number', () => {
  const expected = 2;
  expect(randomMinMaxNot(1, 2, 1)).toEqual(expected);
});
