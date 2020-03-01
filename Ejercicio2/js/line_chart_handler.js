var lineChartHandler = (function () {
    return {
        func2: function (mapOfData) {
            var myDataPoints1 = [{x:0, y:5},{x:1, y:10},{x:2, y:15},{x:3, y:20},{x:4, y:25}];
            var myDataPoints2 = [{y:10},{y:20},{y:15},{y:50},{y:15}];
            var myDataPoints3 = [{y:12},{y:33},{y:12},{y:11},{y:44}];
                /*TODO variabilizar los data:
                [
                {
                  type :"line"  ,
                  indexLabelFontSize: 16,
                  dataPoints: source1
                }

                ]
                */
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
                    showInLegend: true,
                    legendText: "CAT 1",
                    dataPoints: myDataPoints1
                },{
                    type: "line",      
                    showInLegend: true,
                    legendText: "CAT 2",
                    indexLabelFontSize: 16,
                    dataPoints: myDataPoints2
                },{
                    type: "line",      
                    showInLegend: true,
                    legendText: "CAT 3",
                    indexLabelFontSize: 16,
                    dataPoints: myDataPoints3
                }]
            });
            function renderChart(){
                console.log("SBG CALLING RENDER CHART");
                chart.render();
            }
            // do whatever you want with someElement
            console.log("CALLING LINE CHART");
            renderChart();
            }
        };
 
    
}) ();

 

 