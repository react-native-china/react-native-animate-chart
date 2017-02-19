import React, { Component, PropTypes } from 'react';
import {
	ART,
	View,
	Animated,
	Easing
} from 'react-native';

const {
    Surface,
    Shape,
    Group,
    Path,
    Text,
    ClippingRectangle,
    LinearGradient,
    RadialGradient,
    Pattern,
    Transform
} = ART;

import { 
	roundingRange,
	getCircle
} from "../implements";

import GestureAware from './vendor/GestureAware';

export default class Radar extends Component{
	componentWillMount(){
		const { series } = this.props;
		let seriesData = [...series];

		seriesData.sort((a,b) => {
			return a-b;
		})

		this.data = series.map(({data}) => {
			return data;
		})

		this.yRange = roundingRange(this.data);

		this.padding = {
			top:
				(this.props.title ? 50 : 0) + 
				( this.props.subtitle ? 50 : 0) + 20,
			right:20,
			bottom:50,
			left:20
		}

		this.start = 0;
	}


	render(){
		return(
			<GestureAware
				onStart = { this.onStart }
				onMove = { this.onMove }
				onEnd = { this.onEnd }
				>
				<Surface width={this.props.width} height={this.props.height} visible={true}>
					{ this.getCoords() }
					{ this.getCoords() }
					{ this.getTitle() }
					{ this.getSubtitle() }
				</Surface>
			</GestureAware>
			
		)
	}

	getCoords(){
		return (
			<Shape d={
				this.getCoordsD()
			} stroke="blue"/>
		)
	}

	getCoordsD(){

		const {
			width,
			height
		} = this.props;

		const {
			top,bottom,right,left
		} = this.padding

		let path = new Path();

		// Pie infos.
		const x = left/2 + (width-right)/2;
		const y = top/2 + (height-bottom)/2;
		const r = 70;

		path.close();

		return path;
	}


	getTitle(){

		return (
			<Text font={`16px "Helvetica Neue", "Helvetica", Arial`} 
				fill = "#4D4D4D" 
				alignment='center'
				x={160}
				y={30}
				>{this.props.title}</Text>
		)
	}

	getSubtitle(){
		return (
			<Text font={`14px "Helvetica Neue", "Helvetica", Arial`} 
				fill = "#9D9D9D" 
				alignment='center'
				x={160}
				y={60}
				>{this.props.subtitle}</Text>
		)
	}
}