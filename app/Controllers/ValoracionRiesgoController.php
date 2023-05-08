<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class ValoracionRiesgoController extends BaseController
{
     //ValoracionRiesgo
     public function getValoracionRiesgo(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getValoracionRiesgo';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
     //agregar ValoracionRiesgo
     public function addValoracionRiesgo(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/controles'));
            }else{
          
                $post_endpoint = '/api/addValoracionRiesgo';
        
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
    public function updateValoracionRiesgo() {
       
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/activos'));
          }else{
        
              $post_endpoint = '/api/updateValoracionRiesgo';
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
    public function deleteValoracionRiesgo(){
        if($this->session->logged_in){
    
            $post_endpoint = '/api/deleteValoracionRiesgo';
         
            $request_data = [ $this->request->getPost(),  
            'user' =>$this->session->id,
            "terminal" =>  navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress()
          ];

            $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
            echo json_encode($response);
            
        
        }
    }

    public function getImpactoRiesgoByActivo(){
      if($this->session->logged_in){
        $get_endpoint = '/api/getImpactoRiesgoByActivo';

        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        if($response){
        
          echo json_encode($response);
        }
      }
  }

  public function getProbabilidadRiesgoByActivo(){
    if($this->session->logged_in){
      $get_endpoint = '/api/getProbabilidadRiesgoByActivo';

      $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
      if($response){
      
        echo json_encode($response);
      }
    }
} 
public function getDataMatriz(){
  if($this->session->logged_in){
    $get_endpoint = '/api/getDataMatriz';

    $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
    if($response){
    
      echo json_encode($response);
    }
  }
}
public function getValoracionByProbabilidadImpacto(){
  if($this->session->logged_in){
  
    $post_endpoint = '/api/getValoracionByProbabilidadImpacto';
 
    $request_data = $this->request->getPost();

    $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
    echo json_encode($response);

  }
}
}