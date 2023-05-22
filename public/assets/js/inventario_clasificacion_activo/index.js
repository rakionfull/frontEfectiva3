var BASE_URL = document.getElementById("base_url").value;
$(document).ready(function(){
   $aspas =  $.ajax({
        url:BASE_URL+"/activo/getAspectoByActivo",
        method:'post',
        dataType:'JSON'
    })
    .done(function(response){
        //console.log(response)
        if(response.data.length > 0){
            $('#th_valoracion').attr('colspan',response.data.length)
            response.data.forEach(item => {
                $('#tr_table_valoraciones').append(
                    `<th>${item.aspecto.substr(0,1).toUpperCase()}</th>`
                )
            })
        }else{
            $('#th_valoracion').attr('colspan',3)
        }
    })
    Promise.all([$aspas]).then(() => {
        loadTableInventarioClasificacionActivo()
    })
})
var alerta_inventario_clasificacion_activo = document.getElementById("alerta_inventario_clasificacion_activo");
$('#custodio').select2({
    theme:'bootstrap'
})
$('#icon_search_custodio').click(function(){
    if($('#section_search_custodio').css('display') == 'none'){
        $('#section_search_custodio').css('display','flex')
    }else{
        $('#section_search_custodio').css('display','none')
    }
})
$('#close_modal_buscar_custodio').click(function(){
    $('#modal_buscar_custodio').modal('hide')
})
$('#area_custodio').on('change',function(){
    $.ajax({
        url:BASE_URL+"/activo/getUnidadByActivo",
        data:{
            idempresa:idempresa,
            idarea:$('#modal_inventario_clasificacion_activo #area_custodio').val()
        },
        dataType:'JSON',
        method:'post',
        beforeSend:function(){
            $('#modal_inventario_clasificacion_activo #unidad_custodio').append(
                `<option value="">Cargando...</option>`
            )
        }
    })
    .done(function(response){
        console.log(response);
        $('#modal_inventario_clasificacion_activo #unidad_custodio option').remove()
        $('#modal_inventario_clasificacion_activo #unidad_custodio').append(
            `<option value="">Seleccione</option>`
        )
        if(response.data.length > 0){
            response.data.map(item => {
                $('#modal_inventario_clasificacion_activo #unidad_custodio').append(
                    `<option value="${item.id}">${item.unidad}</option>`
                )
            })
        }
    })
})
$('#unidad_custodio').on('change',function(){
    console.log(idempresa);
    console.log($('#modal_inventario_clasificacion_activo #area_custodio').val());
    console.log($('#modal_inventario_clasificacion_activo #unidad_custodio').val());
    $.ajax({
        url:BASE_URL+"/activo/getPosicionByUnidad",
        data:{
            idempresa:idempresa,
            idarea:$('#modal_inventario_clasificacion_activo #area_custodio').val(),
            idunidad:$('#modal_inventario_clasificacion_activo #unidad_custodio').val()
        },
        dataType:'JSON',
        method:'post',
        beforeSend:function(){
            $('#modal_inventario_clasificacion_activo #custodio').append(
                `<option value="">Cargando..</option>`
            )
        }
    })
    .done(function(response){
        console.log(response)
        $('#modal_inventario_clasificacion_activo #custodio option').remove()
        $('#modal_inventario_clasificacion_activo #custodio').append(
            `<option value="">Seleccionar</option>`
        )
        if(response.data.length > 0){
            response.data.map(item => {
                $('#modal_inventario_clasificacion_activo #custodio').append(
                    `<option value="${item.id_pos}">${item.posicion_puesto}</option>`
                ).trigger('change')
            })
        }
    })
})
function cargarProceso(empresa,area,idunidad,$macro,$dato) {
  
    const postData = {           
        idempresa: empresa,
        idarea:area,
        idunidad:idunidad,
        idmacroproceso:$macro
    };
   
     $.ajax({
            method:"POST",
            url:BASE_URL+"/activo/listaProcesoByMacro",
            dataType:'JSON',
            data:postData,
        })
        .done(function(resarea){
            //console.log('hola');
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #proceso option').remove()
            $('#modal_inventario_clasificacion_activo #proceso').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    if($dato == element.id){
                        $('#modal_inventario_clasificacion_activo #proceso').append(
                            `<option value='${element.id}' selected>${element.proceso}</option>`
                        )
                    }else{
                        $('#modal_inventario_clasificacion_activo #proceso').append(
                            `<option value='${element.id}'>${element.proceso}</option>`
                        )
                    }
                   
                });
            }
        })
}
function cargarCategoriaActivo($activo) {
    const postData = {           
        idactivo:$activo
    };
   
     $.ajax({
            method:"POST",
            url:BASE_URL+"/activo/listaCategoriaByActivo",
            dataType:'JSON',
            data:postData,
        })
        .done(function(resarea){
            
            $('#modal_inventario_clasificacion_activo #categoria_activo option').remove()
            $('#modal_inventario_clasificacion_activo #categoria_activo').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #categoria_activo').append(
                        `<option value='${element.id}'>${element.categoria}</option>`
                    )
                });
            }
        })
}

