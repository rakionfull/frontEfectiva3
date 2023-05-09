<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class ProbabilidadRiesgoController extends BaseController
{
  public function getActives($scene){
    if ($this->session->logged_in) {
      $get_endpoint = '/api/getActives/' . $scene;
      $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
      if ($response) {
        echo json_encode($response);
      }
    }
  }
  public function getByDescription(){
    if ($this->session->logged_in) {
      $request_data = $this->request->getPost();
      $get_endpoint = '/api/getProbabilidadByDescription';
      $response = perform_http_request('POST', REST_API_URL . $get_endpoint, $request_data);
      if ($response) {
        echo json_encode($response);
      }
    }
  }
  public function getProbabilidadRiesgo($scene)
  {
    if ($this->session->logged_in) {
      $get_endpoint = '/api/getProbabilidadRiesgo/' . $scene;
      $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
      if ($response) {
        //updateScene($this->session->id);
        
        echo json_encode($response);
      }
    }
  }
  public function addProbabilidadRiesgo1()
  {
    if ($this->session->logged_in) {
      if (!$this->request->getPost()) {
        return redirect()->to(base_url('/riesgos'));
      } else {
        $currentDate = date("Y-m-d H:i:s");
        $post_endpoint = '/api/addProbabilidadRiesgo1';;
        $request_data = [];
        $request_data = $this->request->getPost();
        $request_data['id_user'] = $this->session->id;
        $request_data['user_id'] = $this->session->id;
        $request_data['escenario'] = "1";
        $request_data['id_user_added'] = $this->session->id;
        $request_data['date_add'] = $currentDate;
        $request_data["terminal"] =  navegacion($this->request->getUserAgent());
        $request_data["ip"] =  $this->request->getIPAddress();
        $this->session->escenario = 1;
        $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
        if ($response) {
          if (!$response->error) {
            updateScene($this->session->id);
          }
          echo json_encode($response);
        } else {
          echo json_encode(false);
        }
      }
    }
  }
  public function addProbabilidadRiesgo2()
  {
    if ($this->session->logged_in) {
      if (!$this->request->getPost()) {
        return redirect()->to(base_url('/riesgos'));
      } else {
        $currentDate = date("Y-m-d H:i:s");
        $post_endpoint = '/api/addProbabilidadRiesgo2';
        $request_data = [];
        $request_data = $this->request->getPost();
        $request_data['escenario'] = "2";
        $request_data['user_id'] = $this->session->id;
        $request_data['id_user'] = $this->session->id;
        $request_data['id_user_added'] = $this->session->id;
        $request_data['date_add'] = $currentDate;
        $request_data["terminal"] =  navegacion($this->request->getUserAgent());
        $request_data["ip"] =  $this->request->getIPAddress();
        $this->session->escenario = 2;
        $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
        if ($response) {
          if (!$response->error) {
            updateScene($this->session->id);
          }
          echo json_encode($response);
        } else {
          echo json_encode(false);
        }
      }
    }
  }

  public function updateProbabilidadRiesgo1()
  {
    if ($this->session->logged_in) {
      if (!$this->request->getPost()) {
        return redirect()->to(base_url('/riesgos'));
      } else {
        $currentDate = date("Y-m-d H:i:s");

        $post_endpoint = '/api/updateProbabilidadRiesgo1';
        $request_data = [];
        $request_data = $this->request->getPost();
        $request_data['escenario'] = "1";
        $request_data['id_user'] = $this->session->id;
        $request_data['user_id'] = $this->session->id;
        $request_data['id_user_updated'] = $this->session->id;
        $request_data['date_modify'] = $currentDate;
        $request_data["terminal"] =  navegacion($this->request->getUserAgent());
        $request_data["ip"] =  $this->request->getIPAddress();
        $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
        $this->session->escenario = 1;

        if ($response) {
          if (!$response->error) {
            updateScene($this->session->id);
          }
          echo json_encode($response);
        } else {
          echo json_encode(false);
        }
      }
    }
  }
  public function updateProbabilidadRiesgo2()
  {
    if ($this->session->logged_in) {
      if (!$this->request->getPost()) {
        return redirect()->to(base_url('/riesgos'));
      } else {
        $currentDate = date("Y-m-d H:i:s");
        $post_endpoint = '/api/updateProbabilidadRiesgo2';
        $request_data = [];
        $request_data = $this->request->getPost();
        $request_data['escenario'] = "2";
        $request_data['id_user'] = $this->session->id;
        $request_data['user_id'] = $this->session->id;
        $request_data['id_user_updated'] = $this->session->id;
        $request_data['date_modify'] = $currentDate;
        $request_data["terminal"] =  navegacion($this->request->getUserAgent());
        $request_data["ip"] =  $this->request->getIPAddress();
        $this->session->escenario = 2;
        $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
        if ($response) {
          if (!$response->error) {
            updateScene($this->session->id);
          }
          echo json_encode($response);
        } else {
          echo json_encode(false);
        }
      }
    }
  }

  public function deleteProbabilidadRiesgo($id)
  {
    if ($this->session->logged_in) {
      $currentDate = date("Y-m-d H:i:s");

      $post_endpoint = '/api/deleteProbabilidadRiesgo/' . $id;
      $request_data['user_id'] = $this->session->id;
      $request_data['id_user_deleted'] = $this->session->id;
      $request_data['date_deleted'] = $currentDate;
      $request_data["terminal"] =  navegacion($this->request->getUserAgent());
      $request_data["ip"] =  $this->request->getIPAddress();
      $response = (perform_http_request('POST', REST_API_URL . $post_endpoint, $request_data));
      if ($response) {
        if (!$response->error) {
          updateScene($this->session->id);
        }
        echo json_encode($response);
      } else {
        echo json_encode(false);
      }
    }
  }
}
