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

import {
	attachTitleHandlers,
	enableCoords
} from './subparts'

export default class Pie extends Component{

	constructor(props) {
	  super(props);

	  attachTitleHandlers.apply(this);
	  enableCoords('circular').apply(this);

	  this.state = {
	  	active:-1
	  }

	  this.angles = [];
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
				onMove = { this.onMove }
				>
				<Surface width={this.props.width} height={this.props.height} visible={true}>
					{ this.getPies() }
					{ this.getTitle() }
					{ this.getTooltips() }
				</Surface>
			</GestureAware>
		)
	}

	getPies(){
		this.start = 0;

		return this.props.series.map((data,index) => {
			return (
				<Shape 
					d = { this.getPiesD(data.data,index) } 
					stroke = { data.normalStroke } 
					key = { index }
					fill = { this.state.active == index ? data.activeFill : data.normalFill }
				></Shape>
			)
		})
	}

	getPiesD(data,index){
		const {
			width,
			height
		} = this.props;

		const {
			x,y,padding:{
				top,bottom,right,left
			}
		} = this;

		let r = this.r;

		if( this.state.active == index ){
			r += 10;
		}

		const {
			progress
		} = this.state || {}

		const deltaAngle = (data/this.sum)*Math.PI*2 * ( progress||0 );
		const { start } = this;

		const startAngle = start - Math.PI/2;
		const endAngle = start+deltaAngle - Math.PI/2;

		const circle = getCircle(x,y,r)
		
		this.angles[index] = [startAngle,endAngle];

		let path = new Path()
						.moveTo(x,y)
						.lineTo(circle(startAngle).x,circle(startAngle).y)
						.arcTo(circle(endAngle).x,circle(endAngle).y,r)
						.close()

		this.start += deltaAngle;


		return path;
	}

	onStart = (ev) => {
		this.eventHandler(ev.x0,ev.y0)
	}

	onMove = (ev) => {
		this.eventHandler(ev.moveX,ev.moveY)
	}

	eventHandler = (absX,absY) => {
		const {
			x,y,r
		} = this;

		let distance = Math.sqrt(
			Math.pow(absX-x,2)+
			Math.pow(absY-y,2)
		);

		if( distance < r ){
			let angle = Math.atan2(absY-y,absX-x);
			
			const {
				series
			} = this.props;

			if( angle < 0 ){
				angle += Math.PI*2;
			}

			angle = (angle+Math.PI/2)%(Math.PI*2)

			let percentage = angle/(Math.PI*2);

			let added = 0;
			let index = 0 ;

			for(;index < series.length ;index++ ){
				const data = series[index].data;

				added+=data;

				if( percentage < added/this.sum ){
					break;
				}
			}

			this.setState({
				active:index
			})
		} else {
			this.setState({
				active:-1
			})
		}
	}

	getTooltips = () => {
		if( !this.angles[this.state.active] ) return <Shape/>;

		const {
			r
		} = this;

		const {
			tooltip,series
		} = this.props;

		const {
			active
		} = this.state;

		const [
			startAngle,
			endAngle
		] = this.angles[active]

		const middleAngle = ( startAngle + endAngle )/2
		
		const align = middleAngle > Math.PI/2 ? "right" : 'left';

		const {x,y} = getCircle(
			this.x,this.y,r+20
		)(middleAngle);

		const nearlyLength = series[active].data.length * 10;

		return <Text font={`10px "Helvetica Neue", "Helvetica", Arial`} 
			fill = "#4D4D4D" 
			alignment={ align }
			x = { x }
			y = { y }
			>{
				tooltip.text(active,series[active].data)
			}</Text>
	}
}