import React, { 
	Component,
	PropTypes
} from 'react';

import {
	ART
} from 'react-native';

import {
	roundingRange
} from "../implements";

export default class Bar extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
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
	}

	static propTypes = {
		series: PropTypes.array,
		subtitle:PropTypes.string,
		title:PropTypes.string,
		tootip:PropTypes.object
	}

	render(){
		const {
			width,
			height,
		} = this.props;

		return (
			<Surface>
				{ this.getBars() }
				{ this.getCoords() }
			</Surface>
		)
	}

	getBars = () => {
		const {
			series
		} = this.props;

		return series.map((data,index) => {
			return (
				<Shape 
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
				/>
			)
		})
	}

	getBarD = (data,index) => {
		const {
			width,height
		} = this.props;

		const {
			yRange
		} = this;

		const xPadding = 20;
		const yPadding = 20;

		const itemWidth = (width-2*xPadding)/series.length;
		const areaHeight = (height-2*yPadding)
		
		// here bar width default to 40.api todo.
		const barWidth = 40;

		const xAxis = index*itemWidth+(itemWidth-barWidth/2);
		const yAxis = data.data/yRange * areaHeight

		return (
			new Path()
				.moveTo(xAxis,)
				.lineTo(xAxis,)
				.lineTo(xAxis+barWidth,)
				.lineTo(xAxis+barWidth,)
		)
	}
}



