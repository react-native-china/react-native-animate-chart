import React,{ Component } from 'react';
import { ART } from 'react-native';
const { Shape,Path } = ART;

class Basic extends Component{
	constructor( x=0, y=0 ){
		this.x = x;
		this.y = y;
		this.size = size;
	}
}

export class Rect extends Basic{
	return (
		<Shape { this.props.style }></Shape>
	)
}

export class Circle extends Basic{

	return(
		<Shape d={}></Shape>
	)
}

export class Diamond extends Basic{
	return(
		<Shape></Shape>
	)	
}

export class Triangle extends Basic{
	return(
		<Shape></Shape>
	)
}

export class Custom extends Basic{
	return(
		<Shape></Shape>
	)
}
