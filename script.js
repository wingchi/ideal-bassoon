//grab the data

var parseHeaders = {
  "X-Parse-Application-Id": "SeLYMXyUE2tACKJqP26AT7SwyOxoiXNMXmZlu7z4",
  "X-Parse-REST-API-Key": "9O3k5xscPzXuTZp6PLWLxZtJwSVgryfChcb72UbK",
  "Content-Type": "application/json",
};

var jsonData = {};

//This code gets from Parse
$.ajax({
  url: "https://api.parse.com/1/classes/Chapter",
  method: "GET",
  headers: parseHeaders
}).done( function(data){
  // $('.wrapper').text(JSON.stringify(data));
  jsonData = data.results;

  var title = jsonData[0].Title;
  var content = jsonData[0].Contents;

	$('.header').text(title);
	$('.story').text(content);
});

$('#button1').click(function() {
	// console.log(jsonData);
  var title = jsonData[1].Title;
  var content = jsonData[1].Contents;

	$('.header').text(title);
	$('.story').text(content);
});

$('#button2').click(function() {
	// console.log(jsonData);
  var title = jsonData[2].Title;
  var content = jsonData[2].Contents;

	$('.header').text(title);
	$('.story').text(content);
});

$('#button3').click(function() {
	// console.log(jsonData);
  var title = jsonData[3].Title;
  var content = jsonData[3].Contents;

	$('.header').text(title);
	$('.story').text(content);
});



