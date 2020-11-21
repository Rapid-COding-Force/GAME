<?php


/**
 * Create Connection to database.
 */
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "js_game";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

/**
 * Create Table to database if not imported correctly.
 */
function create_table() {

    global $conn;
    $result = $conn->query( 'SELECT * FROM players' );
    if ( $result == false ) {

        // Create table.
        $query = 'CREATE TABLE players (
            player  VARCHAR(500) NOT NULL,
            score VARCHAR(100) NOT NULL,
        )';
        $conn->query( $query );
    }
}


/**
 * Get existing scores data.
 */
function get_scores() {
    
    global $conn;
    $current_scores = array();

    $get_score_query = "SELECT player, score FROM players ORDER BY score DESC";
    $result = $conn->query( $get_score_query );

    if ( $result->num_rows > 0 ) {

        // Output data of each row
        while( $single_player = $result->fetch_assoc() ) {
            array_push( $current_scores, $single_player );
        }
    }

    return $current_scores;
}

if( ! empty( $_POST['action'] ) && 'add_score' == $_POST['action'] ) {

    global $conn;
    $player = $_POST['player'];
    $score= $_POST['score'];
    $get_score_query = "INSERT INTO `players` (`player`, `score`) VALUES ( '" . $player ."', " . $score .")";
    $result = $conn->query( $get_score_query );

    if( true == $result ) {
        echo json_encode( array( "result"=>'successfuly registered' ) );
    }
    else {
        echo json_encode( array( "result"=>'process failed' ) );
    }    
}
?>