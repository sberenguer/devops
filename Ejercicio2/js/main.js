$(function () {
    //Regular expression for getting valid dates in the format YYYY-MM-DD
    const REG_EX_DATE = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    
    //Regular expression for getting strings between two # characters 
    const REG_EX_CATEGORY = /\#(.*?)\#/;
    
    //API sources
    const SOURCE_URL_1 = "http://s3.amazonaws.com/logtrust-static/test/test/data1.json";
    const SOURCE_URL_2 = "http://s3.amazonaws.com/logtrust-static/test/test/data2.json";
    const SOURCE_URL_3 = "http://s3.amazonaws.com/logtrust-static/test/test/data3.json";
    
    const SOURCE_URLS = [SOURCE_URL_1, SOURCE_URL_2, SOURCE_URL_3];
    
    /*  
        Map of sources to store all the dates and values for every Category
        Key: Category
        Value: Array of objects in the form {x:date, y:value, d:milliseconds}
        < Cat, [{x, y, d},{x, y, d}...] >
    */
    var sourcesMap = new Map();
        
    /* Given a text, we get the string date who matches the format YYYY-MM-DD */
    function getDateByRegEx(text){
        return text.match(REG_EX_DATE)[0];
    }
    
    /*
        Given a text, we get the string category who matches the regular expression.
        Method match returns an array with matches. We return the position 1 from the array to 
        get the string without the #
        [0] = "#CAT X#"
        [1] = "CAT X"
    */
    function getCategoryByRegEx(text){
        return text.match(REG_EX_CATEGORY)[1];
    }
    
    /* Custom method for sorting an array of objects by the element "d" (date in milliseconds)    */
    function sortSourcesMapByDate(){        
        sourcesMap.forEach(function(value, key, map){
           value.sort(function(a, b){
               return a.d - b.d;
           });
       });
    }    
    
    /* 
        Method for updating the map of sources while reading the data .
        @params: 
            date:  date in milliseconds
            cat:   category as key
            value: the value for that category in that date    
    */    
    function updateSourcesMap(date, cat, value){
        //If the category is not in the map, we add it            
        if(!sourcesMap.has(cat)){     
            //Adding new "d" field for comparing and sorting purposes
            sourcesMap.set(cat, [{x:new Date(date), y:value, d:date}]);
        }
        //if the key exists, we check whether date is a new one for this key
        else{           
            //Getting the array of objects {x,y,d} by category 
            var oldCategoryArray = sourcesMap.get(cat);
            var hasDate = false;
            
            for(var i= 0; i < oldCategoryArray.length && !hasDate; i++){
                var oldDate = oldCategoryArray[i].d;                
                //if date already exists we update the corresponding value with the sum of the new one and we exit the loop
                if(oldDate == date){
                    oldCategoryArray[i].y += value;
                    hasDate = true;                   
                }
            }
            if(!hasDate){
                //If date was not found in the array we add a new element
                var newData = {};
 
                newData["x"] = new Date(date); 
                newData["y"] = value;
                newData["d"] = date;

                oldCategoryArray.push(newData);                
            }            
        }        
    }
       
    /*
        Method to read all the data sent by the API, differentiating them as each of them one returns 
        different type of elements so we have to access data in a specific way
        API 1: [{"d":1435708800000, "cat":"cat 1", "value":10}]
        API 2: [{"myDate": "2015-06-02", "categ": "CAT 1","val": 40}]
        API 3: [{"raw": "9OHbc9 O1 WHTxiBPa  2015-07-02 XF 5xhcx15DD T #CAT 1#","val": 40}]
        @params:
            data: 
            source: Number of API called,
    */
    function prepareDataSource(data, source){
        
        for(var i = 0; i < data.length; i++){
    
            var dateMilli, cat, value;         
            //Switch for the different data sources management
            switch(source){
                case 1:
                    //Date in milliseconds
                    dateMilli = data[i].d;
                    //Category
                    cat = data[i].cat.toUpperCase();         
                    //Value
                    value = data[i].value;
                   
                    break;
                case 2: 
                    var myDate = data[i].myDate; 
                    //We convert the string myDate into a Date object to get the milliseconds
                    var date = new Date(myDate);
                    dateMilli = (new Date(myDate)).getTime();
                    //Category (already upper cased in the data but we normalize)
                    cat = data[i].categ.toUpperCase();
                    //Value
                    value = data[i].val;       
                    
                    break;
                case 3:
                    var raw = data[i].raw;
                    //We apply a regular expression to get the date within de data
                    var rawDate = getDateByRegEx(raw);
                    //We convert the string rawDate into a Date object to get the milliseconds
                    var date = new Date(rawDate);
                    dateMilli = ( new Date(rawDate)).getTime();

                    //From raw object we get the category appling another regular expression
                    cat = getCategoryByRegEx(raw).toUpperCase();
                    //Value
                    value = data[i].val;
                    
                    break;
                default:
                    console.log("source incorrect"); 
                    
            }
            //We update the sources map with the date, category and value gathered from the API's
            updateSourcesMap(dateMilli, cat, value);
  
        } 
     }
  
    /* 
        Initialize the content on the website. Looking for the data of the three given 
        sources at first, sorting all the data, and loading the charts afterwards 
    */
    function initialize(){
    
        sourceHandler.loadSource(SOURCE_URLS[0])
            .done(function(output) {
               prepareDataSource(output, 1);                               
        });
        
        sourceHandler.loadSource(SOURCE_URLS[1])
            .done(function(output) {
                prepareDataSource(output, 2);                   
        });
          
        sourceHandler.loadSource(SOURCE_URLS[2])
            .done(function(output) {
                prepareDataSource(output, 3);
            
                //We sort the map by dates
                sortSourcesMapByDate();

                // Once we have sorted the map, we load the charts with the map of categorys
                lineChartHandler.loadLineChart(sourcesMap);
                pieChartHandler.loadPieChart(sourcesMap);    
        });             
             
    }
    
    initialize(); 
});