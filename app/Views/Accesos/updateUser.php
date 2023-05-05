<?=$this->extend('layout/main')?> 
<?=$this->section('content');
$session = session();
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
                                                <h4 class="card-title">Modificar Usuario</h4>
                                            </div>
                                            
                                    
                                    </div>
                                    <div class="card-body">
                                    <form  action="<?php echo base_url();?>/updateUser/<?php echo bin2hex($encrypter->encrypt($user->id_us));?>" method="post">
                       
                                           
                                    <div class="row">
                                                <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                        <input type="text" id="usuario_us" name="usuario_us" placeholder="Usuario" class="form-control" value="<?=$user->usuario_us ?>" oninput="this.value = this.value.replace(/[^a-zA-Z0-9]/,'')" readonly>
                                                       
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 mb-2 ">
                                                    <a href="<?php echo base_url('reseteo_pass/'.$user->id_us);?>" class="btn btn-primary btn-sm">Resetear Contraseña</a>
                                                    
                                                       
                                                </div>
                                                <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                       <select name="perfil_us" id="perfil_us" class="form-control">
                                                                <option value="">Perfil de Usuario</option>
                                                                <?php //var_dump($perfiles->data);
                                                                    foreach ($perfiles->data as $key => $value) {
                                                                        if($user->perfil_us == $value->id_perfil)
                                                                        echo'<option value='.$value->id_perfil.' selected>'.$value->perfil.'</option>';
                                                                        else  echo'<option value='.$value->id_perfil.' >'.$value->perfil.'</option>';
                                                                    }
                                                                ?>
                                                                 
                                                       </select>
                                                       <?php if(isset($error->perfil_us)) echo'<div class="error">'.$error->perfil_us.'</div>' ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                        <input type="text" id="nombres_us" placeholder="Nombres" name="nombres_us" class="form-control" value="<?=$user->nombres_us ?>" onKeyPress="return soloLetra(event);">
                                                        <?php if(isset($error->nombres_us)) echo'<div class="error">'.$error->nombres_us.'</div>' ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                        <input type="text" id="apepat_us" name="apepat_us" placeholder="Apellido parterno" class="form-control" value="<?=$user->apepat_us ?>"  onKeyPress="return soloLetra(event);">
                                                        <?php if(isset($error->apepat_us)) echo'<div class="error">'.$error->apepat_us.'</div>' ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                        <input type="text" id="apemat_us" name="apemat_us" placeholder="Apellido materno" class="form-control" value="<?=$user->apemat_us ?>"  onKeyPress="return soloLetra(event);">
                                                        <?php if(isset($error->apemat_us)) echo'<div class="error">'.$error->apemat_us.'</div>' ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                        <input type="text" id="docident_us" name="docident_us" placeholder="DNI" class="form-control" value="<?=$user->docident_us ?>"  onKeyPress="return soloNumero(event);">
                                                        <?php if(isset($error->docident_us)) echo'<div class="error">'.$error->docident_us.'</div>';
                                                        ?>
                                                    </div>
                                                </div>
                                                
                                              
                                                
                                                <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                        <input type="email" id="email_us" name="email_us" placeholder="Correo electrónico" class="form-control " value="<?=$user->email_us ?>">
                                                        <?php if(isset($error->email_us)) echo'<div class="error">'.$error->email_us.'</div>' ?>
                                                    </div>
                                                </div>
                                                
                                                
                                            
                                           
                                            <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                       <select name="id_empresa" id="id_empresa" class="form-control ">
                                                             <?php 
                                                                echo "<option value=''>Empresa</option>";
                                                                if($empresa){
                                                                    foreach ($empresa as $key => $value) {
                                                                        if($value->id == $user->idempresa ) echo "<option value='".$value->id."' selected>".$value->empresa."</option>";
                                                                        else echo "<option value='".$value->id."'>".$value->empresa."</option>";
                                                                    }
                                                                } 
                                                                ?>
                                                       </select>
                                                       
                                                    </div>
                                            </div>
                                           
                                            <div class="col-lg-6 mb-2">
                                                    <div class="form-group">
                                                       
                                                       <select name="id_area" id="id_area" class="form-control">
                                                            <?php 
                                                                echo "<option value=''>Área</option>";
                                                                if($area){
                                                                    foreach ($area as $key => $value) {
                                                                        if($value->id == $user->idarea ) echo "<option value='".$value->id."' selected>".$value->area."</option>";
                                                                        else echo "<option value='".$value->id."'>".$value->area."</option>";
                                                                    }
                                                                }
                                                             
                                                                 
                                                                ?>
                                                       </select>
                                                       
                                                    </div>
                                            </div>
                                            <div class="col-lg-4 mb-2">
                                                    <div class="form-group">
                                                       
                                                       <select name="id_unidad" id="id_unidad" class="form-control">
                                                                <?php 
                                                                echo "<option value=''>Unidad</option>";
                                                                if($unidad){
                                                                    foreach ($unidad as $key => $value) {
                                                                        if($value->id == $user->idunidad ) echo "<option value='".$value->id."' selected>".$value->unidad."</option>";
                                                                        else echo "<option value='".$value->id."'>".$value->unidad."</option>";
                                                                    }
                                                                }
                                                                ?>
                                                               
                                                       </select>
                                                       
                                                    </div>
                                            </div>
                                            <div class="col-lg-4 mb-2">
                                                    <div class="form-group">
                                                       
                                                       <select name="id_puesto" id="id_puesto" class="form-control">
                                                            <?php 
                                                                echo "<option value=''>Posición/Puesto</option>";
                                                                if($posicion){
                                                                    foreach ($posicion as $key => $value) {
                                                                        if($value->id_pos == $user->idposicion ) echo "<option value='".$value->id_pos."' selected>".$value->posicion_puesto."</option>";
                                                                        else echo "<option value='".$value->id_pos."'>".$value->posicion_puesto."</option>";
                                                                    }
                                                                }
                                                                ?>
                                                       </select>
                                                       
                                                    </div>
                                            </div>
                                            <div class="col-lg-4 mb-2">
                                                    <div class="form-group">
                                                       
                                                       <select name="estado_us" id="estado_us" class="form-control">
                                                                <option value="">Estado Usuario</option>
                                                                <?php 
                                                                        if($user->estado_us == 1) {
                                                                            echo "<option value='1' selected>Activo</option>";
                                                                            echo "<option value='0'>Inactivo</option>";
                                                                        }
                                                                        else {echo "<option value='1' >Activo</option>";
                                                                        echo "<option value='0' selected>Inactivo</option>";}
                                                                ?>
                                                              
                                                       </select>
                                                       <?php if(isset($error->estado_us)) echo'<div class="error">'.$error->estado_us.'</div>' ?>
                                                    </div>
                                            </div>
                                           
                                            <div class="col-lg-12 form-group mb-0 d-flex justify-content-end">
                                                <div>
                                                    <a href="  <?php echo base_url('listUsers/all');?>" class="btn btn-danger waves-effect waves-light mr-1">Cancelar</a>
                                                    <button type="submit" class="btn btn-primary waves-effect waves-light mr-1 ">
                                                        Guardar
                                                    </button>
                                                   
                                                    <?php 
                                                        //echo form_reset(array('value' => 'Cancelar', 'class' => 'btn btn-danger waves-effect waves-light mr-1'));
                                                    ?>   
                                                </div>
                                            </div>
                                        </div>
                                           
                                     
                                    </form> 
                                    </div>
                                </div>
                               
                            </div> <!-- end col -->
            </div> <!-- end row -->
            <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>

            <script src="<?=base_url('public/assets/js/acceso/createUser.js'); ?>"></script>
<?=$this->endSection()?> 