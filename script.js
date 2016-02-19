//grab the data

var parseHeaders = {
  "X-Parse-Application-Id": "SeLYMXyUE2tACKJqP26AT7SwyOxoiXNMXmZlu7z4",
  "X-Parse-REST-API-Key": "9O3k5xscPzXuTZp6PLWLxZtJwSVgryfChcb72UbK",
  "Content-Type": "application/json",
};


//This code gets from Parse
$.ajax({
  url: "https://api.parse.com/1/classes/Chapter",
  method: "GET",
  headers: parseHeaders
}).done( function(data){
  $('.wrapper').text(JSON.stringify(data));

});


