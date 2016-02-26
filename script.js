//grab the data

var parseHeaders = {
    "X-Parse-Application-Id": "SeLYMXyUE2tACKJqP26AT7SwyOxoiXNMXmZlu7z4",
    "X-Parse-REST-API-Key": "9O3k5xscPzXuTZp6PLWLxZtJwSVgryfChcb72UbK",
    "Content-Type": "application/json",
};

var jsonData = {};
var nextChapterArray = [];
var currentChapterId = "";
var currentScore = 0;
var prevScore = 0;

//This code gets from Parse

$.ajax({
    url: "https://api.parse.com/1/classes/Chapter",
    method: "GET",
    headers: parseHeaders
}).done(function(data) {
    // $('.wrapper').text(JSON.stringify(data));
    jsonData = data.results;

    console.log(jsonData);

    var title = jsonData[0].Title;
    var content = jsonData[0].Contents;
    currentScore = jsonData[0].Score;

    $('.header').text(title);
    $('.story').text(content);
    $('.score-var').text(currentScore);

    currentChapterId = jsonData[0].objectId;
    nextChapterArray = jsonData[0].NextChapters;
    console.log(nextChapterArray);
    for (index in nextChapterArray) {
        $.ajax({
            url: "https://api.parse.com/1/classes/Chapter/" + nextChapterArray[index],
            method: "GET",
            headers: parseHeaders
        }).done(function(chapterData) {
          // alert(chapterData);
            $('#button-container').append('<button id="button-' + chapterData.objectId + '" class="btn">' + chapterData.Prompt + '</button>');
        });
    }
});

//Load data when page loads
//Get first result from json data
//store next chapters
//for chapter in next chapters
//get data for chapter objectid from parse
//make button w/ data



$('#button1').click(function() {
    // console.log(jsonData);
    var title = jsonData[1].Title;
    var content = jsonData[1].Contents;
    currentScore = jsonData[1].Score;


    $('.header').text(title);
    $('.story').text(content);
    $('.score-var').text(currentScore);

    currentChapterId = jsonData[1].objectId;

});

$('#button2').click(function() {
    // console.log(jsonData);
    var title = jsonData[2].Title;
    var content = jsonData[2].Contents;
    currentScore = jsonData[2].Score;

    $('.header').text(title);
    $('.story').text(content);
    $('.score-var').text(currentScore);

    currentChapterId = jsonData[2].objectId;
});

$('#button3').click(function() {
    // console.log(jsonData);
    var title = jsonData[3].Title;
    var content = jsonData[3].Contents;
    currentScore = jsonData[3].Score;

    $('.header').text(title);
    $('.story').text(content);
    $('.score-var').text(currentScore);

    currentChapterId = jsonData[3].objectId;
});

//buttons
// 2. Generate buttons - pull down array of next chapter given current chapter
// generate the button  hard code in an ID and hard code the data to simulate it.
// then call to parse with API and parse api. I a GET to get a sense for what’s there.

//SCORE KEEPING
//Beginning score




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
