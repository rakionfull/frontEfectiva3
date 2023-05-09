<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class CategoriasVulnerabilidadController extends BaseController
{
    public function getCategoriasVulnerabilidad()
    {
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getCategoriasVulnerabilidad';
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }

    public function addCategoriasVulnerabilidad()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $post_endpoint = '/api/addCategoriasVulnerabilidad';
                $request_data = [];
                $request_data = $this->request->getPost();
                $currentDate = date("Y-m-d H:i:s");
                $request_data['id_user_added'] = $this->session->id;
                $request_data['date_add'] = $currentDate;
                $request_data["terminal"] =  navegacion($this->request->getUserAgent());
                $request_data["ip"] =  $this->request->getIPAddress();
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

    public function updateCategoriasVulnerabilidad($id)
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $post_endpoint = '/api/updateCategoriasVulnerabilidad/' . $id;
                $request_data = [];
                $request_data = $this->request->getPost();
                $currentDate = date("Y-m-d H:i:s");
                $request_data['id_user_updated'] = $this->session->id;
                $request_data['date_modify'] = $currentDate;
                $request_data["terminal"] =  navegacion($this->request->getUserAgent());
                $request_data["ip"] =  $this->request->getIPAddress();
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                if ($response) {
                    echo json_encode($response);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }

    public function deleteCategoriasVulnerabilidad($id)
    {
        if ($this->session->logged_in) {
            $post_endpoint = '/api/deleteCategoriasVulnerabilidad/' . $id;
            $currentDate = date("Y-m-d H:i:s");
            $request_data['id_user_deleted'] = $this->session->id;
            $request_data['date_deleted'] = $currentDate;
            $request_data["terminal"] =  navegacion($this->request->getUserAgent());
            $request_data["ip"] =  $this->request->getIPAddress();
            $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
            if ($response) {
                echo json_encode($response);
            } else {
                echo json_encode(false);
            }
        }
    }
}
