<?=$this->extend('layout/main')?> 
<?=$this->section('content'); $session = session();?>

<div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body mb-2">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-md-12">                            
                                <h4 class="card-title mb-2 ">AGREGAR PLAN DE ACCIÓN</h4>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_plan">
                                        
                                    </div>
                                     <form action="" id="form_planAccion" class="in-line">
                                          <input type="hidden" id="id_actividad">
                                          
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
                                            
                                                      
                                                    <div class="col-lg-12">
                                                        <!-- <button type="button" id="btnNuevo_control"  class="float-right btn btn-primary waves-effect waves-light"> Nuevo Control</button>
                                                         -->
                                                        <?php if($session->permisos[12]->create_det==1){ ?>
                                                            <a href="<?=base_url('create-controles'); ?>" class="float-left btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle ml-2"></i>  Agregar control</a>

                                                        <?php } ?>
                                                    </div> 
                                                </div>
                                                <div class="row mt-3">
                                                            <div class="col-lg-12">
                                                                <h4 class="card-title">   DETALLES DEL PLAN</h4>
                                                            </div> 
                                                </div>
                                                <div class="row mb-2 mt-2">
                                                        
                                                        
                                                        <!-- <div class="col-lg-6">
                                                            <div class="form-group">  
                                                                                                         
                                                              <input type="text" placeholder="" class="form-control form-control-sm" id="id"  onKeyPress="return soloLetra(event);" disabled>
                                                            </div>
                                                        </div>
                                                           -->
                                                        <div class="col-lg-12">
                                                            
                                                          
                                                            <input type="text" placeholder="Nombre del plan de accion" class="form-control form-control-sm" id="nombre_plan"  onKeyPress="return soloLetra(event);">
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

                                                    <!-- <div class="col-md-12 d-flex justify-content-center">
                                                            <button type="button" id="btn_crear_plan" class="btn btn-primary">
                                                                <i class="fas fa-plus-circle mr-2"></i>Crear plan

                                                            </button>
                                                           
                                                    </div> -->
                                                  
                                                        <div class="col-lg-12 form-group mb-0 d-flex justify-content-end">
                                                               
                                                                    <a href="  <?php echo base_url('planAccion');?>" class="btn btn-danger waves-effect waves-light mr-1">Cancelar</a>
                                                                    <button id="btn_crear_plan" class="btn btn-primary waves-effect waves-light mr-1 ">
                                                                                        Guardar
                                                                    </button>
                                                                                
                                                               
                                                        </div>
                                                   
                                                </div>
                                                    

                                        </div>
                                    </form>
                    
                        </div>
                    </div>
                </div>
                <div class="card-body"  id="apart_actividad" style="display:none">
                        <div class="row mb-2">
                                                          <div class="col-lg-10">                                                             
                                                                <h4 class="card-title">Actividades</h4>
                                                              
                                                          </div>     
                                                          <div class="col-lg-2">
                                                            <button type="button" id="btnRegistro_actividades" class="float-right btn btn-primary waves-effect waves-light">
                                                            <i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i>Agregar </button>
                                                          </div>
                                                          <div class="col-md-12" style="margin-top:0.5rem" id="alerta_actividad">
                                        
                                                            </div>
                                                         
                                                         
                        </div>
                        <div class="row" id="apart_mensaje">
                            <div class="col-lg-12 text-center">
                                <span>No tiene actividades registradas</span>
                            </div>
                          
                        </div>
                        <div class="row" id="apart_tabla">
                            <div class="table-responsive">
                                            <table id="table_actividadesPlan" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                <thead class="thead-light">
                                                    <tr>                                                                                                           
                                                    <th>IDA</th>
                                                        <th>idempresa</th>
                                                        <th>idarea</th>
                                                        <th>idunidad</th>
                                                        <th>idposicion</th>
                                                        <th>idusuiaro</th>
                                                        <th>idalerta</th>
                                                        <th>progreso</th>
                                                        <th>Empresa</th>
                                                        <th>Área</th>
                                                        <th>Unidad</th>
                                                        <th>Posición</th>
                                                        <th>Nombres</th>
                                                        <th>Descripción de actividades</th>
                                                        <th>Fecha inicio</th>
                                                        <th>Fecha fin</th>
                                                        <th style="width: 120px;">Mantenimiento</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                
                                            
                                                
                                                </tbody>
                                            </table>
                                                        <!-- </div>
                                                        <div class="col-lg-12">
                                                            <div class="form-group"> 
                                                            <div class="col-lg-7  ">   -->

                                                        <!-- <div class="modal-footer">
                                            <a href="<?php echo base_url('planAccion'); ?>" class="float-right btn btn-danger waves-effect waves-light">Cancelar</a>
                                            <button type="button" class="btn btn-primary" id="Agregar_actividadesPlan">Guardar</button>                                 -->
                                    
                                
                            </div>
                                   
                        </div>
                           
                                              
                                              
                </div>
                                          
            </div>
        </div>
              
