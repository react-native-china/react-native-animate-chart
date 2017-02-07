import React, { 
	Component,
	PropTypes
} from 'react';

import {
	ART
} from 'react-native';

export default class Bar extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	static propTypes = {
		series: PropTypes.array,
		subtitle:PropTypes.string,
		title:PropTypes.string,
		tootip:PropTypes.object
	}

	render(){
		const {
			width,
			height,
		} = this.props;

		return (
			<Surface>
				{ this.getBars() }
				{ this.getCoords() }
			</Surface>
		)
	}

	getBars = () => {
		const {
			series
		} = this.props;

		return series.map((data,index) => {
			return (
				<Shape d={}></Shape>
			)
		})
	}
}