function loadTableInventarioClasificacionActivo(){
    if ($.fn.DataTable.isDataTable('#table_inventario_clasificacion_activo')){
        $('#table_inventario_clasificacion_activo').DataTable().rows().remove();
        $('#table_inventario_clasificacion_activo').DataTable().destroy();
    }
    data = [
        {
            data:null,
            "mRender":function(data){
                return `<input ${data.ica_estado == '2' ? 'disabled' : ''} onclick="showButtonsICA()" ica_id="${data.ica_id}" style='width:1vw;height:1vw;' type='checkbox' id='check_ica'/>`
            }
        },
        { "data": "ica_id" },
        { "data": "empresa" },
        { "data": "area" },
        { "data": "unidad" },
        { "data": "macroproceso" },
        { "data": "proceso" },
        { "data": "activo" },
        { "data": "desc_activo" },
        { "data": "tipo_activo" },
        { "data": "categoria_activo" },
        { "data": "ubicacion_direccion" },
        { "data": "des_propietario" },
        { "data": "des_custodio" },
    ];
    data.push(
        { "data": "valor" },
            { "data": "ica_estado",     
                "mRender": function(data, type, value) {
                    if (data == '1') return  'Borrador';
                    if (data == '2') return  'Registrado';
                    if (data == '3') return  'Observado';
                    if (data == '4') return  'Aprobado';
                    if (data == '5') return  'Por actualizar';
                }
            },
            {  "data": "ica_estado_2",     
                "mRender": function(data, type, value) {
                    if (data == '1') return  'Activo';
                    if (data == '2') return  'Inactivo';
                }
            },
            { "data": "ica_comentario" },
            {
                data:null,
                "mRender":function(data){
                    if(is_user_negocio == 1){
                        if(data.ica_estado == 1 || data.ica_estado == 3 || data.ica_estado == 4){
                             return `<editICA data-id="${data.ica_id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editICA>
                             <deleteICA data-id="${data.ica_id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteICA>`
                            // // return data.ica_estado;
                            // return is_user_negocio;
                            // return is_user_negocio;
                        }else{
                            // return data.ica_estado;
                            // return is_user_negocio;
                            return `<deleteICA data-id="${data.ica_id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteICA>`
                        }
                    }else{
                       
                        return `<editICA data-id="${data.ica_id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editICA>
                        <deleteICA data-id="${data.ica_id}" class='text-danger btn btnedit-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteICA>`
                    
                    }
                    
                }
            }
    )
    let table = $('#table_inventario_clasificacion_activo').DataTable({
        
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
            "infoEmpty":  "Mostrando 0 a 0 de 0 Registros",
            "infoFiltered": "(Filtrado de _MAX_ registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Registros",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        // scrollY: "200px",
        // fixedColumns:   {
        //     heightMatch: 'none'
        // },
        responsive: false,
        autoWidth: false,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:5,
        clickToSelect:false,
        // ajax: BASE_URL+"/getListInventarioClasificacionActivo/"+idempresa,
        // aoColumns: data,
    })

    
}

