<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class CalificacionDiseController extends BaseController
{
     //DEfinciion
     public function getCalificacionDise(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getCalificacionDise';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
     //agregar CalificacionDise
     public function addCalificacionDise(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/controles'));
            }else{
          
                $post_endpoint = '/api/addCalificacionDise';
        
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
    public function updateCalificacionDise() {
       
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/controles'));
          }else{
        
              $post_endpoint = '/api/updateCalificacionDise';
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
    public function deleteCalificacionDise(){
        if($this->session->logged_in){
    
            $post_endpoint = '/api/deleteCalificacionDise';
         
            $request_data = [ $this->request->getPost(),  'user' =>$this->session->id];

            $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
            echo json_encode($response);
            
        
        }
    }
}