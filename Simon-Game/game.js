var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = -1;
var started = false;

// Event handler for buttons
$(".btn").on("click", function(event) {
  if(started) {
    var colourClicked = event.target.id;
    animatePress(colourClicked);
    playSound(colourClicked);
    userClickedPattern.push(colourClicked);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Event handler to start game
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});



function nextSequence() {
  // Incrementing level whenever next sequence is called.
  updateLevel(level);

  // Select a random number between 0 to 3, do not use Math.floor(Math.random()* 3) + 1. This gets you a random number between 1 and 3.
  var ranNum = Math.floor(Math.random() * 4);

  // Choose the colour based on the random number generated
  var ranChosenColour = buttonColours[ranNum];

  // Push new colour to existing list of colours
  gamePattern.push(ranChosenColour);

  // Playing Audio
  playSound(ranChosenColour);

  // Animate button
  $("#" + ranChosenColour).fadeOut().fadeIn();

  // Reset userClickedPattern once nextSequence is called again
  userClickedPattern = [];
}

// Function to play sound.
function playSound(name) {
  new Audio("./sounds/" + name + ".mp3").play();
}

// Function to animate the button when it is pressed
function animatePress(currentColour) {
  // https://stackoverflow.com/questions/2510115/jquery-can-i-call-delay-between-addclass-and-such
  // Option A
  // $("#" + currentColour).addClass("pressed").delay(100).queue(function() {
  //   $("#" + currentColour).removeClass("pressed").dequeue();
  // });

  // Option B
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function updateTitle(text) {
  $("#level-title").text(text);
}

// Function to update the level and h1 text
function updateLevel() {
  level++;
  updateTitle("Level " + level);
}

// Function to check answer
function checkAnswer(index) {
  if(gamePattern[index] == userClickedPattern[index]) {
    console.log("success");

    // Once the user click pattern length is the same, call nextSequence();
    if(gamePattern.length == userClickedPattern.length) {
      // Call nextSequence again if the user is correct.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    new Audio("./sounds/wrong.mp3").play();
    updateTitle("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {

      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = -1;
  gamePattern = [];
  started = false;
}
