<?=$this->include('layout/header');

$session = session();
$config         = new \Config\Encryption();
$config->key    = KEY;
$config->driver = 'OpenSSL';
$config->cipher = CIPER;
$config ->digest = DIGEST;
$encrypter = \Config\Services::encrypter($config); 


?>

<body data-sidebar="dark" id="body" class="body">
            <header id="page-topbar">
                <div class="navbar-header">
                    <div class="d-flex">
                        <!-- LOGO -->
                        <div class="navbar-brand-box">
                          
                            <a href="index.html" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="<?=base_url('public/images/valtx.png') ?>" alt="" height="20" >
                                </span>
                                <span class="logo-lg">
                                    <img src="<?=base_url('public/images/valtx.png') ?>" alt="" height="60" width="150">
                                </span>
                            </a>
                        </div>

                        <button type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn"  style="color:#fff">
                            <i class="ri-menu-2-line align-middle"></i>
                        </button>

                       
                        
                    </div>

                    <div class="d-flex">

                       
                        <div class="dropdown d-inline-block user-dropdown" >
                            <button type="button" class="btn header-item waves-effect d-flex align-items-center" id="page-header-user-dropdown"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#fff">
                                <img class="rounded-circle header-profile-user" src="<?=base_url('public/images/avatar_login.png') ?>"
                                    alt="Header Avatar">
                               
                                    <span class="d-none d-xl-inline-block ml-3 mr-3 text-left font-size-14" ><?php echo utf8_decode($session->user)?> <br>
                                    <?php echo strtolower(utf8_decode($session->perfil))?></span>
                                    
                                <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <!-- item-->
                                <!-- <a class="dropdown-item" href=""><i class="ri-user-line align-middle mr-1"></i> Perfil</a> -->
                                <a class="dropdown-item" href="<?=base_url('/cambio_clave') ?>"><i class="ri-lock-unlock-line align-middle mr-1"></i> Cambiar contraseña</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item text-danger" id="btn_Logout" href=""><i class="ri-shut-down-line align-middle mr-1 text-danger"></i>Cerrar Sesión</a>
                            </div>
                        </div>

                       
                    </div>
                </div>
            </header>

            <!-- ========== Left Sidebar Start ========== -->
            <div class="vertical-menu">

                <div data-simplebar class="h-100">

                    <!--- Sidemenu -->
                    <div id="sidebar-menu">
                        <!-- Left Menu Start -->
                        <ul class="metismenu list-unstyled" id="side-menu">
                           
                            <li>
                                <a href="<?=base_url('inicio') ?>" class="waves-effect">
                                    <i class=" fas fa-home"></i>
                                    <span>Inicio</span>
                                </a>
                            </li>
                            <?php if($session->permisos){ ?>
                                <?php if($session->permisos[0]->view_det==1){ ?>
                                    <li>
                                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                                        <i class="fa-solid fa-users-gear"></i>
                                            <span>Accesos</span>
                                        </a>
                                        <ul class="sub-menu" aria-expanded="false">  
                                        <?php if($session->permisos[3]->view_det==1){ ?>
                                            <li><a href="<?=base_url('listUsers/all') ?>">Usuarios</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[4]->view_det==1){ ?>
                                            <li><a href="<?=base_url('configPass') ?>">Conf. Contraseña</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[5]->view_det==1){ ?>
                                            <li><a href="<?=base_url('perfiles/all') ?>">Perfiles</a></li>
                                        <?php }?>
                                        
                                        
                                            
                                        </ul>
                                    
                                    </li>
                                <?php }?>
                                <?php if($session->permisos[1]->view_det==1){ ?>
                                    <li>
                                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                                        <i class="fa-solid fa-gear"></i>
                                            <span>Parametrización</span>
                                        </a>
                                        <ul class="sub-menu" aria-expanded="false">  
                                        <?php if($session->permisos[6]->view_det==1){ ?>
                                            <li><a href="<?=base_url('activos') ?>">Activos</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[7]->view_det==1){ ?>
                                            <li><a href="<?=base_url('riesgos') ?>">Riesgos SI-C</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[8]->view_det==1){ ?>
                                            <li><a href="<?=base_url('controles') ?>">Controles</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[9]->view_det==1){ ?>
                                            <li><a href="<?=base_url('planesAccion') ?>">Planes de acción</a></li>
                                        <?php }?>
                                        
                                            
                                        </ul>
                                        
                                    </li>
                                <?php }?>
                                <?php if($session->permisos[2]->view_det==1){ ?>
                                    <li>
                                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                                            <i class="fa-solid fa-clipboard-list"></i>
                                            <span>Evaluación de riesgos de seguridad en procesos de negocio</span>
                                        </a>
                                        <ul class="sub-menu" aria-expanded="false">  
                                        <?php if($session->permisos[10]->view_det==1){ ?>
                                            <li><a href="<?=base_url('inventario-clasificacion-activos') ?>">Inventario y clasificación de activos</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[11]->view_det==1){ ?>
                                            <li><a href="<?=base_url('evaluacion-riesgos') ?>">Evaluación de riesgos SI-C</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[12]->view_det==1){ ?>
                                            <li><a href="<?=base_url('registro-controles') ?>">Registro de controles</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[13]->view_det==1){ ?>
                                            <li><a href="<?=base_url('planAccion') ?>">Registro de plan de acción</a></li>
                                        <?php }?>
                                        
                                            
                                        </ul>
                                        
                                    </li>
                                <?php }?>
                            <?php }else{ ?>
                                <li>
                                    <a href="<?=base_url('inicio') ?>" class="waves-effect">
                                        <i class=" fas fa-home"></i>
                                        <span>Usuario Sin permisos</span>
                                    </a>
                                </li>
                            <?php } ?>
                            
                            <li>

                           

                        </ul>
                    </div>
                    <!-- Sidebar -->
                </div>
            </div>
    <div class="main-content">
        <div id="spinner-div" class="pt-5 mt-5">
              <div class="spinner-border text-primary mr-2" role="status" >
                
              </div>
              <span> Cargando ... </span>
        </div>
        <input type="hidden" name="" id="base_url" value=<?=base_url()?>>
        <input type="hidden" id="perfil" value="<?=$session->perfil?>">
        <input type="hidden" id="tiempo" value="<?=$session->tiempo?>">
        <div class="page-content">
            <div class="container-fluid">
          
            <?=$this->renderSection('content')?>
            </div> <!-- container-fluid -->
        </div>
        
        <?=$this->include('layout/footer')?>
    </div>  
    </body>

</html>