var pieChartHandler = (function () {
    
    function getPercentage(){
     

    }
    
    return {
        loadPieChart: function (mapOfData) {
            
            console.log("DEBUT DE pieChartHandler");
            
            
            var dataPointsArray=[];
            var totalValue = 0;
            for(var key of mapOfData.keys()){
             
                var categorysArray = mapOfData.get(key);
                var totalCatValue = 0;
                for(var i= 0; i < categorysArray.length; i++){
                    //sum of all of category's values
                    totalCatValue += categorysArray[i].y;                   
                }
                
                totalValue += totalCatValue;
                var dataPoint = {};
                dataPoint["y"] = totalCatValue;//getPercentage();
                dataPoint["label"] = key + ":";
                                
                //console.log(key + " + dataPoints"); 
                dataPointsArray.push(dataPoint);
            }
            
            //Getting the % 
            for(var i= 0; i < dataPointsArray.length; i++){
                 dataPointsArray[i].y = dataPointsArray[i].y/totalValue * 100;
            }
            
//            dataPointsArray.forEach(function(item){
//                totals[item.label] = (totals[item.label] || 0 ) + item.y;
//            });
//            
//            dataPointsArray.forEach(function(item){
//                item.percent = 100 * item.y / totals[item.label];
//            });
            
            console.log(dataPointsArray);
            
            var chart = new CanvasJS.Chart("pieChartContainer", {
                
                
            animationEnabled: true,
            title: {
                text: "Desktop Search Engine Market Share - 2016"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: dataPointsArray
                /*[
                    {y: 79.45, label: "Google"},
                    {y: 7.31, label: "Bing"},
                    {y: 7.06, label: "Baidu"},
                    {y: 4.91, label: "Yahoo"},
                    {y: 1.26, label: "Others"}
                ]*/
                }]
            });
            
            console.log("Render the Pie Chart");
            chart.render();
        }
    }; 
     
}) ();