import React,{
	Component,
	PropTypes
} from 'react';

import {
	View,
	Text
} from 'react-native'

import charts from './charts'

const {
	Bar,
	Line,
	Pie,
	Doughnut,
	Histogram,
	Radar,
} = charts;

export default class RNAChart extends Component{
	static propTypes = {
	  	type: PropTypes.oneOf([
		  	"line",
		  	"bar",
		  	"pie",
		  	"doughnut",
		  	"histogram",
		  	"radar"
  		]),
	}

	componentWillMount(){
		console.log(this.getChart());
	}

	render(){
		return (
			<View style={{backgroundColor:'#F8F8F8'}}>
				{ this.getChart() }
			</View>
		)
	}

	getChart = () => {
		const chartMap = {
			bar:Bar,
			lne:Line,
			pie:Pie,
			doughnut:Doughnut,
			histogram:Histogram,
			radar:Radar
		}

		const Component = chartMap[this.props.type];

		return (
			<Line {...this.props}/>
		)
	}
}