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
	enableCoords
} from './subparts'

console.log( {
	attachTitleHandlers,
	enableCrosshair,
	enableCoords
}  )

export default class Line extends Component{
	constructor(props) {
	  super(props);

	  attachTitleHandlers.apply(this);
	  enableCrosshair.apply(this);
	  enableCoords('cartesian').apply(this);
	
	  this.state = {
	  	highlight:-1,
	  	crossHair:{}
	  };
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
					{ this.getCoords() }
					{ this.getTitle() }
					{ this.getSubtitle() }
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
					stroke="#4d4d4d"
				></Shape>
				<Shape d={this.getLinesD()} 
					fill={new LinearGradient({
				    	'.1': 'rgb(12,20,12)',
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

			// const progress = this.state[`progress${index}`] || 0;
			// const xAxis = left + index*containerWidth/series.length
			// const yAxis = containerHeight - (data/yRange)*containerHeight*progress + top

			
			const progress = this.state[`progress${series.length - index}`] || 0;
			const xAxis = left + (index*containerWidth/series.length)*progress
			const yAxis = containerHeight - (data/yRange)*containerHeight + top

			if( index == 0 ){
				path.moveTo(xAxis,yAxis);
				return;
			}

			path.lineTo(xAxis,yAxis);

			if( !stroke && index == series.length - 1 ){
				path.lineTo( xAxis, height - bottom)
					.lineTo( left, height - bottom)
					.close();
			}
		})

		return path;
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

		const {
			series,width,height
		} = this.props

		const {
			left,top,right,bottom
		} = this.padding

		const itemWidth = (width-left-right)/series.length;
		const relativeX = ev.moveX - left;

		if( relativeX%itemWidth > itemWidth*0.2 && relativeX%itemWidth < itemWidth*0.8 ){
			const index = parseInt(relativeX/itemWidth);

			this.setState({
				highlight:index
			})
		}
	}

	onEnd = () => {
		if( this.props.disableCorssHair ) return;

		this.setState({
			crossHair:{
				x:-100,
				y:-100,
			},
			highlight:-1
		})
	}
}