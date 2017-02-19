
// http://stackoverflow.com/questions/10359907/array-sum-and-average/40681278#40681278
Math.sum = function (...a){
    return Array.prototype.reduce.call(a,(a,b) => a+b)
}

Math.avg = function(...a){
    return this.sum(...a)/a.length;
}

const { sin, cos, PI, sqrt, pow, max, min, round, random, sum, avg } = Math;

/*
 * Get a dot coordinate on the given circle
 * All of these params are necessary for generating.
 * @param deg should in radian( 2*PI ) format.NOT angle( 360° ).
 **/

export function getCircle( 
	originX = 0, 
	originY = 0, 
	radius = 0, 
){
	return function(deg = 0){
		return {
			x:radius*cos( deg ) + originX,
			y:radius*sin( deg ) + originY
		}
	}
}

/*
 * Convert angle number to raduan number.
 **/

export function angleToRadian( angle = 0 ){
	return angle/180*PI
}


/*
 * Mathod to varify whether dot withing a sector filed.
 **/
 
export function isDotWithinPie( 
	radius = 0, 
	originX = 0, 
	originY = 0, 
	shapeDeg = 0, 
	pointX = 0, 
	pointY = 0, 
	startDeg = 0, 
	endDeg = 0 
){
	const pointDelta = sqrt( pow(pointX - originX,2) + pow(pointY - originY,2) );
	const deg = ( pointX - originX / radius )
}

/*
 * Get a larger 10ex number of given number array to be y axis range.
 **/

export function roundingRange(
	datas = []
){
	if( !datas.length ) return;

	const maxValue = max.apply(null,datas)
	const minValue = min.apply(null,datas)

	const maxValueLength = ( '' + maxValue ).length
	const minValueLength = ( '' + minValue ).length

	const delta = maxValueLength - minValueLength;
	const deltaRound = pow(10,delta);

	return (
		parseInt(maxValue/deltaRound) + 1
	)*deltaRound;
}
