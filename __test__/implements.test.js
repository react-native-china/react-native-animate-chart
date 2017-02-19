const { 
	roundingRange,
	getCircle
} = require('../implements');

test('range calculate', () => {
  expect(roundingRange([100,2001])).toBe(2010);
});

test('circle calculate', () => {
	const circle = getCircle(100,100,50);

	expect(circle(0)).toEqual({x:150,y:100});
	expect(circle(Math.PI)).toEqual({x:50,y:100})
})