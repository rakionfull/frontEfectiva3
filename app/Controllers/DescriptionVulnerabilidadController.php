<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class DescriptionVulnerabilidadController extends BaseController
{
    public function getDescVulnerabilidad()
    {
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getDescVulnerabilidad';
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }

    public function addDescVulnerabilidad()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $post_endpoint = '/api/addDescVulnerabilidad';
                $request_data = [];
                $request_data = $this->request->getPost();
                $currentDate = date("Y-m-d H:i:s");
                $request_data['id_user_added'] = $this->session->id;
                $request_data['date_add'] = $currentDate;
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                // var_dump($response);die();
                if ($response->msg) {
                    echo json_encode($response->msg);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }

    public function updateDescVulnerabilidad($id)
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $post_endpoint = '/api/updateDescVulnerabilidad/' . $id;
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

    public function deleteDescVulnerabilidad($id)
    {
        if ($this->session->logged_in) {
            $post_endpoint = '/api/deleteDescVulnerabilidad/' . $id;
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
