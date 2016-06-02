const containter = {
	width:200,
	height:200
}

var circleData = {
	ox:120 || width/2,
	oy:120 || height/2,
	R :20 || Math.min(container.height, container.width)/2,
	data:[1,2,3,4,5],
	configs:{
		strokeDash:[12,12],
		fill:'#123909',
		stroke:'#123092',
		strokeWidth:12,
	}
}

var lineData = {
	dots:[
		['amount',20],
		['comon',230],
		['hello',12]
	],
	'x-axis':{
		name:'month/month',
		unit:'every(2)',
		unitTags:[
			'Feb',
			'Apr',
			'Jun',
			'Aug',
			'Oct',
			'Dec'
		],
		widthArrow:false
	},
	'y-axis':{
		name:'people/people',
		unit:'200',
		unitTage:( index ) => {
			return index*200 + 's'
		},
		widthArrow:false
	}
}

var innerCircleData = {
	ox:120 || width/2,
	oy:120 || height/2,
	R :20 || Math.min(container.height, container.width)/2,
	data:[1,2,3,4,5],
	configs:{
		strokeDash:[12,12],
		fill:'#123909',
		stroke:'#123092',
		strokeWidth:12,
	}
}

var barData = {
	data:[
		['name',123],
		['comon',230],
		['amount',12]
	],
	'x-axis':{
		name:'month/month',
		unit:'every(2)',
		unitTags:[
			'Feb',
			'Apr',
			'Jun',
			'Aug',
			'Oct',
			'Dec'
		],
		widthArrow:false
	},
	'y-axis':{
		name:'people/people',
		unit:'200',
		unitTage:( index ) => {
			return index*200 + 's'
		},
		widthArrow:false
	}
}

var radarData = {
	dimensions:[
		'clever',
		'brave',
		'strength',
		'power',
		'weight'
	],
	datas:[
		{
			clever:12,
			brave:212,
			strength:121,
			power:990,
			weight:200
		},
		{
			clever:2123,
			brave:1,
			strength:1,
			power:1,
			weight:23
		}
	],
	configs:{
		outerStrokeColor:'',
		outerStrokeWidth:12,
		outerNetBgColor:'',
		gridNetStrokeColor:'',
		gridNetStrokeWidth:'',
		dataNetStrokeColor:'',
		dataNetStrokeWidth:'',
		dataNetBgColor:'',
		animationEnable:true
	}
}