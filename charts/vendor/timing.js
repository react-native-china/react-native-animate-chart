import React,{ Component } from 'react';
import {
	Animated
} from 'react-native'

class Animation{
	constructor(props) {
		this.progress = 0;
	}
}

export class Spring extends Animation{
	constructor() {
	  this.type = "spring"
	}

	animate(callback){
		callback && callback(progress);
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
	constructor() {
	  this.type = "stagger"
	}

	animate(callback){
		callback && callback(progress);
	}
}