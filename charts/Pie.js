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

import { getCirclePoint } from "../implements";
import GestureAware from './vendor/GestureAware';

export default class Pie extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	de:0,
	  	crossHair:{}
	  };
	}

	componentWillMount(){
		const { series } = this.props;
		let seriesData = [...series];

		seriesData.sort((a,b) => {
			return a-b;
		})

		this.data = series.map(({data}) => {
			return data;
		})

		this.sum = Math.sum.apply(null,this.data)

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



	componentDidMount(){
		// need to be refactor with timing function.
		let animationHub = [];

		const animation = new Animated.Value(0);

		animation.addListener(({value}) => {
			this.setState({
				progress:value
			})
		})

		Animated.timing(animation,{
			toValue:1,
			duration:1500,
			easing:Easing.bounce
		}).start();
	}

	render(){
		return(
			<GestureAware
				onStart = { this.onStart }
				onMove = { this.onMove }
				onEnd = { this.onEnd }
				>
				<Surface width={this.props.width} height={this.props.height} visible={true}>
					{ this.getPies() }
					{ this.getTitle() }
					{ this.getSubtitle() }
				</Surface>
			</GestureAware>
		)
	}

	getPies(){
		this.start = 0;

		return this.props.series.map((data,index) => {
			return (
				<Shape 
					d = { this.getPiesD(data.data) } 
					stroke = { data.normalStroke } 
					key = { index }
					fill = { data.normalFill }
				></Shape>
			)
		})
	}

	getPiesD(data){
		const {
			width,
			height
		} = this.props;

		const {
			top,bottom,right,left
		} = this.padding

		const {
			progress
		} = this.state

		const deltaAngle = (data/this.sum)*Math.PI*2 * ( progress||0 );
		const { start } = this;

		// Pie infos.
		const x = left/2 + (width-right)/2;
		const y = top/2 + (height-bottom)/2;
		const r = 70;

		const circle = getCirclePoint(x,y,r)

		let path = new Path()
						.moveTo(x,y)
						.lineTo(circle(start - Math.PI/2).x,circle(start - Math.PI/2).y)
						.arcTo(circle(start+deltaAngle - Math.PI/2).x,circle(start+deltaAngle - Math.PI/2).y,r)
						.close()

		this.start += deltaAngle;

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