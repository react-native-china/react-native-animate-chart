import React, { 
	Component,
	PropTypes
} from 'react';

export default class GestureAware extends Component{

	static propTypes = {
		onStart: React.PropTypes.function,
		onMove: React.PropTypes.function,
		onEnd: React.PropTypes.function,
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
		setTimeout(() => {
			this.getLayout();
		})
	}

	_grantHandler(){

	}

	_moveHandler(){

	}
	
	_endHandler(){

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
