import React,{ Component } from 'react';
import {
	Animated
} from 'react-native'

export default (type) => {
	// type = oneOf['linear','spring','bounce']

	return function( callback=()=>{} ){
		var animate = new Animated.Value(0);

		Animated.spring(animate,{
			toValue:1
		}).play();

		animate.addListener(callback)
	}
}