import React from 'react';
import { ART } from 'react-native';
const {
	Shape,
	Path
} = ART;

function getCrossHair(){
	if( !this.state.crossHair ) this.state.crossHair = {};
	
	let {
		crossHair:{
			x,y
		}
	} = this.state

	const {
		top,left,right,bottom
	} = this.padding

	const {
		height,width
	} = this.props;

	if( x > 0 && x < left ) x = left;
	if( x > 0 && x > width - right ) x = width - right;

	if( x > 0 && y < top ) y = top;
	if( x > 0 && y > height - bottom ) y = height - bottom;
	
	const yPos = y > top ? y : top;

	return (
		<Shape d={
			x > 0 && y > 0 ? 
			(
				(() => {
					var path = new Path();

					if( this.props.xAxis.crosshair ){
						path
						.moveTo(x,top)
						.lineTo(x,height - bottom)
					}

					if( this.props.yAxis.crosshair ){
						path
						.moveTo(left,y)
						.lineTo(width - right,y)
					}

					return path;
				})()
			)
			: ""
		} stroke="#4D4D4D" strokeWidth="0.2"></Shape>
	)
}


export default function enableCrosshair(){
	this.getCrossHair = getCrossHair.bind(this);
}