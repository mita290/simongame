
var arr=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

$(".btn").click(function(){
    var userChoice=$(this).attr('id');    
    userClickedPattern.push(userChoice);

    animatePress(userChoice);
    playSound(userChoice);
    
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(()=>{
    if(!started){
        //$("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence(){

    userClickedPattern=[];
    
    $("h1").text("Level "+level);
    level++;
    var n = Math.floor(Math.random()*10);
    if(n>3){
        n=n%3;
    }
    
    var randomColor=arr[n];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    
}


function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed");
    },100);
}



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("failure");

        $("h1").html("Game Over, Press Any Key to Restart");
        started=false;
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        var aud=new Audio("./sounds/wrong.mp3");
        aud.play();
        level=0;
        gamePattern=[];
    }
}