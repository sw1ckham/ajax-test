

var xhr = new XMLHttpRequest(); // Creating a new instance of the object XMLHttpRequest
var data;
xhr.open("GET", "https://swapi.co/api/");  // retrieving data from the server
// We have now openened a connection. 

xhr.send();  // sending the request
// If everything went well we're going to get a div ID of data, and put the response text in it. 

//  xhr.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {  // Whenever the state changes of our xhr object we watch to run a check.
//        document.getElementById("data").innerHTML = this.responseText;         // If the statement above is true and we have been delivered the content..

//     }
// };

// we want to replace the inner HTML with the response text from our request... the data we are looking for. 



// WHY DOES THIS WORK?
// XHR object maintains an internal state as it is completing different parts of the request operation. 
// DIFFERENT STATES.... 
// 0	UNSENT	Client has been created. open() not called yet.
// 1	OPENED	open() has been called.
// 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
// 3	LOADING	Downloading; responseText holds partial data.
// 4	DONE	The operation is complete.
// 
// HTTP status code, a status code of 200 means everythings ok (content delivered).... MORE EXAMPLES... 
// 200 OK
// 300 Multiple Choices
// 301 Moved Permanently
// 302 Found
// 304 Not Modified
// 307 Temporary Redirect
// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden
// 404 Not Found
// 410 Gone
// 500 Internal Server Error
// 501 Not Implemented
// 503 Service Unavailable
// 550 Permission denied

// JSON.parse ()
// The data given has come back to us in the form of a string, we need to 
// if you want to check that kind of data ....

// xhr.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {  
//        console.log(typeof(this.responseText));       
//     }
// };

// 'parse' this string into a JSON data structure....

// xhr.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {  
//        console.log(JSON.parse(this.responseText));       
//     }
// };


// We would like to isolate this.responseText in it's own variable
//

// LAST 3 VIDEOS EXPLAIN HOW TO DO THIS PROPERLY. 



// function setData(jsonData) {
//   data = jsonData; //  jsonData is the name of the var I will pass into the function. 
// If we put console log here, it works but still is in the function, we have just moved the problem away one step.. 
// JS has a way of getting round this problem... ***


xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // console.log(JSON.parse(this.responseText));  
        data = JSON.parse(this.responseText);
        // console.log(data);  // -- works fine if we put it here.. but..
        // all of the work we need to do with data will have to happen INSIDE this function. 
        // v. messy - all of the code for this application could have to happen inside this function. 
        // We need to put the data into a new function... see function above this one. 
        // setData(JSON.parse(this.responsiveText)); // this is send a JSON parsed object into our SetData function....

    }
};


// console.log(data); // due to below, if we run this, the data variable doesn't have anythign in it yet. 

// does not retrieve data as our function has been called 5 times before 
// before the data variable is set.. we put it in a new function, bu still has the same problem.. 

// *** TIMEOUTS AND CALL BACKS 

// So we can check how many times our function is being called, 
// after doing this, we can see that our console.log(data); is being called waay 
// before our data var is defined... so we need to set a setTimeout function...
// takes two parameters, first is a call back funcion... and the second is the time is waits
// before executeing the function. 

// setTimeout(function() {
//     console.log(data);
// }, 500);

// it is now being executed, because we are telling it to hold off and wait until var is definied. 
// now we can remove our setready function and go back to original code where we 
// define the variable inside the function. 


// CALL BACK FUNCTIONS

// Everything is an object, a function is an object, therefore can be parsed as a 
// parameter to another function and be executed in that function.#
// So we can use a Call back function that will be called when our data 
// variable contains response text. 
// WHY NOT TIMEOUTS? -- we ask our code to wait, waiting times can vary dependant on network times 
// so there is chance we could get it wrong. 

const baseURL = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest(); // Creating a new instance of the object XMLHttpRequest
    // var data; -- we can get rid of this as we are creating a new function called getData
    xhr.open("GET", baseURL + type + "/");  // retrieving data from the server
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText)); // -- using cb, going to run the function that we 
            // parse in as a call back. 
        }
    };

}

// getData(function(data){
//   console.log(data);
// }); 

// we need to invoke the getData method. also we need to parse data in as a parameter.
// so when this runs it will parse itself in as a function. 

// SO IN THIS CODE WE HAVE... 
// how to speak to our API using JavaScript
// how to get our response text back as a string and how to turn it into JSON format.
// looked at different readyStates and HTTP status codes
// seen how timeouts and call back functions to get our data displaying when we want it to. 
// Now we know how to get the data and parse it, we need to start doing soemthing useful with it. 

//.... So in the above code we have printed the API info the the console.. now we 
// need to rendor it to the document...

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(`<td>${key}</td>`) // not the `` - allows us to interpolate tables and strings. 
    });

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {   // our type argument would be film, vehicles, starships etc. 
    var tableRows = [];   
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function (data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function (item) {
              var dataRow = [];

              Object.keys(item).forEach(function(key) {
                  var rowData = item[key].toString();
                  var truncatedData = rowData.substring(0, 15)
                  dataRow.push(`<td>${truncatedData}</td>`);
              });
              tableRows.push(`<tr>${dataRow}</tr>`);

            });
            el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
        }); 
    };


   // now we can modify our getData function and parse in a type... above. 

   // When you click on the button you get an object.. But need to unpack that object.. 
   // console.dir = stands for directory and will allow us to browse through the object 
   // and see it's format. 
   // When you look at the format.. you can see there is an arraycalled results. contains a array of q0 items, 
   // arrays of results will always show just 10 items, you can click next to see the rest.
   // Adding results onto our innerHTML methods, allows us to see 10 objects, we need to unpack further.. 
   // so instead of using data.results, we're going to overwrite out existing data variable with data.results. 

   // now we get one object as opposed to 10, which means our for each loop is working 
   // now we want to display the name ... gives the last name in the 10 array except films as films doens't have a name.
   // the reason only one item is being displayed is because every time I call the 
   // document.getElementByID, innerHTML methos is overriding it. 
   // I need to add a +=... now all people are displayed.  
   // improve how it looks by adding paragraph tags 
   // now we notice that every time we click on the other buttons, the results are being 
   // appended on the bottom of the previous list... we want 10 items at a time and not being mixed together.
   // going to put our data ID into a el variable, then everytime the data ID is clicked, we are going to set the innerHTML
   // of our element to an empty string. .. So that will clear it every time the button is clicked.. 

   // SO THAT WORKS, 10 ITEMS, ONLY THE ONES WE WANT.. EXCEPT FILMS... 

   // We want to get the film button working and display our content in a table..
   // in order to do this JS allows us to iterate over all of the jeys. 
   // (data is stored in a key value pairs, such as name.. so lets check out what keys there are using object.keys...
//    data.forEach(function (item) {
//             Object.keys(item).forEach(function(key){
//                 console.log(key);
//             });
//             el.innerHTML += "<p>" + item.name + "</p>";
//         });
// from this we can see that film doesn't have a key called name. 

// Using this approach, we want to iterate over all of the keys, creating a table full of data, without
// actually explicitly specifying a property. 

// adding tableHeaders variable and function allows us not to have to specify. 
// now when we click on the film button.. we get a row that contains each of the keys from a film object. 

// TABULAR DATA --- tables!! 

// NEW ROW OF DATA FOR EVERY RECORD IN THE ARRAY 

// Now we can see our data... but it doesn't look very pretty. Functional 
// and tabular data, but need to improve the form. 

// We need to truncate the data using the substring method. 










