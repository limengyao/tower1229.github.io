<?php
header("Content-type:application/json");

if( strlen($_REQUEST['param']) == 4 ){
	$return = '{"status":"y"}';
}else{
	$return = '{"status":"n","info":"验证码不正确！"}';
}
echo $return;


?>