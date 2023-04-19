<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class EvaluacionRiesgoController extends BaseController
{
    public function index()
    {
        $is_user_negocio = $this->session->is_user_negocio;
        $idempresa = $this->session->idempresa;
        $idarea = $this->session->idarea;
        $id_user = $this->session->id;
        $update = $this->session->permisos[11]->update_det;
         $eliminar = $this->session->permisos[11]->delete_det;
        
        if ($this->session->logged_in) {
            return view('evaluacionriesgos/evaluacion_riesgo',[
                'escenario' => $this->session->escenario,
                'is_user_negocio' => $is_user_negocio,
                'idempresa' => $idempresa,
                'idarea' => $idarea,
                'id_user' => $id_user,
                'update' => $update,
                'eliminar' => $eliminar
            ]);
        }
    }

    public function getEvaluacionRiesgoControlesByEvaluacion($id){
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getEvaluacionRiesgoControlesByEvaluacion/'.$id;
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }
    public function getAll($id){
        if ($this->session->logged_in) {
            $get_endpoint = '/api/listEvaluacionRiesgosExtra/'.$id;
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            
            if ($response) {
                echo json_encode($response);
            }
        }
    }
    public function countByValor(){
        if ($this->session->logged_in) {
            $get_endpoint = '/api/countByValor/';
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }

    public function getById($id){
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getEvaluacionRiesgo/'.$id;
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }



    public function store(){
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/evaluacion_riesgo'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/addEvaluacionRiesgo';
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
    public function store_historial(){
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/evaluacion_riesgo'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/addEvaluacionRiesgoHistorial';
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

    public function update($id)
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/evaluacion_riesgo'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/updateEvaluacionRiesgo/'.$id;
                $request_data = [];
                $request_data = $this->request->getPost();
                // var_dump($request_data);die();
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

    public function delete($id)
    {
        if ($this->session->logged_in) {
            $post_endpoint = '/api/deleteEvaluacionRiesgo/' . $id;
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

    // public function exportExcelEVA($id){
    //     try {
    //         $data = [];
    //         $get_endpoint = '/api/listEvaluacionRiesgos/'.$id;
    //         $file_name = 'evaluacion_riesgo.xlsx';
    //         $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
    //         if ($response) {
    //             $data = $response;
    //         }

    //         $spreadsheet = new Spreadsheet();

    //         $sheet = $spreadsheet->getActiveSheet();
    //         $sheet->setCellValue('A1', 'Id');
    //         $sheet->setCellValue('B1', 'Riesgo');
    //         $sheet->setCellValue('C1', 'Riesgo Absoluto Probabilidad');
    //         $sheet->setCellValue('D1', 'Riesgo Absoluto Impacto');
    //         $sheet->setCellValue('E1', 'Riesgo Absoluto Valor');
    //         $sheet->setCellValue('F1', 'Riesgo Controlado Probabilidad');
    //         $sheet->setCellValue('G1', 'Riesgo Controlado Impacto');
    //         $sheet->setCellValue('H1', 'Riesgo Controlado Valor');
    //         $sheet->setCellValue('I1', 'Estado');
    //         $rows = 2;
    //         // var_dump($data->data);die();
    //         foreach ($data->data as $item){
    //             // var_dump($item);die();
    //             $sheet->setCellValue('A' . $rows, $item->id);
    //             $sheet->setCellValue('B' . $rows, $item->riesgo);
    //             $sheet->setCellValue('C' . $rows, $item->probabilidad);
    //             $sheet->setCellValue('D' . $rows, $item->impacto);
    //             $sheet->setCellValue('E' . $rows, $item->valor);
    //             $sheet->setCellValue('F' . $rows, $item->riesgo_controlado_probabilidad);
    //             $sheet->setCellValue('G' . $rows, $item->riesgo_controlado_impacto);
    //             $sheet->setCellValue('H' . $rows, $item->riesgo_controlado_valor);
    //             $sheet->setCellValue('I' . $rows, $item->estado == '1' ? 'Activo' : 'Inactivo');
    //             $rows++;
    //         }
    
    //         $writer = new Xlsx($spreadsheet);
    //         $writer->save($file_name);
    //         return $this->response->download($file_name, null)->setFileName($file_name);

    //     } catch (\Throwable $th) {
    //         log_message('error','Error: '.$th->getMessage()." file ".$th->getFile()." Line ".$th->getLine());
    //         //throw $th;
    //     }
    // }
    // public function exportExcelEVAHistorial(){
    //     try {
    //         $data = [];
    //         $get_endpoint = '/api/getListHistorial/';
    //         $file_name = 'evaluacion_riesgo_historial.xlsx';
    //         $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
    //         if ($response) {
    //             $data = $response;
    //         }

    //         $spreadsheet = new Spreadsheet();

    //         $sheet = $spreadsheet->getActiveSheet();
    //         $sheet->setCellValue('A1', 'Id');
    //         $sheet->setCellValue('B1', 'Tipo Riesgo');
    //         $sheet->setCellValue('C1', 'Empresa');
    //         $sheet->setCellValue('D1', 'Area');
    //         $sheet->setCellValue('E1', 'Unidad');
    //         $sheet->setCellValue('F1', 'Macroproceso');
    //         $sheet->setCellValue('G1', 'Proceso');
    //         $sheet->setCellValue('H1', 'Activo');
    //         $sheet->setCellValue('I1', 'Tipo de Amenaza');
    //         $sheet->setCellValue('J1', 'Descripcion de Amenaza');
    //         $sheet->setCellValue('K1', 'Tipo de Vulnerabilidad');
    //         $sheet->setCellValue('L1', 'Descripcion de Vulnerabilidad');
    //         $sheet->setCellValue('M1', 'Riesgo');
    //         $sheet->setCellValue('N1', 'Riesgo Absoluto Probabilidad');
    //         $sheet->setCellValue('O1', 'Riesgo Absoluto Impacto');
    //         $sheet->setCellValue('P1', 'Riesgo Absoluto Valor');
    //         $sheet->setCellValue('Q1', 'Riesgo Controlado Probabilidad');
    //         $sheet->setCellValue('R1', 'Riesgo Controlado Impacto');
    //         $sheet->setCellValue('S1', 'Riesgo Controlado Valor');
    //         $sheet->setCellValue('T1', 'Fecha');
    //         $rows = 2;
    //         // var_dump($data->data);die();
    //         foreach ($data->data as $item){
    //             // var_dump($item);die();
    //             $sheet->setCellValue('A' . $rows, $item->id);
    //             $sheet->setCellValue('B' . $rows, $item->tipo_riesgo);
    //             $sheet->setCellValue('C' . $rows, $item->empresa);
    //             $sheet->setCellValue('D' . $rows, $item->area);
    //             $sheet->setCellValue('E' . $rows, $item->unidad);
    //             $sheet->setCellValue('F' . $rows, $item->macroproceso);
    //             $sheet->setCellValue('G' . $rows, $item->proceso);
    //             $sheet->setCellValue('H' . $rows, $item->activo);
    //             $sheet->setCellValue('I' . $rows, $item->tipo_amenaza);
    //             $sheet->setCellValue('J' . $rows, $item->descripcion_amenaza);
    //             $sheet->setCellValue('K' . $rows, $item->tipo_vulnerabilidad);
    //             $sheet->setCellValue('L' . $rows, $item->descripcion_vulnerabilidad);
    //             $sheet->setCellValue('M' . $rows, $item->riesgo);
    //             $sheet->setCellValue('N' . $rows, $item->probabilidad);
    //             $sheet->setCellValue('O' . $rows, $item->impacto);
    //             $sheet->setCellValue('P' . $rows, $item->valor);
    //             $sheet->setCellValue('Q' . $rows, $item->riesgo_controlado_probabilidad);
    //             $sheet->setCellValue('R' . $rows, $item->riesgo_controlado_impacto);
    //             $sheet->setCellValue('S' . $rows, $item->riesgo_controlado_valor);
    //             $sheet->setCellValue('T' . $rows, $item->date_add);
    //             $rows++;
    //         }
    
    //         $writer = new Xlsx($spreadsheet);
    //         $writer->save($file_name);
    //         return $this->response->download($file_name, null)->setFileName($file_name);

    //     } catch (\Throwable $th) {
    //         log_message('error','Error: '.$th->getMessage()." file ".$th->getFile()." Line ".$th->getLine());
    //         //throw $th;
    //     }
    // }
    public function exportExcelEVA($id){
        try {
            $data = [];
            $get_endpoint = '/api/listEvaluacionRiesgos/'.$id;
            $file_name = 'evaluacion_riesgo.xlsx';
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                $data = $response;
            }

            $spreadsheet = new Spreadsheet();


            $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
            // $drawing->setPath('public\images\valtx.png');
            // $drawing->setWidthAndHeight(100, 100);
            // $drawing->setCoordinates('A1');


            // Agregar una imagen
            /*
            $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing();
            $drawing->setName('Logo');
            $drawing->setDescription('Logo');
            $drawing->setImageResource(file_get_contents('public/images/valtx.png'));
            $drawing->setMimeType(\PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing::MIMETYPE_PNG);
            $drawing->setCoordinates('A1');
            $drawing->setWorksheet($sheet);
            */
            //


            // Agregar un encabezado

            $spreadsheet->getActiveSheet()->mergeCells('B1:R2');
            $spreadsheet->getActiveSheet()->setCellValue('B1', 'Reporte Evaluación de Riesgo');

            // Agregar estilo al encabezado
            $spreadsheet->getActiveSheet()->getStyle('B1:R2')->applyFromArray([
                'font' => [
                    'bold' => true,
                    'size' => 18,
                
            ],
                
            ]);

            // Agregar estilo a las columnas A, B y C
            $spreadsheet->getActiveSheet()->getStyle('A6:I6')->applyFromArray([
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
            $sheet->setCellValue('A6', 'Id');
            $sheet->setCellValue('B6', 'Riesgo');
            $sheet->setCellValue('C6', 'Riesgo Absoluto Probabilidad');
            $sheet->setCellValue('D6', 'Riesgo Absoluto Impacto');
            $sheet->setCellValue('E6', 'Riesgo Absoluto Valor');
            $sheet->setCellValue('F6', 'Riesgo Controlado Probabilidad');
            $sheet->setCellValue('G6', 'Riesgo Controlado Impacto');
            $sheet->setCellValue('H6', 'Riesgo Controlado Valor');
            $sheet->setCellValue('I6', 'Estado');
            $rows = 7;
            // var_dump($data->data);die();
            foreach ($data->data as $item){
                // var_dump($item);die();
                $sheet->setCellValue('A' . $rows, $item->id);
                $sheet->setCellValue('B' . $rows, $item->riesgo);
                $sheet->setCellValue('C' . $rows, $item->probabilidad);
                $sheet->setCellValue('D' . $rows, $item->impacto);
                $sheet->setCellValue('E' . $rows, $item->valor);
                $sheet->setCellValue('F' . $rows, $item->riesgo_controlado_probabilidad);
                $sheet->setCellValue('G' . $rows, $item->riesgo_controlado_impacto);
                $sheet->setCellValue('H' . $rows, $item->riesgo_controlado_valor);
                $sheet->setCellValue('I' . $rows, $item->estado == '1' ? 'Activo' : 'Inactivo');
                $rows++;
            }
    
            $writer = new Xlsx($spreadsheet);
            $writer->save($file_name);
            return $this->response->download($file_name, null)->setFileName($file_name);

        } catch (\Throwable $th) {
            log_message('error','Error: '.$th->getMessage()." file ".$th->getFile()." Line ".$th->getLine());
            //throw $th;
        }
    }
    public function exportExcelEVAHistorial($id){
        try {
            $data = [];
            $get_endpoint = '/api/getListHistorial/'.$id;
            $file_name = 'evaluacion_riesgo_historial.xlsx';
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                $data = $response;
            }

            $spreadsheet = new Spreadsheet();


            $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
            // $drawing->setPath('public\images\valtx.png');
            // $drawing->setWidthAndHeight(100, 100);
            // $drawing->setCoordinates('A1');




            // Agregar un encabezado

            $spreadsheet->getActiveSheet()->mergeCells('B1:R2');
            $spreadsheet->getActiveSheet()->setCellValue('B1', 'Reporte Evaluación de Riesgo');

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
            $sheet->setCellValue('A6', 'Id');
            $sheet->setCellValue('B6', 'Tipo Riesgo');
            $sheet->setCellValue('C6', 'Empresa');
            $sheet->setCellValue('D6', 'Area');
            $sheet->setCellValue('E6', 'Unidad');
            $sheet->setCellValue('F6', 'Macroproceso');
            $sheet->setCellValue('G6', 'Proceso');
            $sheet->setCellValue('H6', 'Activo');
            $sheet->setCellValue('I6', 'Tipo de Amenaza');
            $sheet->setCellValue('J6', 'Descripcion de Amenaza');
            $sheet->setCellValue('K6', 'Tipo de Vulnerabilidad');
            $sheet->setCellValue('L6', 'Descripcion de Vulnerabilidad');
            $sheet->setCellValue('M6', 'Riesgo');
            $sheet->setCellValue('N6', 'Riesgo Absoluto Probabilidad');
            $sheet->setCellValue('O6', 'Riesgo Absoluto Impacto');
            $sheet->setCellValue('P6', 'Riesgo Absoluto Valor');
            $sheet->setCellValue('Q6', 'Riesgo Controlado Probabilidad');
            $sheet->setCellValue('R6', 'Riesgo Controlado Impacto');
            $sheet->setCellValue('S6', 'Riesgo Controlado Valor');
            $sheet->setCellValue('T6', 'Fecha');
            $rows = 7;
            // var_dump($data->data);die();
            foreach ($data->data as $item){
                // var_dump($item);die();
                $sheet->setCellValue('A' . $rows, $item->id);
                $sheet->setCellValue('B' . $rows, $item->tipo_riesgo);
                $sheet->setCellValue('C' . $rows, $item->empresa);
                $sheet->setCellValue('D' . $rows, $item->area);
                $sheet->setCellValue('E' . $rows, $item->unidad);
                $sheet->setCellValue('F' . $rows, $item->macroproceso);
                $sheet->setCellValue('G' . $rows, $item->proceso);
                $sheet->setCellValue('H' . $rows, $item->activo);
                $sheet->setCellValue('I' . $rows, $item->tipo_amenaza);
                $sheet->setCellValue('J' . $rows, $item->descripcion_amenaza);
                $sheet->setCellValue('K' . $rows, $item->tipo_vulnerabilidad);
                $sheet->setCellValue('L' . $rows, $item->descripcion_vulnerabilidad);
                $sheet->setCellValue('M' . $rows, $item->riesgo);
                $sheet->setCellValue('N' . $rows, $item->probabilidad);
                $sheet->setCellValue('O' . $rows, $item->impacto);
                $sheet->setCellValue('P' . $rows, $item->valor);
                $sheet->setCellValue('Q' . $rows, $item->riesgo_controlado_probabilidad);
                $sheet->setCellValue('R' . $rows, $item->riesgo_controlado_impacto);
                $sheet->setCellValue('S' . $rows, $item->riesgo_controlado_valor);
                $sheet->setCellValue('T' . $rows, $item->date_add);
                $rows++;
            }
    
            $writer = new Xlsx($spreadsheet);
            $writer->save($file_name);
            return $this->response->download($file_name, null)->setFileName($file_name);

        } catch (\Throwable $th) {
            log_message('error','Error: '.$th->getMessage()." file ".$th->getFile()." Line ".$th->getLine());
            //throw $th;
        }
    }
}