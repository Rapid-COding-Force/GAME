<?php

require_once( 'functions.php' );

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iDragon - JavaScript Game</title>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="gameContainer">
        <div class="gameOver">Welcome to iDragon Adventures</div>
        <div id="leaderboard"><a href="index.php">Goto Game</a></div>
        <div class="scoreboard">
            <table>
                <tr>
                    <th>Position</th>
                    <th>Player Name</th>
                    <th>Score</th>
                </tr>

                <?php
                $current_scores = get_scores();
                if( ! empty( $current_scores ) && is_array( $current_scores ) ) {

                    foreach ( $current_scores as $position => $value ) {
                       $html = '<tr>';
                       $html .= '<th>' . ++$position . '</th>';
                       $html .= '<th>' . $value[ "player" ] . '</th>';
                       $html .= '<th>' . $value[ "score" ] . '</th>';
                       $html .= '</tr>';
                       echo $html;
                    }
                }
                ?>
            </table>
        </div>
    </div>
</body>
</html>