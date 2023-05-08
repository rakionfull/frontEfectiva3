<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class RegistroControlesController extends BaseController
{
      public function list_registro_controles(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getRegistroControles';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
      public function getById($id){
        if($this->session->logged_in){
          $get_endpoint = '/api/getRegistroControl/'.$id;

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
     public function getRegistroControl($id){
        if($this->session->logged_in){
          $get_endpoint = '/api/getRegistroControl/'.$id;

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
    public function getData($id){
      if($this->session->logged_in){
        $get_endpoint = '/api/getData/'.$id;

        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        if($response){
        
          echo json_encode($response);
        }
      }
  }
    public function getRegistroDetalleControl($id){
      if($this->session->logged_in){
        $get_endpoint = '/api/getRegistroDetalleControl/'.$id;

        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        if($response){
        
          echo json_encode($response);
        }
      }
  }
    public function calificarControl($id){
      if($this->session->logged_in){
        $get_endpoint = '/api/calificarControl/'.$id;
        $request_data = $this->request->getPost();
        $response =perform_http_request('POST', REST_API_URL . $get_endpoint,$request_data[0]);
        
        if($response){
        
          echo json_encode($response);
        }
      }
  }
  public function ejecutarEvaluacion(){
    if($this->session->logged_in){
      $get_endpoint = '/api/ejecutarEvaluacion';
      $request_data = $this->request->getPost();
      $response =perform_http_request('POST', REST_API_URL . $get_endpoint,$request_data[0]);
      
      if($response){
      
        echo json_encode($response);
      }
    }
}
     //agregar Prueba
     public function addControles(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/registro'));
            }else{
          
                $post_endpoint = '/api/addControles';
        
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
    public function updateControles(){
      if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/registro'));
          }else{
        
              $post_endpoint = '/api/updateControles';
      
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
    public function updateRiesgosControlados($idriesgo){
      if($this->session->logged_in){
        if(!$this->request->getPost())
        {
          return redirect()->to(base_url('/inicio'));
        }else{
      
            $post_endpoint = '/api/updateRiesgosControlados/'.$idriesgo;
    
           
            $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,[]));
          
            echo json_encode($response);
              // if($response){
              //     echo json_encode($response);
              
              // }else{
              //   echo json_encode(false);
              // }
         
          
        }
    }
    }
}