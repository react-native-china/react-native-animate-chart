import React,{ Component } from 'react';
import { ART } from 'react-native';

const {
	Shape,
	Path
} = ART

function getCoords(){
	return (
		<Shape 
			d={ this.getCoordsD() } 
			stroke="#D4D4D4" 
			strokeWidth="2"
			></Shape>
	)
}

function getCoordsD(){

	const {
		width,height,series
	} = this.props;

	const {
		padding:{
			left,top,right,bottom
		}
	} = this;

	return (
		new Path()
			.moveTo(left,top)
			.lineTo(left,height - bottom)
			.lineTo(width - right,height - bottom)
	)
}

export default function enableCoords(){
	this.getCoordsD = getCoordsD.bind(this);
	this.getCoords = getCoords.bind(this);

	this.padding = {
		top:
			// releated to font size of title and subtitle.
			(this.props.title ? 50 : 0) + 
			( this.props.subtitle ? 50 : 0) + 20,
		right:20,
		bottom:20,
		left:20
	}
}
