$(function () { 
     var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
     var sourcesMap = new Map();
    /*
    var dataPointsCat1 = [{label:"1.Jul", y:5},{label:"2.Jul", y:10},{label:"5.Jul", y:15},{label:"15.Jul", y:20},{label:"27.Jul", y:25}];
    var dataPointsCat2 = [{label:"1.Jul", y:11},{label:"2.Jul", y:22},{label:"5.Jul", y:15},{label:"15.Jul", y:32},{label:"27.Jul", y:55}];
     var dataPointsCat3 = [{label:"1.Jul", y:21},{label:"4.Jul", y:11},{label:"5.Jul", y:47},{label:"14.Jul", y:32},{label:"21.Jul", y:33}];
    */
    const s1 = [{
        "d":1435708800000,
        "cat":"cat 1",
        "value":1
    },{
        "d":1433203200000, //02-06-2015
        "cat":"cat 1",
        "value":80
    },{
        "d":1435708800000,
        "cat":"cat 2",
        "value":16.585326813220558
    },{
        "d":1436400000000,
        "cat":"cat 3",
        "value":5
    },{
        "d":1435708800000,
        "cat":"cat 2",
        "value":15
    },{
        "d":1436400000000,
        "cat":"cat 4",
        "value":10
    }];
    
    const s2 = [{
		"myDate": "2015-06-02",
		"categ": "CAT 1",
		"val": 40
	},{
		"myDate": "2015-06-15",
		"categ": "CAT 1",
		"val": 90
	},{
		"myDate": "2015-06-19",
		"categ": "CAT 3",
		"val": 11
	},{
		"myDate": "2015-06-19",
		"categ": "CAT 4",
		"val": 77
	}];
    
    const s3 = [{
        "raw": "9OHbc9 O1 WHTxiBPa auwZIVD6 j8jMWWVH UdB6hy 2015-07-02 XF 5xhcx15DD sbYFRPn dyoH1OOIF 6meHw pANknwa2h T imhs24gR5 #CAT 1#",
        "val": 40
    },{
        "raw": "YCcoeoNR8 T4VSBd0GC fpAepuTD 5A40zJ6 y5bXBb rRxM 2015-06-08 J KA9FicdV BSbvirf #CAT 2#",
        "val": 70
    },{
        "raw": "thJP4b 2015-06-26 bDes w7iyahba RZ8ycJ55Q #CAT 2#",
        "val": 60
    },{
        "raw": "thJP4b 2015-07-09 bDes w7iyahba RZ8ycJ55Q #CAT 4#",
        "val": 60
    }];
 
    const regExDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    const regExCateg = /\#(.*?)\#/;
    //TODO doc
    function getDate(texto){
        return texto.match(regExDate)[0];
    }
    
    //TODO
    //Dada una cadena de caracteres buscamos "CAT X" y la expresion regular regExCateg, 
    function getCategoria(texto){
        return texto.match(regExCateg)[1];
    }
 
       //TODO doc
    function sortJsonArray(jsonArray){
        return jsonArray.sort(function(a, b){
            console.log(a.label + " vs " + b.label); 
            return a.label - b.label;
        });
    }
      
    function readSourcesMap(){
         console.log(sourcesMap);
    }
    
    function sortMapPerCat(){
        console.log("vamos ordenar map");
        
        sourcesMap.forEach(function(value, key, map){
//           console.log(key + ":" + value);
       
            sortJsonArray(value);
            //return true;
       });
        

    }
     function parseDate(date){
      
        var milliIntoDate = new Date(date); 
        var day = milliIntoDate.getDate();
        var month = months[milliIntoDate.getMonth()];
        return day+"."+month;
        
    }
    function updateSourcesMap(date, cat, value){
       // console.log("ACTUALIZANDO MAP SOURCE");  
         
         //console.log("convert milli "+date+" into date:" + parseDate(date));  
        //convert millisencods into date
       // var newDate = parseDate(date);
        var newDate = date;
        
        if(!sourcesMap.has(cat)){
            //console.log("Nueva key categoria, añadimos: " + cat );
            sourcesMap.set(cat, [{label:newDate, y:value}]);
        }//si la key ya existe, comprobamos si la fecha es nueva
        else{
           // console.log("key '"+ cat+"' ya existe, actualizamos date + value ");
            //recuperamos array de [{d,v}]
            var oldCategoryArray = sourcesMap.get(cat);
            var existeParDateValue = false;
            
            for(var i= 0; i < oldCategoryArray.length && !existeParDateValue; i++){
                var oldDate = oldCategoryArray[i].label;
                var oldValue = oldCategoryArray[i].y;
                //si la fecha existe en el array sumamos su value con el nuevo
                if(oldDate == date){
                    // console.log("Las fechas coinciden, actualizamos value");
                    //actualizamos value
                    oldCategoryArray[i].y += value;
                    existeParDateValue = true;
                    break;
                }
            }
            if(!existeParDateValue){
                 //si la fecha no existe añadimos nuevo par {d,v}
                //console.log("Las fechas no coinciden, añadimos par {date,value}");

                var newArray = oldCategoryArray;
                var newData = {};

                newData["label"] = newDate;
                newData["y"] = value;

                oldCategoryArray.push(newData);
            }
            
        }
        
    }
    
    function prepareDataSource1(data){
    
        console.log("calling prepareDataSource1");  
        console.log("Source 1 data length: "+data.length);  
                
        var filteredList =[];
        
        for(var i = 0; i<data.length; i++){
            
            //Fecha en milisegundos
            var dateMilli = data[i].d;
            //Categroria
            var cat = data[i].cat.toUpperCase();         
            //Value
            var value = data[i].value;
            
           
            var datos = {};
             
            datos["date"] = dateMilli;
            datos["cat"] = cat;
            datos["value"] = value;
                        
            //Creacion de nueva key "fecha + categoria"
            //var newKey = dateMilli + cat;
            
            updateSourcesMap(dateMilli, cat, value);
            
            //ATENCION. añadimos elem en map pero no esta ordenado
            //updateMap(newKey, value);
            
            filteredList.push(datos);
            
         }
        //readSourcesMap();       
        //console.log( filteredList.length ); //mismo tamaño
        //return sortJsonArray(filteredList);
        return filteredList;
     }
    
        
    function prepareDataSource2(data){
       
        console.log("calling prepareDataSource2");  
        console.log("Source 2 data length: "+data.length);  
                
        var filteredList =[];
        for(var i = 0; i<data.length; i++){
            var datos = {};
            //Fecha
            var fecha = data[i].myDate; 
            //Convertimos el string fecha en objeto Date para obtener la equivalencia en milisegundos
            var date = new Date(fecha);
            var dateMilli = ( new Date(fecha)).getTime();
            //console.log(date.getTime());//TODO eliminar
            //Categoria ya capitalizada
            var cat = data[i].categ;
            //Value
            var value = data[i].val;       
           
            var datos = {};
             
            datos["date"] = dateMilli;
            datos["cat"] = cat;
            datos["value"] = value;         
            filteredList.push(datos);
            
             //Creacion de nueva key "fecha + categoria"
            var newKey = dateMilli + cat;
      
            //ATENCION. añadimos elem en map pero no esta ordenado??
            //updateMap(newKey, value);
            updateSourcesMap(dateMilli, cat, value);
         }
         
        //readSourcesMap();  
         //return sortJsonArray(filteredList);
        return filteredList;
     }
    
    function prepareDataSource3(data){
       
        console.log("calling prepareDataSource3");          
        console.log("Source 3 data length: "+data.length);   
                
        var filteredList =[];
        for(var i = 0; i<data.length; i++){
            var datos = {};
            //Fecha
            var raw = data[i].raw;
            //var reg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
                        
            var fecha = getDate(raw);
            //Convertimos el string fecha en objeto Date para obtener la equivalencia en milisegundos
            var date = new Date(fecha);
            var dateMilli = ( new Date(fecha)).getTime();
            //console.log(datemili);  
             
            //A partir del dato raw obtenemos la categoria
            var cat = getCategoria(raw);
        
            //Value
            var value = data[i].val;       
            
            var datos = {};
             
            datos["date"] = dateMilli;
            datos["cat"] = cat;
            datos["value"] = value;      
            filteredList.push(datos);
            
            //Creacion de nueva key "fecha + categoria"
            var newKey = dateMilli + cat;
      
            updateSourcesMap(dateMilli, cat, value);
            //ATENCION. añadimos elem en map pero no esta ordenado
            //updateMap(newKey, value);
        }
       
        readSourcesMap();  
         //return sortJsonArray(filteredList);
        return filteredList;
     }
    
     function loadSource1(callback){
       
        $.ajax({
            url: 'http://s3.amazonaws.com/logtrust-static/test/test/data1.json',  
            cache: true,
            dataType: 'json',
            success: function (data) {
                 $("#source1_container").html(JSON.stringify(data)); 
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
              
                console.log( "error loading source 2");  
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
     
    
    loadSource1(function(output) {
        var sourceList1 = prepareDataSource1(s1); 
        $("#source1_container").html(JSON.stringify(sourceList1)); 
         
    });
    
    loadSource2(function(output) {
        var sourceList2 = prepareDataSource2(s2); 
         $("#source2_container").html(JSON.stringify(sourceList2));  
    });
    
    loadSource3(function(output) {
        var sourceList3 = prepareDataSource3(s3); 
        $("#source3_container").html(JSON.stringify(sourceList3));
        
        sortMapPerCat();
         // pass it to the other module
        lineChartHandler.func2(sourcesMap);
    });
});