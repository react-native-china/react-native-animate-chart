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

	componentWillMount(){
		this.onStart = this.props.onStart || function(){};
		this.onMove = this.props.onMove || function(){};
		this.onEnd = this.props.onEnd || function(){};

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
		console.log(this.props);

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

	_grantHandler = () => {
		this.onStart()
	}

	_moveHandler = () => {
		this.onMove()
	}
	
	_endHandler = () => {
		this.onEnd()
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
