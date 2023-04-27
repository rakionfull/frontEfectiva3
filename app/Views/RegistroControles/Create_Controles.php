<?=$this->extend('layout/main')?> 
<?=$this->section('content'); $session = session();?> 

<div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-12">
                                        <h4 class="card-title">REGISTRO DE INVENTARIO DE CONTROLES</h4>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_Controles">
                                        
                                    </div>
                                   
                                    
                                </div>
                                
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="IDC" value="<?php echo($last_id) ?>" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="control" placeholder="Nombre del Control">
                                    </div>
                                </div>
                            </div>
                            
                            
                       
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h5 class="card-title" style="margin: 1rem 1rem 2rem 0rem;">RIESGO ASOCIADO</h5>
                                </div>
    
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <!-- <select name="IDR" id="IDR" class="form-control">
                                            <option value="">IDR</option>
                                            
                                        </select> -->
                                        <select class="js-riesgos-basic-multiple" name="IDR[]" id="IDR" multiple="multiple">
                                            <?php foreach ($riesgo as $key => $value) { 
                                                echo("<option value='".$value->id."'>".$value->riesgo."</option>");
                                             } ?>         
                                        </select>
                                    </div>
                                </div>
                                <!-- <div class="col-lg-8">
                                    <div class="form-group">
                            
                                        <input type="text" class="form-control" id="riesgo" placeholder="Nombre del Riesgo" value='RIESGO 1' readonly>
                                    </div>
                                </div> -->
                            </div>
                            
                            
                       
                        </div>
                     
                        <div class="card-body">
                            <?php  foreach ($menu->data as $key => $value) { ?>
                              <div class="row">
                                    <div class="col-lg-3">
                                        <h5 class="card-title general" style="margin: 1rem 1rem 2rem 0rem;" id="<?php echo($value->id) ?>"> <?php echo(strtoupper($value->caracteristica)) ?>  </h5>
                                       
                                    </div>
                                    <div class="col-lg-3">
                                        <h5 class="card-title"  style="margin: 1rem 1rem 2rem 0rem;" id="resultado_<?php echo($value->id) ?>"> </h5>
                                       
                                    </div>
                                    <div class="col-lg-4">
                                        <button id="cali_<?php echo($value->id) ?>_<?php echo($value->seleccionable) ?>  " class="btn btn-primary waves-effect waves-light mr-1 calificar" style="margin: 1rem 1rem 1rem 0rem">Calificar</button>
                                    </div>
                              </div>
                              <div class="row">
                                <?php foreach ($submenu->data as $key => $value2) { 
                                     if($value->id ==$value2->idOpcion ){  
                                        if($value->seleccionable == 0){
                                            if($value2->seleccionable == 0){
                                               
                                ?> 
                                        <div class="col-lg-12" style="padding: 10px;background: #eff2ff;margin: 1rem 1rem 2rem 0rem">
                                            <span class="card-title"><?php echo($value2->caracteristica) ?> :</span>
                                        </div>
                                        <?php  foreach ($opcion->data as $key => $value3) { 
                                        if($value2->id ==$value3->idOpcion ){
                                            if($value3->check_tabla == 0) {  
                                        ?> 
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <input type="text" class="form-control valor" id="opcion_<?php echo($value3->id) ?>_<?php echo($value->id) ?>_<?php echo($value2->seleccionable) ?>_0" placeholder="<?php echo($value3->caracteristica) ?>">
                                                        </div>
                                                    
                                                    </div>  
                                        <?php  }else{  ?>
                                                    <div class="col-lg-6" style="margin-bottom:1rem">
                                                        
                                                        <select name="<?php echo($value3->caracteristica) ?>" id="opcion_<?php echo($value3->id) ?>_<?php echo($value->id) ?>_<?php echo($value2->seleccionable) ?>_<?php echo($value3->nom_tabla) ?>" class="form-control tabla valor">
                                                            <option value=""><?php echo($value3->caracteristica) ?></option>
                                                            
                                                                
                                                        </select>
                                                    </div>
                                        <?php   }  } }   ?> 
                                <?php  }else{   ?>
                                                        <div class="col-lg-12" style="padding: 10px;background: #eff2ff;font-weight: bold;margin: 1rem 1rem 2rem 0rem">
                                                            <span class="card-title"><?php echo($value2->caracteristica) ?> :</span>
                                                        </div>
                                                        <div class="col-lg-6" style="margin-bottom:1rem">
                                                        
                                                                <select name="" id="opcion_<?php echo($value2->id) ?>_<?php echo($value->id) ?>_<?php echo($value2->seleccionable) ?>_0" class="form-control valor">
                                                                    <option value=""><?php echo($value2->caracteristica) ?></option>
                                                                    <?php foreach ($opcion->data as $key => $value5) {
                                                                        if($value2->id ==  $value5->idOpcion){ echo(" <option value='$value5->id'>$value5->caracteristica</option>"); }
                                                                    }?>
                                                                        
                                                                </select>
                                                        </div>
                                <?php }  }else{ ?>
                                            <div class="col-lg-6" style="margin-bottom:1rem">
                                              
                                              <select name="" id="opcion_<?php echo($value2->id) ?>_<?php echo($value->id) ?>_0_0" class="form-control valor">
                                                  <option value=""><?php echo($value2->caracteristica) ?></option>
                                                   <?php foreach ($opcion->data as $key => $value4) {
                                                     if($value2->id ==  $value4->idOpcion){ echo(" <option value='$value4->id'>$value4->caracteristica</option>"); }
                                                   }?>
                                                     
                                              </select>
                                          </div>
                              <?php  } }} ?>
                              </div>
                            <?php  } ?>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h5 class="card-title">EVALUACIÓN</h5> 
                                </div>
    
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="hidden" name="" id="id_eva">
                                        <input type="text" class="form-control" id="evaluacion" placeholder="Evaluacion" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <select name="" id="estado" class="form-control">
                                            <option value="">Estado</option>
                                            <option value="1">Activo</option>
                                            <option value="2">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h5 class="card-title">COBERTURA</h5>
                                </div>
    
                            </div>
                            <div class="row">
                               
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <select name="" id="cobertura" class="form-control">
                                            <!-- <option value="">Cobertura</option>
                                            <option value="1">Cobertura Probabilidad</option>
                                            <option value="2">Cobertura Impacto</option>
                                            <option value="3">Todos</option> -->
                                            <?php 
                                            foreach ($cobertura->data as $key => $value) {
                                                echo '<option value="'.$value->id.'">'.$value->cobertura.'</option>';
                                            }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="col-lg-12 form-group mb-0 d-flex justify-content-end">
                                    <div>
                                        <a href="  <?php echo base_url('registro-controles');?>" class="btn btn-danger waves-effect waves-light mr-1">Cancelar</a>
                                        <button id="btn_AgregarControl" class="btn btn-primary waves-effect waves-light mr-1 ">
                                                            Guardar
                                        </button>
                                                    
                                    </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
               
              
               
</div>
<script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
<script src="<?=base_url('public/assets/js/registro_controles/registro_controles.js'); ?>"></script>
<?=$this->endSection()?> 