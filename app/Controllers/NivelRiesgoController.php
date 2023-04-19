<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class NivelRiesgoController extends BaseController
{
    public function getNivelRiesgo()
    {
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getNivelRiesgo';
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }
    public function showNivelRiesgo($id)
    {
        if ($this->session->logged_in) {
            $get_endpoint = '/api/showNivelRiesgo/' . $id;
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }

    public function addNivelRiesgo()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                
                $post_endpoint = '/api/addNivelRiesgo';
                $request_data = [];
                $request_data = $this->request->getPost();
                $currentDate = date("Y-m-d H:i:s");
                $request_data['id_user_added'] = $this->session->id;
                $request_data['date_add'] = $currentDate;
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                // var_dump($response);die();
                if ($response) {
                    echo json_encode($response);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }

    public function updateNivelRiesgo($id)
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $post_endpoint = '/api/updateNivelRiesgo/' . $id;
                $request_data = [];
                $request_data = $this->request->getPost();
                $currentDate = date("Y-m-d H:i:s");
                $request_data['id_user_updated'] = $this->session->id;
                $request_data['date_modify'] = $currentDate;
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                if ($response) {
                    echo json_encode($response);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }

    public function deleteNivelRiesgo($id)
    {
        if ($this->session->logged_in) {
            $post_endpoint = '/api/deleteNivelRiesgo/' . $id;
            $currentDate = date("Y-m-d H:i:s");
            $request_data['id_user_deleted'] = $this->session->id;
            $request_data['date_deleted'] = $currentDate;
            $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
            if ($response) {
                echo json_encode($response);
            } else {
                echo json_encode(false);
            }
        }
    }
}