$('#btn_add_ica').click(function(){
    $('#btn_add_ica').attr('disabled',true);
    let id_empresa_default = 0;

    try {
        $('#spinner-div').show();
        let empresas = $.ajax({
            method: "POST",
            url:BASE_URL+"/activo/getEmpresasByActivo",
            dataType:'JSON'
        })
        .done(function(response){
            
            $('#modal_inventario_clasificacion_activo #empresa option').remove()
            $('#modal_inventario_clasificacion_activo #empresa').append(
                `<option value=''>Seleccionar</option>`
            )
            if(response.data.length > 0){
                id_empresa_default = response.data[0].id
                response.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #empresa').append(
                        `<option value='${element.id}'>${element.empresa}</option>`
                    )
                });
            }
        })
       
        let areas = $.ajax({
            url:BASE_URL+"/activo/getArea/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #area option').remove()
            $('#modal_inventario_clasificacion_activo #area').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #area').append(
                        `<option value='${element.id}'>${element.area}</option>`
                    )
                });
            }
        })
        // let unidades = $.ajax({
        //     url:BASE_URL+"/activo/getUnidades/"+idempresa,
        //     dataType:'JSON'
        // })
        // .done(function(resarea){
        //     //console.log(resarea);
        //     $('#modal_inventario_clasificacion_activo #unidad option').remove()
        //     $('#modal_inventario_clasificacion_activo #unidad').append(
        //         `<option value=''>Seleccionar</option>`
        //     )
        //     if(resarea.data.length > 0){
        //         resarea.data.forEach(element => {
        //             $('#modal_inventario_clasificacion_activo #unidad').append(
        //                 `<option value='${element.id}'>${element.unidad}</option>`
        //             )
        //         });
        //     }
        // })
        let tipo_activo = $.ajax({
            url:BASE_URL+"/activo/getTipoActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #tipo_activo option').remove()
            $('#modal_inventario_clasificacion_activo #tipo_activo').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #tipo_activo').append(
                        `<option value='${element.id}'>${element.tipo}</option>`
                    )
                });
            }
        })
        let ubicacion_activo = $.ajax({
            url:BASE_URL+"/activo/getUbiActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #ubicacion_activo option').remove()
            $('#modal_inventario_clasificacion_activo #ubicacion_activo').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #ubicacion_activo').append(
                        `<option value='${element.id}'>${element.direccion} - ${element.estadonombre} - ${element.paisnombre}</option>`
                    )
                });
            }
        })
       
        let custodio = $.ajax({
            url:BASE_URL+"/activo/getPosicion/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea)
            $('#modal_inventario_clasificacion_activo #custodio option').remove()
            $('#modal_inventario_clasificacion_activo #custodio').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #custodio').append(
                        `<option value='${element.id_pos}'>${element.posicion_puesto}</option>`
                    )
                });
            }
        })
        let valor = $.ajax({
            url:BASE_URL+"/activo/getValorActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            $('#modal_inventario_clasificacion_activo #valor option').remove()
            $('#modal_inventario_clasificacion_activo #valor').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #valor').append(
                        `<option value='${element.id}'>${element.valor}</option>`
                    )
                });
            }
        })
        let clasi_info = $.ajax({
            url:BASE_URL+"/activo/getClasInfoByActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            $('#modal_inventario_clasificacion_activo #clasi_info option').remove()
            $('#modal_inventario_clasificacion_activo #clasi_info').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #clasi_info').append(
                        `<option value='${element.id}'>${element.clasificacion}</option>`
                    )
                });
            }
        })
        Promise.all([
            empresas,
            areas,
            tipo_activo,
            categoria_activo,
            ubicacion_activo,
            custodio,
            valor,
            clasi_info
        ]).then(()=>{
            
            // $("#modal_inventario_clasificacion_activo .val").prop('disabled', true);
            
            $('#title_ica').html('Agregar Nuevo Inventario y Clasificación de Activos')
            document.getElementById("form_ica").reset();
            document.getElementById("add_ica").style.display = "block";
            document.getElementById("update_ica").style.display = "none";
            $("#modal_inventario_clasificacion_activo #empresa").prop('disabled', true);

            $("#modal_inventario_clasificacion_activo #empresa").val(idempresa);

            $("#modal_inventario_clasificacion_activo #area").prop('disabled', true);

            $("#modal_inventario_clasificacion_activo #area").val(idarea);

            // $("#modal_inventario_clasificacion_activo #unidad").prop('disabled', true);

            // $("#modal_inventario_clasificacion_activo #unidad").val(idunidad);
            loadUnidades(idempresa,idarea)


            let propietario = $.ajax({
                url:BASE_URL+"/activo/getPosicion/"+idempresa,
                dataType:'JSON'
            })
            .done(function(resarea){
                //console.log('propietario')
                //console.log(resarea)
                area = $('#modal_inventario_clasificacion_activo #area').val()
                unidad = $('#modal_inventario_clasificacion_activo #unidad').val()
                $('#modal_inventario_clasificacion_activo #propietario option').remove()
                $('#modal_inventario_clasificacion_activo #propietario').append(
                    `<option value=''>Seleccionar</option>`
                )
                if(resarea.data.length > 0){
                    resarea.data.forEach(element => {
                        if(element.idarea == area && element.idunidades == unidad){
                            $('#modal_inventario_clasificacion_activo #propietario').append(
                                `<option value='${element.id_pos}'>${element.posicion_puesto} - ${element.area}</option>`
                            )
                        }
                    });
                }
            })

            $.ajax({
                url:BASE_URL+"/activo/getAspectoByActivo",
                method:'post',
                dataType:'JSON'
            })
            .done(function(response){
                //console.log('aspetocs')
                //console.log(response)
                $('#row_section_ica .options').remove()
                response.data.forEach(item => {
                    $('#row_section_ica').append(
                        `
                            <div class="col-md-6 col-12 options">
                                <div class="form-group">
                                    <span>Valoración de ${item.aspecto}: </span>
                                    <select data-id="${item.id}" data-name="${item.aspecto}" onchange="onChangeVals(this)" required name="val_${item.aspecto.toLowerCase()}" id="val_${item.id}" class="val form-control form-control-sm">
                                        <option value="">Seleccione</option>
                                    </select>
                                </div>
                            </div>
                        `
                    )
                    $.ajax({
                        url:BASE_URL+"/getdetallevaloracionactivo",
                        type:'post',
                        method:'post',
                        data:{
                            'aspecto':item.id
                        },
                        dataType:'JSON'
                    })
                    .done(function(response){
                        //console.log('detalle')
                        //console.log(response.data)
                        response.data.forEach(item => {
                            
                            $('#val_'+item.id_aspecto).append(
                                `<option value="${item.valoracion}">${item.valoracion}</option>`
                            )
                        })

                    })
                });
                $('#row_section_ica').append(
                    `
                    <div class="col-md-6 col-12 options">
                        <div class="form-group">
                            <span>Valor: </span>
                            <select disabled required name="" id="valor" class="form-control form-control-sm">
                                <option value="">Seleccione</option>
                            </select>
                        </div>
                    </div>
                    `
                )
                $('#spinner-div').hide();
                $('#btn_add_ica').attr('disabled',false)
                
                $("#modal_inventario_clasificacion_activo").modal("show");
               
            })

        })
        
    } catch (error) {
        
    }
    
})
function cargarMacroproceso(data){
    const postData = {           
        idempresa: data.idempresa,
        idarea:data.idarea,
        idunidad:data.idunidades
    };
    let macroproceso = $.ajax({
        method: "POST",
        url:$('#base_url').val()+"/activo/getMacroprocesoByActivo",
        dataType:'JSON',
        data:postData,
    })
    .done(function(resarea){
        //console.log(resarea);
        $('#modal_inventario_clasificacion_activo #macroproceso option').remove()
        $('#modal_inventario_clasificacion_activo #macroproceso').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                $('#modal_inventario_clasificacion_activo #macroproceso').append(
                    `<option value='${element.id}'>${element.macroproceso}</option>`
                )
            });
        }
        $("#modal_inventario_clasificacion_activo #macroproceso").val(data.idmacroproceso);

    })
}
function loadUnidades(empresa,area,value=0){
    ////console.log(empresa,area);
    const postData = {           
        idempresa: empresa,
        idarea:area
    };
    $.ajax({
        url:BASE_URL+"/activo/getUnidadadesByEmpresaByArea",
        method:'POST',
        type:'POST',
        data:postData,
        dataType:'JSON'
    })
    .done(function(resarea){
        //console.log(resarea);
        $('#modal_inventario_clasificacion_activo #unidad option').remove()
        $('#modal_inventario_clasificacion_activo #unidad').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                $('#modal_inventario_clasificacion_activo #unidad').append(
                    `<option value='${element.id}'>${element.unidad}</option>`
                )
            });
        }
        if(value > 0){
            $('#modal_inventario_clasificacion_activo #unidad').val(value)
        }
    })
}
$('#modal_inventario_clasificacion_activo #area,#modal_inventario_clasificacion_activo #empresa').change(function(){
    loadUnidades($('#modal_inventario_clasificacion_activo #empresa'),$('#modal_inventario_clasificacion_activo #area'))
})
$('#modal_inventario_clasificacion_activo #area,#modal_inventario_clasificacion_activo #unidad').change(function(){
    const postData = {           
        idempresa: $('#modal_inventario_clasificacion_activo #empresa').val(),
        idarea:$('#modal_inventario_clasificacion_activo #area').val(),
        idunidad:$('#modal_inventario_clasificacion_activo #unidad').val()
    };
    //console.log(postData)
    let macroproceso = $.ajax({
        method: "POST",
        url:$('#base_url').val()+"/activo/getMacroprocesoByActivo",
        dataType:'JSON',
        data:postData,
    })
    .done(function(resarea){
        //console.log(resarea);
        $('#modal_inventario_clasificacion_activo #macroproceso option').remove()
        $('#modal_inventario_clasificacion_activo #macroproceso').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                $('#modal_inventario_clasificacion_activo #macroproceso').append(
                    `<option value='${element.id}'>${element.macroproceso}</option>`
                )
            });
        }
    })
    let propietario = $.ajax({
        url:BASE_URL+"/activo/getPosicion/"+idempresa,
        dataType:'JSON'
    })
    .done(function(resarea){
        area = $('#modal_inventario_clasificacion_activo #area').val()
        unidad = $('#modal_inventario_clasificacion_activo #unidad').val()
        $('#modal_inventario_clasificacion_activo #propietario option').remove()
        $('#modal_inventario_clasificacion_activo #propietario').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                if(element.idarea == area && element.idunidades == unidad){
                    $('#modal_inventario_clasificacion_activo #propietario').append(
                        `<option value='${element.id_pos}'>${element.posicion_puesto} - ${element.area}</option>`
                    )
                }
            });
        }
    })
})

