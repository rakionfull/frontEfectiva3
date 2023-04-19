<?=$this->extend('layout/main')?> 
<?=$this->section('content');$session = session();?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.rtl.min.css" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-md-4">
                            <h4 class="card-title">Inventario y clasificación de activo</h4>

                        </div>
                        <div class="d-flex">
                            <div class="col-md-6">
                               <a href="<?= base_url('exportExcelICAHistoricos/'.$session->idempresa)?>"class="d-flex align-items-center float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-download align-middle mr-2 ml-2"></i> Exportar históricos</a>

                            </div>
                            <div class="col-md-3">
                                <a href="<?= base_url('exportExcelICA/'.$session->idempresa)?>"class="d-flex align-items-center float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-download align-middle mr-2 ml-2"></i> Exportar</a>
                            </div>
                            <?php
                               
                                if($is_user_negocio){
                                    echo '
                                        <div class="col-md-3">
                                            <button type="button" id="btn_add_ica" class="d-flex align-items-center  float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                        </div>
                                    ';
                                }
                            ?>
                        </div>
                        
                        <div class="col-12" style="margin-top:0.5rem" id="alerta_inventario_clasificacion_activo">
                        </div>
                    </div>
                    <?php 
                        $session = session();
                        if($session->getFlashdata('error') != '')
                        {
                        echo $session->getFlashdata('error');;
                        }
                    ?>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="table_inventario_clasificacion_activo" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                            <thead class="thead-light">
                                <tr>
                                    <th rowspan="2">
                                        <input type="checkbox" style="width: 2vw;" id="check_ica_all">
                                    </th>
                                    <th rowspan="2">ID</th>
                                    <th colspan="12" class="text-center">Descripción</th>
                                    <th colspan="3" class="text-center">Valoración</th>
                                    <th rowspan="2">Valor</th>
                                    <th rowspan="2">Estado</th>
                                    <th rowspan="2">Estado 2</th>
                                    <th rowspan="2">Comentario</th>
                                    <th rowspan="2" style="width: 120px;">Mantenimiento</th>
                                </tr>
                                <tr>
                                    <th>Empresa</th>
                                    <th>Área</th>
                                    <th>Unidad</th>
                                    <th>Macroproceso</th>
                                    <th>Proceso</th>
                                    <th>Nombre de activo</th>
                                    <th>Descripción de activo</th>
                                    <th>Tipo de activo</th>
                                    <th>Categoría de activo</th>
                                    <th>Ubicación</th>
                                    <th>Propietario</th>
                                    <th>Custodio</th>
                                    <th>C</th>
                                    <th>I</th>
                                    <th>D</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="wrapper_buttons_status mt-2" style="display:none;gap:1vw;">
                        <?php
                            if($is_user_negocio){
                                echo '
                                    <button onclick="changeStatus(this)" estado="1" class="d-flex align-items-center  float-right btn btn-primary waves-effect waves-light">Borrador</button>
                                    <button onclick="changeStatus(this)" estado="2" class="d-flex align-items-center  float-right btn btn-primary waves-effect waves-light">Registrado</button>
                                ';
                            }else{
                                echo '
                                    <button onclick="changeStatus(this)" estado="3" class="d-flex align-items-center  float-right btn btn-primary waves-effect waves-light">Observado</button>
                                    <button onclick="changeStatus(this)" estado="4" class="d-flex align-items-center  float-right btn btn-primary waves-effect waves-light">Aprobado</button>
                                    <button onclick="changeStatus(this)" estado="5" class="d-flex align-items-center  float-right btn btn-primary waves-effect waves-light">Por Actualizar</button>
                                ';
                            }

                        ?>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL CREATE INVENTARIO CLASIFICACION ACTIVO -->
    <div class="modal fade" id="modal_inventario_clasificacion_activo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="title_ica"></h5>
                        <button id="button_close_modal_ica_x" type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body">
                    <form id="form_ica" class="in-line">
                        <input type="hidden" id="id_ica">
                        <div class="col-12-lg">
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Empresa: </span>
                                        <select required name="" id="empresa" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Área: </span>
                                        <select required name="" id="area" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Unidad: </span>
                                        <select required name="" id="unidad" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Macroproceso: </span>
                                        <select required name="" id="macroproceso" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Proceso: </span>
                                        <select required name="" id="proceso" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Nombre de activo: </span>
                                        <input maxlength="150" required type="text" class="form-control form-control-sm" id="activo">
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Descripción de activo: </span>
                                        <input maxlength="500" required type="text" class="form-control form-control-sm" id="desc_activo">
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Tipo de activo: </span>
                                        <select required name="" id="tipo_activo" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Categoría de activo: </span>
                                        <select required name="" id="categoria_activo" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Ubicación de activo: </span>
                                        <select required name="" id="ubicacion_activo" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Propietario: </span>
                                        <select required name="" id="propietario" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Custodio: </span>
                                        <div class="input_group d-flex align-items-center justify-content-between">
                                            <select required name="" id="custodio" class="form-control form-control-sm">
                                                <option value="">Seleccione</option>
                                            </select>
                                            <i id="icon_search_custodio" class="fa-solid fa-magnifying-glass-plus mr-2 ml-2 fa-lg" style="cursor: pointer;"></i>
                                        </div>
                                    </div>
                                    <div class="row col-12" style="display: none;"  id="section_search_custodio">
                                        <div class="form-group col-6">
                                            <span>Área: </span>

                                            <select required name="" id="area_custodio" class="form-control form-control-sm">
                                                <option value="">Seleccione</option>
                                                <?php for ($i=0; $i < count($areas); $i++) { 
                                                    echo '<option value='.$areas[$i]->id.'>'.$areas[$i]->area.'</option>';
                                                }?>
                                            </select>
                                        </div>
                                        <div class="form-group col-6">
                                            <span>Unidad: </span>
                                            <select required name="" id="unidad_custodio" class="form-control form-control-sm">
                                                <option value="">Seleccione</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Valoración de confidencialidad: </span>
                                        <select required name="" id="val_c" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Valoración de integridad: </span>
                                        <select required name="" id="val_i" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Valoración de disponibilidad: </span>
                                        <select required name="" id="val_d" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Valor: </span>
                                        <select disabled required name="" id="valor" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Comentario: </span>
                                        <input maxlength="500" type="text" class="form-control form-control-sm" required id="comentario">
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Estado: </span>
                                        <select required name="" id="estado" class="form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                            <?php
                                                if($is_user_negocio){
                                                    echo '
                                                        <option value="1">Borrador</option>
                                                        <option value="2">Registrado</option>
                                                        <option value="7">Inactivo</option>
                                                    ';
                                                }else{
                                                    echo '
                                                        <option value="3">Observado</option>
                                                        <option value="4">Aprobado</option>
                                                        <option value="5">Por Actualizar</option>
                                                        <option value="7">Inactivo</option>
                                                    ';
                                                }
                                            ?>
                                            
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <span>Estado 2</span>
                                        <select required name="estado_2" id="estado_2" class="form-control form-control-sm">
                                            <option value="1">Activo</option>
                                            <option value="2">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 input_observacion" style="display:none;">
                                    <div class="form-group">
                                        <span>Observación: </span>
                                        <textarea maxlength="200" id="observacion" class="form-control form-control-sm"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>  
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="add_ica">Agregar</button>
                    <button type="button" class="btn btn-primary" id="update_ica">Guardar</button>
                    <button id="button_close_modal_ica" type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END MODAL CREATE INVENTARIO CLASIFICACION ACTIVO-->
   
    <script>
        var id_user = <?php echo json_encode($id_user); ?>;
        var escenario = <?php echo json_encode($escenario); ?>;
        // console.log(escenario);
        var is_user_negocio = <?php echo json_encode($is_user_negocio); ?>;
        var idempresa = <?php echo json_encode($idempresa); ?>;
        var idarea = <?php echo json_encode($idarea); ?>;
        var idunidad = <?php echo json_encode($idunidad); ?>;
    </script>
     <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
    <script src="<?=base_url('public/assets/js/inventario_clasificacion_activo/index.js'); ?>"></script>
<?=$this->endSection()?> 