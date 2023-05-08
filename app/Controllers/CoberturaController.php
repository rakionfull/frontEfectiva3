<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class CoberturaController extends BaseController
{
     //Cobertura
     public function getCobertura(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getCobertura';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
     //agregar cobertura
     public function addCobertura(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/controles'));
            }else{
          
                $post_endpoint = '/api/addCobertura';
        
                $request_data =
                $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id,
                    "terminal" =>  navegacion($this->request->getUserAgent()),
                    "ip" =>  $this->request->getIPAddress()
                ];
               
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
              
                
                  if($response){
                      echo json_encode($response);
                  
                  }else{
                    echo json_encode(false);
                  }
             
              
            }
          }
         
    }
    public function updateCobertura() {
       
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/activos'));
          }else{
        
              $post_endpoint = '/api/updateCobertura';
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
              ];
             
              $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
              // var_dump($response);
              
                if($response){
                    echo json_encode($response);
                
                }else{
                  echo json_encode(false);
                }

          }
        }
       
         
    }
    public function deleteCobertura(){
        if($this->session->logged_in){
    
            $post_endpoint = '/api/deleteCobertura';
         
            $request_data = [ $this->request->getPost(), 
             'user' =>$this->session->id,
             "terminal" =>  navegacion($this->request->getUserAgent()),
             "ip" =>  $this->request->getIPAddress()
            ];

            $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
            echo json_encode($response);
            
        
        }
    }
}