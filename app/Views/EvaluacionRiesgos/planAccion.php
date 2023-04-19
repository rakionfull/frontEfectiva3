<?=$this->extend('layout/main')?> 
<?=$this->section('content'); $session = session();?>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-md-4">                            
                                <h4 class="card-title">Registro de plan de acción</h4>

                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                    <?php if($session->permisos[13]->create_det==1){ ?> 
                                        <a href="<?php echo base_url('registrar'); ?>" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i>Agregar</a>
                                    <?php }?>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_plan">
                                        
                                    </div>
                                </div>
                               
                            </div>
                            <div class="card-body">
                        
                                <div class="table-responsive">
                                                <table id="table_planAccion" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>ID</th>
                                                            <th>Nombre del plan de acción</th>
                                                            <th>Nombre del plan de acción</th>
                                                            <th>Actividades</th>
                                                            <th>Responsable</th>
                                                            <th>Estado</th>
                                                            <th>Prioridad</th>
                                                            <th>Fecha inicio</th>
                                                            <th>Fecha fin</th>
                                                            <th>Detalles</th>                                                            
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
    </div>



                <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
                <script src="<?=base_url('public/assets/js/planesAccion/index.js'); ?>"></script>   
       
                <input type="hidden" id="create" value=<?php echo($session->permisos[13]->create_det)?>>
                <input type="hidden" id="update" value=<?php echo($session->permisos[13]->update_det)?>>
                <input type="hidden" id="delete" value=<?php echo($session->permisos[13]->delete_det)?>>
               
                
        


<?=$this->endSection()?> 