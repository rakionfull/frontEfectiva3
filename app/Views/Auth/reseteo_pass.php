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
                                                <h4 class="card-title">Cambio de clave</h4>
                                            </div>
                                            
                                    
                                    </div>
                                    <div class="card-body">
                                    <?php 
                                    
                                        if($session->getFlashdata('error') != '')
                                        {
                                        echo $session->getFlashdata('error');
                                        }
                                    ?>
                                 
                               
                                    <form  action="<?php echo base_url();?>/updateClave2/<?php echo bin2hex($encrypter->encrypt($id_us)) ;?>" method="post">
                       
                                           
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Nueva Contraseña (*)</span>
                                                        <input type="password" id="passw" name="passw" class="form-control form-control-sm" value="" >
                                                      
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Confirmar Contraseña (*)</span>
                                                        <input type="password" id="repassw" name="repassw" class="form-control form-control-sm" value="" >
                                                       
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="form-group mb-0">
                                                <div>
                                                    <button type="submit" class="btn btn-primary waves-effect waves-light mr-1">
                                                        Guardar
                                                    </button>
                                                    <a href="  <?php echo base_url('listUsers/all');?>" class="btn btn-danger waves-effect waves-light mr-1">Cancelar</a>
                                                  
                                                </div>
                                            </div>
                               
                                    </form> 
                                    </div>
                                </div>
                            </div> <!-- end col -->
            </div> <!-- end row -->
            <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
<?=$this->endSection()?> 