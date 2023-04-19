<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class TipoAmenazaController extends BaseController
{
    public function getTiposAmenaza()
    {
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getTiposAmenaza';
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }
    public function addTipoAmenaza()
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $post_endpoint = '/api/addTipoAmenaza';
                $request_data = [];
                $request_data = $this->request->getPost();
                $currentDate = date("Y-m-d H:i:s");
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

    public function updateTipoAmenaza($id)
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/riesgos'));
            } else {
                $post_endpoint = '/api/updateTipoAmenaza/' . $id;
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

    public function deleteTipoAmenaza($id)
    {
        if ($this->session->logged_in) {
            $post_endpoint = '/api/deleteTipoAmenaza/' . $id;
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
