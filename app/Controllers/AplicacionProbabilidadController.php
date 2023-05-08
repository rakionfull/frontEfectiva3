<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class AplicacionProbabilidadController extends BaseController
{
     //AplicacionProbabilidad
     public function getAplicacionProbabilidad(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getAplicacionProbabilidad';
          $request_data = [
            'escenario' =>$this->session->escenario
          ];
          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
       //agregar AplicacionProbabilidad
     public function addAplicacionProbabilidad(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/controles'));
            }else{
          
                $post_endpoint = '/api/addAplicacionProbabilidad';
        
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
    public function updateAplicacionProbabilidad() {
       
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/controles'));
          }else{
        
              $post_endpoint = '/api/updateAplicacionProbabilidad';
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
    public function deleteAplicacionProbabilidad(){
        if($this->session->logged_in){
    
            $post_endpoint = '/api/deleteAplicacionProbabilidad';
         
            $request_data = [ $this->request->getPost(), 
             'user' =>$this->session->id,
             "terminal" =>  navegacion($this->request->getUserAgent()),
             "ip" =>  $this->request->getIPAddress()
            ];

            $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
            echo json_encode($response);
            
        
        }
    }
    public function getAplicacionProbabilidadByCaracteristica(){
      if($this->session->logged_in){
        $get_endpoint = '/api/getAplicacionProbabilidadByCaracteristica';
        $request_data = $this->request->getPost();
        $response =perform_http_request('POST', REST_API_URL . $get_endpoint,$request_data);
        if($response){
          echo json_encode($response);
        }
      }
  }
    
}