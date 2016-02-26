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

  console.log(jsonData);

  var title = jsonData[0].Title;
  var content = jsonData[0].Contents;
  var score = jsonData[0].Score;

	$('.header').text(title);
	$('.story').text(content);
  $('.score-var').text(score);
});

$('#button1').click(function() {
	// console.log(jsonData);
  var title = jsonData[1].Title;
  var content = jsonData[1].Contents;
    var score = jsonData[1].Score;


	$('.header').text(title);
	$('.story').text(content);
  $('.score-var').text(score);
});

$('#button2').click(function() {
	// console.log(jsonData);
  var title = jsonData[2].Title;
  var content = jsonData[2].Contents;
  var score = jsonData[2].Score;

	$('.header').text(title);
	$('.story').text(content);
  $('.score-var').text(score);
});

$('#button3').click(function() {
	// console.log(jsonData);
  var title = jsonData[3].Title;
  var content = jsonData[3].Contents;
  var score = jsonData[3].Score;

	$('.header').text(title);
	$('.story').text(content);
  $('.score-var').text(score);
});


//SCORE KEEPING
//Beginning score
var currentScore = 0;
var prevScore = 0;

// S: This is the chapter ID for the first chapter
// later on we'll update this variable as we move to different chapters
var currentChapterId = "J9fasWfZNS";

function getCurrentScoreForChapter(chapterId) {
  $.ajax({
    url: "https://api.parse.com/1/classes/Chapter/" + chapterId,
    method: "GET",
    headers: parseHeaders
  }).done(function(chapterData) {
    currentScore = chapterData.Score;
    console.log("after: " + currentScore);
    $("#show-score").text(currentScore);
  });

  // S: if we failed to pull data back assume that the update failed
  // and return the previous score
  // return prevScore;
}

function updateScoreForChapter(chapterId, newScore) {
  var newScoreObject = {
    "Score": newScore
};

  $.ajax({
    url: "https://api.parse.com/1/classes/Chapter/" + chapterId,
    method: "PUT",
    headers: parseHeaders,
    data: JSON.stringify(newScoreObject),
    success: function(data) {
      // S: once the update is complete, we want to reach out
      // to our back to confirm that the data was updated
      // correctly, then update the value on our frontend
      getCurrentScoreForChapter(chapterId);
    }
  });
}

$('#up-button').click(function() {
  prevScore = parseInt(currentScore);
  //adds 1 to current score
  currentScore = parseInt(currentScore) + 1;
  console.log("before: " + currentScore);
  // S: shows current score unless our backend tells us otherwise
  // this is known as latency compensation, look it up
  // S: html ids should be - separated, not camel case
  $("#show-score").text(currentScore);
  // S: update the current score for the first chapter 
  // this function will also update the score from the backend
  updateScoreForChapter(currentChapterId, currentScore);
});

$('#down-button').click(function() {
  //checks that current-score is greater than 0
  if (currentScore > 0) {
    prevScore = parseInt(currentScore);
    //subtracts 1 to current score
    currentScore = parseInt(currentScore) - 1;
    console.log("before: " + currentScore);
 
  } else {
    //if current score is 0, it stays at 0 and doesn't go negative
    return currentScore;
  }
  //shows current score
  $("#show-score").text(currentScore);
  //updates score to the back end
  updateScoreForChapter(currentChapterId, currentScore);
});
