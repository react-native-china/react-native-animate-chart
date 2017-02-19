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
	Radar,
} = charts;

export default class RNAChart extends Component{
	static propTypes = {
	  	type: PropTypes.oneOf([
		  	"line",
		  	"bar",
		  	"pie",
		  	"doughnut",
		  	"radar"
  		]),
	}

	componentWillMount(){
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
			line:Line,
			pie:Pie,
			doughnut:Doughnut,
			radar:Radar
		}

		return (
			React.createElement(chartMap[this.props.type]||Bar,{...this.props})
		)
	}
}