document.getElementById('add_ica').addEventListener('click',function(){
    $empresa = $('#modal_inventario_clasificacion_activo #empresa').val()
    $area = $('#modal_inventario_clasificacion_activo #area').val()
    $unidad = $('#modal_inventario_clasificacion_activo #unidad').val()
    $macroproceso = $('#modal_inventario_clasificacion_activo #macroproceso').val()
    $proceso = $('#modal_inventario_clasificacion_activo #proceso').val()
    $activo = $('#modal_inventario_clasificacion_activo #activo').val()
    $desc_activo = $('#modal_inventario_clasificacion_activo #desc_activo').val()
    $tipo_activo = $('#modal_inventario_clasificacion_activo #tipo_activo').val()
    $categoria_activo = $('#modal_inventario_clasificacion_activo #categoria_activo').val()
    $ubicacion_activo = $('#modal_inventario_clasificacion_activo #ubicacion_activo').val()
    $propietario = $('#modal_inventario_clasificacion_activo #propietario').val()
    $custodio = $('#modal_inventario_clasificacion_activo #custodio').val()
    $comentario = $('#modal_inventario_clasificacion_activo #comentario').val()
    $estado = $('#modal_inventario_clasificacion_activo #estado').val()
    $estado2 = $('#modal_inventario_clasificacion_activo #estado_2').val()
    $valor = $('#modal_inventario_clasificacion_activo #valor').val()
    $clasi_info = $('#modal_inventario_clasificacion_activo #clasi_info').val()
    
    $idvaloracion_activo = $('#modal_inventario_clasificacion_activo #idvaloracion_activo').val()


    $data = document.querySelectorAll('.val');
    let aux=[];
    let elementos_add = []
    $data.forEach(element => {
        if($(element).val() != ""){
            aux = {
                idaspecto: $(element).attr('data-id'),
                aspecto: $(element).attr('data-name'),
                valoracion:$(element).val(),
            };
            elementos_add.push(aux);
        } 
    });

    if(
        $empresa != "" &&
        $area != "" &&
        $unidad != "" &&
        $macroproceso != "" &&
        $proceso != "" &&
        $activo != "" &&
        $desc_activo != "" &&
        $tipo_activo != "" &&
        $categoria_activo != "" &&
        $ubicacion_activo != "" &&
        $propietario != "" &&
        $custodio != "" &&
        $valor != "" &&
        $comentario != "" &&
        $estado != "" &&
        $estado2 != "" && 
        $clasi_info != ""
    ){
        const postData = {
            idempresa:$empresa,
            idarea:$area,
            idunidades:$unidad,
            idmacroproceso:$macroproceso,
            idproceso:$proceso,
            activo:$activo,
            desc_activo:$desc_activo,
            idtipo_activo:$tipo_activo,
            idcategoria_activo:$categoria_activo,
            idubicacion:$ubicacion_activo,
            idpropietario:$propietario,
            idcustodio:$custodio,
            idvalor:$valor,
            estado:$estado,
            estado_2:$estado2,
            comentario:$comentario,
            idclasificacion_informacion: $clasi_info,
            vals:JSON.stringify(elementos_add),
            idvaloracion_activo:$idvaloracion_activo
        }
        //console.log($('#modal_inventario_clasificacion_activo #custodio').val());
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/addInventarioClasificacionActivo",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                //console.log(respuesta);
                if (!respuesta.error) 
                {
                    document.getElementById("form_ica").reset();
                    $('#modal_inventario_clasificacion_activo').modal('hide');
                    alerta_inventario_clasificacion_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha guardado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500);
                   
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.msg
                    })
                }
                
            })
            .fail(function(error) {
                //console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Faltan Datos'
        })
    }
})

