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

import {
	roundingRange
} from "../implements";

import GestureAware from './vendor/GestureAware';
import {
	attachTitleHandlers,
	enableCrosshair,
	enableCoords,
	getTooltipBac
} from './subparts';

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

export default class Bar extends Component{
	constructor(props) {
	  super(props);

	  enableCoords('cartesian').apply(this);
	  attachTitleHandlers.apply(this);
	  enableCrosshair.apply(this);
	  getTooltipBac.apply(this);
	
	  this.state = {
	  	active:-1,
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
		
		const {
			top,left,right,bottom
		} = this.padding;

		const {
			height,width
		} = this.props;

		this.data = series.map(({data}) => {
			return data;
		})

		this.barPos = [];

		this.yRange = roundingRange(this.data);
		this.areaHeight = height-top-bottom

		this.itemWidth = (width-left-right)/series.length
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
		const {
			width,
			height,
		} = this.props;

		return (
			<GestureAware
				onStart = { this.onStart }
				onMove = { this.onMove }
				onEnd = { this.onEnd }
				>
				<Surface width={this.props.width} height={this.props.height} visible={true}>
					{ this.getBars() }
					{ this.getCoords() }
					{ this.getTitle() }
					{ this.getCrossHair() }
					{ this.getTooltips() }
				</Surface>
			</GestureAware>
		)
	}

	getBars = () => {
		const {
			series
		} = this.props;

		return series.map((data,index) => {

			// theme info required.
			return (
				<Shape 
					key = { index }
					d={ this.getBarD(data,index) }
					fill={
						this.state.active == index ?
						data.activeFill : 
						data.normalFill
					}
					stroke={
						this.state.active == index ?
						data.activeStroke : 
						data.normalStroke
					}

					strokeWidth = {1}

					strokeCap="butt"
					strokeJoin="miter"
				/>
			)
		})
	}

	getBarD = (data,index) => {
		const {
			width,height,series
		} = this.props;

		const {
			yRange,padding:{
				left,top,right,bottom
			},areaHeight,itemWidth,
		} = this;

		const progress = this.state[`progress${index}`] || 0;
		
		const barWidth = itemWidth*0.6;

		const xAxis = index*itemWidth+(itemWidth-barWidth/2);
		const yAxis = height - progress*(data.data/yRange * areaHeight) - bottom

		this.barPos[index] = {
			xAxis,
			yAxis:height - (data.data/yRange * areaHeight) - bottom
		}

		return (
			new Path()
				.moveTo(xAxis,height - bottom)
				.lineTo(xAxis,yAxis)
				.lineTo(xAxis+barWidth,yAxis)
				.lineTo(xAxis+barWidth,height - bottom)
		)
	}

	setCrossHair(ev){

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
				active:index
			})
		}
	}

	getTooltips(){
		const {
			active
		} = this.state;

		if( active < 0 || active > this.props.series.length-1){
			return <Shape/>
		}

		const {
			xAxis,yAxis
		} = this.barPos[active]

		const tooltipText = this.props.tooltip.text(active,this.props.series[active].data);
		const approximateTextLength = 8 * tooltipText.length;

		const width = approximateTextLength;
		const height = 8 + 10;

		let xMiddle = xAxis+(this.itemWidth*0.3);
		const yMiddle = yAxis-20+4;

		if( xMiddle - width/2 < this.padding.left ){
			xMiddle = width/2 + this.padding.left;
		}

		if( xMiddle + width/2 > this.props.width - this.padding.right ){
			xMiddle = this.props.width - this.padding.right - width/2
		}

		return this.getTooltipBac({
			tooltipText,
			x:xMiddle - width/2,
			y:yMiddle - height/2,
			width,
			height,
			r:5
		})
	}

	onStart = (ev) => {
		if( !this.props.disableCorssHair ) this.setCrossHair(ev);
	}

	onMove = (ev) => {
		if( !this.props.disableCorssHair ) this.setCrossHair(ev);		
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



