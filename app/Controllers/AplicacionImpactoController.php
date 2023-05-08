<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class AplicacionImpactoController extends BaseController
{
     //AplicacionImpacto
     public function getAplicacionImpacto(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getAplicacionImpacto';
          $request_data = [
            'escenario' =>$this->session->escenario
          ];
          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
       //agregar AplicacionImpacto
     public function addAplicacionImpacto(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/controles'));
            }else{
          
                $post_endpoint = '/api/addAplicacionImpacto';
        
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
    public function updateAplicacionImpacto() {
       
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/controles'));
          }else{
        
              $post_endpoint = '/api/updateAplicacionImpacto';
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
    public function deleteAplicacionImpacto(){
        if($this->session->logged_in){
    
            $post_endpoint = '/api/deleteAplicacionImpacto';
         
            $request_data = [ $this->request->getPost(),  
            'user' =>$this->session->id,
            "terminal" =>  navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress()
          ];

            $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
            echo json_encode($response);
            
        
        }
    }
    public function getAplicacionImpactoByCaracteristica(){
      if($this->session->logged_in){
        $get_endpoint = '/api/getAplicacionImpactoByCaracteristica';
        $request_data = $this->request->getPost();
        $response =perform_http_request('POST', REST_API_URL . $get_endpoint,$request_data);
        if($response){
          echo json_encode($response);
        }
      }
  }
}