$('#table_inventario_clasificacion_activo').on('click','editICA',function(event){
    $('#table_inventario_clasificacion_activo tbody editICA').attr('disabled',true)
    // //console.log(event.currentTarget)
    $('#modal_inventario_clasificacion_activo #section_search_custodio').css('display','none')
    $('#modal_inventario_clasificacion_activo #area_custodio').val('')
    $('#modal_inventario_clasificacion_activo #unidad_custodio').val('')
    try {
        $('#spinner-div').show();
        let empresas = $.ajax({
            method: "POST",
            url:BASE_URL+"/activo/getEmpresasByActivo",
            dataType:'JSON'
        })
        .done(function(response){
            //console.log(response);
            $('#modal_inventario_clasificacion_activo #empresa option').remove()
            if(response.data.length > 0){
                id_empresa_default = response.data[0].id
                response.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #empresa').append(
                        `<option value='${element.id}'>${element.empresa}</option>`
                    )
                });
            }
        })
       
        const postData1 = {
            idempresa:idempresa
        }
        let areas = $.ajax({
            method: "POST",
            url:BASE_URL+"/activo/getAreasByActivo",
            data:postData1,
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #area option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #area').append(
                        `<option value='${element.id}'>${element.area}</option>`
                    )
                });
            }
        })
        let tipo_activo = $.ajax({
            url:BASE_URL+"/activo/getTipoActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #tipo_activo option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #tipo_activo').append(
                        `<option value='${element.id}'>${element.tipo}</option>`
                    )
                });
            }
        })
        let categoria_activo = $.ajax({
            url:BASE_URL+"/activo/getCatActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #categoria_activo option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #categoria_activo').append(
                        `<option value='${element.id}'>${element.categoria}</option>`
                    )
                });
            }
        })
        let ubicacion_activo = $.ajax({
            url:BASE_URL+"/activo/getUbiActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #ubicacion_activo option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #ubicacion_activo').append(
                        `<option value='${element.id}'>${element.direccion} - ${element.estadonombre} - ${element.paisnombre}</option>`
                    )
                });
            }
        })
        let custodio = $.ajax({
            url:BASE_URL+"/activo/getPosicion/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            //console.log(resarea);
            $('#modal_inventario_clasificacion_activo #custodio option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #custodio').append(
                        `<option value='${element.id_pos}'>${element.posicion_puesto} - ${element.area}</option>`
                    )
                });
            }
        })
        let clasi_info = $.ajax({
            url:BASE_URL+"/activo/getClasInfoByActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            $('#modal_inventario_clasificacion_activo #clasi_info option').remove()
            $('#modal_inventario_clasificacion_activo #clasi_info').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #clasi_info').append(
                        `<option value='${element.id}'>${element.clasificacion}</option>`
                    )
                });
            }
        })
        Promise.all([
            empresas,
            areas,
            // unidades,
            // macroproceso,
            proceso,
            tipo_activo,
            categoria_activo,
            ubicacion_activo,
            custodio,
            clasi_info
        ]).then(()=>{
    
            $.ajax({
                url:BASE_URL+"/getInventarioClasificacionActivo/"+event.currentTarget.getAttribute('data-id'),
                dataType:'JSON'
            })
            .done(function(res){
                // //console.log('iventnarii')
                // //console.log(res)
                $('#spinner-div').hide();
                
                
                $aspectoseg = $.ajax({
                    url:BASE_URL+"/activo/getAspectoByActivo",
                    method:'post',
                    dataType:'JSON'
                })
                .done(function(response){
                    //console.log('aspetocs')
                    //console.log(response)
                    $('#row_section_ica .options').remove()
                    response.data.forEach(item => {
                        $('#row_section_ica').append(
                            `
                                <div class="col-md-6 col-12 options">
                                    <div class="form-group">
                                        <span>Valoración de ${item.aspecto}: </span>
                                        <select ${is_user_negocio == 0 ? 'disabled' : ''} data-id="${item.id}" data-name="${item.aspecto}" onchange="onChangeVals(this)" required name="val_${item.id}" id="val_${item.id}" class="val form-control form-control-sm">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                            `
                        )
                        $gtv = $.ajax({
                            url:BASE_URL+"/getdetallevaloracionactivo",
                            type:'post',
                            method:'post',
                            data:{
                                'aspecto':item.id
                            },
                            dataType:'JSON'
                        })
                        .done(function(response){
                            //console.log('detalle')
                            //console.log(response)
                            response.data.forEach(item => {
                                $('#val_'+item.id_aspecto).append(
                                    `<option value="${item.valoracion}">${item.valoracion}</option>`
                                )
                            })

                            if(res.data.length > 0){
                                vals = JSON.parse(res.data[0].vals)
                                //console.log(vals)
                                vals.forEach(item => {
                                    $(".options select[data-id='"+item.idaspecto+"'] option[value='"+item.valoracion+"']").attr('selected',true)
                                });
                            }
    
                        })
                    });
                })

                Promise.all([$aspectoseg]).then(()=>{
                    $('#row_section_ica').append(
                        `
                        <div class="col-md-6 col-12 options">
                            <div class="form-group">
                                <span>Valor: </span>
                                <select disabled required name="" id="valor" class="form-control form-control-sm">
                                    <option value="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                        `
                    )
                    $.ajax({
                        url:BASE_URL+"/activo/getValorActivo",
                        dataType:'JSON'
                    })
                    .done(function(resarea){
                        $('#modal_inventario_clasificacion_activo #valor option').remove()
                        if(resarea.data.length > 0){
                            resarea.data.forEach(element => {
                                $('#modal_inventario_clasificacion_activo #valor').append(
                                    `<option value='${element.id}'>${element.valor}</option>`
                                )
                            });
                        }
                        if(res.data.length > 0){
                            $("#modal_inventario_clasificacion_activo #valor").val(res.data[0].idvalor);
                        }
                    })
                })

                //console.log(res.data)
                if(res.data.length > 0){
                    $('#table_inventario_clasificacion_activo tbody editICA').attr('disabled',false)
                    document.getElementById("form_ica").reset();
                    document.getElementById("add_ica").style.display = "none";
                    document.getElementById("update_ica").style.display = "block";
                    $('#title_ica').html('Editar Inventario y Clasificación de Activos');
                    $("#modal_inventario_clasificacion_activo #idvaloracion_activo").val(res.data[0].idvaloracion_activo);
                    loadUnidades(res.data[0].idempresa,res.data[0].idarea,res.data[0].idunidades)
                    let textCustodio = document.querySelector(`#modal_inventario_clasificacion_activo #custodio option[value="${res.data[0].idcustodio}"]`).innerHTML
                    //console.log(textCustodio)
                    $('#modal_inventario_clasificacion_activo #select2-custodio-container').html(textCustodio)
                    cargarProceso(res.data[0].idempresa,res.data[0].idarea,res.data[0].idunidades,res.data[0].idmacroproceso,res.data[0].idproceso);
                    
                    if(is_user_negocio == 0){
                        $("#modal_inventario_clasificacion_activo #id_ica").val(event.currentTarget.getAttribute('data-id'));
    
                        $("#modal_inventario_clasificacion_activo #empresa").val(res.data[0].idempresa);
    
                        $("#modal_inventario_clasificacion_activo #empresa").prop('disabled', true);
    
                        $("#modal_inventario_clasificacion_activo #area").val(res.data[0].idarea);
                        $("#modal_inventario_clasificacion_activo #area").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #unidad").val(res.data[0].idunidades);
                        $("#modal_inventario_clasificacion_activo #unidad").prop('disabled', true);
                        // $("#modal_inventario_clasificacion_activo #macroproceso").val(res.data[0].idmacroproceso);
                        $("#modal_inventario_clasificacion_activo #macroproceso").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #proceso").val(res.data[0].idproceso);
                        $("#modal_inventario_clasificacion_activo #proceso").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #activo").val(res.data[0].activo);
                        $("#modal_inventario_clasificacion_activo #activo").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #desc_activo").val(res.data[0].desc_activo);
                        $("#modal_inventario_clasificacion_activo #desc_activo").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #tipo_activo").val(res.data[0].idtipo_activo);
                        $("#modal_inventario_clasificacion_activo #tipo_activo").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #categoria_activo").val(res.data[0].idcategoria_activo);
                        $("#modal_inventario_clasificacion_activo #categoria_activo").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #ubicacion_activo").val(res.data[0].idubicacion);
                        $("#modal_inventario_clasificacion_activo #ubicacion_activo").prop('disabled', true);
                        // $("#modal_inventario_clasificacion_activo #propietario").val(res.data[0].idpropietario);
                        $("#modal_inventario_clasificacion_activo #propietario").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #custodio").val(res.data[0].idcustodio);
                        $("#modal_inventario_clasificacion_activo #custodio").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #valor").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #comentario").val(res.data[0].comentario);
                        $("#modal_inventario_clasificacion_activo #comentario").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #clasi_info").val(res.data[0].idclasificacion_informacion);
                        $("#modal_inventario_clasificacion_activo #clasi_info").prop('disabled', true);
                        //  '1' => 'Borrador',
                        // '2' => 'Registrado',
                        // '3' => 'Observado',
                        // '4' => 'Aprobado',
                        // '5' => 'Por actualizar',
                        // '6' => 'Activo',
                        // '7' => 'Inactivo'
                        if(res.data[0].estado == 2 || res.data[0].estado ==1 ){
                            $("#modal_inventario_clasificacion_activo #estado").val(0);
                        }else{
                            $("#modal_inventario_clasificacion_activo #estado").val(res.data[0].estado);
                        }
                       
                        $("#modal_inventario_clasificacion_activo #estado_2").val(res.data[0].estado_2);
                        $("#modal_inventario_clasificacion_activo #estado_2").prop('disabled', true);
                        // $("#modal_inventario_clasificacion_activo .val").prop('disabled', true);

                        // cargarProceso(res.data[0].idempresa,res.data[0].idarea,res.data[0].idmacroproceso,res.data[0].idproceso);
                        $("#modal_inventario_clasificacion_activo #observacion").val(res.data[0].observacion);
                        document.querySelectorAll("#modal_inventario_clasificacion_activo .val").forEach(element => {
                            element.setAttribute('disabled',true)
                        })
                    }else{
                       
                        if(res.data[0].estado == 3){
                            $('#modal_inventario_clasificacion_activo #estado option').remove()
                           // <option value="7">Inactivo</option>
                            $('#modal_inventario_clasificacion_activo #estado').append(
                                `  
                                    <option value="3">Observado</option>
                                    <option value="2">Registrado</option>
                                   
                                `
                            )
                            $("#modal_inventario_clasificacion_activo .input_observacion").show()
                        }
                      
                        if(res.data[0].estado == 4){
                            $('#modal_inventario_clasificacion_activo #estado option').remove()
                            // <option value="7">Inactivo</option>
                             $('#modal_inventario_clasificacion_activo #estado').append(
                                 `  
                                    <option value="0">Seleccione</option>
                                    <option value="1">Borrador</option>
                                    <option value="2">Registrado</option>
                                    
                                 `
                             )
                            
                            $("#modal_inventario_clasificacion_activo #estado").val(0);
                        }else{
                            $("#modal_inventario_clasificacion_activo #estado").val(res.data[0].estado);
                        }
                       
                        $("#modal_inventario_clasificacion_activo #id_ica").val(event.currentTarget.getAttribute('data-id'));
    
                        $("#modal_inventario_clasificacion_activo #empresa").val(res.data[0].idempresa);
    
                        $("#modal_inventario_clasificacion_activo #empresa").prop('disabled', true);
    
                        $("#modal_inventario_clasificacion_activo #area").val(res.data[0].idarea);
                        $("#modal_inventario_clasificacion_activo #area").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #unidad").val(res.data[0].idunidades);
                        // $("#modal_inventario_clasificacion_activo #unidad").prop('disabled', true);
                        // $("#modal_inventario_clasificacion_activo #macroproceso").val(res.data[0].idmacroproceso);
                        // $("#modal_inventario_clasificacion_activo #proceso").val(res.data[0].idproceso);
                        // cargarProceso(res.data[0].idmacroproceso,res.data[0].idproceso);
                        $("#modal_inventario_clasificacion_activo #activo").val(res.data[0].activo);
                        $("#modal_inventario_clasificacion_activo #desc_activo").val(res.data[0].desc_activo);
                        $("#modal_inventario_clasificacion_activo #tipo_activo").val(res.data[0].idtipo_activo);
                        $("#modal_inventario_clasificacion_activo #categoria_activo").val(res.data[0].idcategoria_activo);
                        $("#modal_inventario_clasificacion_activo #ubicacion_activo").val(res.data[0].idubicacion);
                        // $("#modal_inventario_clasificacion_activo #propietario").val(res.data[0].idpropietario);
                        $("#modal_inventario_clasificacion_activo #custodio").val(res.data[0].idcustodio);
                        $("#modal_inventario_clasificacion_activo #val_c").val(res.data[0].val_c);
                        $("#modal_inventario_clasificacion_activo #val_i").val(res.data[0].val_i);
                        $("#modal_inventario_clasificacion_activo #val_d").val(res.data[0].val_d);
                        // $("#modal_inventario_clasificacion_activo #valor").val(res.data[0].idvalor);
                        $("#modal_inventario_clasificacion_activo #comentario").val(res.data[0].comentario);
                        // $("#modal_inventario_clasificacion_activo #estado").val(res.data[0].estado);
                        $("#modal_inventario_clasificacion_activo #observacion").val(res.data[0].observacion);
                        $("#modal_inventario_clasificacion_activo #clasi_info").val(res.data[0].idclasificacion_informacion);
                        
                    }
                    cargarMacroproceso(res.data[0])

                    let propietario = $.ajax({
                        url:BASE_URL+"/activo/getPosicion/"+idempresa,
                        dataType:'JSON'
                    })
                    .done(function(resarea){
                        //console.log('propietario')
                        //console.log(resarea)
                        area = $('#modal_inventario_clasificacion_activo #area').val()
                        unidad = $('#modal_inventario_clasificacion_activo #unidad').val()
                        $('#modal_inventario_clasificacion_activo #propietario option').remove()
                        $('#modal_inventario_clasificacion_activo #propietario').append(
                            `<option value=''>Seleccionar</option>`
                        )
                        if(resarea.data.length > 0){
                            resarea.data.forEach(element => {
                                if(element.idarea == res.data[0].idarea && element.idunidades == res.data[0].idunidades){
                                    $('#modal_inventario_clasificacion_activo #propietario').append(
                                        `<option value='${element.id_pos}'>${element.posicion_puesto} - ${element.area}</option>`
                                    )
                                }
                            });
                        }
                        $("#modal_inventario_clasificacion_activo #propietario").val(res.data[0].idpropietario);
                        
                    })
                    Promise.all([propietario]).then(()=>{
                        $("#modal_inventario_clasificacion_activo").modal("show");
                    })
                    

                   
                    
                }
            })
        }) 
    } catch (error) {
      
    }
    
})

