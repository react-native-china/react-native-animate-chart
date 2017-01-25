import React,{ Component } from 'react';
import {
	View,Text
} from 'react-native';

import AniChart from 'react-native-animate-chart';

export default class Main extends Component{
	render(){
		<AniChart
			width="300"
			height="300"
			xAxis 		= 	{ this.getXAxis() }
			yAxis 		= 	{ this.getYAxis() }
			colors 		= 	{ this.getColors() }
			data 		= 	{ this.getData() }
			legend 		= 	{ this.getLegend() }
			series 		= 	{ this.getSeries() }
			title 		= 	{ this.getTitle() }
			subtitle 	= 	{ this.getSubtitle() }
			tooltip 	= 	{ this.getToolTip() }
			animation 	= 	{ this.getAnimation() }
		></AniChart>
	}

	getToolTip() {
		return {
			style:{
				strokeWidth:"2px",
				stroke:'green',
				fill:'#DFEBAA',
				radius:12
			},
			text:function(value,label){
				return `${label} is ${value}`
			}
		}
	}

	getAnimation() {
		return {
			enable:true,
			timing-function:'cubic-bezier(.2,.4,.8,.4)',
			duration:2000,
			stagger:true
		}
	}

	getSubtitle = () => "Data Anaylisis"
	getTitle = () => "Big One"

	getXAxis() {
		return {
			crosshair:true,
		}
	}

	getYAxis() {
		return {
			step:100,
			max:2000,
			min:0,
			crosshair:{
				color:'#08DA9F',
				lineWidth:2
			}
		}
	}

	getData() {
		return [
			200,300,510,100,300,21.4
		]
	}

	getColors() {
		return [
			"red","green","blue","yellow"
		]
	}

	getSeries() {
		return [
			{
				data:200,
				normalFill:"",
				activeFill:"",
				normalStroke:"",
				activeStroke:""
			},{
				data:130,
				normalFill:"",
				activeFill:"",
				normalStroke:"",
				activeStroke:""
			}
		]
	}
}