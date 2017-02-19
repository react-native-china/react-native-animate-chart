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

import { getCircle } from "../implements";
import GestureAware from './vendor/GestureAware';
import attachTitleHandlers from './subparts/titles'
import enableCoords from './coords/circular';

export default class Pie extends Component{

	constructor(props) {
	  super(props);

	  attachTitleHandlers.apply(this);
	  enableCoords.apply(this);
	}

	static propTypes = {
		series: PropTypes.array,
		subtitle:PropTypes.string,
		title:PropTypes.string,
		tootip:PropTypes.object
	}

	componentWillMount(){
		const {
			left,right,top,bottom
		} = this.padding;

		const {
			width,height
		} = this.props;

		this.sum = Math.sum.apply(
			null,
			this.props.series.map(({data}) => {
				return data;
			})
		)

		this.x = left/2 + (width-right)/2;
		this.y = top/2 + (height-bottom)/2;
		this.r = Math.min((height-bottom-top)/2,(width-left-right)/2);

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
			x,y,r,padding:{
				top,bottom,right,left
			}
		} = this;

		const {
			progress
		} = this.state || {}

		const deltaAngle = (data/this.sum)*Math.PI*2 * ( progress||0 );
		const { start } = this;

		const circle = getCircle(x,y,r)

		let path = new Path()
						.moveTo(x,y)
						.lineTo(circle(start - Math.PI/2).x,circle(start - Math.PI/2).y)
						.arcTo(circle(start+deltaAngle - Math.PI/2).x,circle(start+deltaAngle - Math.PI/2).y,r)
						.close()

		this.start += deltaAngle;

		return path;
	}
}