document.getElementById('update_ica').addEventListener('click',function(){
    $empresa = $('#modal_inventario_clasificacion_activo #empresa').val()
    $area = $('#modal_inventario_clasificacion_activo #area').val()
    $unidad = $('#modal_inventario_clasificacion_activo #unidad').val()
    $macroproceso = $('#modal_inventario_clasificacion_activo #macroproceso').val()
    $proceso = $('#modal_inventario_clasificacion_activo #proceso').val()
    $activo = $('#modal_inventario_clasificacion_activo #activo').val()
    $desc_activo = $('#modal_inventario_clasificacion_activo #desc_activo').val()
    $tipo_activo = $('#modal_inventario_clasificacion_activo #tipo_activo').val()
    $categoria_activo = $('#modal_inventario_clasificacion_activo #categoria_activo').val()
    $ubicacion_activo = $('#modal_inventario_clasificacion_activo #ubicacion_activo').val()
    $propietario = $('#modal_inventario_clasificacion_activo #propietario').val()
    $custodio = $('#modal_inventario_clasificacion_activo #custodio').val()
    $valor = $('#modal_inventario_clasificacion_activo #valor').val()
    $comentario = $('#modal_inventario_clasificacion_activo #comentario').val()
    $estado = $('#modal_inventario_clasificacion_activo #estado').val()
    $estado2 = $('#modal_inventario_clasificacion_activo #estado_2').val()
    $observacion = $('#modal_inventario_clasificacion_activo #observacion').val()
    $idvaloracion_activo = $('#modal_inventario_clasificacion_activo #idvaloracion_activo').val()
    $clasi_info = $('#modal_inventario_clasificacion_activo #clasi_info').val()
    const id = $('#modal_inventario_clasificacion_activo #id_ica').val()
    
    // if($estado != "" || $estado != "0"){
    //     ////console.log($estado);
    // }
    $data = document.querySelectorAll('.val');
    let aux=[];
    let elementos_add = []
    $data.forEach(element => {
        if($(element).val() != ""){
            aux = {
                idaspecto: $(element).attr('data-id'),
                aspecto: $(element).attr('data-name'),
                valoracion:$(element).val(),
            };
            elementos_add.push(aux);
        } 
    });

    if(
        $empresa != "" &&
        $area != "" &&
        $unidad != "" &&
        $macroproceso != "" &&
        $proceso != "" &&
        $activo != "" &&
        $desc_activo != "" &&
        $tipo_activo != "" &&
        $categoria_activo != "" &&
        $ubicacion_activo != "" &&
        $propietario != "" &&
        $custodio != "" &&
        $valor != "" &&
        $comentario != "" &&
        $estado2 != "" &&
        $estado != "0" &&
        $clasi_info != ""
    ){
        const postData = {
            idempresa:$empresa,
            idarea:$area,
            idunidades:$unidad,
            idmacroproceso:$macroproceso,
            idproceso:$proceso,
            activo:$activo,
            desc_activo:$desc_activo,
            idtipo_activo:$tipo_activo,
            idcategoria_activo:$categoria_activo,
            idubicacion:$ubicacion_activo,
            idpropietario:$propietario,
            idcustodio:$custodio,
            idvalor:$valor,
            estado:$estado,
            estado_2:$estado2,
            comentario:$comentario,
            observacion:$observacion,
            idclasificacion_informacion:$clasi_info,
            vals:JSON.stringify(elementos_add),
            idvaloracion_activo:$idvaloracion_activo

        }
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/updateInventarioClasificacionActivo/"+id,
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                //console.log(respuesta)
                if (!respuesta.error) 
                {
                    document.getElementById("form_ica").reset();
                    $('#modal_inventario_clasificacion_activo').modal('hide');
                    alerta_inventario_clasificacion_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha modificado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500);
                    // $("#table_inventario_clasificacion_activo").DataTable().reload(null, false); 
                   
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.msg
                    })
                }
                
            })
            .fail(function(error) {
                //console.log(error)
                $('#add_ica').attr('disabled',false)
                $('#add_ica').html('Guardar')
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        } catch (error) {
            //console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Faltan Datos'
        })
    }
})

