

var lineChartHandler = (function () {
    
    return {
        loadLineChart: function (mapOfData) {
            console.log("DEBUT DE lineChartHandler");
            console.log(mapOfData);
          
          
            var dataArray=[];
            for(var key of mapOfData.keys()){
                var data = {};
                data["type"]="line";
                data["indexLabelFontSize"]=16;
                data["legendText"]=key;
                data["showInLegend"]=true;                            
                data["dataPoints"] = mapOfData.get(key);
                
                dataArray.push(data);
            }
       
           
            var chart = new CanvasJS.Chart("lineChartContainer", {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Simple Line Chart"
                },
                axisX:{
                    valueFormatString: "DD. MMM"
                },
                axisY:{
                    includeZero: false
                },
                data: dataArray
            });
            
            function renderChart(){
                console.log("SBG CALLING RENDER CHART");
                chart.render();
            }
            
            console.log("CALLING LINE CHART");
            renderChart();
            }
        };
 
    
}) ();

 

 