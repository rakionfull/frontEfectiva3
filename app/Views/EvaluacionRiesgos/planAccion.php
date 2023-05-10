<?=$this->extend('layout/main')?> 
<?=$this->section('content'); $session = session();
$config         = new \Config\Encryption();
$config->key    = KEY;
$config->driver = 'OpenSSL';
$config->cipher = CIPER;
$config ->digest = DIGEST;
$encrypter = \Config\Services::encrypter($config); 
?>
<link rel="stylesheet" href="<?=base_url('public/assets/css/evaluacion_riesgos.css'); ?>">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center justify-content-between">
                                    <div class="col-md-4 col-lg-4">                            
                                            <h4 class="card-title">Registro de plan de acción</h4>

                                    </div>
                                    <div class="col-12 col-lg-4 ">
                                        <button onclick="view_planes()" type="button" id="btn_view_planes" class="d-flex align-items-center  float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-info align-middle mr-2 ml-2"></i> Resumen</button>
                                    </div>
                                    <div class="col-md-4 col-lg-4">
                                    <?php if($session->permisos[13]->create_det==1){ ?> 
                                        <a href="<?php echo base_url('registrar'); ?>" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i>Agregar</a>
                                    <?php }?>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_plan">
                                        
                                    </div>
                                </div>
                               
                            </div>
                            <div class="card-body">
                        
                                <div class="table-responsive">
                                                <table id="table_planAccion" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>ID</th>
                                                            <th>Nombre del plan de acción</th>
                                                            <th>Nombre del plan de acción</th>
                                                            <th>Actividades</th>
                                                            <th>Responsable</th>
                                                            <th>Estado</th>
                                                            <th>Prioridad</th>
                                                            <th>Fecha inicio</th>
                                                            <th>Fecha fin</th>
                                                            <th>Detalles</th>                                                            
                                                            <th style="width: 120px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    <?php foreach ($planes as $key => $value) {
                                                        echo("<tr>");
                                                        echo(" <td>".$value->id."</td>");
                                                        echo(" <td>".$value->id."</td>");
                                                        echo(" <td>".$value->id."</td>");
                                                        echo(" <td>".$value->plan_accion."</td>");
                                                        echo(" <td>".$value->actividades."</td>");
                                                        echo(" <td>".$value->responsable."</td>");
                                                        echo(" <td>".$value->estado."</td>");
                                                        echo(" <td>".$value->prioridad."</td>");
                                                        $fecha = strtotime($value->fecha_inicio); 
                                                        echo(" <td>".date("d-m-Y",  $fecha)."</td>");
                                                        $fecha2 = strtotime($value->fecha_fin); 
                                                        echo(" <td>".date("d-m-Y",  $fecha2)."</td>");
                                                     
                                                       $cadena2 = "";
                                                        if($session->permisos[13]->create_det== 1){
                                                            $cadena2 = $cadena2 . "<a href='".base_url()."/verDetalle/".bin2hex($encrypter->encrypt($value->id))."' class='float-right btn btn-primary waves-effect waves-light' >Ver detalle</a>";
                                                        }else{
                                                            $cadena2 = "<i class='fas fa-exclamation-circle text-danger font-size-18'></i>";
                                                        }
                                                        echo("<td>".$cadena2."</td>");
                                                        $cadena = "";
                                                        if($session->permisos[13]->update_det== 1){
                                                                $cadena = $cadena . "<a href='".base_url()."/modificarPlanAccion/".bin2hex($encrypter->encrypt($value->id))."' class='mr-3 text-primary' title='Editar' ><i class='fas fa-edit font-size-18'></i></a>";
                                                        }
                                                        if($session->permisos[13]->delete_det == 1){
                                                                $cadena = $cadena . "<deletePlan class='text-danger btn btn-opcionTabla' title='Eliminar' ><i class='far fa-trash-alt font-size-18'></i></deletePlan>";
                                                        }
                                                        if($session->permisos[13]->update_det== 0 && $session->permisos[3]->delete_det == 0){
                                                                $cadena = $cadena ."<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                                                        }
                                                        echo("<td>".$cadena."</td>");
                                                        
                                                        echo("</tr>");
                                                        }?>
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>



                  




                    </div>
              
               
                </div>
            </div>
        </div>
    </div>

       <!-- MODAL RESUMEN -->
       <div class="modal fade" id="modal_evaluacion_resumen" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Resumen de Planes de Acción</h5>
                        <button id="button_close_modal_resumen" type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body" id="body_resumen_riesgos">
                    <div class="wrapper_resumen_riesgos">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="button_cancel_modal_resumen" type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
       </div>
    </div>



                <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
                <script src="<?=base_url('public/assets/js/planesAccion/index.js'); ?>"></script>   
       
                <!-- <input type="hidden" id="create" value=<?php echo($session->permisos[13]->create_det)?>>
                <input type="hidden" id="update" value=<?php echo($session->permisos[13]->update_det)?>>
                <input type="hidden" id="delete" value=<?php echo($session->permisos[13]->delete_det)?>>
               
                
         -->


<?=$this->endSection()?> 