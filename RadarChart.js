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

const sin = function( deg ){
	return Math.sin((deg/360)*2*Math.PI)
}

const cos = function( deg ){
	return Math.cos((deg/360)*2*Math.PI)
}

class RadarChart extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	num:12,
	  	percentage:120,
	  	pec:0,
	  	stokeColor:'#FFFFFF00'
	  };

	  this.draw = this.draw.bind(this)
	}

	componentWillMount(){
		this.dotPointArrat = this.getBreakpointArray([
								100,100,100,100,100
							])
	}

	componentDidMount(){
		this.anim = new Animated.Value(0)

		this.anim.addListener(( value ) => {

			this.setState({
				pec:value.value
			})
		})

		setTimeout(() => {

			this.draw()

		},2000)
	}

	render(){
		return(
			<View style={{ flex:1,backgroundColor:'#3F6FDF' }}>
				<Surface width = { SCREEN_WIDTH } height = { SCREEN_HEIGHT } visible = { true }>
					{
						this.getShapes.bind(this)(
							this.dotPointArrat
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
					d = { d }
					stroke = { this.state.stokeColor }
					strokeWidth = { 2 }
					fill = '#F6E319'
					key = { index + start }
				/>
			)
		})
	}

	draw(){

		this.setState({
			stokeColor:'#115CC1'
		})

		Animated.spring(
			this.anim,
			{
				toValue:1
			}
		).start();
	}

	getBreakpointArray( pieData ){

		var length = pieData.length;
		var breakpoints = new Array( length + 1 );
		var degUnit = 360/length;
		
		for( var i=0;i<breakpoints.length;i++ ){
			breakpoints[i] = degUnit*i
		}

		console.log( 'breakpoints ->',breakpoints );


		return breakpoints;
	}

	getInnerG(s,e){

		var p = this.state.pec;

		var Ox = SCREEN_WIDTH/2;
		var Oy = SCREEN_HEIGHT/2;
		var R = 100*p;
		var startDeg = s;
		var endDeg = e;
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
					.lineTo( endDot.x, endDot.y ,R,R)
					.lineTo( Ox, Oy )
			)
		}

		return (
			path.lineTo( startDot.x, startDot.y )
				.lineTo( halfDot.x, halfDot.y , R, R)
				.lineTo( endDot.x, endDot.y , R, R)
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

export default RadarChart;