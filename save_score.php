<?php
// Get the score sent from JavaScript
$score = $_POST["score"];

// Create a line to store (you could add names later)
$entry = $score . "\n";

// Save to file (append mode)
file_put_contents("scores.txt", $entry, FILE_APPEND);

// Optional: return a response
echo "Score saved!";
?>
