<?php 

function updateScene($user_id){
    $post_endpoint = '/api/getEscenario';
    $response = perform_http_request('GET',REST_API_URL.$post_endpoint,[]);
    //var_dump($response);  
  
    if($response){
        // var_dump($response);
        $_SESSION['escenario'] = $response->datos;
     
    }
}