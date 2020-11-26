var dino = document.getElementById("dino");
var dragon = document.getElementById("dragon");
var bird = document.getElementById("bird");
music = new Audio("music.mp3")
gameOverMusic = new Audio("gameover.mp3")
dead = false;
music.play()
currentplayer = '';

// Get new player.
get_player();


function restart() {
    dead = false;
    scoreIncrease = 0;
    highScore;
    gameOver.innerHTML = "";
    moveObjects();
    hit();
}

moveObjects();
function moveObjects() {
setInterval(function(){ // This function randomly goes between the bird and dragon
    var number = Math.random();
    if (dead == true) {
        return;
    }
    else if (number <= 0.5){
        if (dragon.classList == "animateDragon"){
            return
        }
        dragon.classList.add("animateDragon");
        setTimeout(function(){
            dragon.classList.remove("animateDragon")
        }, 1000)
    }
    else {
        if (bird.classList == "animateBird"){
            return
        }
        bird.classList.add("animateBird");
        setTimeout(function(){
            bird.classList.remove("animateBird")
        }, 1000)
    }
}, 500)
}

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 32) {
        dinoJump();
    }
    if (e.keyCode == 38) {
        dinoJump();
    }
    if (e.keyCode == 87) {
        dinoJump();
    }
    if (e.keyCode == 83) {
        dinoDuck();
    }
    if (e.keyCode == 40) {
        dinoDuck();
    }
}

function dinoJump() { // Makes dino jump 
    if (dead == true) {
        return;
    }
    else if (dino.classList == "animateDino" || dino.classList == "animateDinoDuck"){
        return
    }
    dino.classList.add("animateDino");
    setTimeout(function(){
        dino.classList.remove("animateDino");
    }, 500);
}

function dinoDuck() { // Makes dino duck
    if (dead == true) {
        return;
    }
    if (dino.classList == "animateDino" || dino.classList == "animateDinoDuck"){
        return
    }
    dino.classList.add("animateDinoDuck");
    setTimeout(function(){
        dino.classList.remove("animateDinoDuck");
    }, 500);
}

scoreIncrease = 0;
highScore = 0;
var hit = hit()
function hit(){
setInterval(function(){ // Ends game and also increases score
    var dragonLeft = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"));
    var birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));
    var dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    if ((dragonLeft<150 && dragonLeft>0 && dinoTop>= 345) || (birdLeft<150 && birdLeft>0 && dinoTop<= 385)){
        dead = true;
        gameOverMusic.play();
        gameOver.innerHTML = "Game Over! Click on the Restart Button"
        if (parseInt(scoreIncrease)>highScore){
            highScore = parseInt(scoreIncrease)
            update_leaderboard(currentplayer , highScore);
        }
        delete scoreIncrease; moveObjects = undefined;
        return;
    }
    else {
        scoreIncrease += 1/100;
        Math.floor(scoreIncrease)
        increaseScore(scoreIncrease)
    }
}, 10)
}

function increaseScore(scoreIncrease){
    document.getElementById("score").innerHTML = "Score : " + parseInt(scoreIncrease);
}

function get_player() {
    currentplayer = prompt( "Please enter your name", "" );
}

function update_leaderboard( player,score ) { 
    jQuery.ajax({
        url:"functions.php",    //the page containing php script
        type: "post",    //request type,
        dataType: 'json',
        data: { player: player, score: score, action:'add_score' },
        success:function(result){
            console.log(result.result);
        }
    });
}

