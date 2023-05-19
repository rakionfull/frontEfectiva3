<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" type="image/png" href="<?=base_url('public/images/valtx.png') ?>" sizes="32x32">
  
    <!-- captcha refresh code -->
   
    
   
    <link href="<?=base_url('public/assets/css/myCss.css')?>" rel="stylesheet">
    <link href="<?=base_url('public/assets/libs/bootstrap/css/bootstrap.min.css')?>" rel="stylesheet">
    
    <link href="<?=base_url('public/assets/libs/sweetalert2/sweetalert2.min.css'); ?>" rel="stylesheet"/>
    
    <link href="<?=base_url('public/assets/libs/fontawesone/css/fontawesome.css')?>" rel="stylesheet">
      <link href="<?=base_url('public/assets/libs/fontawesone/css/brands.css')?>" rel="stylesheet">
      <link href="<?=base_url('public/assets/libs/fontawesone/css/solid.css')?>" rel="stylesheet">
    
 
   
    <title>Cambio de clave</title>
  </head>
  <body>
    <div class="contenedor">
      <div class="contenedor_login">
        <div class="contenedor_login_img">
            <img src="<?=base_url('public/images/valtx.png')?>" alt="" class="contenedor_login_img_image">
        </div>
        <div class="v-line"></div>
        <div class="contenedor_login_body">
            
            <div class="contenedor_login_body_head">
                <div class="contenedor_login_body_head_icono">
                    <img src="<?=base_url('public/images/avatar_login.png')?>" alt="">
                </div>
                <div class="contenedor_login_body_head_titulo">
                  <span class="contenedor_login_titulo">Cambio de clave</span>
                </div>
            </div>
           
            <div class="contenedor_login_body_body">
            <?php 
              $session = session();
                if($session->getFlashdata('error') != '')
                {
                  echo $session->getFlashdata('error');;
                }
              ?>
             
                <form  action="<?php echo base_url();?>/updatePass" method="post">
    
                        <div class="input-container">
                          <div class="input-group-append">
                            <input
                                type="password"
                                id="passw"
                                name="passw"
                                class="text-input"
                                autocomplete="off"
                                placeholder=""
                               
                            />
                         
                            <label class="label" for="passw">Contraseña</label>
                                                                                       
                          </div>
                         
                        </div>

                        <div class="input-container">
                          <div class="input-group-append">
                            <input
                                type="password"
                                id="repassw"
                                name="repassw"
                                class="text-input"
                                autocomplete="off"
                                placeholder=""
                               
                                
                            />
                            <label class="label" for="repassw">Confirmar contraseña</label>
                               
                            
                          </div>
                        
                        </div>
                        
                       
                        <div class="col-lg-12">
                          <button type="submit" class="btn btn-primary" style="width:100%">Aceptar</button>
                        </div>
                       
                </form>
               
            </div>
            
        </div>
      </div>
      
    </div>
    
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->

  
    
    
     
    <script src="<?=base_url('public/assets/libs/jquery/jquery-3.7.0.slim.min.js') ?>" ></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>


    <script src="<?=base_url('public/assets/libs/jquery/jquery-3.7.0.min.js') ?>" ></script>
    <script src="<?=base_url('public/assets/js/login/main.js')?>" crossorigin="anonymous"></script>
    <script src="<?=base_url('public/assets/libs/sweetalert2/sweetalert2.min.js'); ?>"></script> 
  </body>
</html>