
<?php

if(!function_exists('generarId')){
  function generarId($dato){
   $dato = $dato + 1;
    $last_id = "";
    if($dato < 10) $last_id= $last_id."0000".$dato;
    if($dato >= 10 and $dato < 100) $last_id= $last_id."000".$dato;
    if($dato >= 100 and $dato < 1000) $last_id= $last_id."00".$dato;
    if($dato >= 1000 and $dato < 10000) $last_id= $last_id."0".$dato;
    if($dato >= 10000 and $dato < 100000) $last_id= $last_id.$dato;
    return $last_id;
   
  }
}
