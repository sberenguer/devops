$(function(){ 

    function loadSource1(){ 
        $.ajax({
            url:'http://s3.amazonaws.com/logtrust-static/test/test/data1.json',  
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
         console.log( "calling prepareDataSource1");  
         console.log( data[0].value );  
         //Fecha
         data[0].id;
         //Categroria
         data[0].cat;
         //Value
         data[0].value;
         
     }

    loadSource1();
}); 