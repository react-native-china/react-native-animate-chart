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
	  this.type = "spring"
	}

	play(callback){
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

/**
 * simple contructor
 * play(){}
 * addListener(){}
 */

export class Linear extends Animation{
	constructor() {
	  this.type = "linear"
	}

	play(callback){
		callback && callback(progress);
	}

	addListener(){

	}
}

export class Bounce extends Animation{
	constructor() {
	  this.type = "bounce"
	}

	play(callback){
		callback && callback(progress);
	}

	addListener(){

	}
}

// multi animation method.

export class Stagger extends Animation{
	constructor(animation,gapTime) {
	  this.type = "stagger"

	  this.gapTime = gapTime;
	  this.childAnimation = animation;

	  this.listeners = [];
	}

	play(){
		Animated.stagger(gapTime,[]);
	}

	addListener(callback){
		this.listeners.push(callback)
	}
}