import React, { 
	Component,
	PropTypes
} from 'react';

import {
	ART,
	View
} from 'react-native';

import {
	roundingRange
} from "../implements";

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
	
	  this.state = {
	  	highlight:1
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
		let seriesData = [...series];

		seriesData.sort((a,b) => {
			return a-b;
		})

		this.data = series.map(({data}) => {
			return data;
		})

		this.yRange = roundingRange(this.data);

		this.padding = {
			top:100,
			right:20,
			bottom:50,
			left:20
		}
	}

	render(){
		const {
			width,
			height,
		} = this.props;

		return (
			<View>
				<Surface width={this.props.width} height={this.props.height} visible={true}>
					{ this.getBars() }
					{ this.getCoords() }
					<Text font={`16px "Helvetica Neue", "Helvetica", Arial`} 
						fill = "#4D4D4D" 
						alignment='center'
						x={160}
						y={30}
						>React native is really awesome</Text>
					<Text font={`14px "Helvetica Neue", "Helvetica", Arial`} 
						fill = "#9D9D9D" 
						alignment='center'
						x={160}
						y={60}
						>I mean it</Text>
				</Surface>
			</View>
		)
	}

	getBars = () => {
		const {
			series
		} = this.props;

		return series.map((data,index) => {
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


		const itemWidth = (width-left-right)/series.length;
		const areaHeight = (height-top-bottom)
		
		const barWidth = itemWidth*0.6;

		const xAxis = index*itemWidth+(itemWidth-barWidth/2);
		const yAxis = height - data.data/yRange * areaHeight - bottom

		return (
			new Path()
				.moveTo(xAxis,height - bottom)
				.lineTo(xAxis,yAxis)
				.lineTo(xAxis+barWidth,yAxis)
				.lineTo(xAxis+barWidth,height - bottom)
		)
	}

	getCoords(){
		return (
			<Shape 
				d={ this.getCoordsD() } 
				stroke="#D4D4D4" 
				strokeWidth="2"
				></Shape>
		)
	}

	getCoordsD(){

		const {
			width,height,series
		} = this.props;

		const {
			padding:{
				left,top,right,bottom
			}
		} = this;

		return (
			new Path()
				.moveTo(left,top)
				.lineTo(left,height - bottom)
				.lineTo(width - right,height - bottom)
		)
	}
}



