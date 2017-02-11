const { 
	roundingRange,
	getCirclePoint
} = require('../implements');

test('range calculate', () => {
  expect(roundingRange([100,2001])).toBe(2010);
});

test('circle calculate', () => {
	expect(getCirclePoint(100,100,50,0)).toEqual({x:150,y:100});
	expect(getCirclePoint(100,100,50,Math.PI)).toEqual({x:50,y:100});

	expect(Math.round(getCirclePoint(100,100,50,Math.PI*0.5).x)).toBe(100);
	expect(Math.round(getCirclePoint(100,100,50,Math.PI*0.5).y)).toBe(150);

	expect(Math.round(getCirclePoint(100,100,50,Math.PI*1.5).x)).toBe(100);
	expect(Math.round(getCirclePoint(100,100,50,Math.PI*1.5).y)).toBe(50);
})