</div>
        
<input type="hidden" id="contador" value="<?php echo($contador) ?> ">
     


                



                <div class="modal fade" id="modal_actividadesPlan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-actividadesPlan"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_actividadesPlan" class="in-line">
                                    <input type="hidden" id="id_plan">
                                    <input type="hidden" id="id">
                                    <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <span>Empresa: </span>
                                                                        <select name="" id="id_comboEmpresa" class="form-control form-control-sm">
                                                                    
                                                                        </select>
                                                                    </div>

                                                                    
                                                                </div>

                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <span>Área: </span>
                                                                        <select name="" id="id_comboArea" class="form-control form-control-sm">
                                                                    
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <span>Unidad: </span>
                                                                        <select name="" id="id_comboUnidades" class="form-control form-control-sm">
                                                                    
                                                                            </select>
                                                                    </div>

                                                            
                                                                    
                                                                </div>

                                                                <div class="col-lg-6">
                                                                        <div class="form-group">
                                                                            <span>Posición: </span>
                                                                            <select name="" id="id_comboPosicion" class="form-control form-control-sm">
                                                                            <option value="">Seleccione</option>                                                              
                                                                            </select>
                                                                        </div>

                                                                
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <span>Nombre: </span>
                                                                        <select name="" id="id_comboUsers" class="form-control form-control-sm">
                                                                            <option value="">Seleccione</option>
                                                                        </select>
                                                                    </div>

                                                            
                                                                </div>

                                                                <div class="col-lg-6">
                                                                        <div class="form-group">
                                                                        <span>Descripción actividad: </span>
                                                                            <input type="text" class="form-control form-control-sm" id="descripcion_actividad">
                                                                        </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <span>Fecha inicio: </span>
                                                                        <input type="date" class="form-control form-control-sm" id="fecha_inicio" >
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                            <span>Fecha fin: </span>
                                                                                <input type="date" class="form-control form-control-sm" id="fecha_fin">
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <span>Alerta seguimiento: </span>
                                                                            <select name="" id="id_comboAlert" class="form-control form-control-sm">
                                                                            <option value="">Seleccione</option>
                                                                            </select>
                                                                    </div>

                                                                
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <span>Proceso: </span>
                                                                        <input type="text" class="form-control form-control-sm" id="progreso" onKeyPress="return soloNumero2(event);">
                                                                    </div>
                                                    
                                                                </div>     

                                    </div>
                                    

                  
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_actividad">Agregar</button>  
                                <button type="button" class="btn btn-primary" id="Modificar_actividadesPlan">Guardar</button>                                
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
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



                                      

                             <!------------------------------------------------------------------------------->
                
                             <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
                       <script src="<?=base_url('public/assets/js/planesAccion/cargarDatosCombo.js'); ?>"></script>   
                       <script src="<?=base_url('public/assets/js/planesAccion/actividadesPlan.js'); ?>"></script>
                       <script src="<?=base_url('public/assets/js/planesAccion/registrarPlan.js'); ?>"></script>
               

                   
                     
                            
                                                    
                                                    





<?=$this->endSection()?> 