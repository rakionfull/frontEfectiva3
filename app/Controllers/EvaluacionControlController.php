<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class EvaluacionControlController extends BaseController
{
     //EvaluacionControl
     public function getEvaluacionControl(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getEvaluacionControl';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
       //agregar EvaluacionControl
     public function addEvaluacionControl(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/controles'));
            }else{
          
                $post_endpoint = '/api/addEvaluacionControl';
        
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
    public function updateEvaluacionControl() {
       
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/controles'));
          }else{
        
              $post_endpoint = '/api/updateEvaluacionControl';
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
    public function deleteEvaluacionControl(){
        if($this->session->logged_in){
    
            $post_endpoint = '/api/deleteEvaluacionControl';
         
            $request_data = [ $this->request->getPost(),  'user' =>$this->session->id];

            $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
            echo json_encode($response);
            
        
        }
    }
    public function getDisenioCalificacion(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getDisenioCalificacion';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
    public function getCalificacionTotal(){
      if($this->session->logged_in){
        $get_endpoint = '/api/getCalificacionTotal';

        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        if($response){
        
          echo json_encode($response);
        }
      }
  }
    public function getOperatividadCalificacion(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getOperatividadCalificacion';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
    public function getCalificacionSubMenu(){
      if($this->session->logged_in){
        $get_endpoint = '/api/getCalificacionSubMenu';

        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        if($response){
        
          echo json_encode($response);
        }
      }
    }
  public function getCalificacionOpcion($id){
      if($this->session->logged_in){
        $get_endpoint = '/api/getCalificacionOpcion/'.$id;

        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        if($response){
        
          echo json_encode($response);
        }
      }
  }
  public function getDetalleEvaluacionControl($dato){
    if($this->session->logged_in){
      $get_endpoint = '/api/getDetalleEvaluacionControl/'.$dato;

      $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
      // if($response){
      
        echo json_encode($response);
      //}
    }
  }
  public function getCaracteristicaOpcion($escenario){
    if($this->session->logged_in){
      $get_endpoint = '/api/getCaracteristicaOpcion/'.$escenario;

      $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
      if($response){
        echo json_encode($response);
      }
    }
  }
}