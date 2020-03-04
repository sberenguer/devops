/* 
    Method that prepares the pie chart. 
    We get the keys from the dataMap and we loop all the arrays for each category to sum up all the values within the same category. Afterwards we get the total for all the categories. That way we can calculate the percentage of each category in relation to the total.
    @params:
        dataMap: the map containing the data for writing the lines
*/
var pieChartHandler = (function () {
        
    return {
        loadPieChart: function (dataMap) {          
            
            var dataPointsArray=[];
            var totalValue = 0;
            for(var key of dataMap.keys()){
             
                var categorysArray = dataMap.get(key);
                var totalCatValue = 0;
                for(var i= 0; i < categorysArray.length; i++){
                    //sum of all of category's values
                    totalCatValue += categorysArray[i].y;                   
                }
                
                totalValue += totalCatValue;
                var dataPoint = {};
                dataPoint["y"] = totalCatValue;
                dataPoint["label"] = key + ":";
                
                dataPointsArray.push(dataPoint);
            }
            
            //Getting the % 
            for(var i= 0; i < dataPointsArray.length; i++){
                 dataPointsArray[i].y = dataPointsArray[i].y/totalValue * 100;
            }             
            
            var chart = new CanvasJS.Chart("pieChartContainer", {
                            
            animationEnabled: true,
            title: {
                text: "Ejercicio 2: Pie Chart"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: dataPointsArray               
                }]
            });
            
            chart.render();
        }
    }; 
     
}) ();