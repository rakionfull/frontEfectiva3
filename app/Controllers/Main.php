<?php

namespace App\Controllers;
// use App\Libraries\Excel;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


class Main extends BaseController {
  protected $error;

  
    public function inicio() {
     
      if($this->session->logged_in){
       
        $get_endpoint = '/api/dashboard';
        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
       
        if($response){
          // $this->session->sess_expiration = '60';
      
         // $ecrupt=$this->encrypter->encrypt(5);
          $data["mensaje"] = $response->msg;
          return view('main/inicio',$data);
        }
      }else{
        return redirect()->to(base_url('/iniciosesion'));
      }
    
      
    }
    public function getPermisos(){
      if($this->session->logged_in){
         
         $get_endpoint = '/api/getPermisos';
         $request_data = $this->request->getPost();
         $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
        
        // if($response){
         
         echo json_encode($response);
       //s }
      }else{
        return redirect()->to(base_url('/iniciosesion'));
      }
    }
    public function cambio_clave(){
      if($this->session->logged_in){
       
        return view('auth/cambio_clave');
      }else{
        return redirect()->to(base_url('/iniciosesion'));
      }
     

    }
    public function reseteo_pass($id){
      if($this->session->logged_in){
        $this->session->set('id_us',$id);
        $data['id_us'] = $id;
        return view('auth/reseteo_pass',$data);
      }else{
        return redirect()->to(base_url('/iniciosesion'));
      }
     

    }
    public function updateClave(){
    
      if($this->session->logged_in){
        if($this->request->getPost()){
          $post_endpoint = '/api/change_pass';
          
             $request_data = [
              "passw" => $this->request->getPost('passw'),
              "repassw" => $this->request->getPost('repassw'),
              "terminal" =>navegacion($this->request->getUserAgent()),
              "ip" =>  $this->request->getIPAddress(),
              "username" =>  $this->session->user,
              "id" =>  $this->session->id,
            ];
           $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
            //var_dump($response);
            if(isset($response->error)){
              $this->session->setFlashdata('error','<div class="alert alert-danger alert-dismissible fade show" role="alert">
             '.$response->error.'
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
            </div>');
            return redirect()->to(base_url('/cambio_clave'));
           }else{
            $this->session->setFlashdata('error','<div class="alert alert-success alert-dismissible fade show" role="alert">
            Clave Modificada Correctamente
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
             </button>
           </div>');
            return redirect()->to(base_url('/inicio'));
         }
           
           
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
      }

     
    }
    public function updateClave2($id){
   
      if($this->session->logged_in){
        if($this->request->getPost()){
          $post_endpoint = '/api/change_pass';
         
             $request_data = [
              "passw" => $this->request->getPost('passw'),
              "repassw" => $this->request->getPost('repassw'),
              "terminal" =>navegacion($this->request->getUserAgent()),
              "ip" =>  $this->request->getIPAddress(),
              "username" =>  $this->session->user,
              "id" =>  $this->session->id,
              "id_us" =>  $this->session->id_us,
            ];
           $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
           // var_dump($response);
            if(isset($response->error)){
              $this->session->setFlashdata('error','<div class="alert alert-danger alert-dismissible fade show" role="alert">
             '.$response->error.'
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
            </div>');
          
           $data['id_us'] =  $this->session->id_us;
            return view('auth/reseteo_pass',$data);
           }else{
            $this->session->setFlashdata('error','<div class="alert alert-success alert-dismissible fade show" role="alert">
            Clave Modificada Correctamente
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
             </button>
           </div>');
           $this->session->remove('id_us');
            return redirect()->to(base_url('/listUsers'));
          }
           
           
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
      }

     
    }
    public function listUsers(){
      
        //opteniendo los datos
        if($this->session->logged_in && $this->session->permisos[3]->view_det==1){
         
          // $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          // if($response){
     
          //   $data["users"]=$response->datos;
     
              return view('accesos/listUsers');
          //}
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
        
     
  
    }
    public function getUsers($est){

      $get_endpoint = '/api/getUsers';
      $request_data = ['estado' => $est];
      $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
      // var_dump($response);
      if($response){
 
       echo json_encode($response);

      }
    }
    public function updateEstadoUser(){
      if($this->session->logged_in){
        if($this->request->getPost()){
          $post_endpoint = '/api/updateEstadoUser';
            $request_data = [
              "data" => $this->request->getPost(),
              "terminal" =>navegacion($this->request->getUserAgent()),
              "ip" =>  $this->request->getIPAddress(),
              "username" =>  $this->session->user,
              "id" =>  $this->session->id,
            ];

            
           $response = (perform_http_request('PUT', REST_API_URL . $post_endpoint,$request_data));
            //  var_dump($response);
          if($response){
            echo json_encode($response);
          }  
           
           
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
      }
    }
    public function configPass(){

      if($this->session->logged_in && $this->session->permisos[4]->view_det==1){
              $post_endpoint = '/api/getConfigPass';
                  
              $request_data = [];
              
              $response = (perform_http_request('GET', REST_API_URL . $post_endpoint,$request_data));
              if($response->data){
                $datos = $response->data[0];
              }else{
                
              }
              
              $error = new  \stdClass;
              $error->duracion = '';
              $error->tama_min = '';
              $error->tama_max = '';
              $error->sesion = '';
              $error->inactividad = '';
              $error->intentos = '';
              // $error->letras = '';
              // $error->numeros = '';
              // $error->caracteres = '';
              $data = [
                'data' =>json_decode(json_encode($datos), true),
                'error'   =>  $error
                
              ];
            
              return view('accesos/configPass',$data);
            }else{
              return redirect()->to(base_url('/iniciosesion'));
            }
    }
      public function addConfigPass() {
        // helper(['curl']);
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/inicio'));
          }else{
        
              $post_endpoint = '/api/addConfigPass';
              $request_data = $this->request->getPost();
             
              $numeros=0;
              if($this->request->getPost('num_pass')){
                $numeros=1;
                $request_data['numeros'] = $numeros;
              }else{
                
                $numeros=0;
                $request_data['numeros'] = $numeros;
              }
              $letras=0;
              if($this->request->getPost('letra_pass')){
                
                $letras=1;
                $request_data['letras'] = $letras;
              }else{
                
                $letras=0;
                $request_data['letras'] = $letras;
              }
              $char=0;
              if($this->request->getPost('char_pass')){
                
                $char=1;
                $request_data['caracteres'] = $char;
              }else{
                
                $char=0;
                $request_data['caracteres'] = $char;
              }
             
                              
              
             $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
           
               if(isset($response->error)){
                
                $datos=[
                  'data' => $request_data,
                  'error' => $response->datos,
                ];
                //   var_dump($datos);
               // var_dump($response->datos->duracion);
                return view('accesos/configPass',$datos);
               }else{
                if($response->msg ){
                  $this->session->setFlashdata('error','<div class="alert alert-success alert-dismissible fade show" role="alert">
                    Parámetros guardados correctamente
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                    </div>');
                    return redirect()->to(base_url('/configPass'));
                  }else{
                      $this->session->setFlashdata('error','<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Error al registrar
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                      </div>');
                      return redirect()->to(base_url('/inicio'));
                  }
              }
             
              
          
             
            
          }
        }
       
         
      }
      public function createUser(){
        if($this->session->logged_in && $this->session->permisos[3]->create_det==1){
          $datos=[
            'docident_us' => "",
            'nombres_us' => "",
            'apepat_us' => "",
            'apemat_us' => "",
            'email_us' => "",
            'usuario_us' => "",
            'perfil_us' => "",
          ];
          $error = new  \stdClass;
          $error->docident_us = '';
          $error->nombres_us = '';
          $error->apepat_us = '';
          $error->apemat_us = '';
          $error->email_us = '';
          $error->usuario_us = '';
          $error->perfil_us = '';
          $request_data = ['estado' => 1];
          $get_endpoint = '/api/getPerfiles';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
          
          $get_endpoint = '/api/getEmpresasByActivo';
          $empresas = perform_http_request('GET', REST_API_URL . $get_endpoint,[]);

          // $get_endpoint = '/api/getAreasByActivo';
          // $areas = perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          
          // $get_endpoint = '/api/getUnidadByActivo';
          // $unidad = perform_http_request('GET', REST_API_URL . $get_endpoint,[]);

          // $get_endpoint = '/api/getPosicionByActivo';
          // $posicion = perform_http_request('GET', REST_API_URL . $get_endpoint,[]);

          $data = [
                'data' => $datos,
                'error'   =>  $error,
                'perfiles' =>  $response,
                'empresa' =>  $empresas->data,
                // 'area' =>  $areas->data,
                // 'unidad' =>  $unidad->data,
                // 'posicion' =>  $posicion->data,
          ];
      
          return view('accesos/createUser',$data);
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
        
        
  
      }
      public function modifyUser($id){
        if($this->session->logged_in && $this->session->permisos[3]->update_det==1){
            if($id){
              $post_endpoint = '/api/getUser/'.$id;
              $request_data = [];
              $response = (perform_http_request('GET', REST_API_URL . $post_endpoint,$request_data));

              //traigo los perfiles
              $get_endpoint = '/api/getPerfiles';
              $request_data = ['estado' => 1];
              $perfiles =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);

              $get_endpoint = '/api/getEmpresasByActivo';
              $empresas = perform_http_request('GET', REST_API_URL . $get_endpoint,[]);

              $get_endpoint = '/api/getAreasByActivo';
              $request_data = ['idempresa' => $response->datos->idempresa];
              $areas = perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
              
              $get_endpoint = '/api/getUnidadByActivo';
              $request_data = ['idempresa' => $response->datos->idempresa,
                               'idarea' => $response->datos->idarea];
              $unidad = perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);

              $get_endpoint = '/api/getPosicionByUnidad';
              $request_data = ['idempresa' => $response->datos->idempresa,
              'idarea' => $response->datos->idarea,
              'idunidad' => $response->datos->idunidad];
              $posicion = perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);

              $error = new  \stdClass;
              $error->docident_us = '';
              $error->nombres_us = '';
              $error->apepat_us = '';
              $error->apemat_us = '';
              $error->email_us = '';
              $error->usuario_us = '';
              $error->perfil_us = '';
              $error->estado_us = '';
             
              $data = [
                'user' => $response->datos,
                'error'   =>  $error,
                'perfiles' =>  $perfiles,
                'empresa' =>  $empresas->data,
                'area' =>  $areas->data,
                'unidad' =>  $unidad->data,
                'posicion' =>  $posicion->data,
                
              ];
              //var_dump( $unidad);
              //  var_dump($response->datos);
              return view('accesos/updateUser',$data);
            }else{
              return redirect()->to(base_url('/listUsers'));
            }
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
       
      
      }
     
      public function addUser() {
        // helper(['curl']);
        if($this->session->logged_in && $this->session->permisos[3]->view_det==1){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/listUsers'));
          }else{
        
              $post_endpoint = '/api/addUser';
             
              // $request_data = (array("username" => $this->request->getPost('username'), "password" => $this->request->getPost('pass')));
              $request_data = [
                                "data" => $this->request->getPost(),
                                "terminal" =>navegacion($this->request->getUserAgent()),
                                "ip" =>  $this->request->getIPAddress(),
                                "username" =>  $this->session->user,
                                "id" =>  $this->session->id,
                              ];
             $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
           // var_dump($response);
              if(isset($response->error)){
                $get_endpoint = '/api/getPerfiles';
                $request_data = ['estado' => 1];
                $getPerfiles =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
                //empresas
                $get_endpoint = '/api/getEmpresasByActivo';
                $empresas = perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
              
                $datos=[
                  'data' => $this->request->getPost(),
                  'error' => $response->datos,
                  'perfiles' =>  $getPerfiles,
                  'empresa' =>  $empresas->data,
                  // 'area' =>  $areas->data,
                  // 'unidad' =>  $unidad->data,
                  // 'posicion' =>  $posicion->data,
                ];
                return view('accesos/createUser',$datos);
              }else{
                //var_dump($response);
                if($response->user ){
                  $this->session->setFlashdata('error','<div class="alert alert-success alert-dismissible fade show" role="alert">
                    Usuario creado correctamente
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                    </div>');
                    return redirect()->to(base_url('/listUsers'));
                  }else{
                      $this->session->setFlashdata('error','<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Error al registrar
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                      </div>');
                      return redirect()->to(base_url('/listUsers'));
                  }
              }
             
              
          
             
            
          }
        }
       
         
      }
      public function updateUser($id) {
        
        if($this->session->logged_in && $this->session->permisos[3]->update_det==1){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/modifyUser'));
          }else{
        
              $post_endpoint = '/api/updateUser/'.$id;
              $request_data = [
                                "data" => $this->request->getPost(),
                                "terminal" =>navegacion($this->request->getUserAgent()),
                                "ip" =>  $this->request->getIPAddress(),
                                "username" =>  $this->session->user,
                                "id" =>  $this->session->id,
              ];
              
              $response = perform_http_request('PUT', REST_API_URL . $post_endpoint,$request_data);
             
                if($response->user ){
                  $this->session->setFlashdata('error','<div class="alert alert-success alert-dismissible fade show" role="alert">
                    Usuario modificado correctamente
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                    </div>');
                    return redirect()->to(base_url('/listUsers'));
                  }else{
                      $this->session->setFlashdata('error','<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Error al modificar
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                      </div>');
                      return redirect()->to(base_url('/listUsers'));
                  }
              
             
          
             
            
          }
        }
       
         
        
      }
      public function deleteUser($id) {
        if($this->session->logged_in && $this->session->permisos[3]->delete_det==1){
          $post_endpoint = '/api/deleteUser/'.$id;
          $request_data = [
            "terminal" =>navegacion($this->request->getUserAgent()),
            "ip" =>  $this->request->getIPAddress(),
            "username" =>  $this->session->user,
            "id" =>  $this->session->id,
          ];
          $response = perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data);
         //var_dump($response);
          if(!$response->error ){
                 $this->session->setFlashdata('error','<div class="alert alert-success alert-dismissible fade show" role="alert">
            Usuario eliminado correctamente
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
             </button>
           </div>');
            return redirect()->to(base_url('/listUsers'));
          }else{
              $this->session->setFlashdata('error','<div class="alert alert-danger alert-dismissible fade show" role="alert">
             '.$response->msg.'
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
               </button>
             </div>');
              return redirect()->to(base_url('/listUsers'));
          }
        }
            
        
           
          
        
         
          //opteniendo el cpatcha
        
          // return view('auth/iniciosesion',$data);
      }
      public function perfiles(){
      
        //opteniendo los datos
        if($this->session->logged_in && $this->session->permisos[5]->view_det==1){
       
    
              return view('accesos/perfiles',[
                'ver' => $this->session->permisos[5]->view_det,
                'modificar' => $this->session->permisos[5]->update_det,
                'eliminar' => $this->session->permisos[5]->delete_det,
                'crear' => $this->session->permisos[5]->create_det,
               
              ]);
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
        
     
  
      }
      public function detPerfil($id){
      
        //opteniendo los datos
        if($this->session->logged_in && $this->session->permisos[5]->view_det==1){
        
          $request_data = ['id_perfil' => $id ];
          //endpoint de los datos necesarios para detalle_perfil
          $get_endpoint = '/api/getModulos';
          $get_Perfil = '/api/getDetPerfil';
          $get_Opcion = '/api/getOpcion';
          $get_Item = '/api/getItem';

          $perfil =perform_http_request('GET', REST_API_URL . $get_Perfil,$request_data);
          $modulos =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
          $opcion =perform_http_request('GET', REST_API_URL . $get_Opcion,$request_data);
          $item =perform_http_request('GET', REST_API_URL . $get_Item,$request_data);
          
          if($modulos){
           
              $data["modulos"]=$modulos->data;
              $data["opciones"]=$opcion->data;
              $data["items"]=$item->data;
              $data["perfil"]=$perfil->data;
             

              //var_dump($data);
              return view('accesos/detPerfil',$data);
          }
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
        
     
  
      }
      public function getPerfiles($est){
        if($this->session->logged_in){
          $get_endpoint = '/api/getPerfiles';
          $request_data = ['estado' => $est];
          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
          if($response){
           
            echo json_encode($response);
          }
        }
      }
      public function validarPerfil(){
        if($this->session->logged_in){
         
            $post_endpoint = '/api/validarPerfil';
           
            $request_data =  $this->request->getPost();
             
            $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
  
            echo json_encode($response->msg);

        }
      }
      public function addPerfil() {
        // helper(['curl']);
        if($this->session->logged_in && $this->session->permisos[5]->create_det==1){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/listUsers'));
          }else{
        
              $post_endpoint = '/api/addPerfil';
             
              $request_data = [
                "data" => $this->request->getPost(),
                "terminal" =>navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress(),
                "username" =>  $this->session->user,
                "id" =>  $this->session->id,
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
      public function updatePerfil() {
        // helper(['curl']);
        if($this->session->logged_in && $this->session->permisos[5]->update_det==1){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/perfiles'));
          }else{
        
              $post_endpoint = '/api/updatePerfil';
              $request_data = [];
              // $request_data = (array("username" => $this->request->getPost('username'), "password" => $this->request->getPost('pass')));
              $request_data = $this->request->getPost();
             
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
      public function deletePerfil($id) {
      
        if($this->session->logged_in && $this->session->permisos[5]->delete_det==1){
        
        
              $post_endpoint = '/api/deletePerfil';
           
              $request_data = [ 
                "data" => $id,
                "terminal" =>navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress(),
                "username" =>  $this->session->user,
                "id" =>  $this->session->id,
               ] ;

              $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
             var_dump($response);
              if(!$response->error){
                $this->session->setFlashdata('error','<div class="alert alert-success alert-dismissible fade show" role="alert">
                  Perfil Elimnado correctamente
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                  </div>');
                  return redirect()->to(base_url('/perfiles'));
                }else{
                    $this->session->setFlashdata('error','<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    '.$response->msg.'
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                    </div>');
                    return redirect()->to(base_url('/perfiles'));
              }       
                          
          
        }
       
         
      }
     
      //update del detalle perfil
      public function updateView() {
        // helper(['curl']);
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/listUsers'));
          }else{
        
              $post_endpoint = '/api/updateView';
    
              // $request_data = (array("username" => $this->request->getPost('username'), "password" => $this->request->getPost('pass')));
              $request_data = [
                "data" => $this->request->getPost(),
                "terminal" =>navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress(),
                "username" =>  $this->session->user,
                "id" =>  $this->session->id,
              ];
             
              $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
              // var_dump($response);
              // echo json_encode($request_data);
                if($response->msg ){
                    echo json_encode($response->msg);
                
                }else{
                  echo json_encode(false);
                }
 
          }
        }
       
         
      }
      public function updateCreate() {
        // helper(['curl']);
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/listUsers'));
          }else{
        
              $post_endpoint = '/api/updateCreate';
            
              $request_data = [
                "data" => $this->request->getPost(),
                "terminal" =>navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress(),
                "username" =>  $this->session->user,
                "id" =>  $this->session->id,
              ];
             
             
              $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
              echo json_encode($response);
              
                // if($response->msg ){
                //     echo json_encode($response->msg);
                
                // }else{
                //   echo json_encode(false);
                // }
 
          }
        }
       
         
      }
      public function updateUpdate() {
        // helper(['curl']);
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/listUsers'));
          }else{
        
              $post_endpoint = '/api/updateUpdate';

              $request_data = [
                "data" => $this->request->getPost(),
                "terminal" =>navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress(),
                "username" =>  $this->session->user,
                "id" =>  $this->session->id,
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
      public function updateDelete() {
        // helper(['curl']);
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/listUsers'));
          }else{
        
              $post_endpoint = '/api/updateDelete';
              
             $request_data = [
                "data" => $this->request->getPost(),
                "terminal" =>navegacion($this->request->getUserAgent()),
                "ip" =>  $this->request->getIPAddress(),
                "username" =>  $this->session->user,
                "id" =>  $this->session->id,
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

      public function reporteDetallePerfil(){
        $api_endpoint = '/api/detallePerfil';
        $response = (perform_http_request('GET', REST_API_URL . $api_endpoint,[]));
        $spreadsheet = new Spreadsheet();

        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
          
        // Agregar un encabezado
        
        $spreadsheet->getActiveSheet()->mergeCells('B1:R2');
        $spreadsheet->getActiveSheet()->setCellValue('B1', 'Reporte de detalle de perfiles');
        // Agregar estilo al encabezado
        $spreadsheet->getActiveSheet()->getStyle('B1:R2')->applyFromArray([
          'font' => [
            'bold' => true,
            'size' => 18,
          ],
        ]);

        // Agregar estilo a las columnas A, B y C
        $spreadsheet->getActiveSheet()->getStyle('A6:T6')->applyFromArray([
          'fill' => [
              'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
              'startColor' => [
                  'rgb' => '1B7ADE',
              ],
          ],
          'font' => [
              'color' => [
                  'rgb' => 'FFFFFF',
              ],
          ],
        ]);

        $sheet = $spreadsheet->getActiveSheet();

          $sheet->setCellValue('A6', 'Nombre del Perfil');
          $sheet->setCellValue('B6', 'Descripción del Perfil');
          $sheet->setCellValue('C6', 'Fecha de Alta');
          $sheet->setCellValue('D6', 'Estado');
          $sheet->setCellValue('E6', 'Accesos Asignados');
          $sheet->setCellValue('F6', 'Ver');
          $sheet->setCellValue('G6', 'Modificar');
          $sheet->setCellValue('H6', 'Registrar');
          $sheet->setCellValue('I6', 'Eliminar');

          $rows = 7;
    
          foreach ($response->datos as $val){
              
              $sheet->setCellValue('A' . $rows, $val->perfil);
              $sheet->setCellValue('B' . $rows, $val->desc_perfil);
              $sheet->setCellValue('C' . $rows, $val->creacion_perfil);
              $sheet->setCellValue('D' . $rows, $val->est_perfil == 1 ? 'Activo' : 'Inactivo');
              $sheet->setCellValue('E' . $rows, $val->desc_item);
              $sheet->setCellValue('F' . $rows, $val->view_det == 1 ? 'Asignado' : 'No Asignado');
              $sheet->setCellValue('G' . $rows, $val->create_det == 1 ? 'Asignado' : 'No Asignado');
              $sheet->setCellValue('H' . $rows, $val->update_det == 1 ? 'Asignado' : 'No Asignado');
              $sheet->setCellValue('I' . $rows, $val->delete_det == 1 ? 'Asignado' : 'No Asignado');
              $rows++;
          } 
          $writer = new Xlsx($spreadsheet);
          $fecha_creacion= date("Y-m-d");     
          $ruta="reporte_detalle_perfil_".$fecha_creacion.".xlsx";
          $writer->save('./public/assets/reportes/'.$ruta);
          
          # Le pasamos la ruta de guardado
        
          header("Content-Type: application/vnd.ms-excel");
          // redirect(base_url()."/listUser/".$ruta); 
          echo json_encode($ruta);
      }
      public function reporteUsuarios(){
        
        $post_endpoint = '/api/dataUser';
        $response = (perform_http_request('GET', REST_API_URL . $post_endpoint,[]));
      
        $spreadsheet = new Spreadsheet();

        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
          
            // Agregar un encabezado
            
            $spreadsheet->getActiveSheet()->mergeCells('B1:R2');
            $spreadsheet->getActiveSheet()->setCellValue('B1', 'Reporte de usuarios');
            
            // Agregar estilo al encabezado
            $spreadsheet->getActiveSheet()->getStyle('B1:R2')->applyFromArray([
                'font' => [
                    'bold' => true,
                    'size' => 18,
                  
            ],
                
            ]);
            
            // Agregar estilo a las columnas A, B y C
            $spreadsheet->getActiveSheet()->getStyle('A6:T6')->applyFromArray([
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => [
                        'rgb' => '1B7ADE',
                    ],
                ],
                'font' => [
                    'color' => [
                        'rgb' => 'FFFFFF',
                    ],
                ],
            ]);

 
            $sheet = $spreadsheet->getActiveSheet();

            $sheet->setCellValue('A6', 'Doc. Ident.');
            $sheet->setCellValue('B6', 'Nombres');
            $sheet->setCellValue('C6', 'Apellidos');
            $sheet->setCellValue('D6', 'Usuario');
            $sheet->setCellValue('E6', 'Perfil');
            $sheet->setCellValue('F6', 'Estado');
            $sheet->setCellValue('G6', 'Bloqueo');
            $sheet->setCellValue('H6', 'Fecha de alta');
            $sheet->setCellValue('I6', 'Ultimo Acceso');
            $rows = 7;
     
            foreach ($response->datos as $val){
                
                $sheet->setCellValue('A' . $rows, $val->docident_us);
                $sheet->setCellValue('B' . $rows, $val->nombres_us);
                $sheet->setCellValue('C' . $rows, $val->apepat_us.' '. $val->apemat_us);
                $sheet->setCellValue('D' . $rows, $val->usuario_us);
                $sheet->setCellValue('E' . $rows, $val->perfil);
                $sheet->setCellValue('F' . $rows, $val->estado);
                $sheet->setCellValue('G' . $rows, $val->bloqueo);
                $sheet->setCellValue('H' . $rows, $val->creacion_us);
                $sheet->setCellValue('I' . $rows, $val->ultimo_acceso);
                $rows++;
            } 
            $writer = new Xlsx($spreadsheet);
            $fecha_creacion= date("Y-m-d");     
            $ruta="reporte_Usuarios_".$fecha_creacion.".xlsx";
            $writer->save('./public/assets/reportes/'.$ruta);
           
            # Le pasamos la ruta de guardado
          
            header("Content-Type: application/vnd.ms-excel");
            // redirect(base_url()."/listUser/".$ruta); 
            echo json_encode($ruta);
            // echo ($fileName);
          }
    



      public function activos(){
        
        if($this->session->logged_in && $this->session->permisos[6]->view_det==1){
              $idempresa = $this->session->idempresa;
              $idarea = $this->session->idarea;
              $id_user = $this->session->id;
              return view('parametrizacion/activos',[
                'escenario' => $this->session->escenario,
                'idempresa' => $idempresa,
                'idarea' => $idarea,
                'id_user' => $id_user
            ]);
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
     
      public function riesgos(){
       
        if($this->session->logged_in){
          $get_endpoint = '/api/getTiposAmenaza';
          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
            $tipo_amenaza = $response->data;
          }
        }
        return view('parametrizacion/riesgos',[
          'escenario' => $this->session->escenario,
          'tipos_amenaza' => $tipo_amenaza
        ]);
      
      if($this->session->logged_in){
        $get_endpoint = '/api/getTiposAmenaza';
        $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        if($response){
          $tipo_amenaza = $response->data;
        }
      }
      return view('parametrizacion/riesgos',[
        'escenario' => $this->session->escenario,
        'tipos_amenaza' => $tipo_amenaza
      ]);
    } 
      public function controles(){
        
        if($this->session->logged_in){
            //$get_endpoint = '/api/getEvaluacionControl';
            //$response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        
            // if($response){
            //   $data = [
            //     'header' =>$response->header,
            //     'datos' =>$response->data,
            //   ]; 
            // }else{
            //   $data = [
            //     'header' =>'',
            //     'datos' =>'',
            //   ];
            // }

           
          //var_dump($response);
            return view('parametrizacion/controles');
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
      //traer cabeceras y datos de evlauacion de control
      public function getEvaluacionControl(){
           $get_endpoint = '/api/getEvaluacionControl';
            $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);

            if($response){
              echo json_encode($response);
            }
        
      }
      public function planesAccion(){
        
        if($this->session->logged_in){
    
              return view('parametrizacion/planesAccion');
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
      public function planAccion(){
        
        if($this->session->logged_in){
    
              return view('evaluacionriesgos/planAccion');
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
      public function RegPlanAccion(){
        
        if($this->session->logged_in){
              $data['contador'] = 0;
              // var_dump($data);
              $get_endpoint = '/api/getControlRiesgo';
              $riesgos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
              $get_endpoint = '/api/getPlanControl';
              $controles =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            
              $idempresa = $this->session->idempresa;
              $idarea = $this->session->idarea;
              $idunidad = $this->session->idunidad;
              $id_user = $this->session->id;
            
              $data = [
                'contador'  => 0,
                'riesgo' => $riesgos -> data,
                'control' => $controles -> data,
               
                'id_area' =>  $idarea,
                'id_user' => $id_user,
                'idempresa' => $idempresa,
                'id_unidad' =>  $idunidad,
              ];
              // var_dump($riesgos);
              return view('evaluacionriesgos/registrar',$data);
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
      public function modificarPlanAccion($id){
        
        if($this->session->logged_in){
             
              // var_dump($data);
              $get_endpoint = '/api/getControlRiesgo';
              $riesgos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
              $get_endpoint = '/api/getPlanControl';
              $controles =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
              $idempresa = $this->session->idempresa;
              $idarea = $this->session->idarea;
              $id_user = $this->session->id;
              $idunidad = $this->session->idunidad;
              $data = [
                'id' => $id,
                'riesgo' => $riesgos -> data,

                'control' => $controles -> data,
                'id_area' =>  $idarea,
                'id_user' => $id_user,
                'idempresa' => $idempresa,
                'id_unidad' =>  $idunidad,
              ];
              // var_dump($riesgos);
              return view('evaluacionriesgos/updatePlanAccion',$data);
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
      public function verDetalle($id){
        
        if($this->session->logged_in){
            $get_endpoint = '/api/getDetallePlan/'.$id;
            $datos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            $get_endpoint = '/api/getControlRiesgo';
            $riesgos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            $get_endpoint = '/api/getPlanControl';
            $controles =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
            $idempresa = $this->session->idempresa;
            $idarea = $this->session->idarea;
            $id_user = $this->session->id;
            $idunidad = $this->session->idunidad;
            var_dump($datos->data->actividades);
            $data = [
              'contador'  => $datos->data->actividades,
              'plan' => $id ,
              'riesgo' => $riesgos -> data, 
              'control' => $controles -> data,
              'id_area' =>  $idarea,
              'id_user' => $id_user,
              'idempresa' => $idempresa,
              'id_unidad' =>  $idunidad,
            ];
            
              return view('evaluacionriesgos/verDetalle',$data);
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
      public function registro_controles(){
        
        if($this->session->logged_in){
              $get_endpoint = '/api/getRegistroControles2';
              $datos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
              // var_dump($datos);
             $data['registros'] = $datos->data;
              return view('registrocontroles/Registro_Controles',$data);
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
    
      public function create_controles(){
        
        if($this->session->logged_in){
          //ultimo ID
          $get_endpoint = '/api/LastIdControles';
          $last_id =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          
          //datos del menu
          $get_endpoint = '/api/getCCMenu';
          $menus =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          
          //datos dell submenu
          $get_endpoint = '/api/getCCSubMenu';
          $submenus =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          //datos opciones
          $get_endpoint = '/api/getCCOpciones';
          $opciones =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);

          $get_endpoint = '/api/getCoberturaByActivo';
          $cobertura =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          //riesgos
          $get_endpoint = '/api/getControlRiesgo';
          $riesgos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          
          $data = [
            'last_id' => "C".generarId($last_id->data),
            'menu' => $menus,
            'submenu' => $submenus,
            'opcion' => $opciones,
            'cobertura' => $cobertura,
            'riesgo' => $riesgos->data,
          ];
          // var_dump($last_id->data);
            return view('registrocontroles/Create_Controles',$data);
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }

      }
      public function update_controles($dato){
        if($this->session->logged_in){
          
          //datos del menu
          $get_endpoint = '/api/getCCMenu';
          $menus =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          
          //datos dell submenu
          $get_endpoint = '/api/getCCSubMenu';
          $submenus =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          //datos opciones
          $get_endpoint = '/api/getCCOpciones';
          $opciones =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);

          $get_endpoint = '/api/getCoberturaByActivo';
          $cobertura =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);

          //datos del control solo valores unicos
          $get_endpoint = '/api/getRegistroControl/'.$dato;
          $datos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          //riesgos
          $get_endpoint = '/api/getControlRiesgo';
          $riesgos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        
          $data = [
            'id' => $dato,
            'menu' => $menus,
            'submenu' => $submenus,
            'opcion' => $opciones,
            'cobertura' => $cobertura,
            'registro' => $datos->data,
            'riesgo' => $riesgos->data,
            // 'detalle' => $detalle->data,
          ];
          return view('registrocontroles/Update_Controles',$data);
         
        }else{
          return redirect()->to(base_url('/iniciosesion'));
        }
      }
     
      public function delete_controles($id){
        if($this->session->logged_in){
         
             
    
                $post_endpoint = '/api/deleteControles';
        
                $request_data =
                $request_data = [
                    'id' => $id ,
                    'user' =>$this->session->id
                ];
               
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
                
                if(($response->error )){
                  $this->session->setFlashdata('error','<div class="alert alert-success alert-dismissible fade show" role="alert">
                    '.($response->msg).'
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                    </div>');
                    return redirect()->to(base_url('/registro-controles'));
                  }else{
                      $this->session->setFlashdata('error','<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      '.$response->msg.'
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                      </div>');
                      return redirect()->to(base_url('/registro-controles'));
                }       
             
              
            
          }
         
      }
      
  }