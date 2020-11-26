<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dino Dash Game</title>
    <link rel="stylesheet" href="game.css">
</head>
<body> 
    <div id="gameContainer">
        <button onclick="restart()" id="button1" class="button button1">Restart</button>
        <button onClick="music.play()" id= "button2" class="button button2">Play Music</button>
        <button onClick="music.pause()" id= "button3" class="button button3">Pause Music</button>
        <button id="leaderboard" class="button button4" ><a href="leaderboard.php">Go to Leaderboard</a></button>
        <button id="menu" class="button button5"><a href="menu.php">Back to Main Menu</a></button>
        <div id="gameOver"></div>
        <div id="dino"></div>
        <div id="dragon"></div>
        <div id="bird"></div>
        <div id="score">Score : 0</div>
    </div>
</body>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="game.js"></script>
</html>
