import React , { Component } from 'react';
import {
	View,
	ART,
	Image,
	Dimensions,
	Text,
	Animated
} from 'react-native';

const {
	Path,
	Shape,
	Surface,
} = ART;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


// console.log( 'ART ->', ART );
// console.log( 'Path() ->',Path.prototype );
// console.log( 'Transform() ->',ART.Transform.prototype );

const sin = function( deg ){
	return Math.sin((deg/360)*2*Math.PI)
}

const cos = function( deg ){
	return Math.cos((deg/360)*2*Math.PI)
}

class Rectangle extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	num:12,
	  	percentage:120,
	  	pec:0
	  };
	}

	componentDidMount(){
		var anim = new Animated.Value(0)

		anim.addListener(( value ) => {

			this.setState({
				pec:value.value
			})
		})

		setTimeout(() => {

			Animated.spring(
				anim,
				{
					toValue:1
				}
			).start();
		})
	}

	render(){
		return(
			<View style={{ flex:1,backgroundColor:'white' }}>
				<Surface width = { SCREEN_WIDTH } height = { SCREEN_HEIGHT } visible = { true }>
					{
						this.getShapes.bind(this)(
							this.getBreakpointArray([
								200,1290,300,2910,1200,990
							])
						)
					}
				</Surface>
			</View>
		)
	}

	getShapes( breakpoints ){

		return breakpoints.map(( value, index ) => {
			var start = index > 0 ? breakpoints[index-1] : 0 ;
			var end = value

			var d = this.getInnerG.bind(this)( start, end );

			return (
				<Shape
				onTouchEnd = { () => {alert(1)} }
					d = { d }
					stroke = '#115CC1'
					strokeWidth = { 1 }
					fill = '#F6E319'
					key = { index + start }
				/>
			)
		})
	}

	getBreakpointArray( pieData ){
		var sumData = {
			all:0
		};

		var breakpoints = [];

		pieData.forEach(( value, index ) => {

			sumData.all += value;
			sumData['value'+index] = sumData.all;
		})

		pieData.forEach(( value, index ) => {
			breakpoints.push( Math.round((sumData['value'+index]/sumData.all)*360) )
		})

		return breakpoints;
	}

	getInnerG(s,e){

		var p = this.state.pec;

		var Ox = SCREEN_WIDTH/2;
		var Oy = SCREEN_HEIGHT/2;
		var R = 100*p;
		var startDeg = s*p;
		var endDeg = e*p;
		var circleInfo = {
			Ox,Oy,R
		}

		var path =  Path()
					.moveTo( Ox, Oy )

		return  this.getArc.bind(this)( path, startDeg, endDeg, circleInfo ).close()
	}

	getArc( path, startDeg, endDeg, circleInfo ){
		var deltaDeg 		= endDeg - startDeg;
		var startDot 		= this.getCircleDot( startDeg, circleInfo )
		var halfDot 		= this.getCircleDot( startDeg + 180, circleInfo )
		var endDot 			= this.getCircleDot( endDeg, circleInfo )
		var { R, Ox, Oy } 	= circleInfo;

		if( deltaDeg < 180 ){
			return (
				path.lineTo( startDot.x, startDot.y )
					.arcTo( endDot.x, endDot.y ,R,R)
					.lineTo( Ox, Oy )
			)
		}

		return (
			path.lineTo( startDot.x, startDot.y )
				.arcTo( halfDot.x, halfDot.y , R, R)
				.arcTo( endDot.x, endDot.y , R, R)
				.lineTo( Ox, Oy )
		)
	}

	getCircleDot( deg, circleInfo ){

		var { R, Ox, Oy } = circleInfo;

		return {
			x:R*cos( 90 - deg ) + Ox,
			y:-R*sin( 90 - deg ) + Oy
		}
	}

	getHalfCircle( deg, path , circleInfo){
		if( deg < 180 ){
			return path
		} else {
			return path.arcTo(  )
		}
	}
}

export default Rectangle;