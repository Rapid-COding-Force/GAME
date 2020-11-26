/*********************************************************************************
 * We initiate several variable to be used within the functions */


// The following variables are equal to the respective elements in game.php
var dino = document.getElementById("dino"); 
var dragon = document.getElementById("dragon"); 
var bird = document.getElementById("bird");

// Create a variable that contains the music of the game and play it
music = new Audio("music.mp3")
music.play()
// Create a variable that contains the game-over sound effect
gameOverMusic = new Audio("gameover.mp3")

// Create a boolean variable that tells if a player is dead or not
dead = false;

// Create a string and int variables for the player name and scores
currentplayer = '';
scoreIncrease = 0; // Score that constantly updates while playing
highScore = 0; // Only updates every time scoreIncrease is higher

/*********************************************************************************/

/*********************************************************************************
 * Initiate functions */


// Get new player by calling the get_player() function
get_player();

// Begin moving the obstacles by calling the moveObjects() function
moveObjects();

// Check if the dino (player) gets hit using the hit() function
hit();

/*********************************************************************************/

/************************************************************************************
 *  Define the functions */

function get_player() { 
    /** This function updates the currentplayer variable with the input in the second
     *  parameter of the prompt() function */ 
    currentplayer = prompt( "Please enter your name", "" );
}

function moveObjects() { // This function randomly moves the bird and dragon objects towards the dino
    setInterval(function(){ // A setInterval is used that runs every 500ms to animate the objects
        var number = Math.random(); // Create a variable that is randomly given a number

        /* When the player loses/dies, and the dead variable is set to true,
         * this if statement will pass and return, stopping the animations from continuing 
         */
        if (dead == true) {
            return;
        }
        /* Otherwise, if the player is still alive, and the number variable is less than/equal to 0.5,
         * then we animate the bottom object */
        else if (number <= 0.5){
            // When the bottom object already has an animation, we return
            if (dragon.classList == "animateDragon"){
                return
            }
            // Else we add the animation to the object and remove it after 1 second
            dragon.classList.add("animateDragon");
            setTimeout(function(){
                dragon.classList.remove("animateDragon")
            }, 1000)
        }
        else { // Else, when number is greater than 0.5, we animate the top object
            // When the top object already has an animation, we return
            if (bird.classList == "animateBird"){
                return
            }
            // Else we add the animation to the object and remove it after 1 second
            bird.classList.add("animateBird");
            setTimeout(function(){
                bird.classList.remove("animateBird")
            }, 1000)
        }
    }, 500)
}

// This function detects which keys are being pressed and accordingly animates the dino
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    // When the following keys are pressed, call the dinoJump() function
    if (e.keyCode == 32) { // Spacebar
        dinoJump();
    }
    if (e.keyCode == 38) { // Arrow up
        dinoJump();
    }
    if (e.keyCode == 87) { // W
        dinoJump();
    }
    // When the following keys are pressed, call the dinoDuck() function
    if (e.keyCode == 83) { // S
        dinoDuck();
    }
    if (e.keyCode == 40) { // Arrow down
        dinoDuck();
    }
}

function dinoJump() { // This function makes the dino jump
    // If the player is dead, return so that the dino cant be animated
    if (dead == true) {
        return;
    }
    /* Else, if the dino is already being animated, return so that the animation is completed
     * and dont overlap */
    else if (dino.classList == "animateDino" || dino.classList == "animateDinoDuck"){
        return
    }
    // Else, animate the dino to jump and then remove it's animation after 500ms
    dino.classList.add("animateDino");
    setTimeout(function(){
        dino.classList.remove("animateDino");
    }, 500);
}

function dinoDuck() { // This function makes the dino duck
    // It uses the same principles as the dinoJump() function
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

function hit(){ // This function checks if the player is hit by either one of the obstacles
    setInterval(function(){ // A setInterval is used to run every 10ms to check if the dino is hit

        // Create 3 int variables that contain the locations of the 2 objects and dino  
        var dragonLeft = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"));
        var birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));
        var dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

        // Check if either one of the objects is in contact with the dino 
        if ((dragonLeft<150 && dragonLeft>0 && dinoTop>= 345) || (birdLeft<150 && birdLeft>0 && dinoTop<= 385)){
            
            /* If its true, set dead to true, play the game-over music and display the
             * game-over text by accessing the element "gameOver" in game.php*/
            dead = true;
            gameOverMusic.play();
            gameOver.innerHTML = "Game Over! Click on the Restart Button"

            // If scoreIncrease is greater than the current highscore
            if (parseInt(scoreIncrease)>highScore){
                /* Set that int value as the new highscore and call the 
                 * update_leaderboard() function to update the leaderboards */
                highScore = parseInt(scoreIncrease)
                update_leaderboard(currentplayer , highScore);
            }

            // Then delete scoreIncrease, set moveObjects to undefined and then return
            delete scoreIncrease; moveObjects = undefined;
            return;
        }
        else { // Else, if dino isnt hit, increase score by 1 and call the increaseScore() function
            scoreIncrease += 1/100;
            Math.floor(scoreIncrease)
            increaseScore(scoreIncrease)
        }
    }, 10)
}

// This function increases the "score" element in game.php 
function increaseScore(scoreIncrease){
    document.getElementById("score").innerHTML = "Score : " + parseInt(scoreIncrease);
}

// This function updates the leaderboard
function update_leaderboard( player,score ) { 
    jQuery.ajax({
        url:"functions.php", //the page containing php script
        type: "post",        //request type,
        dataType: 'json',
        data: { player: player, score: score, action:'add_score' },
        success:function(result){
            console.log(result.result);
        }
    });
}

/*********************************************************************************/

/*********************************************************************************
 * Function to restart the game */

function restart() { // This function restarts the game

    // All the necessary variables/functions are reset or called to run the game again
    dead = false;
    scoreIncrease = 0;
    highScore;
    gameOver.innerHTML = "";
    moveObjects();
    hit();
}

/**********************************************************************************/