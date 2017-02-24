import React from 'react';
import { ART } from 'react-native'

const {
	Text,
	Group
} = ART;

function getTitle(){
	return (
		<Group>
			<Text font={`16px "Helvetica Neue", "Helvetica", Arial`} 
				fill = "#4D4D4D" 
				alignment='center'
				x={160}
				y={30}
				>{this.props.title}</Text>

			<Text font={`14px "Helvetica Neue", "Helvetica", Arial`} 
				fill = "#9D9D9D" 
				alignment='center'
				x={160}
				y={60}
				>{this.props.subtitle}</Text>
		</Group>
	)
}

export default function attachTitleHandler(){
	this.getTitle = getTitle.bind(this);
}