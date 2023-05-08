<?php

namespace App\Controllers;
// use App\Libraries\Excel;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


class Activo extends BaseController {



//funciones para opcion activos
        public function getEmpresas(){
            if($this->session->logged_in && $this->session->permisos[14]->view_det==1){
            $get_endpoint = '/api/getEmpresas';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
                echo json_encode($response);
            }
            }
        }
        public function getEmpresasByActivo(){
            if($this->session->logged_in){
            $get_endpoint = '/api/getEmpresasByActivo';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
                echo json_encode($response);
            }
            }
        }
        public function addEmpresa() {
            // helper(['curl']);
            if($this->session->logged_in){
              if(!$this->request->getPost())
              {
                  return redirect()->to(base_url('/activos'));
              }else{
              
                  $post_endpoint = '/api/addEmpresa';
                  $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id,
                    "terminal" =>  navegacion($this->request->getUserAgent()),
                    "ip" =>  $this->request->getIPAddress()
                  ];
                  
                 

                  $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                  // var_dump($response);
                  echo json_encode($response);
                      // if($response){
                      //     echo json_encode($response);
                      
                      // }else{
                      // echo json_encode(false);
                      // }
                  
                  
              
                  
                  
              }
            }
        
            
        }
        public function updateEmpresa() {
            // helper(['curl']);
            if($this->session->logged_in && $this->session->permisos[14]->update_det==1){
            if(!$this->request->getPost())
            {
                return redirect()->to(base_url('/activos'));
            }else{
            
                $post_endpoint = '/api/updateEmpresa';
                $request_data = [];
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
                
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                // var_dump($response);
                    if($response ){
                        echo json_encode($response);
                    
                    }else{
                    echo json_encode(false);
                    }

            }
            }
        
            
        }
        //funciones para opcion activos
        public function getArea($dato){
            if($this->session->logged_in){
                $get_endpoint = '/api/getArea/'.$dato;
    
                $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
                if($response){
                
                echo json_encode($response);
                }
            }
        }
        public function getAreasByActivo(){
            if($this->session->logged_in){
              $get_endpoint = '/api/getAreasByActivo';
              $request_data = $this->request->getPost();
              $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
              if($response){
               
                echo json_encode($response);
              }
            }
        }



        public function addArea() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addArea';
                $request_data = [];
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
        public function updateArea() {
        
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateArea';
                $request_data = [];
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
        public function getAreasEmpresa($id){
          if($this->session->logged_in){
            $get_endpoint = '/api/getAreasEmpresa/'.$id;
  
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
             
              echo json_encode($response);
            }
          }
        }
        public function addAreaEmpresa() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addAreaEmpresa';
                $request_data = [];
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
               
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                // var_dump($response);
                
                  if($response->msg ){
                      echo json_encode($response->msg);
                  
                  }else{
                    echo json_encode(false);
                  }
               
                
            
               
              
            }
          }
         
           
        }
        public function deleteArea(){
          if($this->session->logged_in){
      
              $post_endpoint = '/api/deleteArea';
           
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];

              $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
              echo json_encode($response);
              
          
          }
        }
        public function updateAreaEmpresa() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateAreaEmpresa';
                $request_data = [];
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
               
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                // var_dump($response);
                
                  if($response->msg ){
                      echo json_encode($response->msg);
                  
                  }else{
                    echo json_encode(false);
                  }
  
            }
          }
         
           
        }
      public function deleteEmpresa(){
          if($this->session->logged_in){
      
              $post_endpoint = '/api/deleteEmpresa';
           
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];

              $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
              echo json_encode($response);
              
          
        }
      }
        
        //valor activo
          //--------------------------------------------------------      
        public function getValorActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getValorActivo';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function validarValorActivo(){
            if($this->session->logged_in){
             
                $post_endpoint = '/api/validarValorActivo';
               
                $request_data =  $this->request->getPost();
                 
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
      
                echo json_encode($response->msg);
    
            }
          }
        public function addValorActivo() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addValorActivo';
                $request_data = [];
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
        public function getValorActivoByActivo(){
            if($this->session->logged_in){
            $get_endpoint = '/api/getValorActivoByActivo';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
                echo json_encode($response);
            }
            }
        }
        public function updateValorActivo() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateValorActivo';
                $request_data = [];
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
        public function deleteValorActivo(){
            if($this->session->logged_in){
        
                $post_endpoint = '/api/deleteValorActivo';
             
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
  
                $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
                echo json_encode($response);
                
            
          }
        }
        
        //tipo de activo
        public function getTipoActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getTipoActivo';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function getTipoActivoByActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getTipoActivoByActivo';
  
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
             
              echo json_encode($response);
            }
          }
      }
        public function validarTipoActivo(){
          if($this->session->logged_in){
           
              $post_endpoint = '/api/validarTipoActivo';
             
              $request_data =  $this->request->getPost();
               
              $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
    
              echo json_encode($response->msg);
  
          }
        
        }
        public function addTipoActivo() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addTipoActivo';
                $request_data = [];
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
        public function updateTipoActivo() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateTipoActivo';
                $request_data = [];
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
        public function deleteTipoActivo(){
          if($this->session->logged_in){
      
              $post_endpoint = '/api/deleteTipoActivo';
           
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];

              $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
              echo json_encode($response);
              
          
          }
        }


        //clasificacion de informacion

        public function getClasInformacion(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getClasInformacion';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function validarClasInfo(){
          if($this->session->logged_in){
           
              $post_endpoint = '/api/validarClasInfo';
             
              $request_data =  $this->request->getPost();
               
              $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
    
              echo json_encode($response->msg);
  
          }
        
        }
        public function addClasInformacion() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addClasInformacion';
                $request_data = [];
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
        public function updateClasInformacion() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateClasInformacion';
                $request_data = [];
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
        public function deleteClasInfo(){
          if($this->session->logged_in){
      
              $post_endpoint = '/api/deleteClasInfo';
           
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];

              $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
              echo json_encode($response);
              
          
        }
    }
        //Aspecto de seguridad
        public function getAspectoSeg(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getAspectoSeg';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function getAspectoByActivo(){
            if($this->session->logged_in){
            $get_endpoint = '/api/getAspectoByActivo';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
                echo json_encode($response);
            }
            }
        }
        public function validarApectoSeg(){
            if($this->session->logged_in){
             
                $post_endpoint = '/api/validarApectoSeg';
               
                $request_data =  $this->request->getPost();
                 
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
      
                echo json_encode($response->msg);
    
            }
          
        }
        
          public function addAspectoSeg() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addAspectoSeg';
                $request_data = [];
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
              
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                // var_dump($response);
                
                  if($response->msg ){
                      echo json_encode($response->msg);
                  
                  }else{
                    echo json_encode(false);
                  }
              
                
            
              
              
            }
          }
        
          
        }
        public function updateAspectoSeg() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateAspectoSeg';
                $request_data = [];
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
        public function deleteAspectoSeg(){
            if($this->session->logged_in){
        
                $post_endpoint = '/api/deleteAspectoSeg';
             
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
  
                $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
                echo json_encode($response);
                
            
          }
        }
        //Unidades

        public function getUnidades($dato){
          if($this->session->logged_in){
            $get_endpoint = '/api/getUnidades/'.$dato;

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function getUnidadadesByEmpresaByArea(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getUnidadadesByEmpresaByArea';
            $request_data = $this->request->getPost();
            $response =perform_http_request('POST', REST_API_URL . $get_endpoint,$request_data);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function getUnidadByActivo(){
            if($this->session->logged_in){
              $get_endpoint = '/api/getUnidadByActivo';
              $request_data = $this->request->getPost();
              $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
              if($response){
               
                echo json_encode($response);
              }
            }
        }
        public function addUnidades() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addUnidades';
                $request_data = [];
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
              
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                // var_dump($response);
                
                  if($response ){
                      echo json_encode($response);
                  
                  }else{
                    echo json_encode(false);
                  }
              
                
            
              
              
            }
          }
        
          
        }
        public function updateUnidades() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateUnidades';
              
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
        public function deleteUnidad(){
          if($this->session->logged_in){
      
              $post_endpoint = '/api/deleteUnidad';
           
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];
              $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
              echo json_encode($response);
              
          
        }
      }


        public function getEmpresaAreaUnidades(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getEmpresaAreaUnidades';
  
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
             
              echo json_encode($response);
            }
          }
        }
        //Macroproceso
        public function getMacroproceso($dato){
          if($this->session->logged_in){
            $get_endpoint = '/api/getMacroproceso/'.$dato;

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function addMacroproceso() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addMacroproceso';
                $request_data = [];
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                // var_dump($response);
                
                  if($response ){
                      echo json_encode($response);
                  
                  }else{
                    echo json_encode(false);
                  }
              
                
            
              
              
            }
          }
        
          
        }
        public function getMacroprocesoByActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getMacroprocesoByActivo';
            $request_data = $this->request->getPost();
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
            if($response){
             
              echo json_encode($response);
            }
          }
        }
        public function listaProcesoByMacro(){
          if($this->session->logged_in){
            $get_endpoint = '/api/listaProcesoByMacro';
            $request_data = $this->request->getPost();
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
            if($response){
             
              echo json_encode($response);
            }
          }
        }
        public function listaCategoriaByActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/listaCategoriaByActivo';
            $request_data = $this->request->getPost();
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
            if($response){
             
              echo json_encode($response);
            }
          }
        }
        public function updateMacroproceso() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateMacroproceso';
                $request_data = [];
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
        public function deleteMacroproceso(){
          if($this->session->logged_in){
      
              $post_endpoint = '/api/deleteMacroproceso';
           
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];

              $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
              // var_dump($response);die();
              echo json_encode($response);
              
          
        }
      }

        //Proceso
        public function getProceso($dato){
          if($this->session->logged_in){
            $get_endpoint = '/api/getProceso/'.$dato;

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function addProceso() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addProceso';
                $request_data = [];
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
        public function getProcesoByActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getProcesoByActivo';
  
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
             
              echo json_encode($response);
            }
          }
        }
        public function updateProceso() {
          // helper(['curl']);
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateProceso';
                $request_data = [];
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                // var_dump($response);
                
                  if($response ){
                      echo json_encode($response);
                  
                  }else{
                    echo json_encode(false);
                  }

            }
          }
        
          
        }

        public function deleteProceso(){
          if($this->session->logged_in){
      
              $post_endpoint = '/api/deleteProceso';
           
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];

              $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
              echo json_encode($response);
              
          
        }
      }
       

        //posicion y puesto
        public function getPosicion($dato){
            if($this->session->logged_in){
              $get_endpoint = '/api/getPosicion/'.$dato;
  
              $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
              if($response){
              
                echo json_encode($response);
              }
            }
        }
        public function getPosicionByArea($area_id){
          if($this->session->logged_in){
            $get_endpoint = '/api/getPosicionByArea/'.$area_id;

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function getPosicionByUnidad(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getPosicionByUnidad';
            $request_data = $this->request->getPost();
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
            if($response){
            
              echo json_encode($response);
            }
          }
        }
        public function getPosicionByActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getPosicionByActivo';
            $request_data = $this->request->getPost();

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
            if($response){
             
              echo json_encode($response);
            }
          }
      }
        public function validarPosicion(){
              if($this->session->logged_in){
               
                  $post_endpoint = '/api/validarPosicion';
                 
                  $request_data =  $this->request->getPost();
                   
                  $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
        
                  echo json_encode($response->msg);
      
              }
        }
          public function addPosicion() {
            // helper(['curl']);
            if($this->session->logged_in){
              if(!$this->request->getPost())
              {
                return redirect()->to(base_url('/activos'));
              }else{
            
                  $post_endpoint = '/api/addPosicion';
                  $request_data = [];
                  $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id,
                    "terminal" =>  navegacion($this->request->getUserAgent()),
                    "ip" =>  $this->request->getIPAddress()
                ];
                
                  $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                  // var_dump($response);
                  
                    if($response->msg ){
                        echo json_encode($response);
                    
                    }else{
                      echo json_encode(false);
                    }
                
                  
              
                
                
              }
            }
          
            
          }
          public function updatePosicion() {
           
            if($this->session->logged_in){
              if(!$this->request->getPost())
              {
                return redirect()->to(base_url('/activos'));
              }else{
            
                  $post_endpoint = '/api/updatePosicion';
                 
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
          public function deletePosicion(){
              if($this->session->logged_in){
          
                  $post_endpoint = '/api/deletePosicion';
               
                  $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id,
                    "terminal" =>  navegacion($this->request->getUserAgent()),
                    "ip" =>  $this->request->getIPAddress()
                ];
    
                  $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
                  echo json_encode($response);
                  
              
            }
          }

         /// valoracion de activo
          public function getValActivo(){
            if($this->session->logged_in){
              $get_endpoint = '/api/getValActivo';
  
              $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
              if($response){
              
                echo json_encode($response);
              }
            }
        }
      public function getValoracionActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getValoracionActivo';
  
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
      }
      public function getDetalleEvaluacionActivo($dato){
        if($this->session->logged_in){
          $get_endpoint = '/api/getDetalleEvaluacionActivo/'.$dato;
    
          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
      }
      public function getAspectoSeguridad(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getAspectoSeguridad';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
        public function validarValActivo(){
            if($this->session->logged_in){
             
                $post_endpoint = '/api/validarValActivo';
               
                $request_data =  $this->request->getPost();
                 
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
      
                echo json_encode($response->msg);
    
            }
      }
        public function addValActivo() {
        
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addValActivo';
                $request_data = [];
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
              
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                // var_dump($response);
                
               
                      echo json_encode($response);
                  

              
            }
          }
        
          
        }
        public function updateValActivo() {
           
            if($this->session->logged_in){
              if(!$this->request->getPost())
              {
                return redirect()->to(base_url('/activos'));
              }else{
            
                  $post_endpoint = '/api/updateValActivo';
                 
                  $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id,
                    "terminal" =>  navegacion($this->request->getUserAgent()),
                    "ip" =>  $this->request->getIPAddress()
                ];
                
                  $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                  // var_dump($response);die();
                  
                    if($response){
                        echo json_encode($response);
                    
                    }else{
                      echo json_encode(false);
                    }
  
              }
            }
          
            
        }
        public function deleteValActivo(){
              if($this->session->logged_in){
          
                  $post_endpoint = '/api/deleteValActivo';
               
                  $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id,
                    "terminal" =>  navegacion($this->request->getUserAgent()),
                    "ip" =>  $this->request->getIPAddress()
                ];
    
                  $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
                  echo json_encode($response);
                  
              
            }
        }
        //categoria de activo
        
        public function getCatActivo(){
            if($this->session->logged_in){
              $get_endpoint = '/api/getCatActivo';
  
              $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
              if($response){
              
                echo json_encode($response);
              }
            }
        }
        public function validarCatActivo(){
            if($this->session->logged_in){
             
                $post_endpoint = '/api/validarCatActivo';
               
                $request_data =  $this->request->getPost();
                 
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
      
                echo json_encode($response->msg);
    
            }
      }
        public function addCatActivo() {
        
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/addCatActivo';
                $request_data = [];
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
        public function updateCatActivo() {
           
            if($this->session->logged_in){
              if(!$this->request->getPost())
              {
                return redirect()->to(base_url('/activos'));
              }else{
            
                  $post_endpoint = '/api/updateCatActivo';
                 
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
        public function deleteCatActivo(){
              if($this->session->logged_in){
          
                  $post_endpoint = '/api/deleteCatActivo';
               
                  $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id,
                    "terminal" =>  navegacion($this->request->getUserAgent()),
                    "ip" =>  $this->request->getIPAddress()
                ];
    
                  $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
                  echo json_encode($response);
                  
              
            }
        }
         //Ubicacion de activo
        
        
      public function getUbiActivo(){
          if($this->session->logged_in){
            $get_endpoint = '/api/getUbiActivo';

            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            if($response){
            
              echo json_encode($response);
            }
          }
      }
      public function validarUbiActivo(){
          if($this->session->logged_in){
           
              $post_endpoint = '/api/validarUbiActivo';
             
              $request_data =  $this->request->getPost();
               
              $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
    
              echo json_encode($response->msg);
  
          }
    }
      public function addUbiActivo() {
      
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/activos'));
          }else{
        
              $post_endpoint = '/api/addUbiActivo';
              $request_data = [];
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
      public function updateUbiActivo() {
         
          if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/activos'));
            }else{
          
                $post_endpoint = '/api/updateUbiActivo';
               
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
      public function deleteUbiActivo(){
            if($this->session->logged_in){
        
                $post_endpoint = '/api/deleteUbiActivo';
             
                $request_data = [
                  $this->request->getPost(),
                  'user' =>$this->session->id,
                  "terminal" =>  navegacion($this->request->getUserAgent()),
                  "ip" =>  $this->request->getIPAddress()
              ];
                $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
                echo json_encode($response);
                
            
          }
      }
      // get de continentes paises y ciudad
      public function getContinente(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getContinente';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
      }
     public function getPais(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getPais';
          $request_data = $this->request->getPost();
          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
    public function getCiudad(){
      if($this->session->logged_in){
        $get_endpoint = '/api/getCiudad';
        $request_data = $this->request->getPost();
        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
        if($response){
        
          echo json_encode($response);
        }
      }
  }
  //------------------------------------------------------------

public function getEstado(){
  if($this->session->logged_in){
    $get_endpoint = '/api/getEstado';

    $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
    if($response){
     
      echo json_encode($response);
    }
  }
}

public function addEstado() {
  // helper(['curl']);
  if($this->session->logged_in){
    if(!$this->request->getPost())
    {
      return redirect()->to(base_url('/activo'));
    }else{
  
        $post_endpoint = '/api/addEstado';

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

public function updateEstado() {
  // helper(['curl']);
 
    if (!$this->session->logged_in) {        
        return redirect()->to(base_url('/activo'));
    } else {        
        if ($this->request->getPost()) {
            
            $post_endpoint = '/api/updateEstado';            
            $request_data = [
                $this->request->getPost(),
                'user' => $this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];
            $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
            if ($response) {
                echo json_encode($response);
            } else {
                echo json_encode(false);
            }
        }
    }
}

public function deleteEstado() {    
  
    if (!$this->session->logged_in) {        
      return redirect()->to(base_url('/activo'));
    } else {        
      if ($this->request->getPost()) {
          
          $post_endpoint = '/api/deleteEstado';
          $post_data = $this->request->getPost();          
          $request_data = [
              $post_data,
              'id' => $this->session->id,
              "terminal" =>  navegacion($this->request->getUserAgent()),
              "ip" =>  $this->request->getIPAddress()
          ];
          $response = perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data);
          if ($response) {
              echo json_encode($response);
          } else {
              echo json_encode(false);
          }
      }
    }
}

public function getPrioridad(){
  if($this->session->logged_in){
    $get_endpoint = '/api/getPrioridad';

    $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
    if($response){
     
      echo json_encode($response);
    }
  }
}

public function addPrioridad() {
  // helper(['curl']);
  if($this->session->logged_in){
    if(!$this->request->getPost())
    {
      return redirect()->to(base_url('/activo'));
    }else{
  
        $post_endpoint = '/api/addPrioridad';

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
  
public function updatePrioridad() {
  // helper(['curl']);
  if (!$this->session->logged_in) {        
    return redirect()->to(base_url('/activo'));
    } else {        
    if ($this->request->getPost()) {
        
        $post_endpoint = '/api/updatePrioridad';            
        $request_data = [
            $this->request->getPost(),
            'user' => $this->session->id,
            "terminal" =>  navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress()
        ];
        $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
        if ($response) {
            echo json_encode($response);
        } else {
            echo json_encode(false);
        }
      }
    }
  
}

public function deletePrioridad(){
  if (!$this->session->logged_in) {        
    return redirect()->to(base_url('/activo'));
  } else {        
    if ($this->request->getPost()) {
        
        $post_endpoint = '/api/deletePrioridad';
        $post_data = $this->request->getPost();          
        $request_data = [
            $post_data,
            'id' => $this->session->id,
            "terminal" =>  navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress()
        ];
        $response = perform_http_request('DELETE', REST_API_URL . $post_endpoint, $request_data);
        if ($response) {
            echo json_encode($response);
        } else {
            echo json_encode(false);
        }
    }
  }
}


public function getAlerta_seguimiento(){
  if($this->session->logged_in){
    $get_endpoint = '/api/getAlerta_seguimiento';

    $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
    if($response){
     
      echo json_encode($response);
    }
  }
}

public function addAlerta_seguimiento() {
  // helper(['curl']);
  if($this->session->logged_in){
    if(!$this->request->getPost())
    {
      return redirect()->to(base_url('/activo'));
    }else{
  
        $post_endpoint = '/api/addAlerta_seguimiento';

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


public function updateAlerta_seguimiento() {
  // helper(['curl']);
  if (!$this->session->logged_in) {        
    return redirect()->to(base_url('/activo'));
    } else {        
    if ($this->request->getPost()) {
        
        $post_endpoint = '/api/updateAlerta_seguimiento';            
        $request_data = [
            $this->request->getPost(),
            'user' => $this->session->id,
            "terminal" =>  navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress()
        ];
        $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
        if ($response) {
            echo json_encode($response);
        } else {
            echo json_encode(false);
        }
      }
  }
   
}

public function deleteAlerta_seguimiento(){
  if (!$this->session->logged_in) {        
    return redirect()->to(base_url('/activo'));
  } else {        
    if ($this->request->getPost()) {
        
        $post_endpoint = '/api/deleteAlerta_seguimiento';
        $post_data = $this->request->getPost();          
        $request_data = [
            $post_data,
            'id' => $this->session->id,
            "terminal" =>  navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress()
        ];
        $response = perform_http_request('DELETE', REST_API_URL . $post_endpoint, $request_data);
        if ($response) {
            echo json_encode($response);
        } else {
            echo json_encode(false);
        }
    }
  }
}

public function getUserByActivo(){
  if($this->session->logged_in){
  $get_endpoint = '/api/getUserByEmpresa';
  $post_data = $this->request->getPost();     
  $response =perform_http_request('POST', REST_API_URL . $get_endpoint,$post_data);
  if($response){
  
      echo json_encode($response);
  }
  }
}


public function getEstadoByActivo(){
  if($this->session->logged_in){
  $get_endpoint = '/api/getEstadoByActivo';

  $response =perform_http_request('POST', REST_API_URL . $get_endpoint,[]);
  if($response){
  
      echo json_encode($response);
  }
  }
}


public function getPrioridadByActivo(){
  if($this->session->logged_in){
  $get_endpoint = '/api/getPrioridadByActivo';

  $response =perform_http_request('POST', REST_API_URL . $get_endpoint,[]);
  if($response){
  
      echo json_encode($response);
  }
  }
}


public function getAlertaByActivo(){
  if($this->session->logged_in ){
  $get_endpoint = '/api/getAlertaByActivo';

  $response =perform_http_request('POST', REST_API_URL . $get_endpoint,[]);
  if($response){
  
      echo json_encode($response);
  }
  }
}

public function getComboPosicion(){
  if($this->session->logged_in){
  $get_endpoint = '/api/getComboPosicion';

  $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
  if($response){
  
      echo json_encode($response);
  }
  }
}


public function getUserNombreByActivo(){
  if($this->session->logged_in){
  $get_endpoint = '/api/getUserNombreByActivo';

  $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
  if($response){
  
      echo json_encode($response);
  }
  }
}


public function getAlerta(){
  if($this->session->logged_in){
  $get_endpoint = '/api/getAlerta';

  $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
  if($response){
  
      echo json_encode($response);
  }
  }
}

public function getComboAreas(){
  if($this->session->logged_in){
  $get_endpoint = '/api/getComboAreas';

  $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
  if($response){
  
      echo json_encode($response);
  }
  }
}

public function getComboUnidad(){

  if($this->session->logged_in){
  $get_endpoint = '/api/getComboUnidad';

   $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
    if($response){

      echo json_encode($response);
    }
  }
}
//-------------------RIESGO PLAN DE ACCIÓN-----------------------------------------


// public function getPlanAccion(){
//   if($this->session->logged_in){
//     $get_endpoint = '/api/getPlanAccion';

//     $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
//     if($response){
     
//       echo json_encode($response);
//     }
//   }
// }


public function addPlanAccion() {
  // helper(['curl']);
  if($this->session->logged_in){
    if(!$this->request->getPost())
    {
      return redirect()->to(base_url('/activo'));
    }else{
  
        $post_endpoint = '/api/addPlanAccion';

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


public function updatePlanAccion() {
  // helper(['curl']);
  if (!$this->session->logged_in) {        
    return redirect()->to(base_url('/activo'));
    } else {        
    if ($this->request->getPost()) {
        
        $post_endpoint = '/api/updatePlanAccion';            
        $request_data = [
            $this->request->getPost(),
            'user' => $this->session->id,
            "terminal" =>  navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress()
        ];
        $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
        if ($response) {
            echo json_encode($response);
        } else {
            echo json_encode(false);
        }
      }
  }
   
}

public function deletePlanAccion(){
  if (!$this->session->logged_in) {        
    return redirect()->to(base_url('/activo'));
  } else {        
    if ($this->request->getPost()) {
        
        $post_endpoint = '/api/deletePlanAccion';
        $post_data = $this->request->getPost();          
        $request_data = [
            $post_data,
            'user' => $this->session->id,
            "terminal" =>  navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress()
        ];
        $response = perform_http_request('DELETE', REST_API_URL . $post_endpoint, $request_data);
        if ($response) {
            echo json_encode($response);
        } else {
            echo json_encode(false);
        }
    }
  }
}


                    // ACTIVIDAD PLAN

public function getActividadPlan($id){
    if($this->session->logged_in){
      $get_endpoint = '/api/getActividadPlan/'.$id;
  
      $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
      if($response){
       
        echo json_encode($response);
      }
    }
}

public function getPlan($id){
  if($this->session->logged_in){
    $get_endpoint = '/api/getPlan/'.$id;

    $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
    if($response){
     
      echo json_encode($response);
    }
  }
}
public function getActividadByPlan(){
  if($this->session->logged_in){
    $get_endpoint = '/api/getActividadByPlan';

    $response =perform_http_request('POST', REST_API_URL . $get_endpoint,[]);
    if($response){
     
      echo json_encode($response);
    }
  }
}


public function addActividadPlan() {
  // helper(['curl']);
  if($this->session->logged_in){
    if(!$this->request->getPost())
    {
      return redirect()->to(base_url('/activo'));
    }else{
  
        $post_endpoint = '/api/addActividadPlan';
        //$request_data = $this->request->getPost();
        $request_data = [
          $this->request->getPost(),
          'user' => $this->session->id,
          "terminal" =>  navegacion($this->request->getUserAgent()),
          "ip" =>  $this->request->getIPAddress()
      ];
        //$request_data['user'] = $this->session->id;
        $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
      
        
          if($response){
              echo json_encode($response);
          
          }else{
            echo json_encode(false);
          }
      
    }
 }
}
    
    
    public function updateActividadPlan() {
      // helper(['curl']);
      if (!$this->session->logged_in) {        
        return redirect()->to(base_url('/activo'));
        } else {        
        if ($this->request->getPost()) {
            
            $post_endpoint = '/api/updateActividadPlan';            
            $request_data = [
                $this->request->getPost(),
                'user' => $this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];
            $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
            if ($response) {
                echo json_encode($response);
            } else {
                echo json_encode(false);
            }
          }
      }
       
    }
    
    
    public function deleteActividadPlan(){
      if (!$this->session->logged_in) {        
        return redirect()->to(base_url('/activo'));
      } else {        
        if ($this->request->getPost()) {
            
            $post_endpoint = '/api/deleteActividadPlan';
            
            $request_data = [
               $this->request->getPost(),
                'user' => $this->session->id,
                "terminal" =>  navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress()
            ];
            $response = perform_http_request('DELETE', REST_API_URL . $post_endpoint, $request_data);
            if ($response) {
                echo json_encode($response);
            } else {
                echo json_encode(false);
            }
        }
      }
    }
}