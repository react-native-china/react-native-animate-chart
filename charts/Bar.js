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
import attachTitleHandlers from './subparts/titles'
import enableCrossHair from './subparts/crosshair'
import enableCoords from './coords/cartesian';

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

	  attachTitleHandlers.apply(this);
	  enableCrossHair.apply(this);
	  enableCoords.apply(this);
	
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

		this.barPos = [];

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
					{ this.getSubtitle() }
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
						this.state.highlight == index ?
						data.activeFill : 
						data.normalFill
					}
					stroke={
						this.state.highlight == index ?
						data.activeStroke : 
						data.normalStroke
					}

					strokeWidth = {2}

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
			}
		} = this;

		const progress = this.state[`progress${index}`] || 0;

		const areaHeight = (height-top-bottom)
		
		const itemWidth = (width-left-right)/series.length;
		const barWidth = itemWidth*0.6;

		const xAxis = index*itemWidth+(itemWidth-barWidth/2);

		const yAxis = height - progress*(data.data/yRange * areaHeight) - bottom

		this.barPos.push({
			xAxis,
			yAxis
		})

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
				highlight:index
			})
		}
	}

	getTooltips(){
		const {
			highlight
		} = this.state;

		if( highlight < 0 ){
			return <Shape/>
		}

		const { xAxis, yAxis } = this.barPos[highlight];

		return (
			<Group>
				<Shape></Shape>
				<Text font={`16px "Helvetica Neue", "Helvetica", Arial`} 
					fill = "#4D4D4D" 
					alignment='center'
					x={xAxis}
					y={yAxis}
					>Number</Text>
			</Group>
		)
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
			highlight:-1
		})
	}
}



