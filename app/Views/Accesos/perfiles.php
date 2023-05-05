<?=$this->extend('layout/main')?> 
<?=$this->section('content'); $session = session();
$config         = new \Config\Encryption();
$config->key    = KEY;
$config->driver = 'OpenSSL';
$config->cipher = CIPER;
$config ->digest = DIGEST;
$encrypter = \Config\Services::encrypter($config); 

?> 
        <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body ">
                            <div class="row align-items-center">
                                <div class="col-md-4">
                                    <h4 class="card-title">Lista de Perfiles</h4>
                                </div>
                              
                                
                            </div>
                            <div class="row mt-2 d-flex justify-content-between">
                                
                                    <div class="col-md-6">
                                        <div class="row">
                                            
                                            <button type="button" id="btnAgregar_perfil" class=" btn btn-primary waves-effect waves-light" style="display:none"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                        
                                            <div class="col-md-2 w-auto">
                                                <a href="" id="descarga_detalle_perfil" class="descarga" download>
                                                    <img src="<?=base_url('public/images/excel.png') ?>" alt="" height='30' witdh='30'>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                               
                                <div class="col-md-4">
                                    <div class="row g-3 d-flex justify-content-end">
                                        <div class="col-auto">
                                            <label for="" class="col-form-label">Estado</label>
                                        </div>
                                        <div class="col-auto">
                                        <select name="select_estado" id="select_estado" class="form-control">
                                                <?php
                                                if($estado == 'all'){
                                                    echo ("<option value='all' selected>Todos</option>");
                                                    echo ("<option value='1'>Activos</option>");
                                                    echo (" <option value='2'>Inactivos</option>");
                                                }
                                                if($estado == '1'){
                                                    echo ("<option value='all' >Todos</option>");
                                                    echo ("<option value='1' selected>Activos</option>");
                                                    echo (" <option value='2'>Inactivos</option>");
                                                } 
                                                if($estado == '2'){
                                                    echo ("<option value='all' >Todos</option>");
                                                    echo ("<option value='1'>Activos</option>");
                                                    echo (" <option value='2' selected>Inactivos</option>");
                                                }  
                                                ?>
                                                    
                                                   
                                                   
                                            </select>
                                        </div>
                                       
                                    
                                    </div>
                                   
                                </div>
                                <div class="col-md-12" style="margin-top:0.5rem" id="alert_perfil">
                                    
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
                              
                                            <table id="table_perfiles" class="table table-centered table-bordered datatable dt-responsive nowrap  table-striped  m-0" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Evaluador</th>
                                                        
                                                        <th>Nombre del perfil</th>
                                                        <th>Descripción</th>
                                                        <th>Estado</th>
                                                        <th>Estado</th>
                                                        <th style="width: 120px;">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <?php 
                                                        foreach ($perfiles as $key => $value) {
                                                            echo("<tr>");
                                                            echo(" <td>".$value->id_perfil."</td>");
                                                            echo(" <td>".$value->is_user_negocio."</td>");
                                                            echo(" <td>".$value->perfil."</td>");
                                                            echo(" <td>".$value->desc_perfil."</td>");
                                                            if($value->est_perfil == 1){
                                                                echo(" <td>Activo</td>");
                                                               }else{
                                                                echo(" <td>Inactivo</td>");
                                                               }
                                                               echo(" <td>".$value->est_perfil."</td>");
                                                               $cadena = "";
                                                               if($session->permisos[5]->update_det== 1){
                                                                    $cadena = $cadena . "<editPerfil class='text-primary btn btn-opcionTabla' title='Editar'><i class='fas fa-edit font-size-18'></i></editPerfil>";
                                                               }
                                                               if($session->permisos[5]->delete_det == 1){
                                                                    $cadena = $cadena . "<a href='".base_url()."/deletePerfil/".bin2hex($encrypter->encrypt($value->id_perfil))."' class='mr-3 text-danger' title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></a>";
                                                               }
                                                               if($session->permisos[5]->create_det == 1){
                                                                $cadena = $cadena . "<a href='".base_url()."/main/detPerfil/".bin2hex($encrypter->encrypt($value->id_perfil))."' class='btn btn-opcionTabla text-danger' title='Detalle'><i class='fas fa-user-edit font-size-18'></i></a>";
                                                                }
                                                               if($session->permisos[5]->create_det == 0 && $session->permisos[5]->update_det== 0 && $session->permisos[5]->delete_det == 0){
                                                                    $cadena = $cadena ."<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                                                               }
                                                               echo("<td>".$cadena."</td>");
                                                               
                                                            echo("</tr>");
                                                        }
                                                    
                                                    
                                                    ?>
                                                       
                                                  
                                                </tbody>
                                            </table>
                             
                                           
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
              
                <div class="modal fade" id="modal_perfil" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-perfil"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_perfil" class="in-line">
                                    <input type="hidden" id="id_perfil">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Perfil: </span>
                                                        <input type="text" class="form-control form-control-sm" id="nom_perfil"  onkeyup="this.value = this.value.toUpperCase();" onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Descripción: </span>
                                                        <input type="text" class="form-control form-control-sm" id="desc_perfil"  onkeyup="this.value = this.value.toUpperCase();" onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <span>Estado: </span>
                                                        <select name="" id="est_perfil" class="form-control form-control-sm">
                                                        <option value="">Seleccione</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6" id="">
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="opcion_us"  name="opcion_us">
                                                            <label class="form-check-label" for="exampleCheck1">Evaluador</label>
                                                        </div>
                                                </div>
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_Perfil">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_Perfil">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>
               
        </div>
        
        <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
        <script>
              
                 var crear = <?php echo json_encode($crear); ?>;
             
               
        </script>
        <script src="<?=base_url('public/assets/js/perfiles.js'); ?>"></script>
<?=$this->endSection()?> 
