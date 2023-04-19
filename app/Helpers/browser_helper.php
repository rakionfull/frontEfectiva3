
<?php

if(!function_exists('navegacion')){
  function navegacion($terminal){
    $agent = $terminal;
    $currentAgent = "";
    if ($agent->isBrowser()) {
        $currentAgent = $agent->getBrowser() . ' ' . $agent->getVersion();
    } elseif ($agent->isRobot()) {
        $currentAgent = $agent->getRobot();
    } elseif ($agent->isMobile()) {
        $currentAgent = $agent->getMobile();
    } else {
        $currentAgent = 'Agente no identificado';
    }
        return $currentAgent;
   
  }
}
