/* 
    Method that prepares the line chart. With dataMap as parameter we can find 
    very easily the array of objects needed to show the data in the chart.
    By getting the value corresponding to each key of the map, we have exactly the content to load.
    To print the chart, the array of dataPoints must have objects with an "x" and an "y" value (x axis and y axis)
    @params:
        dataMap: the map containing the data for writing the lines
*/
var lineChartHandler = (function () {
    
    return {
        loadLineChart: function (dataMap) {          
          
            var dataArray=[];
            for(var key of dataMap.keys()){
                var data = {};
                data["type"] = "line";
                data["indexLabelFontSize"] = 16;
                data["legendText"] = key;
                data["showInLegend"] = true;                            
                data["dataPoints"] = dataMap.get(key);
                
                dataArray.push(data);
            }       
           
            var chart = new CanvasJS.Chart("lineChartContainer", {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Ejercicio 2: Line Chart"
                },
                axisX:{
                    valueFormatString: "DD. MMM"
                },
                axisY:{
                    includeZero: false
                }, 
                legend: {
                    verticalAlign: "center",
                    horizontalAlign: "right"
                }, 
                data: dataArray
            });
            
            chart.render();
            
            }
        };
 
    
}) ();

 

 