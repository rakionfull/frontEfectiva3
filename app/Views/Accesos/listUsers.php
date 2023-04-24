<?=$this->extend('layout/main')?> 
<?=$this->section('content');  

$session = session();
$config         = new \Config\Encryption();
$config->key    = KEY;
$encrypter = \Config\Services::encrypter($config); 

//  $ecrupt=bin2hex($encrypter->encrypt(5));
//  $ecrupt2=$encrypter->decrypt(hex2bin($ecrupt));

?> 
<div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body ">
                            <div class="row align-items-center">
                                <div class="col-md-4">
                                    <h4 class="card-title">Lista de usuarios</h4>
                                </div>
                              
                               
                            </div>
                            <div class="row mt-2 d-flex justify-content-between">
                                <div class="col-md-2">
                                <?php if($session->permisos[3]->create_det==1){ ?>
                                    <a href="<?=base_url('createUser'); ?>" class="float-left btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle ml-2"></i>  Agregar</a>
                                <?php } ?>
                                 
                               </div>
                               <div class="col-md-2">
                                <?php if($session->permisos[3]->create_det==1){ ?>
                                    
                                    <a href="" id="descarga_users" class="descarga" download>
                                        <img src="<?=base_url('public/images/excel.png') ?>" alt="" height='30' witdh='30'>
                                    </a>
                                <?php } ?>
                                 
                               </div>
                               <div class="col-md-8">
                                    <div class="row g-3 d-flex justify-content-end">
                                        <div class="col-auto">
                                            <label for="inputPassword6" class="col-form-label">Estado</label>
                                        </div>
                                        <div class="col-auto">
                                            <select name="select_estado" id="select_estado" class="form-control">
                                                    <option value="all">Todos</option>
                                                    <option value="1">Activos</option>
                                                    <option value="0">Inactivos</option>
                                            </select>
                                        </div>
                                       
                                    
                                    </div>
                                   
                                    <!-- <a href="<?=base_url('createUser'); ?>" class="float-right btn btn-primary waves-effect waves-light"><i class="fas fa-search align-middle ml-2"></i>  Filtro</a>
                                 -->
                                </div>
                                <div class="col-md-12" style="margin-top:0.5rem" id="alert_formulario">
                                    
                                    </div>
                            </div>
                            <?php 
                               
                                    if($session->getFlashdata('error') != '')
                                    {
                                    echo $session->getFlashdata('error');;
                                    }
                                  
                                ?>
                        </div>
                        <div class="card-body">
                      
                                
                            
                            <div class="table-responsive">
                                            <table id="table_users" class="table table-centered table-bordered datatable dt-responsive nowrap  table-striped  m-0" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Nombres</th>
                                                        <th>Apellidos</th>
                                                        <th>Usuario</th>
                                                        <th>Fecha registro</th>
                                                        <th>Bloqueado</th>
                                                        <th>Estado</th>
                                                        <th>Sesión</th>
                                                        <th style="width: 120px;">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                  
                                                  
                                                </tbody>
                                            </table>
                                        </div>
                        </div>
                        </div>
                       
                    </div>
                </div>
        </div>
       <input type="hidden" id="edit" value="<?php echo($session->permisos[3]->update_det) ?>">
       <input type="hidden" id="delete" value="<?php echo($session->permisos[3]->delete_det) ?>">
       <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/listUsers.js'); ?>"></script>
<?=$this->endSection()?> 
