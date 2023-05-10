<?=$this->extend('layout/main')?> 
<?=$this->section('content'); $session = session();?>

<div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body mb-2">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-md-12">                            
                                <h4 class="card-title">Modificar</h4>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_plan">
                                        
                                    </div>
                                     <form action="" id="form_planAccion" class="in-line">
                                          <input type="hidden" id="id_plan" value="<?php echo $id ?>">
                                          
                                        <div class="col-12-lg">
                                                <div class="row">
                                                      
                                                    <div class="col-lg-12">
                                                          <div class="form-group">
                                                              <span>Riesgo asociado: </span>
                                                                <select class="js-riesgos-basic-multiple" name="IDR[]" id="IDR" multiple="multiple">
                                                                    <?php foreach ($riesgo as $key => $value) { 
                                                                        echo("<option value='".$value->id."'>".$value->riesgo."</option>");
                                                                    } ?>         
                                                                </select>
                                                          </div>
                                                    </div>

                                                    <div class="col-lg-12">
                                                          <div class="form-group">
                                                              <span>Control asociado: </span>
                                                              <select class="js-controles-basic-multiple" name="IDC[]" id="IDC" multiple="multiple">
                                                                    <?php foreach ($control as $key => $value) { 
                                                                        echo("<option value='".$value->id."'>".$value->nom_control."</option>");
                                                                    } ?>         
                                                                </select>
                                                          </div>
                                                    </div>
                                            
                                                      
                                                    <div class="col-lg-3">
                                                          <!-- <button type="button" id="btnNuevo_control"  class="float-right btn btn-primary waves-effect waves-light"> Nuevo Control</button>
                                                     -->
                                                        <?php if($session->permisos[12]->create_det==1){ ?>
                                                            <a href="<?=base_url('create-controles'); ?>" class="float-left btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle ml-2"></i>  Agregar</a>
                                                        <?php } ?>
                                                     </div> 
                                                </div>
                                                <div class="row">
                                                            <div class="col-lg-12">
                                                                <h4 class="card-title">   Detalles del plan</h4>
                                                            </div> 
                                                </div>
                                                <div class="row mt-2 mb-2">
                                                        
                                                        
                                                        <!-- <div class="col-lg-6">
                                                            <div class="form-group">  
                                                                                                         
                                                              <input type="text" placeholder="" class="form-control form-control-sm" id="id"  onKeyPress="return soloLetra(event);" disabled>
                                                            </div>
                                                        </div> -->
                                                          
                                                        <div class="col-lg-12">
                                                            
                                                          
                                                            <input type="text" placeholder="Nombre del plan de acción" class="form-control form-control-sm" id="nombre_plan"  onKeyPress="return soloLetra(event);">
                                                        </div>
                                                   
                                                   

                                                       
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                          <div class="form-group">
                                                              <span>Descripción del plan: </span>
                                                              <input type="text" class="form-control form-control-sm" id="descripcion_plan"  onKeyPress="return soloLetra(event);">
                                                          </div>
                                                    </div>
                                                    
                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Fecha inicio: </span>
                                                              <input type="date" class="form-control form-control-sm" id="fecha_inicio_plan" >
                                                          </div>
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Fecha fin: </span>
                                                              <input type="date" class="form-control form-control-sm" id="fecha_fin_plan" >
                                                          </div>
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                            <span>Empresa: </span>
                                                            <select name="" id="id_empresa_pos" class="form-control form-control-sm">
                                                        
                                                            </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Área: </span>
                                                              <select name="" id="id_area_pos" class="form-control form-control-sm">
                                                        
                                                            </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Unidad: </span>
                                                              <select name="" id="id_unidad_pos" class="form-control form-control-sm">
                                                        
                                                                </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Posición: </span>
                                                              <select name="" id="id_puesto" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>                                                              
                                                              </select>
                                                          </div>

                                                          
                                                    </div>




                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Nombre: </span>
                                                              <select name="" id="id_nombre_pos" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>
                                                              </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Prioridad: </span>
                                                              <select name="" id="id_prioridad_pos" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>
                                                              </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Estado: </span>
                                                              <select name="" id="id_estado_pos" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>
                                                              </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Alerta seguimiento: </span>
                                                              <select name="" id="id_alerta_pos" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>
                                                              </select>
                                                          </div>

                                                         
                                                          
                                                    </div>

                                                    <div class="col-md-12 d-flex justify-content-center">
                                                            <button type="button" id="btn_crear_plan" class="btn btn-primary">
                                                                <i class="fas fa-plus-circle mr-2"></i>Modificar plan
                                                            </button>
                                                           
                                                    </div>
                                                    
                                                </div>
                                                    

                                        </div>
                                    </form>
                    
                        </div>
                    </div>
                </div>
                                                       
            </div>
        </div>
              
</div>
                <script>
                    var id_user = <?php echo json_encode($id_user); ?>;
                  
                    var idempresa = <?php echo json_encode($idempresa); ?>;
                    var idarea = <?php echo json_encode($id_area); ?>;
                    var idunidad = <?php echo json_encode($id_unidad); ?>;
                </script>
                
                        <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>

                       <script src="<?=base_url('public/assets/js/planesAccion/cargarDatosCombo.js'); ?>"></script>   
                       <script src="<?=base_url('public/assets/js/planesAccion/updatePlan.js'); ?>"></script>
                    
               

   
</script>
                            
                                                    
                                                    





<?=$this->endSection()?> 