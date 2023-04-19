<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class ImpactoRiesgoController extends BaseController
{
    public function getByDescription(){
        if ($this->session->logged_in) {
          $request_data = $this->request->getPost();
          $get_endpoint = '/api/getImpactoByDescription';
          $response = perform_http_request('POST', REST_API_URL . $get_endpoint, $request_data);
          if ($response) {
            echo json_encode($response);
          }
        }
    }

    public function getActives($scene){
        if ($this->session->logged_in) {
          $get_endpoint = '/api/getActivesImpacto/' . $scene;
          $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
          if ($response) {
            echo json_encode($response);
          }
        }
    }
    public function getImpactoRiesgo($scene)
    {
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getImpactoRiesgo/' . $scene;
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                updateScene($this->session->id);
                echo json_encode($response);
            }
        }
    }
    public function addImpactoRiesgo1()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/addImpactoRiesgo1';
                $request_data = [];
                $request_data = $this->request->getPost();
                $request_data['escenario'] = "1";
                $request_data['user_id'] = $this->session->id;
                $request_data['id_user'] = $this->session->id;
                $request_data['id_user_added'] = $this->session->id;
                $request_data['date_add'] = $currentDate;
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                $this->session->escenario = 1;
                if ($response) {
                    echo json_encode($response);
                    updateScene($this->session->id);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }
    public function addImpactoRiesgo2()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/addImpactoRiesgo2';
                $request_data = [];
                $request_data = $this->request->getPost();
                $request_data['escenario'] = "2";
                $request_data['id_user'] = $this->session->id;
                $request_data['user_id'] = $this->session->id;
                $request_data['id_user_added'] = $this->session->id;
                $request_data['date_add'] = $currentDate;
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                $this->session->escenario = 2;
                
                if ($response) {
                    echo json_encode($response);
                    updateScene($this->session->id);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }

    public function updateImpactoRiesgo1()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/updateImpactoRiesgo1';
                $request_data = [];
                $request_data = $this->request->getPost();
                $request_data['id_user'] = $this->session->id;
                $request_data['user_id'] = $this->session->id;
                $request_data['id_user_updated'] = $this->session->id;
                $request_data['date_modify'] = $currentDate;
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                $this->session->escenario = 1;
            
                if ($response) {
                    echo json_encode($response);
                    updateScene($this->session->id);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }
    public function updateImpactoRiesgo2()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/updateImpactoRiesgo2';
                $request_data = [];
                $request_data = $this->request->getPost();
                $request_data['id_user'] = $this->session->id;
                $request_data['user_id'] = $this->session->id;
                $request_data['id_user_updated'] = $this->session->id;
                $request_data['date_modify'] = $currentDate;
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                $this->session->escenario = 2;
                
                if ($response) {
                    echo json_encode($response);
                    updateScene($this->session->id);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }

    public function deleteImpactoRiesgo($id)
    {
        if ($this->session->logged_in) {
            $currentDate = date("Y-m-d H:i:s");
            $post_endpoint = '/api/deleteImpactoRiesgo/' . $id;
            $request_data['user_id'] = $this->session->id;
            $request_data['id_user_deleted'] = $this->session->id;
            $request_data['date_deleted'] = $currentDate;
            $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
            if ($response) {
                if(!$response->error){
                    updateScene($this->session->id);
                }
                echo json_encode($response);
            } else {
                echo json_encode(false);
            }
        }
    }
}