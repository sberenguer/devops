$(function(){ 

    function loadSource2(){ 
        $.ajax({
            url:'http://s3.amazonaws.com/logtrust-static/test/test/data2.json',  
            type: 'GET',
            cache: true,
            dataType: 'json',
            success: function (data) {
                $("#source2_container").html(JSON.stringify(data)); 
                      return data;          
            },
            error: function (jqXHR, status, errorThrown) { 
                $("#source2_container").html(errorThrown != null ? errorThrown : "error loading source 2 ");
              
                console.log( "error loading source 2");  
            }
        }); 
    } 
    //loadSource2();

   // var json2 = loadSource2();
    //console.log(json2);
}); 