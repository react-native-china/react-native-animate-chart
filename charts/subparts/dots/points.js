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

export class Rect extends Basic{
	render(){

	}
}

export class Circle extends Basic{

	render(){

		return(
				<Shape></Shape>
			)
	}
}

export class Diamond extends Basic{
	render(){

		return(
				<Shape></Shape>
			)
	}
}

export class Triangle extends Basic{
	render(){

		return(
				<Shape></Shape>
			)
	}
}

export class Custom extends Basic{
	render(){

		return(
				<Shape></Shape>
			)
	}
}