$('#table_inventario_clasificacion_activo tbody').on( 'click', 'deleteICA', function(event){

    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar el inventario de clasificacion y activo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "post",
                url: BASE_URL+"/deleteInventarioClasificacionActivo/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta) 
                {
                    alerta_inventario_clasificacion_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500);
                   
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.msg
                    }) 
                }
                
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        } else if (result.isDenied) {
            Swal.fire('No hubo ningún cambio', '', 'info')
        }
    })
    
});

$('#estado').change(function(){
    if($('#estado').val() == 3){
        $('.input_observacion').show()
    }else{
        $('.input_observacion').hide()
    }
})
$('#button_close_modal_ica_x').click(function(){
    $('#modal_inventario_clasificacion_activo').modal('hide');
})
$('#button_close_modal_ica').click(function(){
    $('#modal_inventario_clasificacion_activo').modal('hide');
})
$('#export_ica').click(function(){
    $.ajax({
        method: "get",
        url: BASE_URL+"/exportExcelICA/"+idempresa,
        dataType: "JSON"
    })
    .done(function(respuesta) {
        //console.log(respuesta)
    })
    .fail(function(error) {
        //console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error'
        })
    })
    .always(function() {
    });
})

var ids = [];
function onChangeVals(arg){
    $('#modal_inventario_clasificacion_activo #idvaloracion_activo').val("")

    var elementos = [];
    //console.log($('.val'))
    $data = document.querySelectorAll('.val');
    let aux=[];
    $data.forEach(element => {
        if($(element).val() != ""){
            aux = {
                idaspecto: $(element).attr('data-id'),
                valoracion:$(element).val(),
            };
            elementos.push(aux);
        } 
    });
    $('#modal_inventario_clasificacion_activo #valor option').remove()

    let count = 0
    let $gas = $.ajax({
        url:BASE_URL+"/activo/getAspectoSeguridad",
        dataType:'JSON'
    })
    .done(function(response){
        count = response.data.length
    })
    //console.log(elementos)
    Promise.all([$gas]).then(() => {
        //console.log(elementos.length)
        if(elementos.length == count){ //count
            $.ajax({
                url:BASE_URL+"/getValorActivoByValoraciones",
                data:{
                    'valores':elementos
                },
                method:'post',
                type:'post',
                dataType:'json'
            })
            .done(function(response){
                //console.log(response)
                $('#modal_inventario_clasificacion_activo #idvaloracion_activo').val(response.data)
                if(response.data != false){
                    $.ajax({
                        url:BASE_URL+"/getValoracionActivoById",
                        data:{
                            'id_valoracion_activo':response.data
                        },
                        method:'post',
                        dataType:'JSON'
                    })
                    .done(function(response){
                        item = response.data[0]
                        $('#modal_inventario_clasificacion_activo #valor').append(
                            `<option value="${item.idvalor}" selected>${item.valor}</option>`
                        )
                    })
                }
            })
            
        }
    })
}

