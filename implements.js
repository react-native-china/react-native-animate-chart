const { sin, cos, PI, sqrt, pow, max, min, round, random } = Math;

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
		var pointDelta = sqrt( pow(pointX - originX,2) + pow(pointY - originY,2) );
		var deg = ( pointX - originX / radius )

	}
}
