$(function(){ 

    function loadSource1(){ 
        $.ajax({
            url:'http://s3.amazonaws.com/logtrust-static/test/test/data1.json',  
            type: 'GET',
            cache: true,
            dataType: 'json',
            success: function (data) {
               
                $("#source1_container").html(JSON.stringify(data)); 
                
            },
            error: function (jqXHR, status, errorThrown) { 
                
                $("#source1_container").html(errorThrown != null ? errorThrown : "error loading source 1 ");
              
                console.log( "error loading source 1");  
            }
        }); 
    } 


    loadSource1();
}); 