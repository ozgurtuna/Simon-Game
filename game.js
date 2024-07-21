var buttonCollors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0

var gamestart = false;

$(document).keydown(function(event){
    if(!gamestart){
        $("#level-title").html("Level " + level);
        nextSequence();
        gamestart = true;
    }
})


$(document).ready(function(){ 
    $(".btn").click(function(){//every button has btn class so we are using that 
        var userChoosenColour = $(this).attr("id");//we are getting which color it is by using the id attribute
        userClickedPattern.push(userChoosenColour);//we are saving the clicked button
        animatePress(userChoosenColour);//remaining part is display and sound 
        playSound(userChoosenColour);
        
        if(userClickedPattern.length===gamePattern.length){checkAnswer(level - 1);}
    });
});


function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); //to pick a color randomly we need to have a number randomly
    var randomChoosenColor = buttonCollors[randomNumber];//assigning color and number
    gamePattern.push(randomChoosenColor);//save the color for pattern arrray
    animatePress(randomChoosenColor);//visual clicked
    playSound(randomChoosenColor);//sound clicked
    level += 1;//detect the level of the player 
    $("#level-title").html("Level " + level);//to change the html
}


function playSound(name){//a function for sound, optimizing the code to not repeat same function in every necessary part
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){//same like playSound but for press visualization
    $("#" + currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentlevel){//when user plays the game we need to check if they are going correct in each step this is the function for that
    if (arraysEqual(gamePattern,userClickedPattern)){//to check the last element accuracy
        console.log("continue");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            },500);
        }
    }
    else{
        console.log("failed");
        var failed_audio = new Audio("sounds/wrong.mp3");
        failed_audio.play();
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("You failed kiddo, to start again click a key!");
        restart_the_game();
    }
    userClickedPattern=[];
    
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function restart_the_game(){
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    gamestart = false;
}
