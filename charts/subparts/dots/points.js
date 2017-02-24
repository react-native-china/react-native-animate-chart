import React,{ Component } from 'react';
import { ART } from 'react-native';
const { Shape,Path } = ART;

class Basic extends Component{
	constructor( x=0, y=0 ){
		super(x,y);
		
		this.x = x;
		this.y = y;
		this.size = size;
	}
}

export default {

	/*
	 * Rectangle dot.
	 */
	 

	Rect:(x=10,y=10,w=10,h=10) => {
		console.log(x,y,w,h);

		return(
			 <Shape d={
							new Path()
								.moveTo(10,10)
								.lineTo(10+10,10)
								.lineTo(10+10,10+10)
								.lineTo(10,10+10)
								.close()
							} stroke="black"/>)
	},

	/*
	 * Round dot.
	 */

	Circle:() => <Shape d={
		new Path()
			.moveTo(20,2)
			.lineTo(100,10)
		} stroke="black"/>
}

// Diamond,
// Triangle
// Custom
