import React,{ Component } from 'react';
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