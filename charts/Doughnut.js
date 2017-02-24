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

import { getCircle } from "../implements";
import GestureAware from './vendor/GestureAware';

import {
	attachTitleHandlers,
	enableCoords
} from './subparts'

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

	  attachTitleHandlers.apply(this);
	  enableCoords('circular').apply(this);

	  this.state = {
	  	progress:0
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
			left,bottom,right,top
		} = this.padding;

		const {
			width,height
		} = this.props;

		this.sum = Math.sum.apply(
			null,
			this.props.series.map(({data}) => {
					return data;
				}
			)
		)

		this.start = 0;

		// Pie infos.
		this.x = left/2 + (width-right)/2,
		this.y = top/2 + (height-bottom)/2


		this.outerR = Math.min((width-left-right),(height-top-bottom))/2;
		this.innerR = this.outerR - 20;
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
		const { width,height } = this.props;

		return (
			<GestureAware
				onStart = { this.onStart }
				onMove = { this.onMove }
				>
				<Surface width={ width } height={ height } visible={true}>
					{ this.getDoughnut() }
					{ this.getTitle() }
					{ this.getTooltips() }
				</Surface>
			</GestureAware>
		)
	}

	getDoughnut(){

		// reset the progress state angle.
		this.start = 0;

		return this.props.series.map((data,index) => {
			return (
				<Shape 
					d={ this.getDoughnutD(data.data,index) } 
					key={index} 
					stroke={ this.state.active == index ? data.activeStroke : data.normalStroke }
					fill={ this.state.active == index ? data.activeFill : data.normalFill }
				></Shape>
			)
		})
	}

	getDoughnutD(data,index){
		const {
			width,
			height
		} = this.props;

		const {
			progress
		} = this.state;

		const {
			x,y,padding:{
				top,bottom,right,left
			}
		} = this;

		let outerR = this.outerR;
		let innerR = this.innerR;

		if( index == this.state.active ){
			outerR += 10;
			innerR += 10;
		}

		const deltaAngle = (data/this.sum)*Math.PI*2 * ( progress||0 );
		const { start } = this;

		const outerCircle = getCircle(x,y,outerR);
		const innerCircle = getCircle(x,y,innerR);

		const startAngle = start - Math.PI/2;
		const endAngle = start+deltaAngle - Math.PI/2;

		const outerStartPoint = outerCircle(startAngle);
		const innerStartPoint = innerCircle(startAngle);

		const outerEndPoint = outerCircle(endAngle);
		const innerEndPoint = innerCircle(endAngle);

		let path = new Path().moveTo(innerCircle(startAngle).x,innerCircle(startAngle).y)

		this.angles[index] = [startAngle,endAngle];

		// draw major part
		if( endAngle - startAngle > Math.PI ){
			const middleAngle = startAngle + Math.PI;

			const outerMiddlePoint = outerCircle(middleAngle);
			const innerMiddlePoint = innerCircle(middleAngle);

			path.arcTo(innerMiddlePoint.x,innerMiddlePoint.y,innerR,innerR)
				.arcTo(innerEndPoint.x,innerEndPoint.y,innerR)
				.lineTo(outerEndPoint.x,outerEndPoint.y)
				.arcTo(outerMiddlePoint.x,outerMiddlePoint.y,outerR,outerR,false,true)
				.arcTo(outerStartPoint.x,outerStartPoint.y,outerR,outerR,false,true)

		} else {
			path.arcTo(innerEndPoint.x,innerEndPoint.y,innerR)
				.lineTo(outerEndPoint.x,outerEndPoint.y)
				.arcTo(outerStartPoint.x,outerStartPoint.y,outerR,outerR,false,true)
		}

		path.close()						

		this.start += deltaAngle;

		return path;
	}

	onStart = (ev) => {
		this.eventHandler(ev.x0,ev.y0);
	}

	onMove = (ev) => {
		this.eventHandler(ev.moveX,ev.moveY);
	}

	eventHandler = (absX,absY) => {
		const {
			x,y,innerR,outerR
		} = this;

		let distance = Math.sqrt(
			Math.pow(absX-x,2)+
			Math.pow(absY-y,2)
		);

		if( distance > innerR && distance < outerR ){
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
			outerR
		} = this;

		const { 
			active
		} = this.state;

		const [
			startAngle,
			endAngle
		] = this.angles[active]

		const middleAngle = ( startAngle + endAngle )/2;

		const {
			series
		} = this.props;
	
		const { x,y } = getCircle(
			this.x,this.y,outerR+20
		)( middleAngle );

		const nearlyLength = series[active].data.length * 10;

		return <Text font={`10px "Helvetica Neue", "Helvetica", Arial`} 
			fill = "#4D4D4D" 
			alignment={ middleAngle > Math.PI/2 ? "right" : 'left' }
			x = { x }
			y = { y }
			>{
				this.props.tooltip.text(
					active,series[active].data
				)
			}</Text>
	}
}