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
		return (
			new Stagger(
				new Linear(1000)
			,300);
		);
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
				theme:new Theme({
					stroke:{
						active:"",
						normal:""
					},
					fill:{
						active:"",
						normal:""
					}
				}),
				data:[200,300,400,600]
			},
			{
				theme:new Theme({
					stroke:{
						active:"",
						normal:""
					},
					fill:{
						active:"",
						normal:""
					}
				}),
				data:[200,300,400,600]
			},
			{
				theme:new Theme({
					stroke:{
						active:"",
						normal:""
					},
					fill:{
						active:"",
						normal:""
					}
				}),
				data:[200,300,400,600]
			}
		]
	}

	getLegend(){
		retrun {
			title:{
				color:,
				fontSize:,
				fontWeight:,
			},
			subtitle:{
				color:,
				fontSize:,
				fontWeight:,
			},
			coords:{
				width:,
				color:
			}
			crosshair:{
				color:'',
				width:
			}
		}
	}
}