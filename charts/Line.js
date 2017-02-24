import React, { Component, PropTypes } from 'react';
import {
	ART,
	View,
	Animated,
	Easing
} from 'react-native';

import { roundingRange } from "../implements";
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

import {
	attachTitleHandlers,
	enableCrosshair,
	enableCoords,
	getTooltipBac
} from './subparts'

export default class Line extends Component{
	constructor(props) {
	  super(props);

	  attachTitleHandlers.apply(this);
	  enableCrosshair.apply(this);
	  getTooltipBac.apply(this);
	  enableCoords('cartesian').apply(this);
	
	  this.state = {
	  	active:-1
	  };

	  this.points = [];
	  this.size = 4;
	}

	static propTypes = {
		series: PropTypes.array,
		subtitle:PropTypes.string,
		title:PropTypes.string,
		tootip:PropTypes.object
	}

	componentWillMount(){
		const { series } = this.props;

		this.data = series.map(({data}) => {
			return data;
		})

		this.yRange = roundingRange(this.data);
	}

	componentDidMount(){
		// need to be refactor with timing function.
		let animationHub = [];

		this.props.series.forEach(({data},index) => {
			const animation = new Animated.Value(0);

			animationHub.push(Animated.spring(animation,{toValue:1}));

			this.setState({
				[`progress${index}`]:0
			})

			animation.addListener((n) => {
				this.setState({
					[`progress${index}`]:n.value
				})
			})
		})

		Animated.stagger(30,animationHub).start()
	}

	render(){
		return (
			<GestureAware
				onStart = { this.onStart }
				onMove = { this.onMove }
				onEnd = { this.onEnd }
				>
				<Surface width={this.props.width} height={this.props.height} visible={true}>
					{ this.getLines() }
					{ this.getDots() }
					{ this.getCoords() }
					{ this.getTitle() }
					{ this.getTooltips() }
					{ this.getCrossHair() }
				</Surface>
			</GestureAware>
		)
	}

	getLines = () => {
		const {
			height
		} = this.props;

		const {
			bottom
		} = this.padding;

		return (
			<Group>
				<Shape d={this.getLinesD(true)} 
					stroke={ this.props.series[0].normalStroke }
				></Shape>
				<Shape d={this.getLinesD()} 
					fill={new LinearGradient({
				    	'.1': "#4990E2",
				    	'0.5': 'rgba(255,255,255,0)'
				  	},
				  	"0","0","0",(height-bottom)*2
				)}></Shape>
			</Group>
		)
	}

	getLinesD = (stroke) => {
		let path = new Path();

		const {
			yRange,
			padding:{
				left,top,right,bottom
			}
		} = this;

		const {
			width,height,series
		} = this.props 

		series.forEach(({data},index) => {

			const containerWidth = width-left-right;
			const containerHeight = height-top-bottom;

			const progress = this.state[`progress${index}`] || 0;
			const xAxis = left + index*containerWidth/series.length
			const yAxis = containerHeight - (data/yRange)*containerHeight*progress + top
			
			/*
			const progress = this.state[`progress${series.length - index}`] || 0;
			const xAxis = left + (index*containerWidth/series.length)*progress
			const yAxis = containerHeight - (data/yRange)*containerHeight + top
			*/

			if( index == 0 ){
				path.moveTo(xAxis,yAxis);
				return;
			}

			path.lineTo(xAxis,yAxis);

			this.points[index] = [
				xAxis,
				yAxis
			]

			if( !stroke && index == series.length - 1 ){
				path.lineTo( xAxis, height - bottom)
					.lineTo( left, height - bottom)
					.close();
			}
		})

		return path;
	}

	getDots = () => {
		return (
			this.points.map(([x,y],index) => {
				const active = this.state.active == index;
				const { size } = this;
				
				const {
					normalFill,
					normalStroke,
					activeFill,
					activeStroke
				} = this.props.series[0];

				// x -= size/2;
				// y -= size/2;

				return (
					<Shape d={
						// new Path()
						// 	.moveTo(x,y)
						// 	.lineTo(x+size,y)
						// 	.lineTo(x+size,y+size)
						// 	.lineTo(x,y+size)
						// 	.close()

						new Path()
							.moveTo(x-size/2,y)
							.arcTo(x+size/2,y,size/2,size/2)
							.arcTo(x-size/2,y,size/2,size/2)
							.close()
					} 
					fill={ active ? activeFill : normalFill }
					key={`dot${index}`}/>
				)
			})
		)
	}

	onStart = (ev) => {
		if( !this.props.disableCorssHair ) this.setCrossHair(ev);
	}

	onMove = (ev) => {
		if( !this.props.disableCorssHair ) this.setCrossHair(ev);		
	}

	setCrossHair = (ev) => {

		this.setState({
			crossHair:{
				x:ev.moveX,
				y:ev.moveY
			}
		})

		const { size } = this;

		this.points.forEach(([x,y],index) => {
			if( ev.moveX > x - size/2 &&  ev.moveX < x + size/2){
				this.setState({
					active:index
				})
			}
		})
	}

	getTooltips = () => {
		const { active } = this.state;

		if( active < 0 ) return <Shape/>;

		const activeData = this.props.series[active].data;

		const tooltipText = this.props.tooltip.text(activeData,active);

		const approximateTextLength = 10 * tooltipText.length;

		const width = approximateTextLength + 2;
		const height = 10 + 2;

		return this.getTooltipBac({
			tooltipText,
			x:this.points[active][0] - width/2,
			y:this.points[active][1] - 10 - height/2                           ,
			width,
			height,
			r:4
		})
	}

	onEnd = () => {
		if( this.props.disableCorssHair ) return;

		this.setState({
			crossHair:{
				x:-100,
				y:-100,
			},
			active:-1
		})
	}
}