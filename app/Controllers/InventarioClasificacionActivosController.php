<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class InventarioClasificacionActivosController extends BaseController
{
    public function index()
    {
        $is_user_negocio = $this->session->is_user_negocio;
        $idempresa = $this->session->idempresa;
        $idarea = $this->session->idarea;
        $idunidad = $this->session->idunidad;
        $id_user = $this->session->id;

        $get_endpoint = '/api/getAreasByActivo';
        $request_data = ['idempresa' => $idempresa];
        $areas = perform_http_request('GET', REST_API_URL . $get_endpoint,$request_data);
        // var_dump($areas);die();

        $get_endpoint = '/api/getAspectoSeg';
        $aspectos =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
        return view('inventarioclasificacionactivos/inventario_clasificacion_activo',[
            'escenario' => $this->session->escenario,
            'is_user_negocio' => $is_user_negocio,
            'idempresa' => $idempresa,
            'idarea' => $idarea,
            'idunidad' => $idunidad,
            'id_user' => $id_user,
            'areas' => $areas->data,
            'aspectos' => $aspectos->data
        ]);
    }

    public function getAll($id){
        if ($this->session->logged_in) {
            if($this->session->is_user_negocio){
                $get_endpoint = '/api/getInventarioClasificacionActivoUser/'.$this->session->id.'/'.$id;
                $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
                if ($response) {
                    echo json_encode($response);
                }
            }else{
                $get_endpoint = '/api/listInventarioClasificacionActivo/'.$id;
                $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
                if ($response) {
                    echo json_encode($response);
                }
            }
        }
    }

    public function get($id){
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getInventarioClasificacionActivo/'.$id;
            $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
            if ($response) {
                echo json_encode($response);
            }
        }
    }

    public function getValorByValoraciones(){
        if ($this->session->logged_in) {
            $get_endpoint = '/api/getvaloracionesporvalor';
            $request_data = $this->request->getPost();
            $response = perform_http_request('POST', REST_API_URL . $get_endpoint, $request_data);
            if ($response) {
                echo json_encode($response);
            }
        }
    }
    public function store(){
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/inventario-clasificacion-activos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/addInventarioClasificacionActivo';
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
                return redirect()->to(base_url('/inventario-clasificacion-activos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/updateInventarioClasificacionActivo/'.$id;
                $request_data = [];
                $request_data = $this->request->getPost();
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
    public function updateStatus($id)
    {
        if ($this->session->logged_in) {
            if (!$this->request->getPost()) {
                return redirect()->to(base_url('/inventario-clasificacion-activos'));
            } else {
                $currentDate = date("Y-m-d H:i:s");
                $post_endpoint = '/api/updateStatus/'.$id;
                $request_data = [];
                $request_data = $this->request->getPost();
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
            $post_endpoint = '/api/deleteInventarioClasificacionActivo/' . $id;
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
    // public function exportExcelICA($id){
    //     try {
    //         $data = [];
    //         if($this->session->is_user_negocio){
    //             $get_endpoint = '/api/getInventarioClasificacionActivoUser/'.$this->session->id.'/'.$id;
    //             $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
    //             if ($response) {
    //                 $data = $response;
    //             }
    //         }else{
    //             $get_endpoint = '/api/listInventarioClasificacionActivo/'.$id;
    //             $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
    //             if ($response) {
    //                 $data = $response;
    //             }
    //         }

    //         $spreadsheet = new Spreadsheet();

    //         $sheet = $spreadsheet->getActiveSheet();
    //         $sheet->setCellValue('A1', 'Id');
    //         $sheet->setCellValue('B1', 'Empresa');
    //         $sheet->setCellValue('C1', 'Area');
    //         $sheet->setCellValue('D1', 'Unidad');
    //         $sheet->setCellValue('E1', 'Macroproceso');
    //         $sheet->setCellValue('F1', 'Proceso');
    //         $sheet->setCellValue('G1', 'Nombre de Activo');
    //         $sheet->setCellValue('H1', 'Descripción de Activo');
    //         $sheet->setCellValue('I1', 'Tipo de Activo');
    //         $sheet->setCellValue('J1', 'Categoría de Activo');
    //         $sheet->setCellValue('K1', 'Ubicación');
    //         $sheet->setCellValue('L1', 'Propietario');
    //         $sheet->setCellValue('M1', 'Custodio');
    //         $sheet->setCellValue('N1', 'Valoracion Confidencialidad');
    //         $sheet->setCellValue('O1', 'Valoracion Integridad');
    //         $sheet->setCellValue('P1', 'Valoracion Disponibilidad');
    //         $sheet->setCellValue('Q1', 'Valor');
    //         $sheet->setCellValue('R1', 'Comentario');
    //         $rows = 2;
    //         // var_dump($data->data);die();
    //         foreach ($data->data as $item){
    //             // var_dump($item);die();
    //             $sheet->setCellValue('A' . $rows, $item->ica_id);
    //             $sheet->setCellValue('B' . $rows, $item->empresa);
    //             $sheet->setCellValue('C' . $rows, $item->area);
    //             $sheet->setCellValue('D' . $rows, $item->unidad);
    //             $sheet->setCellValue('E' . $rows, $item->macroproceso);
    //             $sheet->setCellValue('F' . $rows, $item->proceso);
    //             $sheet->setCellValue('G' . $rows, $item->activo);
    //             $sheet->setCellValue('H' . $rows, $item->desc_activo);
    //             $sheet->setCellValue('I' . $rows, $item->tipo_activo);
    //             $sheet->setCellValue('J' . $rows, $item->categoria_activo);
    //             $sheet->setCellValue('K' . $rows, $item->ubicacion_direccion);
    //             $sheet->setCellValue('L' . $rows, $item->des_propietario);
    //             $sheet->setCellValue('M' . $rows, $item->des_custodio);
    //             $sheet->setCellValue('N' . $rows, $item->val_c);
    //             $sheet->setCellValue('O' . $rows, $item->val_i);
    //             $sheet->setCellValue('P' . $rows, $item->val_d);
    //             $sheet->setCellValue('Q' . $rows, $item->valor);
    //             $sheet->setCellValue('R' . $rows, $item->ica_comentario);
    //             $rows++;
    //         }
    
    //         $writer = new Xlsx($spreadsheet);
    //         $writer->save('inventario_clasificacion_activo.xlsx');
    //         return $this->response->download('inventario_clasificacion_activo.xlsx', null)->setFileName('inventario_clasificacion_activo.xlsx');

    //     } catch (\Throwable $th) {
    //         log_message('error','Error: '.$th->getMessage()." file ".$th->getFile()." Line ".$th->getLine());
    //         //throw $th;
    //     }
    // }
    // public function exportExcelICAHistoricos(){
    //     try {
    //         $data = [];
    //         if($this->session->is_user_negocio){
    //             $get_endpoint = '/api/getAllHistoricosByUser/'.$this->session->id;
    //             $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
    //             if ($response) {
    //                 $data = $response;
    //             }
    //         }else{
    //             $get_endpoint = '/api/getAllHistoricos';
    //             $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
    //             if ($response) {
    //                 $data = $response;
    //             }
    //         }

    //         $spreadsheet = new Spreadsheet();

    //         $sheet = $spreadsheet->getActiveSheet();
    //         $sheet->setCellValue('A1', 'ID Inventario Clasificacion Activo');
    //         $sheet->setCellValue('B1', 'Empresa');
    //         $sheet->setCellValue('C1', 'Area');
    //         $sheet->setCellValue('D1', 'Unidad');
    //         $sheet->setCellValue('E1', 'Macroproceso');
    //         $sheet->setCellValue('F1', 'Proceso');
    //         $sheet->setCellValue('G1', 'Nombre de Activo');
    //         $sheet->setCellValue('H1', 'Descripción de Activo');
    //         $sheet->setCellValue('I1', 'Tipo de Activo');
    //         $sheet->setCellValue('J1', 'Categoría de Activo');
    //         $sheet->setCellValue('K1', 'Ubicación');
    //         $sheet->setCellValue('L1', 'Propietario');
    //         $sheet->setCellValue('M1', 'Custodio');
    //         $sheet->setCellValue('N1', 'Valoracion Confidencialidad');
    //         $sheet->setCellValue('O1', 'Valoracion Integridad');
    //         $sheet->setCellValue('P1', 'Valoracion Disponibilidad');
    //         $sheet->setCellValue('Q1', 'Valor');
    //         $sheet->setCellValue('R1', 'Comentario');
    //         $sheet->setCellValue('S1', 'Estado');
    //         $sheet->setCellValue('T1', 'Fecha');
    //         $rows = 2;
    //         // var_dump($data->data);die();
    //         foreach ($data->data as $item){
    //             // var_dump($item);die();
    //             switch ($item->ica_estado) {
    //                 case 1:
    //                     $estado = 'Borrador';
    //                     break;
    //                 case 2:
    //                     $estado = 'Registrado';
    //                     break;
    //                 case 3:
    //                     $estado = 'Observado';
    //                     break;
    //                 case 4:
    //                     $estado = 'Aprobado';
    //                     break;
    //                 case 5:
    //                     $estado = 'Por Actualizar';
    //                     break;
    //                 default:
    //                     break;
    //             }
    //             $sheet->setCellValue('A' . $rows, $item->ica_id);
    //             $sheet->setCellValue('B' . $rows, $item->empresa);
    //             $sheet->setCellValue('C' . $rows, $item->area);
    //             $sheet->setCellValue('D' . $rows, $item->unidad);
    //             $sheet->setCellValue('E' . $rows, $item->macroproceso);
    //             $sheet->setCellValue('F' . $rows, $item->proceso);
    //             $sheet->setCellValue('G' . $rows, $item->activo);
    //             $sheet->setCellValue('H' . $rows, $item->desc_activo);
    //             $sheet->setCellValue('I' . $rows, $item->tipo_activo);
    //             $sheet->setCellValue('J' . $rows, $item->categoria_activo);
    //             $sheet->setCellValue('K' . $rows, $item->ubicacion_direccion);
    //             $sheet->setCellValue('L' . $rows, $item->des_propietario);
    //             $sheet->setCellValue('M' . $rows, $item->des_custodio);
    //             $sheet->setCellValue('N' . $rows, $item->val_c);
    //             $sheet->setCellValue('O' . $rows, $item->val_i);
    //             $sheet->setCellValue('P' . $rows, $item->val_d);
    //             $sheet->setCellValue('Q' . $rows, $item->valor);
    //             $sheet->setCellValue('R' . $rows, $item->ica_comentario);
    //             $sheet->setCellValue('S' . $rows, $estado);
    //             $sheet->setCellValue('T' . $rows, $item->date_created);
    //             $rows++;
    //         }
    
    //         $writer = new Xlsx($spreadsheet);
    //         $writer->save('inventario_clasificacion_activo_historial.xlsx');
    //         return $this->response->download('inventario_clasificacion_activo_historial.xlsx', null)->setFileName('inventario_clasificacion_activo_historial.xlsx');

    //     } catch (\Throwable $th) {
    //         log_message('error','Error: '.$th->getMessage()." file ".$th->getFile()." Line ".$th->getLine());
    //         //throw $th;
    //     }
    // }
    public function exportExcelICA($id){
        try {
            $data = [];
            if($this->session->is_user_negocio){
                $get_endpoint = '/api/getInventarioClasificacionActivoUser/'.$this->session->id.'/'.$id;
                $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
                if ($response) {
                    $data = $response;
                }
            }else{
                $get_endpoint = '/api/listInventarioClasificacionActivo/'.$id;
                $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
                if ($response) {
                    $data = $response;
                }
            }

            $spreadsheet = new Spreadsheet();
            

            $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
            // $drawing->setPath('.\public\images\valtx.png');
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
            $spreadsheet->getActiveSheet()->setCellValue('B1', 'Reporte de inventario de clasificación de activo');
            
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
            $sheet->setCellValue('B6', 'Empresa');
            $sheet->setCellValue('C6', 'Area');
            $sheet->setCellValue('D6', 'Unidad');
            $sheet->setCellValue('E6', 'Macroproceso');
            $sheet->setCellValue('F6', 'Proceso');
            $sheet->setCellValue('G6', 'Nombre de Activo');
            $sheet->setCellValue('H6', 'Descripción de Activo');
            $sheet->setCellValue('I6', 'Tipo de Activo');
            $sheet->setCellValue('J6', 'Categoría de Activo');
            $sheet->setCellValue('K6', 'Ubicación');
            $sheet->setCellValue('L6', 'Propietario');
            $sheet->setCellValue('M6', 'Custodio');
            $sheet->setCellValue('N6', 'Valoracion Confidencialidad');
            $sheet->setCellValue('O6', 'Valoracion Integridad');
            $sheet->setCellValue('P6', 'Valoracion Disponibilidad');
            $sheet->setCellValue('Q6', 'Valor');
            $sheet->setCellValue('R6', 'Comentario');
            $rows = 7;
            // var_dump($data->data);die();
            foreach ($data->data as $item){
                // var_dump($item);die();
                $sheet->setCellValue('A' . $rows, $item->ica_id);
                $sheet->setCellValue('B' . $rows, $item->empresa);
                $sheet->setCellValue('C' . $rows, $item->area);
                $sheet->setCellValue('D' . $rows, $item->unidad);
                $sheet->setCellValue('E' . $rows, $item->macroproceso);
                $sheet->setCellValue('F' . $rows, $item->proceso);
                $sheet->setCellValue('G' . $rows, $item->activo);
                $sheet->setCellValue('H' . $rows, $item->desc_activo);
                $sheet->setCellValue('I' . $rows, $item->tipo_activo);
                $sheet->setCellValue('J' . $rows, $item->categoria_activo);
                $sheet->setCellValue('K' . $rows, $item->ubicacion_direccion);
                $sheet->setCellValue('L' . $rows, $item->des_propietario);
                $sheet->setCellValue('M' . $rows, $item->des_custodio);
                $sheet->setCellValue('N' . $rows, $item->val_c);
                $sheet->setCellValue('O' . $rows, $item->val_i);
                $sheet->setCellValue('P' . $rows, $item->val_d);
                $sheet->setCellValue('Q' . $rows, $item->valor);
                $sheet->setCellValue('R' . $rows, $item->ica_comentario);
                $rows++;
            }
    
            $writer = new Xlsx($spreadsheet);
            $writer->save('inventario_clasificacion_activo.xlsx');
            return $this->response->download('inventario_clasificacion_activo.xlsx', null)->setFileName('inventario_clasificacion_activo.xlsx');

        } catch (\Throwable $th) {
            log_message('error','Error: '.$th->getMessage()." file ".$th->getFile()." Line ".$th->getLine());
            //throw $th;
        }
    }
    public function exportExcelICAHistoricos($id){
        try {
            $data = [];
            if($this->session->is_user_negocio == 1){
                $get_endpoint = '/api/getAllHistoricosByUser/'.$this->session->id.'/'.$id;
                $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
                if ($response) {
                    $data = $response;
                }
            }else{
                $get_endpoint = '/api/getAllHistoricos/'.$id;
                $response = perform_http_request('GET', REST_API_URL . $get_endpoint, []);
                if ($response) {
                    $data = $response;
                }
            }

            $spreadsheet = new Spreadsheet();
            //$spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
            //

            // Agregar una imagen

            $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
            // $drawing->setPath(base_url().'\public\images\valtx.png');
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
            $spreadsheet->getActiveSheet()->setCellValue('B1', 'Reporte de inventario de clasificación de activo');

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
            $sheet->setCellValue('A6', 'ID Inventario Clasificacion Activo');
            $sheet->setCellValue('B6', 'Empresa');
            $sheet->setCellValue('C6', 'Area');
            $sheet->setCellValue('D6', 'Unidad');
            $sheet->setCellValue('E6', 'Macroproceso');
            $sheet->setCellValue('F6', 'Proceso');
            $sheet->setCellValue('G6', 'Nombre de Activo');
            $sheet->setCellValue('H6', 'Descripción de Activo');
            $sheet->setCellValue('I6', 'Tipo de Activo');
            $sheet->setCellValue('J6', 'Categoría de Activo');
            $sheet->setCellValue('K6', 'Ubicación');
            $sheet->setCellValue('L6', 'Propietario');
            $sheet->setCellValue('M6', 'Custodio');
            $sheet->setCellValue('N6', 'Valoracion Confidencialidad');
            $sheet->setCellValue('O6', 'Valoracion Integridad');
            $sheet->setCellValue('P6', 'Valoracion Disponibilidad');
            $sheet->setCellValue('Q6', 'Valor');
            $sheet->setCellValue('R6', 'Comentario');
            $sheet->setCellValue('S6', 'Estado');
            $sheet->setCellValue('T6', 'Fecha');
            $rows = 7;
            // var_dump($data->data);die();
            foreach ($data->data as $item){
                // var_dump($item);die();
                switch ($item->ica_estado) {
                    case 1:
                        $estado = 'Borrador';
                        break;
                    case 2:
                        $estado = 'Registrado';
                        break;
                    case 3:
                        $estado = 'Observado';
                        break;
                    case 4:
                        $estado = 'Aprobado';
                        break;
                    case 5:
                        $estado = 'Por Actualizar';
                        break;
                    default:
                        break;
                }
                $sheet->setCellValue('A' . $rows, $item->ica_id);
                $sheet->setCellValue('B' . $rows, $item->empresa);
                $sheet->setCellValue('C' . $rows, $item->area);
                $sheet->setCellValue('D' . $rows, $item->unidad);
                $sheet->setCellValue('E' . $rows, $item->macroproceso);
                $sheet->setCellValue('F' . $rows, $item->proceso);
                $sheet->setCellValue('G' . $rows, $item->activo);
                $sheet->setCellValue('H' . $rows, $item->desc_activo);
                $sheet->setCellValue('I' . $rows, $item->tipo_activo);
                $sheet->setCellValue('J' . $rows, $item->categoria_activo);
                $sheet->setCellValue('K' . $rows, $item->ubicacion_direccion);
                $sheet->setCellValue('L' . $rows, $item->des_propietario);
                $sheet->setCellValue('M' . $rows, $item->des_custodio);
                $sheet->setCellValue('N' . $rows, $item->val_c);
                $sheet->setCellValue('O' . $rows, $item->val_i);
                $sheet->setCellValue('P' . $rows, $item->val_d);
                $sheet->setCellValue('Q' . $rows, $item->valor);
                $sheet->setCellValue('R' . $rows, $item->ica_comentario);
                $sheet->setCellValue('S' . $rows, $estado);
                $sheet->setCellValue('T' . $rows, $item->date_created);
                $rows++;
            }
    
            $writer = new Xlsx($spreadsheet);
            $writer->save('inventario_clasificacion_activo_historial.xlsx');
            return $this->response->download('inventario_clasificacion_activo_historial.xlsx', null)->setFileName('inventario_clasificacion_activo_historial.xlsx');

        } catch (\Throwable $th) {
            log_message('error','Error: '.$th->getMessage()." file ".$th->getFile()." Line ".$th->getLine());
            //throw $th;
        }
    }
}