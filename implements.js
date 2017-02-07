
// http://stackoverflow.com/questions/10359907/array-sum-and-average/40681278#40681278
Math.sum = function (...a){
    return Array.prototype.reduce.call(a,(a,b) => a+b)
}

Math.avg = function(...a){
    return this.sum(...a)/a.length;
}

const { sin, cos, PI, sqrt, pow, max, min, round, random, sum, avg } = Math;

export default class calculateMethods {

	/*
	 * Get a dot coordinate on the given circle
	 * All of these params are necessary for generating.
	 * @param deg should in radian( 2*PI ) format.NOT angle( 360° ).
	 *
	 **/

	static getCirclePoint( 
		radius	: Number = 0, 
		originX	: Number = 0, 
		originY	: Number = 0, 
		deg		: Number = 0
	){

		return {
			x:radius*cos( PI/2 - deg ) + originX,
			y:-radius*sin( PI/2 - deg ) + originY
		}
	}

	/*
	 * Convert angle number to raduan number.
	 **/

	static angleToRadian( angle :Number = 0 ){
		return angle/180*PI
	}


	/*
	 * Mathod to varify whether dot withing a sector filed.
	 **/
	 
	static isDotWithinPie( 
		radius		: Number = 0, 
		originX		: Number = 0, 
		originY		: Number = 0, 
		shapeDeg	: Number = 0, 
		pointX		: Number = 0, 
		pointY		: Number = 0, 
		startDeg	: Number = 0, 
		endDeg		: Number = 0 
	){
		const pointDelta = sqrt( pow(pointX - originX,2) + pow(pointY - originY,2) );
		const deg = ( pointX - originX / radius )
	}

	/*
	 * Get a larger 10ex number of given number array to be y axis range.
	 **/

	static roundingRange(
		datas		: Array = []
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
}
