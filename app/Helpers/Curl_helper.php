<?php

function perform_http_request($method, $url, $data = false) {
  
    $client = \Config\Services::curlrequest();
    $session = \Config\Services::session();
    $token=null;
   if($session->token){
    $token=$session->token;
   }
    switch ($method) {
        case "POST":
            $datos = [
                'query'  => $data,
                'headers' => [
                    'User-Agent' => 'testing/1.0',
                    'Accept'     => 'application/json',
                    'Authorization'      => 'Bearer '.$token,
                ]
            ];
            // var_dump($datos);
            $response = $client->request($method,$url,$datos );
			
            break;
        case "PUT":
            $datos = [
                'query' => $data,
                'headers' => [
                    'User-Agent' => 'testing/1.0',
                    'Accept'     => 'application/json',
                    'Authorization'      => 'Bearer '.$token,
                ]
            ];
            // var_dump($datos);
            $response = $client->request($method,$url,$datos );
			
            break;
        case "GET":
            $datos = [
                'query' => $data,
                'headers' => [
                    'User-Agent' => 'testing/1.0',
                    'Accept'     => 'application/json',
                    'Authorization'      => 'Bearer '.$token,
                ]
            ];
            
            $response = $client->request($method,$url,$datos);
                
        break;
        case "DELETE":
            $datos = [
                'query' => $data,
                'headers' => [
                    'User-Agent' => 'testing/1.0',
                    'Accept'     => 'application/json',
                    'Authorization'      => 'Bearer '.$token,
                ]
            ];
            
            $response = $client->request($method,$url,$datos);
                
        break;
        // default:
        //     if ($data) {
        //         $url = sprintf("%s?%s", $url, http_build_query($data));
		// 	}
    }

   
        
    //  echo $response->getStatusCode();

    // echo $response->getBody();
    // echo $response->header('Content-Type');
    return json_decode($response->getBody());
}