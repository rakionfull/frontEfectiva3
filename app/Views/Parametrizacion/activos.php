<?=$this->extend('layout/main')?> 
<?=$this->section('content'); $session = session();?> 
        <div class="row">
                <div class="col-4">
                    <div class="card">
                        <div class="card-header activos" >
                                <div class="col-md-12 text-center">
                                    Parametrización de activos
                                </div>
                           
                        </div>
                        <div class="card-body">
                            <div class="row align-items-center">
                                <ul class="menu">
                                        <?php if($session->permisos[14]->view_det==1){ ?>
                                            <li id="empresa" ><a href="#/Empresa" >Empresa</a></li>
                                        <?php }?>
                                        <?php if($session->permisos[15]->view_det==1){ ?>
                                            <li id="area"><a href="#/Area">Área</a></li>
                                       <?php }?>
                                       <?php if($session->permisos[16]->view_det==1){ ?>
                                            <li id="unidades"><a href="#/Unidades">Unidades</a></li>
                                       <?php }?>
                                       <?php if($session->permisos[17]->view_det==1){ ?>
                                            <li id="macroproceso"><a href="#/Macroproceso">Macroprocesos</a></li>
                                       <?php }?>
                                       <?php if($session->permisos[18]->view_det==1){ ?>
                                            <li id="proceso"><a href="#/Proceso">Procesos</a></li>
                                       <?php }?>
                                       <?php if($session->permisos[19]->view_det==1){ ?>
                                            <li id="posicion_puesto"><a href="#/Posicion" >Posición/Puesto</a></li>
                                       <?php }?>
                                       <?php if($session->permisos[20]->view_det==1){ ?>
                                            <li id="aspectoSeg" ><a href="#/AspectoSeg">Aspecto de seguridad</a></li>

                                       <?php }?>
                                       <?php if($session->permisos[21]->view_det==1){ ?>
                                            <li id="valor_activo" ><a href="#/Valor_activo" >Valor de activo</a></li>

                                       <?php }?>
                                       <?php if($session->permisos[22]->view_det==1){ ?>
                                         <li id="valoracion_activo" ><a href="#/Valoracion_activo" >Valoración de activo</a></li>

                                       <?php }?>
                                       <?php if($session->permisos[23]->view_det==1){ ?>
                                        <li  id="tipo_activo"><a href="#/Tipo_activo">Tipo de activo</a></li>

                                       <?php }?>
                                       <?php if($session->permisos[24]->view_det==1){ ?>
                                            <li  id="Categoria_activo"><a href="#/Categoria_activo" >Categoría de activo</a></li>
                                       <?php }?>
                                       <?php if($session->permisos[25]->view_det==1){ ?>
                                            <li id="ubicacion_activo" ><a href="#/Ubicacion_activo" >Ubicación de activo</a></li>
                                       <?php }?>
                                    
                                       <?php if($session->permisos[26]->view_det==1){ ?>
                                        <li id="clasificacion_informacion" ><a href="#/Clasificacion_informacion">Clasificación de información</a></li>

                                       <?php }?>
                                   
                                   
                                   
                                   
                                    
                                  
                                    
                                   
                                    
                                    
                                    
                                  
                                </ul>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div  id="apartEmpresa"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Empresas</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                    
                                        <button type="button" id="btnAgregar_Empresa" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_empresa">
                                        
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
                                                <table id="table_empresa" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>                                                         
                                                            <th>Empresa</th>
                                                            <th>Estado</th>
                                                            <th style="width: 120px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div  id="apartArea"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Áreas</h4>
                                    </div>
                                
                                    
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_area_empresa" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_area_empresa">
                                        
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
                                                <table id="table_area_empresa" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>Id</th>  
                                                            <th>Id</th>   
                                                            <th>Id</th>                                                          
                                                            <th>Área</th>
                                                            <th>Empresa</th>
                                                            <th>Estado</th>
                                                            <th style="width: 120px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                   <!--------------------------------------------------------------------------------------------------------->  

                   <div  id="apartUnidades"  class="opcion" style="display:none">
                    <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Unidades</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_Unidades" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar </button>
                                   </div>
                                    
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_unidades">
                                        
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
                                                <table id="table_unidades" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>Id</th>                                                         
                                                            <th>Unidad</th>
                                                            <th>Empresa</th>
                                                            <th>Área</th>
                                                            <th>Estado</th>
                                                            <th>idempresa</th>
                                                            <th>idarea</th>
                                                            <th style="width: 120px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div  id="apartMacroproceso"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Macroproceso</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_Macroproceso" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar </button>
                                   </div>
                                    
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_macroproceso">
                                        
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
                                                <table id="table_macroproceso" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>Id</th>                                                         
                                                            <th>Macroproceso</th>
                                                            <th>Empresa</th>
                                                            <th>Área</th>
                                                            <th>Unidades</th>
                                                            <th>Estado</th>
                                                            <th>idempresa</th>
                                                            <th>idarea</th>
                                                            <th>idunidad</th>
                                                            <th style="width: 120px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div  id="apartProceso"  class="opcion" style="display:none">
                            <div class="card">
                                <div class="card-body ">
                                    <div class="row align-items-center">
                                        <div class="col-md-4">
                                            <h4 class="card-title">Proceso</h4>
                                        </div>
                                    
                                        <div class="col-md-4 offset-md-4">
                                    
                                            <button type="button" id="btnAgregar_Proceso" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar </button>
                                    </div>
                                        
                                        <div class="col-md-12" style="margin-top:0.5rem" id="alert_proceso">
                                            
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
                                                    <table id="table_proceso" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th>Id</th>                                                         
                                                                <th>Proceso</th>
                                                                <th>Empresa</th>
                                                                <th>Área</th>
                                                                <th>Unidades</th>
                                                                <th>Macroprocesos</th>
                                                                <th>Estado</th>
                                                                <th>idempresa</th>
                                                                <th>idarea</th>
                                                                <th>idunidad</th>
                                                                <th>idmaccroproceso</th>
                                                                <th style="width: 120px;">Mantenimiento</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        
                                                            
                                                        
                                                        </tbody>
                                                    </table>
                                    </div>
                                </div>
                                
                            </div>
                    </div>

                    <div  id="apartAspectoSeg"  class="opcion" style="display:none">
                            <div class="card">
                                <div class="card-body ">
                                    <div class="row align-items-center">
                                        <div class="col-md-4">
                                            <h4 class="card-title">Aspectos de seguridad</h4>
                                        </div>
                                    
                                        <div class="col-md-4 offset-md-4">
                                    
                                            <button type="button" id="btnAgregar_AspectoSeg" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                        
                                        <div class="col-md-12" style="margin-top:0.5rem" id="alert_aspectoSeg">
                                            
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
                                                    <table id="table_aspectoSeg" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th>Id</th>                                                         
                                                                <th>Aspecto</th>
                                                                <th>Estado</th>
                                                                <th style="width: 120px;">Mantenimiento</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        
                                                            
                                                        
                                                        </tbody>
                                                    </table>
                                    </div>
                                </div>
                                
                            </div>
                    </div>

                    <div  id="apartPosicion"  class="opcion" style="display:none">
                            <div class="card">
                                <div class="card-body ">
                                    <div class="row align-items-center">
                                        <div class="col-md-4">
                                            <h4 class="card-title">Posición/Puesto</h4>
                                        </div>
                                    
                                        <div class="col-md-4 offset-md-4">
                                    
                                            <button type="button" id="btnAgregar_Posicion" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                        
                                        <div class="col-md-12" style="margin-top:0.5rem" id="alert_posicion">
                                            
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
                                                    <table id="table_posicion" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th>Id</th>                                                         
                                                                <th>Posicion/Puesto</th>
                                                                <th>idEmpresa</th>
                                                                <th>Empresa</th>
                                                                <th>idarea</th>
                                                                <th>Área</th>
                                                                <th>idunidad</th>
                                                                <th>Unidades</th>
                                                                <th>Estado</th>
                                                                <th style="width: 120px;">Mantenimiento</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        
                                                            
                                                        
                                                        </tbody>
                                                    </table>
                                    </div>
                                </div>
                                
                            </div>
                    </div>

                    


                   <!--------------------------------------------------------------------------------------------------------->  

                    <div  id="apartValor_activo"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                    <h4 class="card-title">Valor de activos</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_ValorActivo" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_valorActivo">
                                        
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
                                                <table id="table_valorActivo" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>                                                         
                                                            <th>Valor</th>
                                                            <th>Estado</th>
                                                            <th style="width: 120px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        
                        </div>
                    </div>
                    
                    <div  id="apartTipo_activo"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Tipo de activos</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_Tipo_activo" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_tipo_activo">
                                        
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
                                                <table id="table_tipo_activo" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>      
                                                            <th>Tipo</th>                                                                                                                                                                               
                                                            <th>Estado</th>
                                                            <th style="width: 120px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                               
                

                    <div  id="apartClasificacion_informacion"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-5">
                                        <h4 class="card-title">Clasificación de información</h4>
                                    </div>
                                
                                    <div class="col-md-3 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_Clas_informacion" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_clas_informacion">
                                        
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
                                                <table id="table_clas_informacion" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>      
                                                            <th>Clasificación</th>
                                                            <th>Descripción</th>                                                                                                                     
                                                            <th>Estado</th>
                                                            <th style="width: 120px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    <!-- valoracion de activo -->
                    <div  id="apartValActivo"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Valoración de activo</h4>

                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_valActivo" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_valActivo">
                                        
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
                                                <table id="table_valActivo" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light" >
                                                        <tr id="cabeceras_control">

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        
                        </div>
                    </div>
                    <!-- Categoria de activo -->
                    <div  id="apartCatActivo"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                    <h4 class="card-title">Categoría de activo</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_catActivo" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_catActivo">
                                        
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
                                                <table id="table_cat_activo" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>   
                                                            <th>Categoría</th>                                                      
                                                            <th>Tipo</th>
                                                            <th>idtipo</th>
                                                            <th>Estado</th>
                                                                                                                     
                                                            <th style="width: 80px;">Mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        
                        </div>
                    </div>

                    <div  id="apartUbiActivo"  class="opcion" style="display:none">
                            <div class="card">
                                <div class="card-body ">
                                    <div class="row align-items-center">
                                        <div class="col-md-4">
                                            <h4 class="card-title">Ubicación de activo</h4>

                                        </div>
                                    
                                        <div class="col-md-4 offset-md-4">
                                    
                                            <button type="button" id="btnAgregar_UbiActivo" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                        
                                        <div class="col-md-12" style="margin-top:0.5rem" id="alert_UbiActivo">
                                            
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
                                                    <table id="table_ubi_activo" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th>Id</th>                                                         
                                                                <th>Continente</th>
                                                                <th>idcontinente</th>
                                                                <th>País</th>
                                                                <th>idpais</th>
                                                                <th>Ciudad</th>
                                                                <th>idciudad</th>
                                                                <th>Dirección</th>
                                                                <th>Descripción</th>
                                                                <th>Estado</th>
                                                                <th style="width: 120px;">Mantenimiento</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        
                                                            
                                                        
                                                        </tbody>
                                                    </table>
                                    </div>
                                </div>
                                
                            </div>
                    </div>
                    
                    <!--------------------------------------------------------------------------------------------------------->      
            </div>
              
               
        </div>
        <!-- modales para registro -->
                <div class="modal fade" id="modal_empresa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-empresa"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_empresa" class="in-line">
                                    <input type="hidden" id="id_empresa">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Nombre de la empresa: </span>
                                                        <input maxlength="250" type="text" class="form-control form-control-sm" id="nom_empresa"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Estado: </span>
                                                        <select name="" id="est_empresa" class="form-control form-control-sm">
                                                        <option value="">Seleccione</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_Empresa">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_Empresa">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>
               
                <div class="modal fade" id="modal_area_empresa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-area"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                      
                                <form action="" id="form_area_empresa" class="in-line">
                                    <input type="hidden" id="id_area_empresa">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                 <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Empresa: </span>
                                                        <select name="" id="select_empresa" class="form-control form-control-sm">
                                                       
                                                        </select>
                                                    </div>
                                                </div>

                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Nombre del área: </span>

                                                        <input maxlength="250" type="text" class="form-control form-control-sm" id="nom_area"   onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>

                                                
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Estado: </span>
                                                        <select name="" id="est_area_empresa" class="form-control form-control-sm">
                                                        <option value="">Seleccione</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_area_empresa">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_area_empresa">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            
                                </div>
                          
                        </div>
                    </div>

                </div>

               
                <!------------------------------------------------------------------------------->

                
                <!-- modal para Aspectos de Seguridad -->
                <div class="modal fade" id="modal_aspectoSeg" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-aspectoSeg"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_aspectoSeg" class="in-line">
                                    <input type="hidden" id="id_aspecto">
                                    
                                    <div class="col-lg-12">
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" placeholder='Aspecto' id="nom_aspecto" onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_aspecto" class="form-control form-control-sm">
                                                        <option value="">Estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_AspectoSeg">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_AspectoSeg">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>

               <!-- modal para Unidades -->
               <div class="modal fade" id="modal_unidades" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-unidades"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_unidades" class="in-line">
                                    <input type="hidden" id="id_unidades">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                
                                                    <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Empresa: </span>
                                                        <select name="" id="select_empresaUnidades" class="form-control form-control-sm">
                                                       
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                

                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Área: </span>
                                                        <select name="" id="select_areaUnidades" class="form-control form-control-sm">
                                                       
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Unidad: </span>
                                                        <input maxlength="50" type="text" class="form-control form-control-sm" id="nom_uni"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Estado: </span>
                                                        <select name="" id="est_uni" class="form-control form-control-sm">
                                                        <option value="">Seleccione</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_Unidades">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_Unidades">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>


                <!-- modal para Valor Activo -->
                <div class="modal fade" id="modal_valorActivo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-valorActivo"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_valorActivo" class="in-line">
                                    <input type="hidden" id="id_valorActivo">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                      
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" id="nom_valor" placeholder="Valor" >
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        
                                                        <select name="" id="est_valor" class="form-control form-control-sm">
                                                        <option value="">Estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_valorActivo">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_valorActivo">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>

                <!-- modal para Macroproceso -->
                <div class="modal fade" id="modal_macroproceso" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-macroproceso"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_macroproceso" class="in-line">
                                    <input type="hidden" id="id_macroproceso">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                
                                            
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <span>Empresa: </span>
                                                            <select name="" id="select_empresaMacro" class="form-control form-control-sm">
                                                        
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <span>Área: </span>
                                                            <select name="" id="select_areaMacro" class="form-control form-control-sm">
                                                        
                                                            </select>
                                                        </div>
                                                    </div>

                                                    
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <span>Unidad: </span>
                                                            <select name="" id="select_unidadesMacro" class="form-control form-control-sm">
                                                        
                                                            </select>
                                                        </div>
                                                    </div>
                                                    
                                        
                                            <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Nombre del macroproceso: </span>
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" id="nom_macroproceso"   onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Estado: </span>
                                                        <select name="" id="est_macroproceso" class="form-control form-control-sm">
                                                        <option value="">Seleccione</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_Macroproceso">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_Macroproceso">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>

                <!-- modal para Procesos -->
                <div class="modal fade" id="modal_proceso" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-proceso"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_proceso" class="in-line">
                                    <input type="hidden" id="id_proceso">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">

                                                <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <span>Empresa: </span>
                                                                    <select name="" id="select_empresaPro" class="form-control form-control-sm">
                                                                    <!--  -->
                                                                    </select>
                                                                </div>
                                                                
                                                            </div>

                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <span>Área: </span>
                                                                    <select name="" id="select_areaPro" class="form-control form-control-sm">
                                                                
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <span>Unidad: </span>
                                                                    <select name="" id="select_unidadesPro" class="form-control form-control-sm">
                                                                
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <span>Macroproceso: </span>
                                                                    <select name="" id="select_MacroprocesosPro" class="form-control form-control-sm">
                                                                
                                                                    </select>
                                                                </div>
                                                            </div>


                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                     <span>Nombre del proceso: </span>

                                                        <input maxlength="150" type="text" class="form-control form-control-sm" id="nom_pro"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Estado: </span>
                                                        <select name="" id="est_pro" class="form-control form-control-sm">
                                                        <option value="">Seleccione</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_Proceso">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_Proceso">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>
                <!-- modal para Tipo Activo -->
                <div class="modal fade" id="modal_tipo_activo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-tipo_activo"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_tipo_activo" class="in-line">
                                    <input type="hidden" id="id_tipo_activo">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                      
                                                        <input maxlength="150" type="text" placeholder="Tipo de activo" class="form-control form-control-sm" id="nom_tipo" onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_tipo" class="form-control form-control-sm">
                                                        <option value="">Estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_tipo_activo">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_tipo_activo">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>
            


            <!-- modal para Clasificacion de Informacion -->
                <div class="modal fade" id="modal_clas_informacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-clas_informacion"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_clas_informacion" class="in-line">
                                    <input type="hidden" id="id_clas">
                                    
                                    <div class="col-lg-12">
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                     
                                                        <input maxlength="150" type="text" placeholder="Clasificación" class="form-control form-control-sm" id="nom_clasificacion" onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_clas_informacion" class="form-control form-control-sm">
                                                        <option value="">Estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <textarea  placeholder="Descripción" maxlength="500" class="form-control form-control-sm" id="descripcion_clasificacion"  cols="30" rows="5"></textarea>
                                                            
                                                        </div>
                                      
                                                </div>
                                               
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_clas_informacion">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_clas_informacion">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>
                 <!-- modal para Posicion/Puesto -->
                <div class="modal fade" id="modal_posicion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-posicion"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_posicion" class="in-line">
                                    <input type="hidden" id="id_posicion">
                                    
                                    <div class="col-lg-12">
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="id_empresa_pos" class="form-control form-control-sm">
                                                        <option value="">Empresa</option>
                                                       
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="id_area_pos" class="form-control form-control-sm">
                                                        <option value="">Area</option>
                                                       
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="id_unidad_pos" class="form-control form-control-sm">
                                                        <option value="">Unidad</option>
                                                       
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" placeholder='Posición/Puesto' id="nom_posicion" onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_posicion" class="form-control form-control-sm">
                                                            <option value="">Estado</option>
                                                            <option value="1">Activo</option>
                                                            <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_Posicion">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_Posicion">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>
                   <!-- modal valoracion de activo-->
                <div class="modal fade" id="modal_valActivo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-valActivo"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_valActivo" class="in-line">
                                    <input type="hidden" id="id_valActivo">
                                    
                                    <div class="col-lg-12">
                                        <div class="">
                                            <div id="contenedor_aspecto">

                                            </div>
                                                <!-- <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="id_aspecto1" class="form-control form-control-sm" disabled>
                                                        <option value="">Aspecto</option>
                                                       
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" placeholder='Valoración' id="nom_val1">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="id_aspecto2" class="form-control form-control-sm" disabled>
                                                        <option value="">Aspecto</option>
                                                       
                                                        </select>
                                                    </div>
                                                    
                                                </div>

                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" placeholder='Valoración' id="nom_val2">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="id_aspecto3" class="form-control form-control-sm" disabled> 
                                                        <option value="">Aspecto</option>
                                                       
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" placeholder='Valoración' id="nom_val3">
                                                    </div>
                                                </div> -->

                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="id_valor_val" class="form-control form-control-sm">
                                                        <option value="">Valor</option>
                                                       
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                <!-- <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_val" class="form-control form-control-sm">
                                                            <option value="">Estado</option>
                                                            <option value="1">Activo</option>
                                                            <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div> -->
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_valActivo">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_valActivo">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>
                </div>
          <!-- modal para Categoria Activo -->
                <div class="modal fade" id="modal_cat_activo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-cat_activo"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_cat_activo" class="in-line">
                                    <input type="hidden" id="id_cat_activo">
                                    
                                    <div class="col-lg-12">
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="idvalor_catActivo" class="form-control form-control-sm">
                                                       
                                                        </select>
                                                </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_catActivo" class="form-control form-control-sm">
                                                        <option value="">Estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                      
                                                        <input maxlength="150" type="text" placeholder="Categoría" class="form-control form-control-sm" id="nom_categoria" onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_cat_activo">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_cat_activo">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>
                 <!-- modal para Categoria Activo -->
                 <div class="modal fade" id="modal_ubi_activo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-ubi_activo"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_ubi_activo" class="in-line">
                                    <input type="hidden" id="id_ubi_activo">
                                    
                                    <div class="col-lg-12">
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="idcontinente" class="form-control form-control-sm">
                                                            <option value="">Continente</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="idpais" class="form-control form-control-sm">
                                                            <option value="">Pais</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="idciudad" class="form-control form-control-sm">
                                                            <option value="">Ciudad</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                      
                                                        <input maxlength="150" type="text" placeholder="Dirección" class="form-control form-control-sm" id="direccion_ubi">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                    <textarea maxlength="150" type="text" placeholder="Descripción del lugar" class="form-control form-control-sm" id="desc_ubi" cols="5"></textarea>


                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_ubi_activo" class="form-control form-control-sm">
                                                        <option value="">Estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                              
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_ubi_activo">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_ubi_activo">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>
                <script>
                    var id_user = <?php echo json_encode($id_user); ?>;
                    var escenario = <?php echo json_encode($escenario); ?>;
                    var idempresa = <?php echo json_encode($idempresa); ?>;
                    var idarea = <?php echo json_encode($idarea); ?>;
                </script> 
        <!------------------------------------------------------------------------------->
        <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/activos.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/empresa.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/area.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/valor_activo.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/tipo_activo.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/clas_informacion.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/aspectoSeg.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/unidades.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/macroproceso.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/proceso.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/posicion.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/valoracion_activo.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/cat_activo.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/activos/ubi_activo.js'); ?>"></script>

       
<?=$this->endSection()?> 