# react-native-animate-chart

An chart library with animation based on ART module.

[![NPM](https://nodei.co/npm/react-native-animate-chart.png?downloads=true&stars=true)](https://nodei.co/npm/react-native-animate-chart/)

[![Build Status](https://travis-ci.org/react-native-china/react-native-animate-chart.svg?branch=master)](https://travis-ci.org/react-native-china/react-native-animate-chart)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)
[![depedencies](https://david-dm.org/react-native-china/react-native-animate-chart.svg)](https://github.com/react-native-china/react-native-animate-chart)

### Get Started
Before starting using the animate chart library,you have to add the ART module to your project  if you are deleloping iOS platform app.

1. drag `node_modules/react-native/Libraries/ART/ART.xcodeproj` to you project's `libraries` foulder
2. Link the `ART.a` module

Then save the following code named `Demo.js` as an component.

```js
const React,{ Components } from 'react';
const RNAChart from 'react-native-animate-chart';

export default class Demo extends Components{
  render(){
    return(
      <RNAChart
        width="320"
        height="300"
        title="Awesome React Native"
        subtitle="library for charting things"
        tootip = {{
          text:function(index,data){
            return `The ${index} data is ${data}`
          }
        }}
        xAxis = {{
          crosshair:true
        }}
      />
    )
  }
}
```
Then refresh your simulator or shake your device to reload,you will see the animating chart.

### [😁 Demo project here](https://github.com/react-native-china/react-native-animate-chart-demo)

TODOS:
- [x] Pie
- [x] Doughnut
- [x] Line chart
- [x] Histogram
- [ ] Radar Chart
