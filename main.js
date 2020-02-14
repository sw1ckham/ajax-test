

var xhr = new XMLHttpRequest(); // Creating a new instance of the object XMLHttpRequest

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

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {  
       console.log(JSON.parse(this.responseText));       
    }
};


// We would like to isolate this.responseText in it's own variable
//

// LAST 3 VIDEOS EXPLAIN HOW TO DO THIS PROPERLY. 





