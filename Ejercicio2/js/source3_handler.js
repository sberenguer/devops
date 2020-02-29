$(function(){ 

    function loadSource3(){ 
        $.ajax({
            url:'http://s3.amazonaws.com/logtrust-static/test/test/data3.json',  
            type: 'GET',
            cache: true,
            dataType: 'json',
            success: function (data) {
                $("#source3_container").html(JSON.stringify(data)); 
                
            },
           error: function (jqXHR, status, errorThrown) { 
                $("#source3_container").html(errorThrown != null ? errorThrown : "error loading source 3 ");
              
                console.log( "error loading source 3");  
            }
        }); 
    } 


    loadSource3();
}); 