const { roundingRange } = require('../implements');

test('adds 1 + 2 to equal 3', () => {
  expect(roundingRange([100,2001])).toBe(2010);
});