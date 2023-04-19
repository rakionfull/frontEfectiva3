<?=$this->extend('layout/main')?> 
<?=$this->section('content');$session = session();?>
        <div class="row">
                <div class="col-4">
                    <div class="card">
                        <div class="card-header activos" >
                                <div class="col-md-12 text-center">
                                    Parametrización plan de acción
                                </div>
                           
                        </div>
                        <div class="card-body">
                            <div class="row align-items-center">
                                <ul class="menu">
                                  
                                    <?php   if($session->permisos[42]->view_det==1){ ?>
                                        <li id="estado" ><a href="#/Estado" >Estado</a></li>
                                    <?php }?>
                                    <?php if($session->permisos[43]->view_det==1){ ?>
                                    <li id="prioridad"><a href="#/Prioridad">Prioridad</a></li>
                                    <?php }?>
                                    <?php if($session->permisos[44]->view_det==1){ ?>
                                        <li id="alertaSeguimiento"><a href="#/AlertaSeguimiento">Alerta de seguimiento</a></li>

                                    <?php }?>
                                </ul>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>

                    <div class="col-lg-8">
                    <div  id="apartEstado"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Estado</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_estado" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_estado">
                                        
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
                                                <table id="table_estado" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>                                                         
                                                            <th>Estado</th>
                                                            <th>Estado</th>
                                                            <th>Estado</th>
                                                            <th>Descripción</th>
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

                    <div class="col-lg-12">
                    <div  id="apartPrioridad"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Prioridad</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_prioridad" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_prioridad">
                                        
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
                                                <table id="table_prioridad" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>    
                                                            <th>ID</th>                                                            
                                                            <th>Valor</th>
                                                            <th>Prioridad</th>
                                                            <th>Descripción</th>
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

                    <div class="col-lg-12">
                    <div  id="apartAlertaSeguimiento"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                    <h4 class="card-title">Alerta de seguimiento</h4>

                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_alerSeguimiento" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alert_alerSeguimiento">
                                        
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
                                                <table id="table_alerSeguimiento" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>ID</th>                                                        
                                                            <th>Alerta</th>
                                                            <th>Alerta</th>                                                           
                                                            <th>Valor</th>
                                                            <th>Descripción</th>
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


                </div>
                        </div>


                        
                    </div>

                </div>


        <!-- modales para registro -->
        <div class="modal fade" id="modal_estado" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-estado"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_estado" class="in-line">
                                    <input type="hidden" id="id_estado">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Nombre del estado: </span>

                                                        <input maxlength="150" type="text" class="form-control form-control-sm" id="nom_est"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Descripciòn: </span>
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" id="des_est"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                                
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                               <button type="button" class="btn btn-primary" id="Agregar_estado">Agregar</button>
                               <button type="button" class="btn btn-primary" id="Modificar_estado">Guardar</button>                            
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>


        <div class="modal fade" id="modal_prioridad" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-prioridad"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_prioridad" class="in-line">
                                    <input type="hidden" id="id_prioridad">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Nombre de la prioridad: </span>

                                                        <input maxlength="150" type="text" class="form-control form-control-sm" id="nom_pri"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Descripciòn: </span>
                                                        <textarea maxlength="150" type="text" class="form-control form-control-sm" id="des_pri" cols="5"></textarea>
                                                    </div>
                                                </div>


                                                
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="Agregar_prioridad">Agregar</button> 
                            <button type="button" class="btn btn-primary" id="Modificar_prioridad">Guardar</button>                            
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>


        <div class="modal fade" id="modal_alerSeguimiento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-alerSeguimiento"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_alerSeguimiento" class="in-line">
                                    <input type="hidden" id="id_alert">
                                    
                                    <div class="col-12-lg">
                                        <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Nombre de la alerta: </span>

                                                        <input maxlength="150" type="text" class="form-control form-control-sm" id="nom_alert"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Valor: </span>
                                                        <input maxlength="150" type="text" class="form-control form-control-sm" id="val_alert">
                                                    </div>
                                                </div>


                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <span>Descripciòn: </span>
                                                        <textarea maxlength="150" cols="5" type="text" class="form-control form-control-sm" id="des_alert"  onKeyPress="return soloLetra(event);"></textarea>
                                                    </div>
                                                </div>
                                                
                                                
                                        </div>
                                    </div>
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_alerSeguimiento">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_alerSeguimiento">Guardar</button>                                
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

                </div>



            
        <!------------------------------------------------------------------------------->
            <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
            <script src="<?=base_url('public/assets/js/planAccion/planAccion.js'); ?>"></script> 
            <script src="<?=base_url('public/assets/js/planAccion/estado.js'); ?>"></script> 
            <script src="<?=base_url('public/assets/js/planAccion/prioridad.js'); ?>"></script> 
            <script src="<?=base_url('public/assets/js/planAccion/alertaSeguimiento.js'); ?>"></script>  
       


<?=$this->endSection()?> 