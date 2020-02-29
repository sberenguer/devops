$(function(){ 
var myDataPoints = [{x:0, y:5},{x:1, y:10},{x:2, y:15},{x:3, y:20},{x:4, y:25}];
var myDataPoints1 = [{y:10},{y:20},{y:15},{y:50},{y:15}];
    
var chart = new CanvasJS.Chart("lineChartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Simple Line Chart"
	},
	axisY:{
		includeZero: false
	},
	data: [{        
		type: "line",
      	indexLabelFontSize: 16,
		dataPoints: myDataPoints1
	},{
        type: "line",
        lineColor:"red",
      	indexLabelFontSize: 16,
		dataPoints: myDataPoints
    }]
});
chart.render();

});