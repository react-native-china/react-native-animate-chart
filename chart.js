import React,{
	Component,
	PropTypes
} from 'react';

import {
	View,
	Text
} from 'react-native'

import {
	Bar,
	Doughnut,
	Histogram,
	Line,
	Pie,
	Radar
}  form './charts'

export default class RNAChart extends Component{
	static propTypes = {
	  type: PropTypes.oneOf(["line","bar","pie","doughnut","histogram","radar"]),
	}

	render(){
		return this.getChart()
	}

	getChart = () => {
		switch( this.props.type ){
			case "line":return <Line ...this.props/>;
			case "bar":return <Bar ...this.props/>;
			case "pie":return <Pie ...this.props/>;
			case "doughnut":return <Doughnut ...this.props/>;
			case "histogram":return <Histogram ...this.props/>;
			case "radar":return <Radar ...this.props/>;
		}
	}
}