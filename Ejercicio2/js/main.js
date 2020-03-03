$(function () {
           
    var sourcesMap = new Map();
    
    //TODO to be removed
    var sourceList1 = [];
    var sourceList2 = [];
    var sourceList3 = [];
    var sourceList4 = [];
    
    const regExDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    const regExCategory = /\#(.*?)\#/;
    //TODO doc
    function getDateWithRegEx(text){
        return text.match(regExDate)[0];
    }
    
    //TODO
    //Dada una cadena de caracteres buscamos "CAT X" y la expresion regular regExCategory, 
    function getCategory(text){
        return text.match(regExCategory)[1];
    }    
      
    function readSourcesMap(){
         console.log(sourcesMap);
    }
    
    //Custom method for sorting an array of object by the field "d" (date in milliseconds)    
    function sortMapPerCat(){        
        sourcesMap.forEach(function(value, key, map){
           value.sort(function(a, b){
               return a.d - b.d;
           });
       });
    }    
    
    function updateSourcesMap(date, cat, value){
        //If the category is not in the map, we add it            
        if(!sourcesMap.has(cat)){     
            //Adding new "d" field for comparing and sorting purposes
            sourcesMap.set(cat, [{x:new Date(date), y:value, d:date}]);
        }//si la key ya existe, comprobamos si la fecha es nueva
        else{           
            //Getting the array of objects {x,y,d} by category 
            var oldCategoryArray = sourcesMap.get(cat);
            var hasDate = false;
            
            for(var i= 0; i < oldCategoryArray.length && !hasDate; i++){
                var oldDate = oldCategoryArray[i].d;                
                //si la fecha existe en el array sumamos su value con el nuevo
                if(oldDate == date){
                    // console.log("Las fechas coinciden, actualizamos value");
                    //actualizamos value
                    oldCategoryArray[i].y += value;
                    hasDate = true;                   
                }
            }
            if(!hasDate){
                 //si la fecha no existe añadimos nuevo par {d,v}
                //console.log("Las fechas no coinciden, añadimos par {date,value}");
                var newData = {};
 
                newData["x"] = new Date(date); //date in millis
                newData["y"] = value;
                newData["d"] = date;

                oldCategoryArray.push(newData);                
            }
            
        }
        
    }
   
    
    function loadSource1(callback){
       
        $.ajax({
            url: 'http://s3.amazonaws.com/logtrust-static/test/test/data1.json',  
            cache: true,
            dataType: 'json',
            success: function (data) {                
                callback(data);
            },
            error: function (jqXHR, status, errorThrown) {                
                $("#source1_container").html(errorThrown != null ? errorThrown : "error loading source 1 ");
                
                console.log( "error loading source 1");  
            }
            
        });
        
    } 
    
    function loadSource2(callback){ 
        $.ajax({
            url:'http://s3.amazonaws.com/logtrust-static/test/test/data2.json',  
            type: 'GET',
            cache: true,
            dataType: 'json',
            success: function (data) {
                //$("#source2_container").html(JSON.stringify(data)); 
                 callback(data);          
            },
            error: function (jqXHR, status, errorThrown) { 
                $("#source2_container").html(errorThrown != null ? errorThrown : "error loading source 2 ");
              
                console.log( "Error loading source 2");  
            }
        }).done(function(data){
             console.log( "DONE AJAX 2");
             
            
        }); 
    } 
    
    function loadSource3(callback){ 
        $.ajax({
            url:'http://s3.amazonaws.com/logtrust-static/test/test/data3.json',  
            type: 'GET',
            cache: true,
            dataType: 'json',
            success: function (data) {
                //$("#source3_container").html(JSON.stringify(data)); 
                callback(data); 
                
            },
            error: function (jqXHR, status, errorThrown) { 
                $("#source3_container").html(errorThrown != null ? errorThrown : "error loading source 3 ");
              
                console.log( "error loading source 3");  
            }
        }).done(function(data){
             console.log( "DONE AJAX 3");
            
            
        }); 
    } 
    
    function prepareDataSource1(data){
    
        console.log("calling prepareDataSource1");  
        console.log("Source 1 data length: "+data.length);  
                         
        for(var i = 0; i<data.length; i++){
            //Fecha en milisegundos
            var dateMilli = data[i].d;
            //Categroria
            var cat = data[i].cat.toUpperCase();         
            //Value
            var value = data[i].value;
                         
            updateSourcesMap(dateMilli, cat, value);
         }        
     }
        
    function prepareDataSource2(data){
       
        console.log("calling prepareDataSource2");  
        console.log("Source 2 data length: "+data.length);  
                
        var filteredList =[];
        for(var i = 0; i<data.length; i++){
                
            var myDate = data[i].myDate; 
            //Convertimos el string fecha en objeto Date para obtener la equivalencia en milisegundos
            var date = new Date(myDate);
            var dateMilli = ( new Date(myDate)).getTime();
          
            //Categoria ya capitalizada
            var cat = data[i].categ.toUpperCase();
            //Value
            var value = data[i].val;       
        
            updateSourcesMap(dateMilli, cat, value);
         }        
     }
    
    function prepareDataSource3(data){
       
        console.log("calling prepareDataSource3");          
        console.log("Source 3 data length: "+data.length);   
                
        var filteredList =[];
        for(var i = 0; i<data.length; i++){
            
            //Fecha
            var raw = data[i].raw;
                       
            var rawDate = getDateWithRegEx(raw);
            //Convertimos el string fecha en objeto Date para obtener la equivalencia en milisegundos
            var date = new Date(rawDate);
            var dateMilli = ( new Date(rawDate)).getTime();
                       
            //A partir del dato raw obtenemos la categoria
            var cat = getCategory(raw).toUpperCase();
        
            //Value
            var value = data[i].val;       
           
            updateSourcesMap(dateMilli, cat, value);
           
        }
       //TODO to remove
        readSourcesMap();  
        
     }
    
    //TODO a quitar el callback?
    loadSource1(function(output) {
        prepareDataSource1(output); 
        //$("#source1_container").html(JSON.stringify(sourceList1)); 
         
    });
    
    loadSource2(function(output) {
        prepareDataSource2(output); 
         //$("#source2_container").html(JSON.stringify(sourceList2));  
    });
    
    loadSource3(function(output) {
        prepareDataSource3(output); 
        //$("#source3_container").html(JSON.stringify(sourceList3));
        
        sortMapPerCat();

        // Once we have sorted the map, we load the charts with the map of categorys
        lineChartHandler.loadLineChart(sourcesMap);
        pieChartHandler.loadPieChart(sourcesMap);
    });

   
     
});