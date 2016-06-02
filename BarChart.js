import React, { Component } from 'react';
import {
	View,
	Dimensions,
	ART,
	Animated
} from 'react-native';

const {
	Path,
	Shape,
	Surface,
	Text
} = ART;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const data = [
	['Jun',19120],
	['Feb',4290],
	['Mar',3820],
	['Mar',32820],
	['Mar',12820],
	['Mar',13820],
	['Mar',3820],
	['Apr',12200],
	['May',12310],
	['May',1230],
	['May',22390],
	['May',12390],
	['May',12390],
	['Jun',11490],
	['Jul',22190],
	['Aug',10100],
	['Sep',22111],
	['Oct',11230],
	['Nov',14200],
	['Dec',12020],
]

const graphic = {
	width:300,
	height:200
}

var O = {
	x:10,
	y:200 - 10
}

var Yend = {
	x:10,
	y:10
};

var Xend = {
	x:300,
	y:200 - 10
}


class BarChart extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	percentage:0
	  };
	}

	componentDidMount(){

		this.height = O.y - Yend.y
		this.width = Xend.x - O.x

		this.zoomPercentage = this.getZoomPercentage.bind(this)( data );

		var anim = new Animated.Value(0);

		anim.addListener(( value ) => {

			this.setState({
				percentage:value.value
			})
		})

		setTimeout(() => {
			Animated.spring(anim,{
				toValue:1
			}).start();
		}, 3000)
	}

	render(){
		return (
			<View style={{ backgroundColor:'#3F6FDF' }}>
				<Surface width = { SCREEN_WIDTH } height = { SCREEN_HEIGHT } visible = { true } style={{ top:200 }} >
					<Shape
						d = { this.getShape.bind(this)() }
						strokeWidth = { 1 }
						stroke="#F6E319"
					/>
					<Shape
						d = { this.getAxies.bind(this)() }
						strokeWidth = { 1 }
						stroke="#F6E319"
					/>
					<Shape
						d = { this.getDots.bind(this)() }
						strokeWidth = { 5 }
						stroke="#F6E319"
					/>
				</Surface>
			</View>
		)
	}

	getShape( dotsArray = data ){
		var newLineChartPath = Path().moveTo(20,10);

		dotsArray.forEach(( dotValue, index ) => {

			var v = dotValue[1]*this.state.percentage;
			var targetDotAxies = {
				x:index*( 300/dotsArray.length ) + O.x ,
				y:O.y - v/this.zoomPercentage
			}

			var { x,y } = targetDotAxies;

			if( index == 0 ){
				newLineChartPath.moveTo( x,y )
			}

			newLineChartPath.lineTo( x,y  )
		})		

		return newLineChartPath;
	}

	getAxies(){
		var container = {
			width:SCREEN_WIDTH,
			height:200
		}

		var delta = 7;

		return Path()
				.moveTo( Yend.x - delta	, Yend.y + delta 	)
				.lineTo( Yend.x 		, Yend.y 			)
				.lineTo( Yend.x + delta , Yend.y + delta 	)
				.moveTo( Yend.x 		, Yend.y 			)
				.lineTo( O.x 			, O.y 				)
				.lineTo( Xend.x 		, Xend.y 			)
				.moveTo( Xend.x - delta , Xend.y - delta 	)
				.lineTo( Xend.x 		, Xend.y 			)
				.lineTo( Xend.x - delta , Xend.y + delta 	)
	}

	getDots( dotsArray = data ){
		var dotPath = new Path();
		dotsArray.forEach(( dotValue, index ) => {

			var v = dotValue[1]*this.state.percentage;

			var targetDotAxies = {
				x:index*( 300/dotsArray.length ) + O.x ,
				y:O.y - v/this.zoomPercentage 
			}

			var { x,y } = targetDotAxies;

			dotPath.moveTo( x, y );
			dotPath.lineTo( x, y );

		})

		return dotPath;
	}

	getMaxNumber( target: array ){
		return target.sort(( a, b ) => { return b - a })[0]
	}

	getZoomPercentage( dotsArray ){

		var max = 0;

		dotsArray.forEach(( dot, index ) => {
			if( dot[1] > max ) max = dot[1]
		})

		return max/this.unitSimpleify(this.height)
	}

	unitSimpleify( number ){
		var numberArray = Math.round(number).toString().split('').reverse();
		var length = numberArray.length;
		var handleRuler = Math.pow( 10,length - 2 )
		var result = Math.ceil( number/handleRuler ) * handleRuler;

		return result;
	}

	getUnit(){

	}
}

export default BarChart;