import React from 'react';
import { ART } from 'react-native';
const {
	Shape,
	Path,
	Text,
	Group
} = ART;

function getTooltipBac({
	tooltipText,x,y,width,height,r=0
}){

	const fontSize = 8;

	if( x < 0 ) x = 0;
	if( x > this.props.width - this.padding.right ){
		x = this.props.width - this.padding.right;
	}

	if( r > height/2 ){
		r = height/2
	}

	return (
		<Group>
			<Shape d={
				new Path()
					.moveTo(x + r,y)
					.lineTo(x + width - r,y)
					.arcTo(x + width,y + r,r,r)
					.lineTo(x + width,y + height - r)
					.arcTo(x + width - r,y + height,r,r)
					.lineTo(x + r,y + height)
					.arcTo(x,y + height - r,r,r)
					.lineTo(x,y + r)
					.arcTo(x + r,y,r,r)
					.close()
			} fill="#029df9" strokeWidth="1" stroke="#444"/>

			<Text font={`${fontSize}px "Courier-Bold", "Helvetica Neue", "Helvetica", Arial`} 
				fill = "white"
				alignment = 'center'
				x = { x + width/2 }
				y = { y + height/2 - fontSize/2 - 2 }
				>{ tooltipText }</Text>
		</Group>
	)
}

export default function enableTooltip(){
	this.getTooltipBac = getTooltipBac.bind(this);
}