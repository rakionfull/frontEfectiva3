<?=$this->extend('layout/main')?> 
<?=$this->section('content');$session = session();?>
        <div class="row">
                <div class="col-12 col-md-12 col-lg-12 col-sm-12">
                    <div class="card">
                        <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-md-12">
                                        <h4 class="card-title">REPORTE DE MOVIMIENTOS DEL SISTEMA</h4>
                                    </div>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_Controles">
                                        
                                    </div>
                                   
                                    
                                </div>
                        </div>
                               
                        <div class="card-body">
                          

                                <form action="" id="reporte1">
                                    <div class="row mb-5">
                                                    <div class="col-lg-12 ">
                                                        <h6>Seleccionar los rangos de fecha para generar reporte (*)</h6>
                                                    </div>
                                                   
                                    </div>
                                    <div class="row mb-5">
                                                    <div class="col-lg-6">
                                                          <div class="form-group">
                                                            <span>Fecha inicial: </span>
                                                              <input type="date" class="form-control form-control-sm" id="fecha_ini" >
                                                          </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                          <div class="form-group">
                                                            <span>Fecha Final: </span>
                                                              <input type="date" class="form-control form-control-sm" id="fecha_fin" >
                                                          </div>
                                                    </div>
                                    </div>
                                    <div class="row text-center ">
                                        <div class="col-lg-12">
                                        <a href="" id="btnDescargar" class="btn btn-primary">
                                            Descargar
                                        </a>
                                        </div>
                                    </div>
                                </form>
                                
                                
                          
                        </div>
                    </div>
                </div>

                
                

            <script src="<?=base_url('public/assets/js/main_das.js'); ?>"></script>
    
            <script src="<?=base_url('public/assets/js/reportes/reporte2.js'); ?>"></script>
<?=$this->endSection()?> 