$(function(){

    function loadSource1(){
        $.ajax({
            url: 'http://s3.amazonaws.com/logtrust-static/test/test/data1.json',  
            cache: true,
            dataType: 'json',
            success: function (data) {               
                $("#source1_container").html(JSON.stringify(data)); 
                prepareDataSource1(data);
                
                
            },
            error: function (jqXHR, status, errorThrown) {                
                $("#source1_container").html(errorThrown != null ? errorThrown : "error loading source 1 ");
                
                console.log( "error loading source 1");  
            }
        });
    } 

     function prepareDataSource1(data){
         console.log("calling prepareDataSource1");  
         console.log(data.length);  
                
         var filteredList =[];
         for(var i = 0; i<data.length; i++){
             var datos = {};
             //Fecha
             var fecha = data[i].d;
             //Categoria
             var cat = data[i].cat;
             //Value
             var value = data[i].value;
            
             var newKey = fecha + cat;
             datos[newKey]=value;
             filteredList.push(datos)
         }
               
         console.log( filteredList.length ); 
     }

   
});