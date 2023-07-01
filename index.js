const  buttonColors = ["red", "blue", "green", "yellow"];

var  gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if(!started) { 
    $("#level-title").text("Level "+ level);
    started = true;
    nextSequence();
  }
})

$(".btn").click(function(){
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern)

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

const checkAnswer = (currentLevel) => {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(()=> {
        nextSequence();
      },1000)
    }
  }
  else {
    playSound("wrong")
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(()=> {
      $("body").removeClass("game-over");
    }, 200);
    startOver()
  }
}

const nextSequence = ()=> {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level)
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

const playSound = (name) => {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

const animatePress = (currentColor) => {
  var id = "#" + currentColor;
  $(id).addClass('pressed');

  setTimeout(function() {
    $(id).removeClass('pressed');
  },100)
}


const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
}

