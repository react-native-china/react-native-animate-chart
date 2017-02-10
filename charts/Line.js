import React, { 
	Component,
	PropTypes
} from 'react';

import {
	ART,
	View,
	Animated
} from 'react-native';

export default class Line extends Component{
	render(){
		static propTypes = {
			series: PropTypes.array,
			subtitle:PropTypes.string,
			title:PropTypes.string,
			tootip:PropTypes.object
		}
	}
}