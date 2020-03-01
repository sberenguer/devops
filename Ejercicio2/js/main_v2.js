$(function(){
    var result = [];
    var sourcesMap = new Map();
    
    var sourceList1;
    var sourceList2;
    var sourceList3;
    
    
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
            return a.date - b.date;
        });
    }
     
    //Test    
    function createMap(){
        var map = new Map([["1433116800000CAT 1",74.91340610529366],["1433116800000CAT 3",28.505397876893902]]);
        console.log(map);
        //map.has(x)
        //map.set(k, v);
        //alert(map.has("1433116800000CAT 2"));
    }
    
    //elem : array [k,v] con k=fecha+categoria, v=valor
    function updateMap(key, value){
        
        //Si la key no está en el map la añadimos
        if(!sourcesMap.has(key)){
            console.log("Nueva key, añadimos: " + key );
            sourcesMap.set(key, value);
        }//si la key ya existe, sumamos su value con el nuevo
        else{            
            console.log("Ya existe la key, actualizamos :" + key);
            var oldValue = sourcesMap.get(key);
            var newValue = oldValue + value;
            console.log("Oldvalue :" + oldValue + " -> new value: "+ value + "; suma: "+ newValue);
            //Actualizamos el valor
            sourcesMap.set(key, newValue);
        }
        console.log(sourcesMap);
    }
    
    function loadSource1(callback){
        var result;
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
                $("#source3_container").html(JSON.stringify(data)); 
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
                
        var filteredList =[];
        var actualDate = 0;
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
            var newKey = dateMilli + cat;
      
            //ATENCION. añadimos elem en map pero no esta ordenado
            updateMap(newKey, value);
            
            filteredList.push(datos);
            
         }
               
        //console.log( filteredList.length ); //mismo tamaño
        return sortJsonArray(filteredList);
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
            updateMap(newKey, value);
         }
         
        return sortJsonArray(filteredList);
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
      
            //ATENCION. añadimos elem en map pero no esta ordenado
            updateMap(newKey, value);
        }
       
        return sortJsonArray(filteredList);
     }
    
    loadSource1(function(output) {
        sourceList1 = prepareDataSource1(output); 
        $("#source1_container").html(JSON.stringify(sourceList1)); 
         
    });
    
    loadSource2(function(output) {
        sourceList2 = prepareDataSource2(output); 
         $("#source2_container").html(JSON.stringify(sourceList2));  
    });
    
    loadSource3(function(output) {
        sourceList3 = prepareDataSource3(output); 
        $("#source3_container").html(JSON.stringify(sourceList3)); 
    });

  
     
});