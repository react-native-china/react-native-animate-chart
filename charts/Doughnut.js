import React, { 
	Component,
	PropTypes
} from 'react';

import {
	ART,
	View,
	Animated,
	Easing
} from 'react-native';

import { getCirclePoint } from "../implements";
import GestureAware from './vendor/GestureAware';

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

export default class Doughnut extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
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
		return (
			<GestureAware
				onStart = { this.onStart }
				onMove = { this.onMove }
				onEnd = { this.onEnd }
				>
				<Surface width={this.props.width} height={this.props.height} visible={true}>
					{ this.getDoughnut() }
					{ this.getTitle() }
					{ this.getSubtitle() }
				</Surface>
			</GestureAware>
		)
	}

	getDoughnut(){

		this.start = 0;

		return this.props.series.map((data,index) => {
			return (
				<Shape 
					d={ this.getDoughnutD(data.data) } 
					key={index} 
					stroke={ data.normalStroke }
					fill={data.normalFill}
				></Shape>
			)
		})
	}

	getDoughnutD(data){
		const {
			width,
			height
		} = this.props;

		const {
			top,bottom,right,left
		} = this.padding

		const {
			progress
		} = this.state;

		const deltaAngle = (data/this.sum)*Math.PI*2 * ( progress||0 );
		const { start } = this;

		// Pie infos.
		const x = left/2 + (width-right)/2;
		const y = top/2 + (height-bottom)/2;
		const innerR = 50;
		const outerR = 70;

		const outerCircle = getCirclePoint(x,y,outerR);
		const innerCircle = getCirclePoint(x,y,innerR);

		const startAngle = start - Math.PI/2;
		const endAngle = start+deltaAngle - Math.PI/2;

		let path = new Path().moveTo(innerCircle(startAngle).x,innerCircle(startAngle).y)


		if( endAngle - startAngle > Math.PI ){
			const middleAngle = startAngle + Math.PI;

			path.arcTo(innerCircle(middleAngle).x,innerCircle(middleAngle).y,innerR)
				.arcTo(innerCircle(endAngle).x,innerCircle(endAngle).y,innerR)
				.lineTo(outerCircle(endAngle).x,outerCircle(endAngle).y)
				.arcTo(outerCircle(middleAngle).x,outerCircle(middleAngle).y,outerR,outerR,false,true)
				.arcTo(outerCircle(startAngle).x,outerCircle(startAngle).y,outerR,outerR,false,true)

		} else {
			path.arcTo(innerCircle(endAngle).x,innerCircle(endAngle).y,innerR)
				.lineTo(outerCircle(endAngle).x,outerCircle(endAngle).y)
				.arcTo(outerCircle(startAngle).x,outerCircle(startAngle).y,outerR,outerR,false,true)
		}

		path.close()						

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