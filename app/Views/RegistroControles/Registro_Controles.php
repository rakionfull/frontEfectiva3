<?=$this->extend('layout/main')?> 
<?=$this->section('content'); $session = session();?> 
<div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body ">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <h4 class="card-title">Registro de controles</h4>
                                    </div>
                                
                                    <div class="col-md-4 offset-md-4">
                                    <?php if($session->permisos[12]->create_det==1){ ?> 
                                        <a href="<?=base_url('create-controles')?> "  class="float-right btn btn-primary waves-effect waves-light"><i class=" fas fa-plus-circle align-middle mr-2 ml-2"></i> Agregar</a>

                                    <?php }?>
                                       
                                    </div>
                                   
                                </div>
                                <div class="row mt-2">
                                    <div class="col-lg 12">
                                        <?php 
                                            
                                            if($session->getFlashdata('error') != '')
                                            {
                                            echo $session->getFlashdata('error');;
                                            }
                                        ?>
                                    </div>
                                </div>
                                
                        </div>
                        <div class="card-body">
                        
                        <div class="table-responsive">
                                        <table id="table_registro_controles" class="table table-centered table-bordered datatable dt-responsive nowrap" data-page-length="10" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>ID</th>                                                         
                                                    <th>Nombre del control</th>
                                                    <th>Responsable</th>
                                                    <!-- <th>Prioridad</th> -->
                                                    <th>Estado</th>
                                                    <th style="width: 120px;">Mantenimiento</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php foreach ($registros as $key => $value) { ?>
                                                    <tr >
                                                        
                                                        <td  style="text-align:left"><?php echo ($value->IDC)?></td>
                                                        <td  style="text-align:left"><?php echo ($value->nom_control)?></td>
                                                        
                                                        <?php if($value->responsable == ""){?> <td  style="text-align:left"></td>
                                                        <?php }else{ ?> <td  style="text-align:left"><?php echo ($value->responsable)?></td>
                                                        <?php } ?>
                                                        <!-- <td  style="text-align:left"><?php //var_dump ($value->prioridad)?></td> -->
                                                        <?php if($value->estado == 1){?> <td  style="text-align:left">Activo</td>
                                                        <?php }else{ ?> <td  style="text-align:left">Inactivo</td>
                                                        <?php } ?>
                                                        <td style="">
                                                            <?php if($session->permisos[12]->update_det==1){ ?> 
                                                            <a href="<?=base_url('update-controles/'.$value->IDC)?> "  class='text-primary mr-2'  title='Editar'><i class='fas fa-edit font-size-18'></i></a>
                                                            <?php } ?>
                                                            <?php if($session->permisos[12]->delete_det==1){ ?> 
                                                            <a id="" href="<?=base_url('delete-controles/'.$value->IDC)?> " class='text-danger ml-2'  title='Eliminar' ><i class='far fa-trash-alt font-size-18'></i></a>
                                                            <?php } ?>
                                                               
                                                           
                                                             <?php if($session->permisos[12]->delete_det==0 && $session->permisos[12]->update_det==0){ 
                                                                 echo("<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>");
                                                            } ?> 
                                                        </td>
                                                    </tr>
                                                <?php  } ?>  
                                                                                                    
                                                   
                                                  
                                               
                                                
                                            
                                            </tbody>
                                        </table>
                        </div>
                    </div>
                    </div>
                </div>
               
              
               
</div>
<script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
<script src="<?=base_url('public/assets/js/registro_controles/list_controles.js'); ?>"></script>
<?=$this->endSection()?> 