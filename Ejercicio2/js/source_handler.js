/* 
    Method to call the three given API and return the data.
    In case of error, a message is printed in a <div> container
*/
var sourceHandler = (function (){
        
     return {
        loadSource: function (url) { 
           
             return $.ajax({
                url: url,  
                cache: true,
                dataType: 'json',
                error: function (jqXHR, status, errorThrown) {                
                    $("#source_container").html("Error loading source : " + url + " : " + errorThrown); 
                }
             });
        }
     };
     
 }) ();