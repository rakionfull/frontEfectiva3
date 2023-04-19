var BASE_URL = document.getElementById("base_url").value;
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
                    `<option value="${item.id}">${item.posicion_puesto}</option>`
                ).trigger('change')
            })
        }
    })
})
function cargarProceso($macro,$dato) {
  
    const postData = {           
        idempresa: idempresa,
        idarea:idarea,
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
            console.log('hola');
            console.log(resarea);
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

loadTableInventarioClasificacionActivo()
function loadTableInventarioClasificacionActivo(){
    if ($.fn.DataTable.isDataTable('#table_inventario_clasificacion_activo')){
        $('#table_inventario_clasificacion_activo').DataTable().rows().remove();
        $('#table_inventario_clasificacion_activo').DataTable().destroy();
    }
    
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
        ajax: BASE_URL+"/getListInventarioClasificacionActivo/"+idempresa,
        aoColumns: [
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
            { "data": "val_c" },
            { "data": "val_i" },
            { "data": "val_d" },
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
            },
        ],
        columnDefs: [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_inventario_clasificacion_activo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
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
            console.log(resarea);
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
        let unidades = $.ajax({
            url:BASE_URL+"/activo/getUnidades/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea);
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
        })
        const postData = {           
            idempresa: idempresa,
            idarea:idarea,
            idunidad:idunidad
        };
        let macroproceso = $.ajax({
            method: "POST",
            // url:BASE_URL+"/activo/getMacroproceso/"+idempresa,
            url:$('#base_url').val()+"/activo/getMacroprocesoByActivo",
          
            dataType:'JSON',
            data:postData,
        })
        .done(function(resarea){
            console.log(resarea);
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
        // let proceso = $.ajax({
        //     url:BASE_URL+"/activo/getProceso/"+idempresa,
        //     dataType:'JSON'
        // })
        // .done(function(resarea){
        //     console.log(resarea);
        //     $('#modal_inventario_clasificacion_activo #proceso option').remove()
        //     $('#modal_inventario_clasificacion_activo #proceso').append(
        //         `<option value=''>Seleccionar</option>`
        //     )
        //     if(resarea.data.length > 0){
        //         resarea.data.forEach(element => {
        //             $('#modal_inventario_clasificacion_activo #proceso').append(
        //                 `<option value='${element.id}'>${element.proceso}</option>`
        //             )
        //         });
        //     }
        // })
        let tipo_activo = $.ajax({
            url:BASE_URL+"/activo/getTipoActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea);
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
        // let categoria_activo = $.ajax({
        //     url:BASE_URL+"/activo/getCatActivo",
        //     dataType:'JSON'
        // })
        // .done(function(resarea){
        //     console.log(resarea);
        //     $('#modal_inventario_clasificacion_activo #categoria_activo option').remove()
        //     $('#modal_inventario_clasificacion_activo #categoria_activo').append(
        //         `<option value=''>Seleccionar</option>`
        //     )
        //     if(resarea.data.length > 0){
        //         resarea.data.forEach(element => {
        //             $('#modal_inventario_clasificacion_activo #categoria_activo').append(
        //                 `<option value='${element.id}'>${element.categoria}</option>`
        //             )
        //         });
        //     }
        // })
        let ubicacion_activo = $.ajax({
            url:BASE_URL+"/activo/getUbiActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea);
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
        let propietario = $.ajax({
            url:BASE_URL+"/activo/getPosicion/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            $('#modal_inventario_clasificacion_activo #propietario option').remove()
            $('#modal_inventario_clasificacion_activo #propietario').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #propietario').append(
                        `<option value='${element.id_pos}'>${element.posicion_puesto} - ${element.area}</option>`
                    )
                });
            }
        })
        let custodio = $.ajax({
            url:BASE_URL+"/activo/getPosicion/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea)
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
        let valoracion_activo = $.ajax({
            url:BASE_URL+"/activo/getValActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            $('#modal_inventario_clasificacion_activo #val_c option').remove()
            $('#modal_inventario_clasificacion_activo #val_i option').remove()
            $('#modal_inventario_clasificacion_activo #val_d option').remove()
            $('#modal_inventario_clasificacion_activo #val_c').append(
                `<option value=''>Seleccionar</option>`
            )
            $('#modal_inventario_clasificacion_activo #val_i').append(
                `<option value=''>Seleccionar</option>`
            )
            $('#modal_inventario_clasificacion_activo #val_d').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #val_c').append(
                        `<option value='${element.valoracion1}'>${element.valoracion1}</option>`
                    )
                    $('#modal_inventario_clasificacion_activo #val_i').append(
                        `<option value='${element.valoracion2}'>${element.valoracion2}</option>`
                    )
                    $('#modal_inventario_clasificacion_activo #val_d').append(
                        `<option value='${element.valoracion3}'>${element.valoracion3}</option>`
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
        
        Promise.all([
            empresas,
            areas,
            unidades,
            macroproceso,
            // proceso,
            tipo_activo,
            categoria_activo,
            ubicacion_activo,
            // propietario,
            custodio,
            valoracion_activo,
            valor
        ]).then(()=>{
            $('#spinner-div').hide();
            $('#btn_add_ica').attr('disabled',false)
            $("#modal_inventario_clasificacion_activo").modal("show");
            $('#title_ica').html('Agregar Nuevo Inventario y Clasificación de Activos')
            document.getElementById("form_ica").reset();
            document.getElementById("add_ica").style.display = "block";
            document.getElementById("update_ica").style.display = "none";
            $("#modal_inventario_clasificacion_activo #empresa").prop('disabled', true);

            $("#modal_inventario_clasificacion_activo #empresa").val(idempresa);

            $("#modal_inventario_clasificacion_activo #area").prop('disabled', true);

            $("#modal_inventario_clasificacion_activo #area").val(idarea);

            $("#modal_inventario_clasificacion_activo #unidad").prop('disabled', true);

            $("#modal_inventario_clasificacion_activo #unidad").val(idunidad);

        })
        
    } catch (error) {
        
    }
    
})

$('#modal_inventario_clasificacion_activo #area').change(function(){
    let propietario = $.ajax({
        url:BASE_URL+"/activo/getPosicionByArea/"+$('#modal_inventario_clasificacion_activo #area').val(),
        dataType:'JSON'
    })
    .done(function(resarea){
        $('#modal_inventario_clasificacion_activo #propietario option').remove()
        $('#modal_inventario_clasificacion_activo #propietario').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                $('#modal_inventario_clasificacion_activo #propietario').append(
                    `<option value='${element.id_pos}'>${element.posicion_puesto} - ${element.area}</option>`
                )
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
    $val_c = $('#modal_inventario_clasificacion_activo #val_c').val()
    $val_i = $('#modal_inventario_clasificacion_activo #val_i').val()
    $val_d = $('#modal_inventario_clasificacion_activo #val_d').val()
    $valor = $('#modal_inventario_clasificacion_activo #valor').val()
    $comentario = $('#modal_inventario_clasificacion_activo #comentario').val()
    $estado = $('#modal_inventario_clasificacion_activo #estado').val()
    $estado2 = $('#modal_inventario_clasificacion_activo #estado_2').val()

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
        $val_c != "" &&
        $val_i != "" &&
        $val_d != "" &&
        $valor != "" &&
        $comentario != "" &&
        $estado != "" &&
        $estado2 != ""
    ){
        const postData = {
            idempresa:$empresa,
            idarea:$area,
            idunidad:$unidad,
            idmacroproceso:$macroproceso,
            idproceso:$proceso,
            activo:$activo,
            desc_activo:$desc_activo,
            idtipo_activo:$tipo_activo,
            idcategoria_activo:$categoria_activo,
            idubicacion:$ubicacion_activo,
            idpropietario:$propietario,
            idcustodio:$custodio,
            val_c:$val_c,
            val_i:$val_i,
            val_d:$val_d,
            idvalor:$valor,
            estado:$estado,
            estado_2:$estado2,
            comentario:$comentario
        }
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/addInventarioClasificacionActivo",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                console.log(respuesta);
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
                    $("#table_inventario_clasificacion_activo").DataTable().ajax.reload(null, false); 
                   
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
    // console.log(event.currentTarget)
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
            console.log(response);
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
            console.log(resarea);
            $('#modal_inventario_clasificacion_activo #area option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #area').append(
                        `<option value='${element.id}'>${element.area}</option>`
                    )
                });
            }
        })
        let unidades = $.ajax({
            url:BASE_URL+"/activo/getUnidades/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea);
            $('#modal_inventario_clasificacion_activo #unidad option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #unidad').append(
                        `<option value='${element.id}'>${element.unidad}</option>`
                    )
                });
            }
        })
        const postData = {           
            idempresa: idempresa,
            idarea:idarea,
            idunidad:idunidad
        };
        let macroproceso = $.ajax({
            method: "POST",
            // url:BASE_URL+"/activo/getMacroproceso/"+idempresa,
            url:$('#base_url').val()+"/activo/getMacroprocesoByActivo",
          
            dataType:'JSON',
            data:postData,
        })
        .done(function(resarea){
            console.log(resarea);
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
        // let macroproceso = $.ajax({
        //     url:BASE_URL+"/activo/getMacroproceso/"+idempresa,
        //     dataType:'JSON'
        // })
        // .done(function(resarea){
        //     console.log(resarea);
        //     $('#modal_inventario_clasificacion_activo #macroproceso option').remove()
        //     if(resarea.data.length > 0){
        //         resarea.data.forEach(element => {
        //             $('#modal_inventario_clasificacion_activo #macroproceso').append(
        //                 `<option value='${element.id}'>${element.macroproceso}</option>`
        //             )
        //         });
        //     }
        // })
        // let proceso = $.ajax({
        //     url:BASE_URL+"/activo/getProceso/"+idempresa,
        //     dataType:'JSON'
        // })
        // .done(function(resarea){
        //     console.log(resarea);
        //     $('#modal_inventario_clasificacion_activo #proceso option').remove()
        //     if(resarea.data.length > 0){
        //         resarea.data.forEach(element => {
        //             $('#modal_inventario_clasificacion_activo #proceso').append(
        //                 `<option value='${element.id}'>${element.proceso}</option>`
        //             )
        //         });
        //     }
        // })
        let tipo_activo = $.ajax({
            url:BASE_URL+"/activo/getTipoActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea);
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
            console.log(resarea);
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
            console.log(resarea);
            $('#modal_inventario_clasificacion_activo #ubicacion_activo option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #ubicacion_activo').append(
                        `<option value='${element.id}'>${element.direccion} - ${element.estadonombre} - ${element.paisnombre}</option>`
                    )
                });
            }
        })
        let propietario = $.ajax({
            url:BASE_URL+"/activo/getPosicion/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea);
            $('#modal_inventario_clasificacion_activo #propietario option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #propietario').append(
                        `<option value='${element.id_pos}'>${element.posicion_puesto} - ${element.area}</option>`
                    )
                });
            }
        })
        let custodio = $.ajax({
            url:BASE_URL+"/activo/getPosicion/"+idempresa,
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea);
            $('#modal_inventario_clasificacion_activo #custodio option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #custodio').append(
                        `<option value='${element.id_pos}'>${element.posicion_puesto} - ${element.area}</option>`
                    )
                });
            }
        })
        let valoracion_activo = $.ajax({
            url:BASE_URL+"/activo/getValActivo",
            dataType:'JSON'
        })
        .done(function(resarea){
            console.log(resarea);
            $('#modal_inventario_clasificacion_activo #val_c option').remove()
            $('#modal_inventario_clasificacion_activo #val_i option').remove()
            $('#modal_inventario_clasificacion_activo #val_d option').remove()
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #val_c').append(
                        `<option value='${element.valoracion1}'>${element.valoracion1}</option>`
                    )
                    $('#modal_inventario_clasificacion_activo #val_i').append(
                        `<option value='${element.valoracion2}'>${element.valoracion2}</option>`
                    )
                    $('#modal_inventario_clasificacion_activo #val_d').append(
                        `<option value='${element.valoracion3}'>${element.valoracion3}</option>`
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
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_inventario_clasificacion_activo #valor').append(
                        `<option value='${element.id}'>${element.valor}</option>`
                    )
                });
            }
        })
        
        Promise.all([
            empresas,
            areas,
            unidades,
            macroproceso,
            proceso,
            tipo_activo,
            categoria_activo,
            ubicacion_activo,
            propietario,
            custodio,
            valoracion_activo,
            valor
        ]).then(()=>{
    
            $.ajax({
                url:BASE_URL+"/getInventarioClasificacionActivo/"+event.currentTarget.getAttribute('data-id'),
                dataType:'JSON'
            })
            .done(function(res){
                 $('#spinner-div').hide();
                console.log(res.data)
                if(res.data.length > 0){

                    console.log(res.data[0].activo)
                    $('#table_inventario_clasificacion_activo tbody editICA').attr('disabled',false)
                    document.getElementById("form_ica").reset();
                    document.getElementById("add_ica").style.display = "none";
                    document.getElementById("update_ica").style.display = "block";
                    $('#title_ica').html('Editar Inventario y Clasificación de Activos');
                    if(is_user_negocio == 0){
                        // if(res.data[0].estado == 3){
                        //     // $('#modal_inventario_clasificacion_activo #estado option').remove()
                        //     // $('#modal_inventario_clasificacion_activo #estado').append(
                        //     //     `
                        //     //         <option value="3">Observado</option>
                        //     //         <option value="2">Registrado</option>
                        //     //     `
                        //     // )
                        //     $("#modal_inventario_clasificacion_activo .input_observacion").show()
                        // }
                        $("#modal_inventario_clasificacion_activo #id_ica").val(event.currentTarget.getAttribute('data-id'));
    
                        $("#modal_inventario_clasificacion_activo #empresa").val(res.data[0].idempresa);
    
                        $("#modal_inventario_clasificacion_activo #empresa").prop('disabled', true);
    
                        $("#modal_inventario_clasificacion_activo #area").val(res.data[0].idarea);
                        $("#modal_inventario_clasificacion_activo #area").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #unidad").val(res.data[0].idunidades);
                        $("#modal_inventario_clasificacion_activo #unidad").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #macroproceso").val(res.data[0].idmacroproceso);
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
                        $("#modal_inventario_clasificacion_activo #propietario").val(res.data[0].idpropietario);
                        $("#modal_inventario_clasificacion_activo #propietario").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #custodio").val(res.data[0].idcustodio);
                        $("#modal_inventario_clasificacion_activo #custodio").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #val_c").val(res.data[0].val_c);
                        $("#modal_inventario_clasificacion_activo #val_c").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #val_i").val(res.data[0].val_i);
                        $("#modal_inventario_clasificacion_activo #val_i").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #val_d").val(res.data[0].val_d);
                        $("#modal_inventario_clasificacion_activo #val_d").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #valor").val(res.data[0].idvalor);
                        $("#modal_inventario_clasificacion_activo #valor").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #comentario").val(res.data[0].comentario);
                        $("#modal_inventario_clasificacion_activo #comentario").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #estado").val(res.data[0].estado);
                        cargarProceso(res.data[0].idmacroproceso,res.data[0].idproceso);
                        $("#modal_inventario_clasificacion_activo #observacion").val(res.data[0].observacion);
                      
                        
                        $("#modal_inventario_clasificacion_activo").modal("show");
                    }else{
                        if(res.data[0].estado == 3){
                            $('#modal_inventario_clasificacion_activo #estado option').remove()
                            $('#modal_inventario_clasificacion_activo #estado').append(
                                `
                                    <option value="3">Observado</option>
                                    <option value="2">Registrado</option>
                                    <option value="7">Inactivo</option>
                                `
                            )
                            $("#modal_inventario_clasificacion_activo .input_observacion").show()
                        }
                        $("#modal_inventario_clasificacion_activo #id_ica").val(event.currentTarget.getAttribute('data-id'));
    
                        $("#modal_inventario_clasificacion_activo #empresa").val(res.data[0].idempresa);
    
                        $("#modal_inventario_clasificacion_activo #empresa").prop('disabled', true);
    
                        $("#modal_inventario_clasificacion_activo #area").val(res.data[0].idarea);
                        $("#modal_inventario_clasificacion_activo #area").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #unidad").val(res.data[0].idunidades);
                        $("#modal_inventario_clasificacion_activo #unidad").prop('disabled', true);
                        $("#modal_inventario_clasificacion_activo #macroproceso").val(res.data[0].idmacroproceso);
                        // $("#modal_inventario_clasificacion_activo #proceso").val(res.data[0].idproceso);
                        cargarProceso(res.data[0].idmacroproceso,res.data[0].idproceso);
                        $("#modal_inventario_clasificacion_activo #activo").val(res.data[0].activo);
                        $("#modal_inventario_clasificacion_activo #desc_activo").val(res.data[0].desc_activo);
                        $("#modal_inventario_clasificacion_activo #tipo_activo").val(res.data[0].idtipo_activo);
                        $("#modal_inventario_clasificacion_activo #categoria_activo").val(res.data[0].idcategoria_activo);
                        $("#modal_inventario_clasificacion_activo #ubicacion_activo").val(res.data[0].idubicacion);
                        $("#modal_inventario_clasificacion_activo #propietario").val(res.data[0].idpropietario);
                        $("#modal_inventario_clasificacion_activo #custodio").val(res.data[0].idcustodio);
                        $("#modal_inventario_clasificacion_activo #val_c").val(res.data[0].val_c);
                        $("#modal_inventario_clasificacion_activo #val_i").val(res.data[0].val_i);
                        $("#modal_inventario_clasificacion_activo #val_d").val(res.data[0].val_d);
                        $("#modal_inventario_clasificacion_activo #valor").val(res.data[0].idvalor);
                        $("#modal_inventario_clasificacion_activo #comentario").val(res.data[0].comentario);
                        $("#modal_inventario_clasificacion_activo #estado").val(res.data[0].estado);
                        $("#modal_inventario_clasificacion_activo #observacion").val(res.data[0].observacion);
                        
                        $("#modal_inventario_clasificacion_activo").modal("show");
                    }

                   
                    
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
    $val_c = $('#modal_inventario_clasificacion_activo #val_c').val()
    $val_i = $('#modal_inventario_clasificacion_activo #val_i').val()
    $val_d = $('#modal_inventario_clasificacion_activo #val_d').val()
    $valor = $('#modal_inventario_clasificacion_activo #valor').val()
    $comentario = $('#modal_inventario_clasificacion_activo #comentario').val()
    $estado = $('#modal_inventario_clasificacion_activo #estado').val()
    $estado2 = $('#modal_inventario_clasificacion_activo #estado_2').val()
    $observacion = $('#modal_inventario_clasificacion_activo #observacion').val()
    const id = $('#modal_inventario_clasificacion_activo #id_ica').val()
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
        $val_c != "" &&
        $val_i != "" &&
        $val_d != "" &&
        $valor != "" &&
        $comentario != "" &&
        $estado2 != "" &&
        ($estado != "" || $estado != "0")
    ){
        const postData = {
            idempresa:$empresa,
            idarea:$area,
            idunidad:$unidad,
            idmacroproceso:$macroproceso,
            idproceso:$proceso,
            activo:$activo,
            desc_activo:$desc_activo,
            idtipo_activo:$tipo_activo,
            idcategoria_activo:$categoria_activo,
            idubicacion:$ubicacion_activo,
            idpropietario:$propietario,
            idcustodio:$custodio,
            val_c:$val_c,
            val_i:$val_i,
            val_d:$val_d,
            idvalor:$valor,
            estado:$estado,
            estado_2:$estado2,
            comentario:$comentario,
            observacion:$observacion
        }
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/updateInventarioClasificacionActivo/"+id,
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                console.log(respuesta)
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
                    $("#table_inventario_clasificacion_activo").DataTable().ajax.reload(null, false); 
                   
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.msg
                    })
                }
                
            })
            .fail(function(error) {
                console.log(error)
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
            console.log(error)
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

    //recuperando los datos
    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar le inventario de clasificacion y activo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancel`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "post",
                url: BASE_URL+"/deleteInventarioClasificacionActivo/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    alerta_inventario_clasificacion_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_inventario_clasificacion_activo").DataTable().ajax.reload(null, false); 
                   
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
        console.log(respuesta)
    })
    .fail(function(error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error'
        })
    })
    .always(function() {
    });
})
$('#modal_inventario_clasificacion_activo #val_d,#modal_inventario_clasificacion_activo #val_i,#modal_inventario_clasificacion_activo #val_c').change(function(){
    if(
        $('#modal_inventario_clasificacion_activo #val_i').val() != "" &&
        $('#modal_inventario_clasificacion_activo #val_c').val() != "" &&
        $('#modal_inventario_clasificacion_activo #val_d').val() != ""
    ){
        $.ajax({
            method: "POST",
            url: BASE_URL+"/getValorByValoraciones",
            data:{
                'val_i':Number($('#modal_inventario_clasificacion_activo #val_i').val()),
                'val_d':Number($('#modal_inventario_clasificacion_activo #val_d').val()),
                'val_c':Number($('#modal_inventario_clasificacion_activo #val_c').val())
            },
            dataType: "JSON"
        })
        .done(function(respuesta) {
            console.log(respuesta)
            if(respuesta.data.length > 0){
                $('#modal_inventario_clasificacion_activo #valor').val(respuesta.data[0].id)
            }
            
        })
        .fail(function(error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrio un error'
            })
        })
        .always(function() {
        });
    }else{
        // Swal.fire({
        //     icon: 'warning',
        //     title: 'Opps',
        //     text: 'Seleccione los datos de confidencialidad e integridad'
        // })
    }
})

function showButtonsICA(){
    let inputs = document.querySelectorAll('#check_ica')
    let count = 0
    console.log(inputs)
    inputs.forEach(element => {
        console.log(element.checked)
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
    let inputs = document.querySelectorAll('#check_ica')
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
                console.log(respuesta)
                $("#table_inventario_clasificacion_activo").DataTable().ajax.reload(null, false);
                $('.wrapper_buttons_status').css('display','none')
                document.getElementById('check_ica_all').checked = false
            })
            .fail(function(error) {
                console.log(error)
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
  
    cargarProceso($('#macroproceso').val());
    
});
document.getElementById("tipo_activo").addEventListener("change",function(){
    console.log($('#tipo_activo').val());
    cargarCategoriaActivo($('#tipo_activo').val());
    
});