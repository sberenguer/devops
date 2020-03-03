

var lineChartHandler = (function () {
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    function parseDate(date){
      
        var milliIntoDate = new Date(date); 
        var day = milliIntoDate.getDate();
        var month = months[milliIntoDate.getMonth()];
        return day+"."+month;
        
    }
    
    return {
        func2: function (mapOfData) {
            console.log("DEBUT DE lineChartHandler");
            console.log(mapOfData);
            /*
            var dataPointsCat1 = [
            {label:"1.Jul", label:5},
            {label:"2.Jul", y:10},
            {label:"5.Jul", y:15},
            {label:"15.Jul", y:20},
            {label:"27.Jul", y:25}];
            
            var dataPointsCat2 = [{x:"1.Jul", y:11},{x:"2.Jul", y:22},{x:"5.Jul", y:15},{x:"15.Jul", y:32},{x:"27.Jul", y:55}];
            
            var dataPointsCat3 = [{x:"1.Jul", y:21},{x:"4.Jul", y:11},{x:"5.Jul", y:47},{x:"14.Jul", y:32},{x:"21.Jul", y:33}];
            */
//            var dataPointsCat3 = [{y:12},{y:33},{y:12},{y:11},{y:44}];
                /*TODO variabilizar los data:
                [
                {
                  type :"line"  ,
                  indexLabelFontSize: 16,
                  dataPoints: source1
                }

                ]
                */
          
            var dataArray=[];
            for(var key of mapOfData.keys()){
                var data = {};
                data["type"]="line";
                data["indexLabelFontSize"]=16;
                data["legendText"]=key;
                data["showInLegend"]=true;  
                var dateArray = mapOfData.get(key);
                for(var i= 0; i < dateArray.length; i++){
                    //console.log(key + " + dateArray["+i+"].label:" +dateArray[i].label + ":"+ dateArray[i].x);
                     
                    //console.log(key + " + dateArray["+i+"]:" +dateArray[i]);
                   // dateArray[i].label= parseDate(dateArray[i].label);
                    dateArray[i].x = new Date(dateArray[i].x);
                }
                
                //data["dataPoints"] = dateArray;
                data["dataPoints"] = dateArray;
                //console.log(key + " + dataPoints");
                //console.log(data["dataPoints"]);
                dataArray.push(data);
            }
       
           
            var chart = new CanvasJS.Chart("lineChartContainer", {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Simple Line Chart"
                },
                axisX:{
                    valueFormatString: "DD-MMM"
                },
                axisY:{
                    includeZero: false
                },
                data: dataArray
               /* [{        
                    type: "line",
                    indexLabelFontSize: 16,
                    showInLegend: true,
                    legendText: "CAT 1",
                    dataPoints: dataPointsCat1
                },{
                    type: "line",      
                    showInLegend: true,
                    legendText: "CAT 2",
                    indexLabelFontSize: 16,
                    dataPoints: dataPointsCat2
                },{
                    type: "line",      
                    showInLegend: true,
                    legendText: "CAT 3",
                    indexLabelFontSize: 16,
                    dataPoints: dataPointsCat3
                }]*/
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

 

 