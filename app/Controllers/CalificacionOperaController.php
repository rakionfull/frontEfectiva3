<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class CalificacionOperaController extends BaseController
{
     //DEfinciion
     public function getCalificacionOpera(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getCalificacionOpera';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
     //agregar CalificacionOpera
     public function addCalificacionOpera(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/controles'));
            }else{
          
                $post_endpoint = '/api/addCalificacionOpera';
        
                $request_data =
                $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id
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
    public function updateCalificacionOpera() {
       
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/controles'));
          }else{
        
              $post_endpoint = '/api/updateCalificacionOpera';
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id
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
    public function deleteCalificacionOpera(){
        if($this->session->logged_in){
    
            $post_endpoint = '/api/deleteCalificacionOpera';
         
            $request_data = [ $this->request->getPost(),  'user' =>$this->session->id];

            $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
            echo json_encode($response);
            
        
        }
    }
}