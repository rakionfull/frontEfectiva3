<?=$this->extend('layout/main')?> -
<?=$this->section('content'); $session = session();?> 
        <div class="row">
                <div class="col-lg-4 ">
                    <div class="card">
                        <div class="card-header activos">
                                <div class="col-md-12 text-center">
                                        Parametrización de controles
                                </div>
                           
                        </div>
                        <div class="card-body">
                            <div class="row align-items-center">
                                <ul class="menu">
                                        <!-- del 40 39 28 37 36 -->
                                            <?php if($session->permisos[37]->view_det==1){ ?>
                                            <li id="Cobertura" ><a href="#/Cobertura" >Cobertura</a></li>
                                            <?php }?>
                                            <?php if($session->permisos[41]->view_det==1){ ?>
                                            <li id="Opcion" ><a href="#/Opcion_general" >Características de control</a></li>
                                           
                                            <div id="caja_caracteristica" class="submenu">
                                            
                                            </div>
                                            <?php }else{ ?>
                                            <div id="caja_caracteristica" class="submenu" style='display:none'>
                                            
                                            </div>
                                            <?php }?>
                                               
                                            <?php if($session->permisos[38]->view_det==1){ ?>
                                            <li id="EvaluacionControl"><a href="#/EvaluacionControl">Evaluación de control</a></li>
                                            <?php }?>
                                            <?php if($session->permisos[39]->view_det==1){ ?>
                                            <li id="aplicProba"><a href="#/AplicacionProbabilidad">Aplicación de la probabilidad</a></li>
                                            <?php }?>
                                            <?php if($session->permisos[40]->view_det==1){ ?>
                                            <li id="aplicImpac"><a href="#/AplicacionImpacto" >Aplicación del impacto</a></li>
                                            <?php }?>
  
                                  
                                </ul>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div  id="apartCobertura"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Cobertura</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_Cobertura" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_cobertura">
                                        
                                    </div>
                                </div>
                
                            </div>
                            <div class="card-body">
                        
                                <div class="table-responsive">
                                                <table id="table_cobertura" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>                                                         
                                                            <th>Cobertura</th>
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
                 
                      <div  id="apartOpcion"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title" id="card-title-opcion"></h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_Opcion" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_Opcion">
                                        
                                    </div>
                                </div>
                
                            </div>
                            <div class="card-body">
                        
                                <div class="table-responsive">
                                                <table id="table_Opcion" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>                                                         
                                                            <th>Característica</th>
                                                            <th>Calificación</th>
                                                            
                                                            <th>Condición</th>
                                                            <th>valor</th>
                                                            <th>Peso</th>
                                                            <th>Descripción</th>
                                                            <th>tipo</th>
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
                    <div  id="apartEvaluacionControl"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Evaluación de control</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_EvaluacionControl" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_EvaluacionControl">
                                        
                                    </div>
                                </div>
                
                            </div>
                            <div class="card-body">
                        
                                <div class="table-responsive">
                                                <table id="table_EvaluacionControl" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr id="cabeceras_control">
                                                           
                                                            <?php 
                                                            //     if($header){
                                                            //       echo ("<th>id</th>"); 
                                                            //       echo ("<th>ID</th>"); 
                                                            //       echo ("<th>calificación</th>"); 
                                                            //         for ($i=3; $i < count($header) ; $i++) { 
                                                            //         echo ("<th>".$header[$i]."</th>"); 
                                                            //         }
                                                            //         echo ("<th>calificación</th>"); 
                                                              
                                                                                                
                                                            // }else{
                                                            //     echo ("<th>id</th>"); 
                                                            //     echo ("<th>ID</th>"); 
                                                            //     echo ("<th>calificacion</th>"); 
                                                            //     echo ("<th>Calificacion de disenio</th>"); 
                                                            //     echo ("<th>Calificacion de operatividad</th>"); 
                                                            //     echo ("<th>calificación</th>"); 
                                                            // } ?>
                                                           
                                                            <!-- <th style="width: 120px;">Mantenimiento</th> -->
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    <?php 
                                                        // if($datos){

                                                       
                                                        // foreach ($datos as $key => $value) { ?>
                                                    <!-- <tr> -->
                                                        <?php 
                                                      
                                                        //      foreach ($header as $key => $value2) {
                                                            
                                                        //      echo ("<td>".$value->$value2."</td>");          
                                                        // } 
                                                       
                                                        // echo ("<td>".$value->calificacion."</td>");   
                                                        ?>  

                                                        <!-- <td style="">
                                                            <editEvaluacionControl class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editEvaluacionControl>
                                                            <deleteEvaluacionControl class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteEvaluacionControl>
                                                        </td> -->
                                                    <!-- </tr> -->
                                                    <?php // }} ?>                                                    
                                                    
                                                    </tbody>
                                                </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div  id="apartAplicacionProbabilidad"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                    <h4 class="card-title">Aplicación de la probabilidad</h4>

                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_AplicacionProbabilidad" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_AplicacionProbabilidad">
                                        
                                    </div>
                                </div>
                
                            </div>
                            <div class="card-body">
                        
                                <div class="table-responsive">
                                                <table id="table_AplicacionProbabilidad" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>       
                                                            <th>idDisenio</th>                                                  
                                                            <th>Calificación total del control</th>
                                                            <th>Posición</th>
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
                    <div  id="apartAplicacionImpacto"  class="opcion" style="display:none">
                        <div class="card">
                            <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                    <h4 class="card-title">Aplicación del impacto</h4>

                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                
                                        <button type="button" id="btnAgregar_AplicacionImpacto" class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</button>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_AplicacionImpacto">
                                        
                                    </div>
                                </div>
                
                            </div>
                            <div class="card-body">
                        
                                <div class="table-responsive">
                                                <table id="table_AplicacionImpacto" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>ID</th>       
                                                            <th>idDisenio</th>                                                  
                                                            <th>Calificación total del control</th>

                                                            <th>Posición</th>
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
        <!-- modales de registro -->

         <div class="modal fade" id="modal_cobertura" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-cobertura"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_cobertura" class="in-line">
                                    <input type="hidden" id="id_cobertura">
                                    
                                   
                                        <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <input type="text" placeholder='Cobertura' class="form-control form-control-sm" id="nom_cobertura"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <input type="text" placeholder='Descripción' class="form-control form-control-sm" id="desc_cobertura"  onKeyPress="return soloLetra(event);">
                                                    </div>
                                                </div>
                                      
                                                
                                        </div>
                                    
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_Cobertura">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_Cobertura">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

        </div>

        <div class="modal fade" id="modal_caractControl" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-caractControl"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_caractControl" class="in-line">
                                    <input type="hidden" id="id_caractControl">
                                    
                                   
                                        <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                    <input type="text" placeholder='Característica' class="form-control form-control-sm" id="nom_caract"  >

                                                    </div>
                                                </div>
                                      
                                                
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <input type="text" placeholder='Descripción' class="form-control form-control-sm" id="desc_caract" >
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_caract" class="form-control form-control-sm">
                                                        <option value="">Estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_CaractControl">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_CaractControl">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

        </div>

     


        <div class="modal fade" id="modal_Opcion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-Opcion"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_Opcion" class="in-line">
                                    <input type="hidden" id="id_Opcion">
                                    
                                   
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <input type="text"  class="form-control form-control-sm" id="nom_opcion"  ">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6" id="apartcali_opcion">
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="cali_opcion">
                                                            <label class="form-check-label" for="exampleCheck1">Calificación</label>
                                                        </div>
                                                </div>
                                                <div class="col-lg-6" id="apartcali2_opcion">
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="cali2_opcion">
                                                            <label class="form-check-label" for="exampleCheck1">Es Calificación</label>
                                                        </div>
                                                </div>
                                                <div class="col-lg-6" id="apartSelec_opcion">
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="selec_opcion">
                                                            <label class="form-check-label" for="exampleCheck1">Seleccionables</label>
                                                        </div>
                                                </div>
                                                <div class="col-lg-6" id="apartCheckTabla_opcion">
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="check_tabla_opcion">
                                                            <label class="form-check-label" for="exampleCheck1">Es Tabla</label>
                                                        </div>
                                                </div>
                                                <div class="col-lg-6" id="apartCheckPeso_opcion">
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="check_peso_opcion">
                                                            <label class="form-check-label" for="exampleCheck1">Peso</label>
                                                        </div>
                                                </div>
                                                <div class="col-lg-6" id="aparNomTabla_opcion">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="nom_tabla" class="form-control form-control-sm">
                                                        <option value="">Selecciona Tabla</option>
                                                        <option value="1">Posición/Puesto</option>
                                                        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6" id="apartpeso_opcion">
                                                    <div class="form-group">
                                                        <input type="number" placeholder='Peso' class="form-control form-control-sm" id="peso_opcion">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6" id="apartvalor_opcion">
                                                    <div class="form-group">
                                                        <input type="number" placeholder='Valor' class="form-control form-control-sm" id="valor_opcion">
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-6" id="apartest_opcion">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="est_opcion" class="form-control form-control-sm">
                                                        <option value="">Estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6" id="apartcondi_opcion">
                                                    <div class="form-group">
                                                 
                                                        <select name="" id="condi_opcion" class="form-control form-control-sm">
                                                        <option value="">Condición</option>
                                                        <option value="=">=</option>
                                                        <option value=">">></option>
                                                        <option value=">=">>=</option>
                                                        <option value="<"><</option>
                                                        <option value="<="><=</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <textarea  cols="30" rows="3" placeholder='Descripción' class="form-control form-control-sm" id="desc_opcion"  onKeyPress="return soloLetra(event);" ></textarea>
                                                        
                                                    </div>
                                                </div>
                                                
                                              
                                               
                                                
                                        </div>
                                    
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_Opcion">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_Opcion">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

        </div>
        <div class="modal fade" id="modal_EvaluacionControl" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-EvaluacionControl"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_EvaluacionControl" class="in-line">
                                    <input type="hidden" id="id_EvaluacionControl">
                                    
                                   
                                        <div class="row" id="contenedor_calificacion">
                                            
                                               
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <select class="form-control form-control-sm" name= "cali_eva" id="cali_eva">
                                                            <option value="">Calificación</option>
                                                            <!-- <option value="Bajo">Bajo</option>
                                                            <option value="Medio">Medio</option>
                                                            <option value="Fuerte">Fuerte</option> -->
                                                        </select>
                                                        <!-- <input type="text" placeholder='Calificacion' class="form-control form-control-sm" id="cali_eva"> -->
                                                    </div>
                                                </div>
                                        </div>
                                    
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_EvaluacionControl">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_EvaluacionControl">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

        </div>
        <div class="modal fade" id="modal_AplicacionProbabilidad" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-AplicacionProbabilidad"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_AplicacionProbabilidad" class="in-line">
                                    <input type="hidden" id="id_AplicacionProbabilidad">
                                    
                                   
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="escenario_proba" class="form-control form-control-sm" disabled>
                                                            <option value="">Escenario</option>
                                                            <?php if($session->escenario == 1){?>   <option value="1" selected>Escenario 1</option>
                                                            <?php }else{ ?>  <option value="2" selected>Escenario 2</option>
                                                            <?php } ?> 
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="disenio_proba" class="form-control form-control-sm">
                                                       
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-12" id="apart_posicion_proba" style="display:none">
                                                    <div class="form-group">
                                                        <!-- <input type="text" placeholder='Posicion'  id="posicion_proba"> -->
                                                        <select name="posicion_proba" id="posicion_proba" class="form-control form-control-sm">
                                                                <option value="">Posicion</option>
                                                                <option value="0">0 Posicion hacia abajo</option>
                                                                <option value="1">1 Posicion hacia abajo</option>
                                                                <option value="2">2 Posiciones hacia abajo</option>
                                                                <option value="3">3 Posiciones hacia abajo</option>
                                                                <option value="4">4 Posiciones hacia abajo</option>
                                                                <option value="5">5 Posiciones hacia abajo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12" id="apart_porcentaje_proba" style="display:none">
                                                    <div class="form-group">
                                                        <input type="text" placeholder='Porcentaje' class="form-control form-control-sm" id="porcentaje_proba">
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <input type="text" placeholder='Descripción' class="form-control form-control-sm" id="desc_proba">
                                                    </div>
                                                </div>
                                        </div>
                                    
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_AplicacionProbabilidad">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_AplicacionProbabilidad">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

        </div>
         <div class="modal fade" id="modal_AplicacionImpacto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                |   <div class="modal-dialog modal-lg" role="document">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="title-AplicacionImpacto"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="form_AplicacionImpacto" class="in-line">
                                    <input type="hidden" id="id_AplicacionImpacto">
                                    
                                   
                                        <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="escenario_impac" class="form-control form-control-sm" disabled>
                                                            <option value="">Escenario</option>
                                                            <option value="">Escenario</option>
                                                            <?php if($session->escenario == 1){?>   <option value="1" selected>Escenario 1</option>
                                                            <?php }else{ ?>  <option value="2" selected>Escenario 2</option>
                                                            <?php } ?> 
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="disenio_impac" class="form-control form-control-sm">
                                                       
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-12" id="apart_posicion_impac" style="display:none">
                                                    <div class="form-group">
                                                        <!-- <input type="text" placeholder='Posicion'  id="posicion_proba"> -->
                                                        <select name="" id="posicion_impac" class="form-control form-control-sm">
                                                                <option value="">Posicion</option>
                                                                 <option value="0">0 Posicion hacia izquierda</option>
                                                                <option value="1">1 Posicion hacia izquierda</option>
                                                                <option value="2">2 Posiciones hacia izquierda</option>
                                                                <option value="3">3 Posiciones hacia izquierda</option>
                                                                <option value="4">4 Posiciones hacia izquierda</option>
                                                                <option value="5">5 Posiciones hacia izquierda</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12" id="apart_porcentaje_impac" style="display:none">
                                                    <div class="form-group">
                                                        <input type="text" placeholder='Porcentaje' class="form-control form-control-sm" id="porcentaje_impac">
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <input type="text" placeholder='Descripcion' class="form-control form-control-sm" id="desc_impac">
                                                    </div>
                                                </div>
                                        </div>
                                    
                                </form>  
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="Agregar_AplicacionImpacto">Agregar</button>
                                <button type="button" class="btn btn-primary" id="Modificar_AplicacionImpacto">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            
                            </div>
                        </div>
                    </div>

        </div>
        <input type="hidden" id="escenario" value=<?php echo($session->escenario)?>>
        <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/controles/controles.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/controles/cobertura.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/controles/opcion.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/controles/EvaluacionControl.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/controles/aplicacionProbabilidad.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/controles/aplicacionImpacto.js'); ?>"></script>
      
<?=$this->endSection()?> 
