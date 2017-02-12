import React,{ Component } from 'react';
import {
	Animated
} from 'react-native'

class Animation{
	constructor(props) {
		this.animation = new Animated.Value(0);
	}
}

export class Spring extends Animation{
	constructor() {
	  this.type = " spring"
	}

	animate(callback){
		//  props to add.
		// duration extent
		Animated.spring(this.aimation,{
			toValue:1
		})

		this.animation.addListener(function(n){
			callback && callback(n.value)
		})
	}
}

export class Linear extends Animation{
	constructor() {
	  this.type = "linear"
	}

	animate(callback){
		callback && callback(progress);
	}
}

export class Bounce extends Animation{
	constructor() {
	  this.type = "bounce"
	}

	animate(callback){
		callback && callback(progress);
	}
}

// multi animation method.
export class Stagger extends Animation{
	constructor(animation,gapTime) {
	  this.type = "stagger"

	  this.gapTime = gapTime;
	  this.childAnimation = animation;
	}

	animate(callback){
		Animated.stagger(gapTime,[
			
		]);

		callback && callback(progress);
	}
}