function showButtonsICA(){
    let inputs = document.querySelectorAll('#check_ica')
    let count = 0
    //console.log(inputs)
    inputs.forEach(element => {
        //console.log(element.checked)
        if(element.checked){
            count ++;
        }else{
        }
    });
    if(count > 0){
        $('.wrapper_buttons_status').css('display','flex')
    }else{
        $('.wrapper_buttons_status').css('display','none')
    }
}

function changeStatus(arg){
    let inputs = document.querySelectorAll('#check_ica');
    inputs.forEach(element => {
        if(element.checked){
            $.ajax({
                method: "POST",
                url: BASE_URL+"/updateStatus/"+element.getAttribute('ica_id'),
                data:{
                    'estado':$(arg).attr('estado')
                },
                dataType: "JSON"
            })
            .done(function(respuesta) {
                valor ++;
                //console.log(respuesta)
               //$("#table_inventario_clasificacion_activo").DataTable().ajax.reload(null, false);
           
                $('.wrapper_buttons_status').css('display','none')
                document.getElementById('check_ica_all').checked = false
            })
            .fail(function(error) {
                //console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un error'
                })
            })
            .always(function() {
            });

        }else{
        }
    });
  
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Éxito!',
            //     text: 'Cambios realizados correctamente'
            //   })
            // setTimeout(() => {
            //     window.location.reload()
            // }, 1500);
    
}

$('#check_ica_all').click(function(){
    let check_all = document.getElementById('check_ica_all')
    let inputs = document.querySelectorAll('#check_ica')
    if(check_all.checked){
        inputs.forEach(element => {
            if(is_user_negocio){
                if(element.getAttribute('disabled') != ""){
                    element.checked = true
                    $('.wrapper_buttons_status').css('display','flex')
                }
            }else{
                element.checked = true
                $('.wrapper_buttons_status').css('display','flex')
            }
        });
    }else{
        inputs.forEach(element => {
            element.checked = false
            $('.wrapper_buttons_status').css('display','none')
        });
    }
})

document.getElementById("macroproceso").addEventListener("change",function(){
  
    cargarProceso($('#empresa').val(),$('#area').val(),$('#unidad').val(),$('#macroproceso').val());
    
});
document.getElementById("tipo_activo").addEventListener("change",function(){
    ////console.log($('#tipo_activo').val());
    cargarCategoriaActivo($('#tipo_activo').val());
    
});

//modificando la vloracion de activo

// $('#btn_reload_valores').click(function(){
//     $.ajax({
//         url:BASE_URL+"/reloadValoracion",
//         dataType: "JSON",
//         beforeSend:function(){
//             $('#spinner_evaluacion').css('display','flex');
//             $('#apart_inventario').css('display','none');
//         }
//     })
//     .done(function(respuesta){ 
//         $('#spinner_evaluacion').css('display','none');
//         if(respuesta){
//             ////console.log(respuesta);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Éxito!',
//                 text: 'Cambios realizados correctamente'
//               })
//             setTimeout(() => {
//                 window.location.reload()
//             }, 1500);
//         }else{
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Error al actualizar'
//               })
//         }
        
       
//     })
// })