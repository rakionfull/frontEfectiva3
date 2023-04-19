<?=$this->extend('layout/main')?> 
<?=$this->section('content');
$session = session();
?> 

<div class="row">
                <div class="col-12">
                    <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0">Configuración de Contraseña</h4>
                    </div>
                </div>
            </div>
       
            <div class="row">
                            <div class="col-12">
                                <div class="card">
       
                                    <div class="card-body">
                                        <?php 
                                           
                                                if($session->getFlashdata('error') != '')
                                                {
                                                echo $session->getFlashdata('error');;
                                                }
                                        ?>
                                       
                                        <form  action="<?php echo base_url();?>/main/addConfigPass" method="post">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <span> Durabilidad en días (*):</span>
                                                        <input type="number" id="duracion" name="duracion" class="form-control" value="<?=$data['duracion'] ?>">
                                                        <?php if(isset($error->duracion)) echo'<div class="error">'.$error->duracion.'</div>';
                                                        ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <span> Tiempo de sesión (*):</span>
                                                        <input type="number" id="sesion" name="sesion" class="form-control" value="<?=$data['sesion'] ?>">
                                                        <?php if(isset($error->sesion)) echo'<div class="error">'.$error->sesion.'</div>';
                                                        ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <span> Tiempo de inactividad (*):</span>
                                                        <input type="number" id="inactividad" name="inactividad" class="form-control" value="<?=$data['inactividad'] ?>">
                                                        <?php if(isset($error->inactividad)) echo'<div class="error">'.$error->inactividad.'</div>';
                                                        ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <span> Intentos de logueo (*):</span>
                                                        <input type="number" id="intentos" name="intentos" class="form-control" value="<?=$data['intentos'] ?>">
                                                        <?php if(isset($error->intentos)) echo'<div class="error">'.$error->intentos.'</div>';
                                                        ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Configuración especial para la clave:</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <span> Tamaño mínimo de la clave  (*):</span>
                                                        <input type="number" id="tama_min" name="tama_min" class="form-control" value="<?=$data['tama_min'] ?>">
                                                        <?php if(isset($error->tama_min)) echo'<div class="error">'.$error->tama_min.'</div>';
                                                        ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <span> Tamaño máximo de la clave  (*):</span>
                                                        <input type="number" id="tama_max" name="tama_max" class="form-control" value="<?=$data['tama_max'] ?>">
                                                        <?php if(isset($error->tama_max)) echo'<div class="error">'.$error->tama_max.'</div>';
                                                        ?>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 mb-3">
                                                    <div class="custom-control custom-switch mb-2" dir="ltr">
                                                    <?php 
                                                        if(($data['letras']) == 1){
                                                            echo '<input type="checkbox" class="custom-control-input" id="letra_pass" name="letra_pass" checked>';
                                                            echo ' <label class="custom-control-label" for="letra_pass">Clave con letras</label>';
                                                        }else{
                                                            echo '<input type="checkbox" class="custom-control-input" id="letra_pass" name="letra_pass" >';
                                                            echo ' <label class="custom-control-label" for="letra_pass">Clave con letras</label>';
                                                        }
                                                    
                                                    ?>
                                                       
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 mb-3">
                                                    <div class="custom-control custom-switch mb-2" dir="ltr">
                                                    <?php 
                                                        if(($data['caracteres']) == 1){
                                                            echo '<input type="checkbox" class="custom-control-input" id="char_pass" name="char_pass" checked>';
                                                            echo ' <label class="custom-control-label" for="char_pass">Clave con caracteres especiales</label>';
                                                        }else{
                                                            echo '<input type="checkbox" class="custom-control-input" id="char_pass" name="char_pass">';
                                                            echo ' <label class="custom-control-label" for="char_pass">Clave con caracteres especiales</label>';
                                                        }
                                                    
                                                    ?>
                                                       
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 mb-3">
                                                    <div class="custom-control custom-switch mb-2" dir="ltr">
                                                    <?php 
                                                        if(($data['numeros']) == 1){
                                                            echo '<input type="checkbox" class="custom-control-input" id="num_pass" name="num_pass" checked>';
                                                            echo ' <label class="custom-control-label" for="num_pass">Clave con números</label>';
                                                        }else{
                                                            echo '<input type="checkbox" class="custom-control-input" id="num_pass" name="num_pass">';
                                                            echo ' <label class="custom-control-label" for="num_pass">Clave con números</label>';
                                                        }
                                                    
                                                    ?>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="form-group mb-0">
                                                <div>
                                                    <button type="submit" class="btn btn-primary waves-effect waves-light mr-1">
                                                        Guardar
                                                    </button>
                                                    <a href="  <?php echo base_url('inicio');?>" class="btn btn-danger waves-effect waves-light mr-1">Cancelar</a>
                                                   
                                                </div>
                                            </div>
                                                
                                        </form>
                                    </div>
                                </div>
                            </div> <!-- end col -->
            </div> <!-- end row -->
            <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
<?=$this->endSection()?> 