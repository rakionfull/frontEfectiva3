<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class TipoRiesgoController extends BaseController
{
    public function getTipoRiesgos()
    {
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getTipoRiesgos';
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }

    public function addTipoRiesgo()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/addTipoRiesgo';
                $request_data = [];
                $request_data = $this->request->getPost();
                $request_data['id_user_added'] = $this->session->id;
                $request_data['date_add'] = $currentDate;
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
                if ($response) {
                    echo json_encode($response);
                } else {
                    echo json_encode(false);
                }
            }
        }
    }

    public function updateTipoRiesgo()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/updateTipoRiesgo';
                $request_data = [];
                $request_data = $this->request->getPost();
                $request_data['id_user_updated'] = $this->session->id;
                $request_data['date_modify'] = $currentDate;
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

    public function deleteTipoRiesgo($id)
    {
        if ($this->session->logged_in) {
            $post_endpoint = '/api/deleteTipoRiesgo/' . $id;
            $currentDate = date("Y-m-d H:i:s");
            $request_data = $this->request->getPost();
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
