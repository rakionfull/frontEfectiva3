<?=$this->extend('layout/main')?> 
<?=$this->section('content')?> 
<div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body ">
                            <div class="row align-items-center">
                                <div class="col-md-4">
                                    <h4 class="card-title">Detalle de Perfil</h4>
                                </div>
                              
                               
                            </div>
                            <div class="row mt-2 ">
                              
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        
                                                        <input type="text" class="form-control" id="det_nom_perfil"  value="<?php echo $perfil->perfil ?>" readonly>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                       
                                                        <select name="" id="det_est_perfil" class="form-control" disabled >
                                                        <?php if( $perfil->est_perfil == 1){
                                                            echo "<option value='1'>Activo</option>";
                                                        }else{
                                                          echo "<option value='0'>Inactivo</option>";
                                                        }
                                                        
                                                        
                                                        ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        
                                                        <input type="text" class="form-control"  value="<?php echo $perfil->desc_perfil ?>" readonly>
                                                    </div>
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
                      
                    
                            
                            
                                            <table class="table table-centered table-bordered datatable dt-responsive nowrap m-0" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th>Módulo</th>
                                                        <th>Ver</th>
                                                        <th>Crear</th>
                                                        <th>Editar</th>
                                                        <th>Borrar</th>
                                                      
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                       
                                                        <?php 
                                                        // muestro los modulos con sus permisos
                                                       
                                                           foreach ($modulos as $key => $value1) {
                                                                        echo "<tr style='color:#fff;background:#ccc' >";
                                                                        echo "<td >".$value1->desc_mod."</td>";

                                                                        if($value1->view_det)  echo "<td><input  type='checkbox' id='view_".$value1->id_det_per."' onclick='changeView(this, event)' switch='none' checked/><label for='view_".$value1->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        else  echo "<td><input  type='checkbox' id='view_".$value1->id_det_per."' onclick='changeView(this, event)' switch='none'/><label for='view_".$value1->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        
                                                                        if($value1->create_det)  echo "<td><input  type='checkbox' id='create_".$value1->id_det_per."' onclick='changeCreate(this, event)' switch='none' checked/><label for='create_".$value1->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        else echo "<td><input  type='checkbox' id='create_".$value1->id_det_per."' onclick='changeCreate(this, event)' switch='none' /><label for='create_".$value1->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        
                                                                        
                                                                        if($value1->update_det)  echo "<td><input  type='checkbox' id='update_".$value1->id_det_per."' onclick='changeUpdate(this, event)' switch='none' checked/><label for='update_".$value1->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        else echo "<td><input  type='checkbox' id='update_".$value1->id_det_per."' onclick='changeUpdate(this, event)' switch='none' /><label for='update_".$value1->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        
                                                                        if($value1->delete_det) echo "<td><input  type='checkbox' id='delete_".$value1->id_det_per."' onclick='changeDelete(this, event)' switch='none' checked/><label for='delete_".$value1->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        else echo "<td><input  type='checkbox' id='delete_".$value1->id_det_per."' onclick='changeDelete(this, event)' switch='none' /><label for='delete_".$value1->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                         
                                                                        echo " </tr>";
                                                                foreach ($opciones as $key => $value2) {
                                                                                                                              

                                                                    if($value1 -> id_mod == $value2 -> id_mod){
                                                                       
                                                                        echo "<tr style='color:#fff;background:#efdb50'>";
                                                                        echo "<td>".$value2->desc_op." </td>";

                                                                        if($value2->view_det) echo "<td><input  type='checkbox' id='view_".$value2->id_det_per."' onclick='changeView(this, event)' switch='none' checked/><label for='view_".$value2->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        else  echo "<td><input  type='checkbox' id='view_".$value2->id_det_per."' onclick='changeView(this, event)' switch='none'/><label for='view_".$value2->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                       
                                                                        if($value2->create_det)  echo "<td><input  type='checkbox' id='create_".$value2->id_det_per."' onclick='changeCreate(this, event)' switch='none' checked/><label for='create_".$value2->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        else echo "<td><input  type='checkbox' id='create_".$value2->id_det_per."' onclick='changeCreate(this, event)' switch='none' /><label for='create_".$value2->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        
                                                                        if($value2->update_det)  echo "<td><input  type='checkbox' id='update_".$value2->id_det_per."' onclick='changeUpdate(this, event)' switch='none' checked/><label for='update_".$value2->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        else echo "<td><input  type='checkbox' id='update_".$value2->id_det_per."' onclick='changeUpdate(this, event)' switch='none' /><label for='update_".$value2->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        
                                                                        if($value2->delete_det) echo "<td><input  type='checkbox' id='delete_".$value2->id_det_per."' onclick='changeDelete(this, event)' switch='none' checked/><label for='delete_".$value2->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        else echo "<td><input  type='checkbox' id='delete_".$value2->id_det_per."' onclick='changeDelete(this, event)' switch='none' /><label for='delete_".$value2->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                        
                                                                        echo " </tr>";

                                                                        foreach ($items as $key => $value3) {
                                                                            
                                                                            if($value2 -> id_op == $value3 -> id_op){
                                                                               
                                                                                echo "<tr>";
                                                                                echo "<td>".$value3->desc_item."</td>";
                                                                                if($value3->view_det)   echo "<td><input  type='checkbox' id='view_".$value3->id_det_per."' onclick='changeView(this, event)' switch='none' checked/><label for='view_".$value3->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                                else  echo "<td><input  type='checkbox' id='view_".$value3->id_det_per."' onclick='changeView(this, event)' switch='none' /><label for='view_".$value3->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                                 
                                                                                
                                                                                if($value3->create_det) echo "<td><input  type='checkbox' id='create_".$value3->id_det_per."' onclick='changeCreate(this, event)' switch='none' checked/><label for='create_".$value3->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                                else echo "<td><input  type='checkbox' id='create_".$value3->id_det_per."' onclick='changeCreate(this, event)' switch='none' /><label for='create_".$value3->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                               
                                                                                if($value3->update_det) echo "<td><input  type='checkbox' id='update_".$value3->id_det_per."' onclick='changeUpdate(this, event)' switch='none' checked/><label for='update_".$value3->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                                else echo "<td><input  type='checkbox' id='update_".$value3->id_det_per."' onclick='changeUpdate(this, event)' switch='none' /><label for='update_".$value3->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                               
                                                                                if($value3->delete_det) echo "<td><input  type='checkbox' id='delete_".$value3->id_det_per."' onclick='changeDelete(this, event)' switch='none' checked/><label for='delete_".$value3->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                                else echo "<td><input  type='checkbox' id='delete_".$value3->id_det_per."' onclick='changeDelete(this, event)' switch='none' /><label for='delete_".$value3->id_det_per."' data-on-label='On'data-off-label='Off'></label></td>";
                                                                                
                                                                                echo " </tr>";
                                                                            }
                                                                        }
                                                                    }
                                                                    
                                                                }
                                                           }
                                                            ?>
                                                        
                                                        
                                                   
                                                  
                                                </tbody>
                                            </table>
                                        </div>
                           
                        </div>
                       
                    </div>
                </div>
        </div>
        <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
        <script src="<?=base_url('public/assets/js/detPerfil.js'); ?>"></script>
<?=$this->endSection()?> 
