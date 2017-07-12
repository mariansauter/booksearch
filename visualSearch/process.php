<?php
$RTs = $_POST['RTs'];

$handle = fopen("results.txt","a");

fwrite($handle, $RTs . "\n");
fclose($handle);

$Comments = $_POST['Comments'];
$handle = fopen("comments.txt","a");
fwrite($handle, $Comments . "\n");
fclose($handle);

?>
