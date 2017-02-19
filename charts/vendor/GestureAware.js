import React, { 
	Component,
	PropTypes
} from 'react';

import {
	PanResponder,
	View
} from 'react-native'

export default class GestureAware extends Component{

	static propTypes = {
		onStart: PropTypes.func,
		onMove: PropTypes.func,
		onEnd: PropTypes.func,
	}

	static defaultProps = {
	  onStart: function(){},
	  onMove: function(){},
	  onEnd: function(){}
	}

	componentWillMount(){
		this.onStart = this.props.onStart;
		this.onMove = this.props.onMove;
		this.onEnd = this.props.onEnd;
		
		this._panResponder = PanResponder.create({
		  onStartShouldSetPanResponder: () => true,
		  onMoveShouldSetPanResponder: () => true,
		  onPanResponderGrant: this._grantHandler,
		  onPanResponderMove: this._moveHandler,
		  onPanResponderRelease: this._endHandler,
		  onPanResponderTerminate: this._endHandler,
		});
	}

	componentDidMount(){
		setTimeout(() => {
			this.getLayout((x, y, w, h, pageX, pageY) => {
				this.setState({
					position:{
						left:pageX,
						top:pageY
					}
				})
			});
		})
	}

	_grantHandler = (e, gestureState) => {
		this.getLayout((x, y, w, h, pageX, pageY) => {
			this.setState({
				position:{
					left:pageX,
					top:pageY
				}
			})
		});

		this.onStart({
			...gestureState,
			moveX:gestureState.x0,
			moveY:gestureState.y0
		});
	}

	_moveHandler = (e, gestureState) => {
		this.onMove({
			...gestureState,
			moveY:gestureState.moveY - this.state.position.top
		})
	}
	
	_endHandler = (e, gestureState) => {

		this.onEnd({
			moveX:gestureState.moveX,
			moveY:gestureState.moveY - this.state.position.top
		})
	}

	render(){
		return (
			<View {...this._panResponder.panHandlers} ref="layout">
				{ this.props.children }
			</View>
		)
	}

	getLayout(callback){
		this.refs.layout.measure(callback);
	}
}
