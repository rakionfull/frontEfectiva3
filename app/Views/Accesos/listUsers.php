<?=$this->extend('layout/main')?> 
<?=$this->section('content');  

$session = session();
$config         = new \Config\Encryption();
$config->key    = KEY;
$config->driver = 'OpenSSL';
$config->cipher = CIPER;
$config ->digest = DIGEST;
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
                                                <?php
                                                if($estado == 'all'){
                                                    echo ("<option value='all' selected>Todos</option>");
                                                    echo ("<option value='1'>Activos</option>");
                                                    echo (" <option value='0'>Inactivos</option>");
                                                }
                                                if($estado == '1'){
                                                    echo ("<option value='all' >Todos</option>");
                                                    echo ("<option value='1' selected>Activos</option>");
                                                    echo (" <option value='0'>Inactivos</option>");
                                                } 
                                                if($estado == '0'){
                                                    echo ("<option value='all' >Todos</option>");
                                                    echo ("<option value='1'>Activos</option>");
                                                    echo (" <option value='0' selected>Inactivos</option>");
                                                }  
                                                ?>
                                                    
                                                   
                                                   
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
                      
                                <?php //var_dump($users) ?>
                            
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
                                                    <?php foreach ($users as $key => $value) {
                                                        echo("<tr>");
                                                       echo(" <td>".$value->id."</td>");
                                                       echo(" <td>".$value->nombres_us."</td>");
                                                       echo(" <td>".$value->apepat_us." ".$value->apemat_us."</td>");
                                                       echo(" <td>".$value->usuario_us."</td>");
                                                       $fecha = strtotime($value->creacion_us); 
                                                       echo(" <td>".date("d-m-Y",  $fecha)."</td>");
                                                      
                                                       if($value->bloqueo_us == 1){
                                                        echo(" <td>Bloqueado</td>");
                                                       }else{
                                                        echo(" <td>Desbloqueado</td>");
                                                       }
                                                       if($value->estado_us == 1){
                                                        echo(" <td>Activo</td>");
                                                       }else{
                                                        echo(" <td>Inactivo</td>");
                                                       }
                                                    //    echo(" <td>".$value->estado_us."</td>");
                                                    //    echo(" <td>".$value->loged."</td>");
                                                       if($value->loged == 1){
                                                        echo(" <td><span class='badge badge-primary font-size-12'>Conectado</span></td>");
                                                       }else{
                                                        echo(" <td><span class='badge badge-danger font-size-12'>Desconectado</span></td>");
                                                       }
                                                       $cadena = "";
                                                       if($session->permisos[3]->update_det== 1){
                                                            $cadena = $cadena . "<a href='".base_url()."/modifyUser/".bin2hex($encrypter->encrypt($value->id))."' class='mr-3 text-primary' title='Editar' ><i class='fas fa-edit font-size-18'></i></a>
                                                            <a href='' id='estado_".$value->id."_".$value->bloqueo_us."' onclick='changeEstadoUser(this, event)'  class='mr-3 text-info' title='Cambio de estado'><i class='fas fa-ban font-size-18'></i></a>";
                                                       }
                                                       if($session->permisos[3]->delete_det == 1){
                                                            $cadena = $cadena . "<a href='".base_url()."/deleteUser/".bin2hex($encrypter->encrypt($value->id))."' class='mr-3 text-danger' title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></a>";
                                                       }
                                                       if($session->permisos[3]->update_det== 0 && $session->permisos[3]->delete_det == 0){
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
     
       <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/listUsers.js'); ?>"></script>
<?=$this->endSection()?> 
