var BASE_URL = document.getElementById("base_url").value;
var alerta_evaluacion_riesgo = document.getElementById("alerta_evaluacion_riesgo");


//cargar los combox
function cargarUnidad($dato) {
   
    const postData = {           
        idempresa: idempresa,
        idarea:idarea,
    };
   
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getUnidadByActivo",
            dataType: "JSON",
            data:postData
        })
       .done(function(resarea){
        $('#modal_evaluacion_riesgo #unidad option').remove()
        $('#modal_evaluacion_riesgo #unidad').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                if(element.id == $dato){
                    $('#modal_evaluacion_riesgo #unidad').append(
                        `<option value='${element.id}' selected>${element.unidad}</option>`
                    )
                }else{
                    $('#modal_evaluacion_riesgo #unidad').append(
                        `<option value='${element.id}'>${element.unidad}</option>`
                    )
                }
             
            });
        }
    })

    
}
function cargarMacroProceso($unidad,$dato) {
  
    const postData = {           
        idempresa: idempresa,
        idarea:idarea,
        idunidad:$unidad,
       
    };
   
     $.ajax({
            method:"POST",
            url:BASE_URL+"/activo/getMacroprocesoByActivo",
            dataType:'JSON',
            data:postData,
        })
        .done(function(resarea){
           
           
            $('#modal_evaluacion_riesgo #macroproceso option').remove()
            $('#modal_evaluacion_riesgo #macroproceso').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    if( element.id == $dato){
                        $('#modal_evaluacion_riesgo #macroproceso').append(
                            `<option value='${element.id}' selected>${element.macroproceso}</option>`
                        )
                    }else{
                        $('#modal_evaluacion_riesgo #macroproceso').append(
                            `<option value='${element.id}'>${element.macroproceso}</option>`
                        )
                    }
                   
                });
            }
        })
}
function cargarProceso($unidad,$macro,$dato) {
    //console.log($unidad);
    // console.log($dato);
    const postData = {           
        idempresa: idempresa,
        idarea:idarea,
        idunidad:$unidad,
        idmacroproceso:$macro
    };
   
     $.ajax({
            method:"POST",
            url:BASE_URL+"/activo/listaProcesoByMacro",
            dataType:'JSON',
            data:postData,
        })
        .done(function(resarea){
           
            console.log(resarea);
            $('#modal_evaluacion_riesgo #proceso option').remove()
            $('#modal_evaluacion_riesgo #proceso').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    if($dato == element.id){
                        $('#modal_evaluacion_riesgo #proceso').append(
                            `<option value='${element.id}' selected>${element.proceso}</option>`
                        )
                    }else{
                        $('#modal_evaluacion_riesgo #proceso').append(
                            `<option value='${element.id}'>${element.proceso}</option>`
                        )
                    }
                   
                });
            }
        })
}

loadTableEvaluacionRiesgos()
function loadTableEvaluacionRiesgos(){
    // console.log(update,eliminar);
    console.log(escenario);
    if ($.fn.DataTable.isDataTable('#table_evaluacion_riesgo')){
        $('#table_evaluacion_riesgo').DataTable().rows().remove();
        $('#table_evaluacion_riesgo').DataTable().destroy();
    }

    let table = $('#table_evaluacion_riesgo').DataTable({
        
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
        pageLength:10,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/listEvaluacionRiesgos/"+idempresa,
        aoColumns: [
            { "data": "id" },
            { "data": "riesgo" },
            { "data": "probabilidad" },
            { "data": "impacto" },
            { "data": "valor" },
            { "data": "riesgo_controlado_probabilidad" },
            { "data": "riesgo_controlado_impacto" },
            { "data": "riesgo_controlado_valor" },
            {
                data:null,
                "mRender":function(data){
                    if(data.estado == 1){
                        return 'Activo';
                    }
                    return 'Inactivo'
                }
            },
            {
                data:null,
                "mRender":function(data){
                    $cadena = "";
                    if(data.id_user_added == id_user){
                            if (update == '1'){
                                $cadena =   $cadena +  `<editEVA data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editEVA>`;
                            
                            } 
                            if (eliminar == '1') {
                                $cadena =     $cadena +  `<deleteEVA data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteEVA>`
                            }
                            if (update == '0' && eliminar=='0'){
                                return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                            }
                            return $cadena;
                    }else{
                        return  "<i class='fas fa-exclamation-circle text-danger font-size-18' title='no tiene permisos'></i>";
                    }
                        
                }
            },
            // {
            //     data:null,
            //     "mRender":function(data){
            //         if(data.id_user_added == id_user){
            //             return `<editEVA data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editEVA>
            //             <deleteEVA data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteEVA>`
            //         }else{
            //             return null
            //         }
            //     }
            // },
        ],
        columnDefs: [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_evaluacion_riesgo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}

$('#btn_add_evaluacion_riesgo').click(function(){
    try {
    $('#btn_add_evaluacion_riesgo').attr('disabled',true)

   
        $('#spinner-div').show();
        let id_empresa_default = 0
    let tipo_riesgos = $.ajax({
        url:BASE_URL+"/main/getTipoRiesgosByActivo",
        dataType:'JSON'
    })
    .done(function(response){
        $('#modal_evaluacion_riesgo #tipo_riesgo option').remove()
        $('#modal_evaluacion_riesgo #tipo_riesgo').append(
            `<option value=''>Seleccionar</option>`
        )
        if(response.data.length > 0){
            response.data.forEach(element => {
                $('#modal_evaluacion_riesgo #tipo_riesgo').append(
                    `<option value='${element.id}'>${element.tipo_riesgo}</option>`
                )
            });
        }
    })
    let empresas = $.ajax({
        method: "POST",
        url:BASE_URL+"/activo/getEmpresasByActivo",
        dataType:'JSON'
    })
    .done(function(response){
        $('#modal_evaluacion_riesgo #empresa option').remove()
        $('#modal_evaluacion_riesgo #empresa').append(
            `<option value=''>Seleccionar</option>`
        )
        if(response.data.length > 0){
            id_empresa_default = response.data[0].id
            response.data.forEach(element => {
                $('#modal_evaluacion_riesgo #empresa').append(
                    `<option value='${element.id}'>${element.empresa}</option>`
                )
            });
        }
    })

    var postData = {
        idempresa:idempresa
    }
    let areas = $.ajax({
        method: "POST",
        url:BASE_URL+"/activo/getAreasByActivo",
        data:postData,
        dataType:'JSON'
    })
    .done(function(resarea){
     
        $('#modal_evaluacion_riesgo #area option').remove()
        $('#modal_evaluacion_riesgo #area').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                $('#modal_evaluacion_riesgo #area').append(
                    `<option value='${element.id}'>${element.area}</option>`
                )
            });
        }
    })
    

    let tipos_amenaza = $.ajax({
        url:BASE_URL+"/main/getTiposAmenaza",
        dataType:'JSON'
    })
    .done(function(resarea){
        $('#modal_evaluacion_riesgo #tipo_amenaza option').remove()
        $('#modal_evaluacion_riesgo #tipo_amenaza').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                $('#modal_evaluacion_riesgo #tipo_amenaza').append(
                    `<option value='${element.id}'>${element.tipo}</option>`
                )
            });
        }
    })
    // let desc_amenaza = $.ajax({
    //     url:BASE_URL+"/main/getDescAmenaza",
    //     dataType:'JSON'
    // })
    // .done(function(resarea){
    //     $('#modal_evaluacion_riesgo #desc_amenaza option').remove()
    //     $('#modal_evaluacion_riesgo #desc_amenaza').append(
    //         `<option value=''>Seleccionar</option>`
    //     )
    //     if(resarea.data.length > 0){
    //         resarea.data.forEach(element => {
    //             $('#modal_evaluacion_riesgo #desc_amenaza').append(
    //                 `<option value='${element.id}'>${element.amenaza}</option>`
    //             )
    //         });
    //     }
    // })
    let tipo_vulnerabilidad = $.ajax({
        url:BASE_URL+"/main/getCategoriasVulnerabilidad",
        dataType:'JSON'
    })
    .done(function(resarea){
        $('#modal_evaluacion_riesgo #tipo_vulnerabilidad option').remove()
        $('#modal_evaluacion_riesgo #tipo_vulnerabilidad').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                $('#modal_evaluacion_riesgo #tipo_vulnerabilidad').append(
                    `<option value='${element.id}'>${element.categoria}</option>`
                )
            });
        }
    })
    // let desc_vulnerabilidad = $.ajax({
    //     url:BASE_URL+"/main/getDescVulnerabilidad",
    //     dataType:'JSON'
    // })
    // .done(function(resarea){
    //     console.log(resarea)
    //     $('#modal_evaluacion_riesgo #desc_vulnerabilidad option').remove()
    //     $('#modal_evaluacion_riesgo #desc_vulnerabilidad').append(
    //         `<option value=''>Seleccionar</option>`
    //     )
    //     if(resarea.data.length > 0){
    //         resarea.data.forEach(element => {
    //             $('#modal_evaluacion_riesgo #desc_vulnerabilidad').append(
    //                 `<option value='${element.id}'>${element.vulnerabilidad}</option>`
    //             )
    //         });
    //     }
    // })
    let registro_controles = $.ajax({
        url:BASE_URL+"/list_registro_controles",
        dataType:'json'
    })
    .done(function(respuesta){
        
        $('#modal_evaluacion_riesgo #control option').remove()
        $('#modal_evaluacion_riesgo #control').append(
            `<option value=''>Seleccionar</option>`
        )
        if(respuesta.data.length > 0){
            respuesta.data.forEach(element => {
                $('#modal_evaluacion_riesgo #control').append(
                    `<option value='${element.id}'>${element.nom_control}</option>`
                )
            });
        }
    })
    $('#btn_add_evaluacion_riesgo').attr('disabled',false)
    $("#modal_evaluacion_riesgo").modal("show");
    $('#title_eva').html('Agregar Evaluación de riesgo')
    document.getElementById("form_eva").reset();
    document.getElementById("add_eva").style.display = "block";
    document.getElementById("update_eva").style.display = "none";
    Promise.all([  empresas,
        areas,registro_controles,
        tipo_vulnerabilidad,tipos_amenaza
    ]
      
    ).then(()=> {
        $('#spinner-div').hide();
        if(is_user_negocio == 1){
            
            // Mostrar empresa y area por defecto
            // console.log(idempresa);
            $('#modal_evaluacion_riesgo #empresa').val(idempresa);
            $('#modal_evaluacion_riesgo #empresa').attr('disabled',true);
            $('#modal_evaluacion_riesgo #area').val(idarea);
            $('#modal_evaluacion_riesgo #area').attr('disabled',true);
            cargarUnidad();
            // Para riesgo solo establecer empresa
        }else{
            
            $('#modal_evaluacion_riesgo #empresa').val('');
            $('#modal_evaluacion_riesgo #empresa').attr('disabled',false) ;
            $('#modal_evaluacion_riesgo #area').val('');
            $('#modal_evaluacion_riesgo #area').attr('disabled',false);
        }
    })
    } catch (error) {
        
    }
})
function loadDescVulnerabilidad(id_tipo_vulnerabilidad,id_descripcion_vulnerabilidad){
    let text = document.querySelector('#modal_evaluacion_riesgo #tipo_vulnerabilidad option[value="'+id_tipo_vulnerabilidad+'"]').innerHTML
    $.ajax({
        url:BASE_URL+"/main/getDescVulnerabilidad",
        dataType:'JSON'
    })
    .done(function(resarea){
        console.log(resarea)
        $('#modal_evaluacion_riesgo #desc_vulnerabilidad option').remove()
        $('#modal_evaluacion_riesgo #desc_vulnerabilidad').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                if(element.categoria == text)
                $('#modal_evaluacion_riesgo #desc_vulnerabilidad').append(
                    `<option value='${element.id}'>${element.vulnerabilidad}</option>`
                )
            });
        }
        $('#modal_evaluacion_riesgo #desc_vulnerabilidad').val(id_descripcion_vulnerabilidad)
    })
}
$('#modal_evaluacion_riesgo #tipo_vulnerabilidad').change(function(){
    let text = document.querySelector('#modal_evaluacion_riesgo #tipo_vulnerabilidad option[value="'+$('#modal_evaluacion_riesgo #tipo_vulnerabilidad').val()+'"]').innerHTML
    $.ajax({
        url:BASE_URL+"/main/getDescVulnerabilidad",
        dataType:'JSON'
    })
    .done(function(resarea){
        console.log(resarea)
        $('#modal_evaluacion_riesgo #desc_vulnerabilidad option').remove()
        $('#modal_evaluacion_riesgo #desc_vulnerabilidad').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                if(element.categoria == text)
                $('#modal_evaluacion_riesgo #desc_vulnerabilidad').append(
                    `<option value='${element.id}'>${element.vulnerabilidad}</option>`
                )
            });
        }
    })
})
$('#modal_evaluacion_riesgo #tipo_amenaza').change(function(){
    $.ajax({
        url:BASE_URL+"/main/getDescAmenaza",
        dataType:'JSON'
    })
    .done(function(resarea){
        console.log(resarea)
        tipo_amenaza = $('#modal_evaluacion_riesgo #tipo_amenaza').val()
        $('#modal_evaluacion_riesgo #desc_amenaza option').remove()
        $('#modal_evaluacion_riesgo #desc_amenaza').append(
            `<option value=''>Seleccionar</option>`
        )
        if(resarea.data.length > 0){
            resarea.data.forEach(element => {
                if(element.id_tipo_amenaza == tipo_amenaza){
                    $('#modal_evaluacion_riesgo #desc_amenaza').append(
                        `<option value='${element.id}'>${element.amenaza}</option>`
                    )
                }
            });
        }
    })
})
$('#modal_evaluacion_riesgo #area,#modal_evaluacion_riesgo #empresa').change(function(){
    cargarUnidad(null)
})
$('#modal_evaluacion_riesgo #proceso').change(function(){
    let activos = $.ajax({
        url:BASE_URL+"/getListInventarioClasificacionActivo/"+idempresa,
        dataType:'json'
    })
    .done(function(respuesta){
        console.log('rpoceso')
        console.log(respuesta)
        proceso = $('#modal_evaluacion_riesgo #proceso').val()
        $('#modal_evaluacion_riesgo #activo option').remove()
        $('#modal_evaluacion_riesgo #activo').append(
            `<option value=''>Seleccionar</option>`
        )
        if(respuesta.data.length > 0){
            respuesta.data.forEach(element => {
                if(element.id_proceso == proceso){
                    $('#modal_evaluacion_riesgo #activo').append(
                        `<option value='${element.ica_id}'>${element.activo}</option>`
                    )
                }
            });
        }
    })
})
$('#add_eva').click(function(){
    $tipo_riesgo = $('#modal_evaluacion_riesgo #tipo_riesgo').val()
    $empresa = $('#modal_evaluacion_riesgo #empresa').val()
    $area = $('#modal_evaluacion_riesgo #area').val()
    $unidad = $('#modal_evaluacion_riesgo #unidad').val()
    $macroproceso = $('#modal_evaluacion_riesgo #macroproceso').val()
    $proceso = $('#modal_evaluacion_riesgo #proceso').val()
    $activo = $('#modal_evaluacion_riesgo #activo').val()
    $tipo_amenaza = $('#modal_evaluacion_riesgo #tipo_amenaza').val()
    $desc_amenaza = $('#modal_evaluacion_riesgo #desc_amenaza').val()
    $tipo_vulnerabilidad = $('#modal_evaluacion_riesgo #tipo_vulnerabilidad').val()
    $desc_vulnerabilidad = $('#modal_evaluacion_riesgo #desc_vulnerabilidad').val()
    $riesgo = $('#modal_evaluacion_riesgo #riesgo').val()
    $valor_probabilidad = $('#modal_evaluacion_riesgo #valor_probabilidad').val()
    $probabilidad = $('#modal_evaluacion_riesgo #probabilidad').val()
    $valor_impacto = $('#modal_evaluacion_riesgo #valor_impacto').val()
    $impacto = $('#modal_evaluacion_riesgo #impacto').val()
    $valor = $('#modal_evaluacion_riesgo #valor').val()
    $controles = $('#modal_evaluacion_riesgo #control').val()
    $control = $('#modal_evaluacion_riesgo #control_selected').val()
    $riesgo_controlado_probabilidad = $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val()
    $riesgo_controlado_impacto = $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val()
    $riesgo_controlado_valor = $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val()
    $estado = $('#modal_evaluacion_riesgo #estado').val()
// $impacto != "" &&    $probabilidad != "" &&    $riesgo_controlado_probabilidad != "" &&
    //    $riesgo_controlado_impacto != "" &&
    if(
        $tipo_riesgo != "" &&
        $empresa != "" &&
        $area != "" &&
        $unidad != "" &&
        $macroproceso != "" &&
        $proceso != "" &&
        $activo != "" &&
        $tipo_amenaza != "" &&
        $desc_amenaza != "" &&
        $tipo_vulnerabilidad != "" &&
        $desc_vulnerabilidad != "" &&
        $riesgo != "" &&
        $valor_probabilidad != "" &&
        $valor_impacto != "" &&
        $valor != "" &&
        $estado != ""
    ){
        const postData = {
            id_tipo_riesgo:$tipo_riesgo,
            id_empresa:$empresa,
            id_area:$area,
            id_unidad:$unidad,
            id_macroproceso:$macroproceso,
            id_proceso:$proceso,
            id_activo:$activo,
            id_tipo_amenaza:$tipo_amenaza,
            id_descripcion_amenaza:$desc_amenaza,
            id_tipo_vulnerabilidad:$tipo_vulnerabilidad,
            id_descripcion_vulnerabilidad:$desc_vulnerabilidad,
            riesgo:$riesgo,
            valor_probabilidad:$valor_probabilidad,
            probabilidad:$probabilidad,
            valor_impacto:$valor_impacto,
            impacto:$impacto,
            valor:$valor,
            id_control:$control,
            riesgo_controlado_probabilidad:$riesgo_controlado_probabilidad,
            riesgo_controlado_impacto:$riesgo_controlado_impacto,
            riesgo_controlado_valor:$riesgo_controlado_valor,
            estado:$estado,
            controles:$controles
        }
        try {
            $.ajax({
                method:'POST',
                url:BASE_URL+"/addEvaluacionRiesgo",
                data:postData,
                dataType:"JSON"
            })
            .done(function(response){
                console.log(response);
                if(!response.error){
                    document.getElementById('form_eva').reset()
                    $('#modal_evaluacion_riesgo').modal('hide')
                    alerta_evaluacion_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha guardado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_evaluacion_riesgo").DataTable().ajax.reload(null, false); 
                   
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.msg
                    })
                }
            })
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
$("#table_evaluacion_riesgo").on('click','editEVA',function(event){
    try {
        $('#spinner-div').show();
        $('#table_evaluacion_riesgo tbody editEVA').attr('disabled',true)
        $('#title_eva').html('Modificar Evaluación de Riesgo');
   
        let id_empresa_default = 0
        let tipo_riesgos = $.ajax({
            url:BASE_URL+"/main/getTipoRiesgos",
            dataType:'JSON'
        })
        .done(function(response){
           
            $('#modal_evaluacion_riesgo #tipo_riesgo option').remove()
            $('#modal_evaluacion_riesgo #tipo_riesgo').append(
                `<option value=''>Seleccionar</option>`
            )
            if(response.data.length > 0){
                response.data.forEach(element => {
                    $('#modal_evaluacion_riesgo #tipo_riesgo').append(
                        `<option value='${element.id}'>${element.tipo_riesgo}</option>`
                    )
                });
            }
        })
        let empresas = $.ajax({
            method: "POST",
            url:BASE_URL+"/activo/getEmpresasByActivo",
            dataType:'JSON'
        })
        .done(function(response){
           
            $('#modal_evaluacion_riesgo #empresa option').remove()
            $('#modal_evaluacion_riesgo #empresa').append(
                `<option value=''>Seleccionar</option>`
            )
            if(response.data.length > 0){
                id_empresa_default = response.data[0].id
                response.data.forEach(element => {
                    $('#modal_evaluacion_riesgo #empresa').append(
                        `<option value='${element.id}'>${element.empresa}</option>`
                    )
                });
            }
        })
        var postData = {
            idempresa:idempresa
        }
        let areas = $.ajax({
            method: "POST",
            url:BASE_URL+"/activo/getAreasByActivo",
            data:postData,
            dataType:'JSON'
        })
        .done(function(resarea){
          
            $('#modal_evaluacion_riesgo #area option').remove()
            $('#modal_evaluacion_riesgo #area').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_evaluacion_riesgo #area').append(
                        `<option value='${element.id}'>${element.area}</option>`
                    )
                });
            }
        })
        let tipos_amenaza = $.ajax({
            url:BASE_URL+"/main/getTiposAmenaza",
            dataType:'JSON'
        })
        .done(function(resarea){
           
            $('#modal_evaluacion_riesgo #tipo_amenaza option').remove()
            $('#modal_evaluacion_riesgo #tipo_amenaza').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_evaluacion_riesgo #tipo_amenaza').append(
                        `<option value='${element.id}'>${element.tipo}</option>`
                    )
                });
            }
        })
        let desc_amenaza = $.ajax({
            url:BASE_URL+"/main/getDescAmenaza",
            dataType:'JSON'
        })
        .done(function(resarea){ 
           
            $('#modal_evaluacion_riesgo #desc_amenaza option').remove()
            $('#modal_evaluacion_riesgo #desc_amenaza').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_evaluacion_riesgo #desc_amenaza').append(
                        `<option value='${element.id}'>${element.amenaza}</option>`
                    )
                });
            }
        })
        let tipo_vulnerabilidad = $.ajax({
            url:BASE_URL+"/main/getCategoriasVulnerabilidad",
            dataType:'JSON'
        })
        .done(function(resarea){
          
            $('#modal_evaluacion_riesgo #tipo_vulnerabilidad option').remove()
            $('#modal_evaluacion_riesgo #tipo_vulnerabilidad').append(
                `<option value=''>Seleccionar</option>`
            )
            if(resarea.data.length > 0){
                resarea.data.forEach(element => {
                    $('#modal_evaluacion_riesgo #tipo_vulnerabilidad').append(
                        `<option value='${element.id}'>${element.categoria}</option>`
                    )
                });
            }
        })
        // let desc_vulnerabilidad = $.ajax({
        //     url:BASE_URL+"/main/getDescVulnerabilidad",
        //     dataType:'JSON'
        // })
        // .done(function(resarea){
            
        //     $('#modal_evaluacion_riesgo #desc_vulnerabilidad option').remove()
        //     $('#modal_evaluacion_riesgo #desc_vulnerabilidad').append(
        //         `<option value=''>Seleccionar</option>`
        //     )
        //     if(resarea.data.length > 0){
        //         resarea.data.forEach(element => {
        //             $('#modal_evaluacion_riesgo #desc_vulnerabilidad').append(
        //                 `<option value='${element.id}'>${element.vulnerabilidad}</option>`
        //             )
        //         });
        //     }
        // })
    
        let activos = $.ajax({
            url:BASE_URL+"/getListInventarioClasificacionActivo/"+idempresa,
            dataType:'json'
        })
        .done(function(respuesta){
            
            $('#modal_evaluacion_riesgo #activo option').remove()
            $('#modal_evaluacion_riesgo #activo').append(
                `<option value=''>Seleccionar</option>`
            )
            if(respuesta.data.length > 0){
                respuesta.data.forEach(element => {
                    $('#modal_evaluacion_riesgo #activo').append(
                        `<option value='${element.ica_id}'>${element.activo}</option>`
                    )
                });
            }
        })
    
        let registro_controles = $.ajax({
            url:BASE_URL+"/list_registro_controles",
            dataType:'json'
        })
        .done(function(respuesta){
            console.log(respuesta)
            $('#modal_evaluacion_riesgo #control option').remove()
            $('#modal_evaluacion_riesgo #control').append(
                `<option value=''>Seleccionar</option>`
            )
            if(respuesta.data.length > 0){
                respuesta.data.forEach(element => {
                    $('#modal_evaluacion_riesgo #control').append(
                        `<option value='${element.id}'>${element.nom_control}</option>`
                    )
                });
            }
        })
    
        $("#modal_evaluacion_riesgo").modal("show");
        $.ajax({
            url:BASE_URL+"/getEvaluacionRiesgoControlesByEvaluacion/"+event.currentTarget.getAttribute('data-id'),
            dataType:'JSON'
        })
        .done(function(response){
            console.log('Controleee')
            console.log(response);
            $array_controles_aplicados = []
            if(response.data.length > 0){
                response.data.map(item => {
                    $array_controles_aplicados.push(item.id_control)
                });
                $('#modal_evaluacion_riesgo #control').val($array_controles_aplicados).change()
    
            }
        })
        Promise.all([
            tipo_riesgos,
            empresas,
            areas,
            tipos_amenaza,
            desc_amenaza,
            tipo_vulnerabilidad,
            // desc_vulnerabilidad,
            activos,
            registro_controles,
            empresas,
            
        ]).then(() => {
           
            $.ajax({
                url:BASE_URL+"/getEvaluacionRiesgo/"+event.currentTarget.getAttribute('data-id'),
                dataType:'JSON'
            })
            .done(function(res){
                console.log('reeeeee')
                console.log(res)
                if(res.data.length > 0){
                    $('#table_evaluacion_riesgo tbody editEVA').attr('disabled',false)
                    document.getElementById("form_eva").reset();
                    document.getElementById("add_eva").style.display = "none";
                    document.getElementById("update_eva").style.display = "block";
                    $('#title_ica').html('Editar Evaluacion de Riesgo')
                    if(res.data[0].estado == 3){
                        $('#modal_evaluacion_riesgo #estado option').remove()
                        $('#modal_evaluacion_riesgo #estado').append(
                            `
                                <option value="3">Observado</option>
                                <option value="2">Registrado</option>
                            `
                        )
                        $("#modal_evaluacion_riesgo .input_observacion").show()
                    }
    
                    if(is_user_negocio){
                        // Mostrar empresa y area por defecto
                        $('#modal_evaluacion_riesgo #empresa').val(idempresa)
                        $('#modal_evaluacion_riesgo #empresa').attr('disabled',true)
                        $('#modal_evaluacion_riesgo #area').val(idarea)
                        $('#modal_evaluacion_riesgo #area').attr('disabled',true)
                        // Para riesgo solo establecer empresa
                    }else{
                        $('#modal_evaluacion_riesgo #empresa').val('')
                        $('#modal_evaluacion_riesgo #empresa').attr('disabled',false) 
                        $('#modal_evaluacion_riesgo #area').val('')
                        $('#modal_evaluacion_riesgo #area').attr('disabled',false)
                    }
    
                    $("#modal_evaluacion_riesgo #id_eva").val(event.currentTarget.getAttribute('data-id'));
                    $("#modal_evaluacion_riesgo #tipo_riesgo").val(res.data[0].id_tipo_riesgo);
                    $("#modal_evaluacion_riesgo #empresa").val(res.data[0].idempresa);
                    $("#modal_evaluacion_riesgo #area").val(res.data[0].idarea);
                    cargarUnidad(res.data[0].idunidades);
                    cargarMacroProceso(res.data[0].idunidades,res.data[0].idmacroproceso);
                    cargarProceso(res.data[0].idunidades,res.data[0].idmacroproceso,res.data[0].idproceso);
                    loadDescVulnerabilidad(res.data[0].id_tipo_vulnerabilidad,res.data[0].id_descripcion_vulnerabilidad)
                    // $("#modal_evaluacion_riesgo #unidad").val(res.data[0].id_unidad);
                    // $("#modal_evaluacion_riesgo #macroproceso").val(res.data[0].id_macroproceso);
                    // $("#modal_evaluacion_riesgo #proceso").val(res.data[0].id_proceso);
                    $("#modal_evaluacion_riesgo #activo").val(res.data[0].id_activo);
                    $("#modal_evaluacion_riesgo #tipo_amenaza").val(res.data[0].id_tipo_amenaza);
                    $("#modal_evaluacion_riesgo #desc_amenaza").val(res.data[0].id_descripcion_amenaza);
                    $("#modal_evaluacion_riesgo #tipo_vulnerabilidad").val(res.data[0].id_tipo_vulnerabilidad);
                    // $("#modal_evaluacion_riesgo #desc_vulnerabilidad").val(res.data[0].id_descripcion_vulnerabilidad);
                    $("#modal_evaluacion_riesgo #riesgo").val(res.data[0].riesgo);
                    $("#modal_evaluacion_riesgo #valor_probabilidad").val(res.data[0].valor_probabilidad);
                    $("#modal_evaluacion_riesgo #probabilidad").val(res.data[0].probabilidad);
                    $("#modal_evaluacion_riesgo #valor_impacto").val(res.data[0].valor_impacto);
                    $("#modal_evaluacion_riesgo #impacto").val(res.data[0].impacto);
                    $("#modal_evaluacion_riesgo #valor").val(res.data[0].valor);
                    $("#modal_evaluacion_riesgo #control").val(res.data[0].id_control);
                    $("#modal_evaluacion_riesgo #control_selected").val(res.data[0].id_control);
                    $("#modal_evaluacion_riesgo #riesgo_controlado_probabilidad").val(res.data[0].riesgo_controlado_probabilidad);
                    $("#modal_evaluacion_riesgo #riesgo_controlado_impacto").val(res.data[0].riesgo_controlado_impacto);
                    $("#modal_evaluacion_riesgo #riesgo_controlado_valor").val(res.data[0].riesgo_controlado_valor);
                    $("#modal_evaluacion_riesgo #estado").val(res.data[0].estado);
                }
                $('#spinner-div').hide();
            })
        })
    } catch (error) {
        
    }
    

})
$('#button_close_modal_eva,#button_cancel_modal_eva').click(function(){
    $('#modal_evaluacion_riesgo').modal('hide');
   
})

$('#update_eva').click(function(){
    $id = $('#modal_evaluacion_riesgo #id_eva').val()
    $tipo_riesgo = $('#modal_evaluacion_riesgo #tipo_riesgo').val()
    $empresa = $('#modal_evaluacion_riesgo #empresa').val()
    $area = $('#modal_evaluacion_riesgo #area').val()
    $unidad = $('#modal_evaluacion_riesgo #unidad').val()
    $macroproceso = $('#modal_evaluacion_riesgo #macroproceso').val()
    $proceso = $('#modal_evaluacion_riesgo #proceso').val()
    $activo = $('#modal_evaluacion_riesgo #activo').val()
    $tipo_amenaza = $('#modal_evaluacion_riesgo #tipo_amenaza').val()
    $desc_amenaza = $('#modal_evaluacion_riesgo #desc_amenaza').val()
    $tipo_vulnerabilidad = $('#modal_evaluacion_riesgo #tipo_vulnerabilidad').val()
    $desc_vulnerabilidad = $('#modal_evaluacion_riesgo #desc_vulnerabilidad').val()
    $riesgo = $('#modal_evaluacion_riesgo #riesgo').val()
    $valor_probabilidad = $('#modal_evaluacion_riesgo #valor_probabilidad').val()
    $probabilidad = $('#modal_evaluacion_riesgo #probabilidad').val()
    $valor_impacto = $('#modal_evaluacion_riesgo #valor_impacto').val()
    $impacto = $('#modal_evaluacion_riesgo #impacto').val()
    $valor = $('#modal_evaluacion_riesgo #valor').val()
    $controles = $('#modal_evaluacion_riesgo #control').val()
    $control = $('#modal_evaluacion_riesgo #control_selected').val()
    $riesgo_controlado_probabilidad = $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val()
    $riesgo_controlado_impacto = $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val()
    $riesgo_controlado_valor = $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val()
    $estado = $('#modal_evaluacion_riesgo #estado').val()
    //$probabilidad != "" &&  $impacto != "" &&   $riesgo_controlado_probabilidad != "" &&
      //  $riesgo_controlado_impacto != "" &&
    if(
        $tipo_riesgo != "" &&
        $empresa != "" &&
        $area != "" &&
        $unidad != "" &&
        $macroproceso != "" &&
        $proceso != "" &&
        $activo != "" &&
        $tipo_amenaza != "" &&
        $desc_amenaza != "" &&
        $tipo_vulnerabilidad != "" &&
        $desc_vulnerabilidad != "" &&
        $riesgo != "" &&
        $valor_probabilidad != "" &&
        $valor_impacto != "" &&
        $valor != "" &&
        $estado != ""
    ){
        const postData = {
            id_tipo_riesgo:$tipo_riesgo,
            id_empresa:$empresa,
            id_area:$area,
            id_unidad:$unidad,
            id_macroproceso:$macroproceso,
            id_proceso:$proceso,
            id_activo:$activo,
            id_tipo_amenaza:$tipo_amenaza,
            id_descripcion_amenaza:$desc_amenaza,
            id_tipo_vulnerabilidad:$tipo_vulnerabilidad,
            id_descripcion_vulnerabilidad:$desc_vulnerabilidad,
            riesgo:$riesgo,
            valor_probabilidad:$valor_probabilidad,
            probabilidad:$probabilidad,
            valor_impacto:$valor_impacto,
            impacto:$impacto,
            valor:$valor,
            id_control:$control,
            riesgo_controlado_probabilidad:$riesgo_controlado_probabilidad,
            riesgo_controlado_impacto:$riesgo_controlado_impacto,
            riesgo_controlado_valor:$riesgo_controlado_valor,
            estado:$estado,
            controles:$controles
        }
        try {
            $.ajax({
                method:'POST',
                url:BASE_URL+"/updateEvaluacionRiesgo/"+$id,
                data:postData,
                dataType:"JSON"
            })
            .done(function(response){
                if(!response.error){
                    document.getElementById('form_eva').reset()
                    $('#modal_evaluacion_riesgo').modal('hide')
                    alerta_evaluacion_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha modificado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_evaluacion_riesgo").DataTable().ajax.reload(null, false); 
                   
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.msg
                    })
                }
            })
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

$('#table_evaluacion_riesgo tbody').on( 'click', 'deleteEVA', function(event){

    //recuperando los datos
    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar la evaluacion de riesgo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancel`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "post",
                url: BASE_URL+"/deleteEvaluacionRiesgo/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    alerta_evaluacion_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_evaluacion_riesgo").DataTable().ajax.reload(null, false); 
                   
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
$('#modal_evaluacion_riesgo #valor_probabilidad').on('input',function(){
    let value = $('#modal_evaluacion_riesgo #valor_probabilidad').val()
    if(escenario == 2){
        $.ajax({
            method: "get",
            url: BASE_URL+"/main/getProbabilidadRiesgo/"+escenario,
            dataType: "JSON"
        })
        .done(function(respuesta) {
            console.log(respuesta);
            $('#modal_evaluacion_riesgo #probabilidad').val('')
            let found = false
            respuesta.data.forEach(element => {
                if(!found){
                    // OPERADOR 1
                    if(element.operador1 == ">"){
                        if(element.operador2 == "<"){
                            if(value>Number(element.valor1) && value<Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == "<="){
                            if(value>Number(element.valor1) && value<=Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == ">="){
                        if(element.operador2 == "<"){
                            if(value>=Number(element.valor1) && value<Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == "<="){
                            if(value>=Number(element.valor1) && value<=Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == "<"){
                        if(element.operador2 == ">"){
                            if(value<Number(element.valor1) && value>Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == ">="){
                            if(value<Number(element.valor1) && value>=Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == "<="){
                        if(element.operador2 == ">"){
                            if(value<=Number(element.valor1) && value>Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == ">="){
                            if(value<=Number(element.valor1) && value>=Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                    }
                    // OPERADOR 2
                    if(element.operador2 == ">"){
                        if(element.operador1 == "<"){
                            if(value > Number(element.valor2) && value<Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value>Number(element.valor2) && value<=Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == ">="){
                        if(element.operador1 == "<"){
                            if(value >=Number(element.valor2) && value<Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value>=Number(element.valor2) && value<=Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == "<"){
                        if(element.operador1 == "<"){
                            if(value < Number(element.valor2) && value<Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value<Number(element.valor2) && value<=Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == "<="){
                        if(element.operador1 == "<"){
                            if(value <=Number( element.valor2) && value<Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value <= Number(element.valor2) && value<=Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_probabilidad').val(element.id)
                                $('#modal_evaluacion_riesgo #probabilidad').val(element.descripcion)
                            }
                        }
                    }
                }
            });
            
        })
        .fail(function(error) {
        })
        .always(function() {
        });
    }else{
        console.log(escenario);
        $.ajax({
            method: "get",
            url: BASE_URL+"/main/getProbabilidadRiesgo/"+escenario,
            dataType: "JSON"
        })
        .done(function(respuesta){
            console.log(respuesta);
            if(respuesta.data.length > 0){
                if(respuesta.data[0].tipo_valor == 'Formula'){
                    $('#modal_evaluacion_riesgo #id_probabilidad').val(respuesta.data[0].id)
                    let formula = respuesta.data[0].formula
                    let split_formula = formula.split(" ")
                    for (let index = 0; index < split_formula.length; index=index+3) {
                        let operador = split_formula[index]
                        let valor = Number(split_formula[index+1])
                        let resultado = ''
                        split_formula[index+2].split("_").forEach((item,index) => {
                            if(index > 0){
                                resultado = resultado+" "+item
                            }else{
                                resultado = resultado+item
                            }
                        })
                        switch (operador) {
                            case '=':
                                if(value == valor){
                                    $('#modal_evaluacion_riesgo #probabilidad').val(resultado)
                                }
                                break;
                            case '>':
                                if(value > valor){
                                    $('#modal_evaluacion_riesgo #probabilidad').val(resultado)
                                }
                                break;
                            case '>=':
                                if(value >= valor){
                                    $('#modal_evaluacion_riesgo #probabilidad').val(resultado)
                                }
                                break;
                            case '<':
                                if(value < valor){
                                    $('#modal_evaluacion_riesgo #probabilidad').val(resultado)
                                }
                                break;
                            case '<=':
                                if(value <= valor){
                                    $('#modal_evaluacion_riesgo #probabilidad').val(resultado)
                                }
                                break;
                        
                            default:
                                break;
                        }
                    }
                }
            }
        })
        .fail(function(error) {
        })
        .always(function() {
        });
    }
})
$('#modal_evaluacion_riesgo #valor_impacto').on('input',function(){
    let value = $('#modal_evaluacion_riesgo #valor_impacto').val()
    if(escenario == 2){
        $.ajax({
            method: "get",
            url: BASE_URL+"/main/getImpactoRiesgo/"+escenario,
            dataType: "JSON"
        })
        .done(function(respuesta) {
            console.log('hola');
            console.log(respuesta);
            $('#modal_evaluacion_riesgo #impacto').val('')
            let found = false
            respuesta.data.forEach(element => {
                if(!found){
                    // OPERADOR 1
                    if(element.operador1 == ">"){
                        if(element.operador2 == "<"){
                            if(value> Number(element.valor1) && value< Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == "<="){
                            if(value> Number(element.valor1) && value<= Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == ">="){
                        if(element.operador2 == "<"){
                            if(value>= Number(element.valor1) && value< Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == "<="){
                            if(value>= Number(element.valor1) && value<= Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == "<"){
                        if(element.operador2 == ">"){
                            if(value< Number(element.valor1) && value> Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == ">="){
                            if(value< Number(element.valor1) && value>= Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == "<="){
                        if(element.operador2 == ">"){
                            if(value<= Number(element.valor1) && value> Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == ">="){
                            if(value<= Number(element.valor1) && value>= Number(element.valor2)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                    }
                    // OPERADOR 2
                    if(element.operador2 == ">"){
                        if(element.operador1 == "<"){
                            if(value >  Number(element.valor2) && value< Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value> Number(element.valor2)&& value<= Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == ">="){
                        if(element.operador1 == "<"){
                            if(value >=  Number(element.valor2) && value< Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value>= Number(element.valor2) && value<= Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == "<"){
                        if(element.operador1 == "<"){
                            if(value <  Number(element.valor2) && value< Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value< Number(element.valor2) && value<= Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == "<="){
                        if(element.operador1 == "<"){
                            if(value <=  Number(element.valor2) && value< Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value <=  Number(element.valor2) && value<= Number(element.valor1)){
                                found = true
                                $('#modal_evaluacion_riesgo #id_impacto').val(element.id)
                                $('#modal_evaluacion_riesgo #impacto').val(element.descripcion)
                            }
                        }
                    }
                }
            });
    
            if(escenario == 2){
                getValoracionByProbabilidadImpacto()
            }else{
                $.ajax({
                    method: "GET",
                    url: BASE_URL+"/main/getProbabilidadRiesgo/"+escenario,
                    dataType: "JSON"
                })
                .done(function(respuesta){
                    if(respuesta.data.length > 0){
                        if(respuesta.data[0].tipo_valor == "Numero"){
                            // BUSACAR EN NIVEL DE RIESGO
                            let value = Number($('#modal_evaluacion_riesgo #valor_probabilidad').val())*Number($('#modal_evaluacion_riesgo #valor_impacto').val())
                            getNivelRiesgo(value);



                        }else{
                            if(respuesta.data[0].tipo_valor == "Formula"){
                                getValoracionByProbabilidadImpacto()
                            }
                        }
                    }
                })
            }
            
        })
        .fail(function(error) {
        })
        .always(function() {
        });
    }else{
        $.ajax({
            method: "get",
            url: BASE_URL+"/main/getImpactoRiesgo/"+escenario,
            dataType: "JSON"
        })
        .done(function(respuesta){
            if(respuesta.data.length > 0){
                if(respuesta.data[0].tipo_valor == 'Formula'){

                    $('#modal_evaluacion_riesgo #id_impacto').val(respuesta.data[0].id)
                    let formula = respuesta.data[0].formula
                    let split_formula = formula.split(" ")
                    for (let index = 0; index < split_formula.length; index=index+3) {
                        let operador = split_formula[index]
                        let valor = Number(split_formula[index+1])
                        let resultado = ''
                        split_formula[index+2].split("_").forEach((item,index) => {
                            if(index > 0){
                                resultado = resultado+" "+item
                            }else{
                                resultado = resultado+item
                            }
                        })
                        switch (operador) {
                            case '=':
                                if(value == valor){
                                    $('#modal_evaluacion_riesgo #impacto').val(resultado)
                                }
                                break;
                            case '>':
                                if(value > valor){
                                    $('#modal_evaluacion_riesgo #impacto').val(resultado)
                                }
                                break;
                            case '>=':
                                if(value >= valor){
                                    $('#modal_evaluacion_riesgo #impacto').val(resultado)
                                }
                                break;
                            case '<':
                                if(value < valor){
                                    $('#modal_evaluacion_riesgo #impacto').val(resultado)
                                }
                                break;
                            case '<=':
                                if(value <= valor){
                                    $('#modal_evaluacion_riesgo #impacto').val(resultado)
                                }
                                break;
                        
                            default:
                                break;
                        }

                    }
                    getValoracionByProbabilidadImpacto();
                    
                }else{
                    let value = Number($('#modal_evaluacion_riesgo #valor_probabilidad').val())*Number($('#modal_evaluacion_riesgo #valor_impacto').val())
                    getNivelRiesgo(value)
                }
                

            }
        })
        .fail(function(error) {
        })
        .always(function() {
        });
    }
})
//probabilidad e oimpacto
function getValoracionByProbabilidadImpacto(){
    console.log($('#modal_evaluacion_riesgo #id_probabilidad').val());
    console.log($('#modal_evaluacion_riesgo #id_impacto').val());
    $.ajax({
        method: "POST",
        url: BASE_URL+"/getValoracionByProbabilidadImpacto",
        data:{
            id_probabilidad:$('#modal_evaluacion_riesgo #id_probabilidad').val(),
            id_impacto:$('#modal_evaluacion_riesgo #id_impacto').val()
        },
        dataType: "JSON"
    })
    .done(function(respuesta){
        console.log(respuesta);
        if(respuesta.data.length > 0){
            $('#modal_evaluacion_riesgo #valor').val(respuesta.data[0].valor)
        }
    })
}

function getNivelRiesgo(value){
    $.ajax({
        method:"get",
        url:BASE_URL+"/main/getNivelRiesgo",
        dataType: "JSON"
    })
    .done(function(respuesta){
        console.log(respuesta);
        $('#modal_evaluacion_riesgo #valor').val('')
        let found = false
        respuesta.data.forEach(element => {
            if(!found){
                // OPERADOR 1
                if(element.operador1 == ">"){
                    if(element.operador2 == "<"){
                        if(value>element.valor1 && value<element.valor2){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                    if(element.operador2 == "<="){
                        if(value>element.valor1 && value<=element.valor2){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                }
                if(element.operador1 == ">="){
                    if(element.operador2 == "<"){
                        if(value>=element.valor1 && value<element.valor2){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                    if(element.operador2 == "<="){
                        if(value>=element.valor1 && value<=element.valor2){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                }
                if(element.operador1 == "<"){
                    if(element.operador2 == ">"){
                        if(value<element.valor1 && value>element.valor2){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                    if(element.operador2 == ">="){
                        if(value<element.valor1 && value>=element.valor2){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                }
                if(element.operador1 == "<="){
                    if(element.operador2 == ">"){
                        if(value<=element.valor1 && value>element.valor2){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                    if(element.operador2 == ">="){
                        if(value<=element.valor1 && value>=element.valor2){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                }
                // OPERADOR 2
                if(element.operador2 == ">"){
                    if(element.operador1 == "<"){
                        if(value > element.valor2 && value<element.valor1){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                    if(element.operador1 == "<="){
                        if(value>element.valor && value<=element.valor1){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                }
                if(element.operador2 == ">="){
                    if(element.operador1 == "<"){
                        if(value >= element.valor2 && value<element.valor1){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                    if(element.operador1 == "<="){
                        if(value>=element.valor && value<=element.valor1){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                }
                if(element.operador2 == "<"){
                    if(element.operador1 == "<"){
                        if(value < element.valor2 && value<element.valor1){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                    if(element.operador1 == "<="){
                        if(value<element.valor && value<=element.valor1){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                }
                if(element.operador2 == "<="){
                    if(element.operador1 == "<"){
                        if(value <= element.valor2 && value<element.valor1){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                    if(element.operador1 == "<="){
                        if(value <= element.valor && value<=element.valor1){
                            found = true
                            $('#modal_evaluacion_riesgo #valor').val(element.descripcion)
                        }
                    }
                }
            }
        });
    })
}

function view_riesgos(){
    $('#modal_evaluacion_resumen').modal('show');
    $.ajax({
        url:BASE_URL+"/countvalores",
        dataType:'json'
    })
    .done(function(respuesta){
        $('#modal_evaluacion_resumen .wrapper_resumen_riesgos .group_resumen_riesgo').remove()
        if(respuesta.data.length > 0){
            respuesta.data.map(item => {
                $('#modal_evaluacion_resumen .wrapper_resumen_riesgos').append(
                    `
                        <div class="group_resumen_riesgo">
                            <p class="title_resumen_riesgo">${item.valor}</p>
                            <p class="count_resumen_riesgo">${item.cantidad}</p>
                        </div>
                    `
                )
            })
        }else{
            $('#modal_evaluacion_resumen .wrapper_resumen_riesgos').append(
                `
                    <p>No hay riesgos</p>
                `
            )
        }
    })
}
$('#button_close_modal_resumen,#button_cancel_modal_resumen').click(function(){
    $('#modal_evaluacion_resumen').modal('hide');
})

$('#btn_reload_valores').click(function(){
    $.ajax({
        url:BASE_URL+"/listEvaluacionRiesgos/"+idempresa,
        beforeSend:function(){
            $('#spinner_evaluacion').css('display','flex')
            $('#apart_evaluacion').css('display','none')
        }
    })
    .done(function(respuesta){
        
        respuesta = JSON.parse(respuesta)
        if(respuesta.data.length > 0){
            respuesta.data.map((item) => {
                let valor = ''
                let id_probabilidad = 0
                let id_impacto = 0
                let probabilidad = ''
                let impacto = ''
                let riesgo_controlado_probabilidad = ''
                let riesgo_controlado_impacto = ''
                let riesgo_controlado_valor = ''
                let tipo_valor = ''
                // Probabilidad
                let value_probabilidad = Number(item.valor_probabilidad);
                let value_impacto = Number(item.valor_impacto)
                let control_id = item.id_control
                if(escenario == 2){
                    console.log("se aplica escenario2 hacia el 1");
                    // PROBABILIDAD
                    let probabilidad2 = $.ajax({
                        method: "get",
                        url: BASE_URL+"/main/getProbabilidadRiesgo/"+escenario,
                        dataType: "JSON",
                    })
                    .done(function(respuesta) {
                        let found = false
                        respuesta.data.forEach(element => {
                            if(!found){
                                // OPERADOR 1
                                if(element.operador1 == ">"){
                                    if(element.operador2 == "<"){
                                        if(value_probabilidad>Number(element.valor1) && value_probabilidad<Number(element.valor2)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                    if(element.operador2 == "<="){
                                        if(value_probabilidad>Number(element.valor1) && value_probabilidad<=Number(element.valor2)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador1 == ">="){
                                    if(element.operador2 == "<"){
                                        if(value_probabilidad>=Number(element.valor1) && value_probabilidad<Number(element.valor2)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                    if(element.operador2 == "<="){
                                        if(value_probabilidad>=Number(element.valor1) && value_probabilidad<=Number(element.valor2)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador1 == "<"){
                                    if(element.operador2 == ">"){
                                        if(value_probabilidad<Number(element.valor1) && value_probabilidad>Number(element.valor2)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                    if(element.operador2 == ">="){
                                        if(value_probabilidad<Number(element.valor1) && value_probabilidad>=Number(element.valor2)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador1 == "<="){
                                    if(element.operador2 == ">"){
                                        if(value_probabilidad<=Number(element.valor1) && value_probabilidad>Number(element.valor2)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                    if(element.operador2 == ">="){
                                        if(value_probabilidad<=Number(element.valor1) && value_probabilidad>=Number(element.valor2)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                }
                                // OPERADOR 2
                                if(element.operador2 == ">"){
                                    if(element.operador1 == "<"){
                                        if(value_probabilidad > Number(element.valor2) && value_probabilidad<Number(element.valor1)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                    if(element.operador1 == "<="){
                                        if(value_probabilidad>Number(element.valor2) && value_probabilidad<=Number(element.valor1)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador2 == ">="){
                                    if(element.operador1 == "<"){
                                        if(value_probabilidad >= Number(element.valor2) && value_probabilidad<Number(element.valor1)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                    if(element.operador1 == "<="){
                                        if(value_probabilidad>=Number(element.valor2) && value_probabilidad<=Number(element.valor1)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador2 == "<"){
                                    if(element.operador1 == "<"){
                                        if(value_probabilidad < Number(element.valor2) && value_probabilidad<Number(element.valor1)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                    if(element.operador1 == "<="){
                                        if(value_probabilidad<Number(element.valor2) && value_probabilidad<=Number(element.valor1)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador2 == "<="){
                                    if(element.operador1 == "<"){
                                        if(value_probabilidad <= Number(element.valor2) && value_probabilidad<Number(element.valor1)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                    if(element.operador1 == "<="){
                                        if(value_probabilidad <= Number(element.valor2) && value_probabilidad<=Number(element.valor1)){
                                            found = true
                                            id_probabilidad = element.id
                                            probabilidad = element.descripcion
                                        }
                                    }
                                }
                            }
                        });
                        
                    })
                    .fail(function(error) {
                    })
                    .always(function() {
                    });

                    // IMPACTO
                    let impacto2 = $.ajax({
                        method: "get",
                        url: BASE_URL+"/main/getImpactoRiesgo/"+escenario,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        let found = false
                        respuesta.data.forEach(element => {
                            if(!found){
                                // OPERADOR 1
                                if(element.operador1 == ">"){
                                    if(element.operador2 == "<"){
                                        if(value_impacto>Number(element.valor1) && value_impacto<Number(element.valor2)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                    if(element.operador2 == "<="){
                                        if(value_impacto>Number(element.valor1) && value_impacto<=Number(element.valor2)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador1 == ">="){
                                    if(element.operador2 == "<"){
                                        if(value_impacto>=Number(element.valor1) && value_impacto<Number(element.valor2)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                    if(element.operador2 == "<="){
                                        if(value_impacto>=Number(element.valor1) && value_impacto<=Number(element.valor2)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador1 == "<"){
                                    if(element.operador2 == ">"){
                                        if(value_impacto<Number(element.valor1) && value_impacto>Number(element.valor2)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                    if(element.operador2 == ">="){
                                        if(value_impacto<Number(element.valor1) && value_impacto>=Number(element.valor2)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador1 == "<="){
                                    if(element.operador2 == ">"){
                                        if(value_impacto<=Number(element.valor1) && value_impacto>Number(element.valor2)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                    if(element.operador2 == ">="){
                                        if(value_impacto<=Number(element.valor1) && value_impacto>=Number(element.valor2)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                }
                                // OPERADOR 2
                                if(element.operador2 == ">"){
                                    if(element.operador1 == "<"){
                                        if(value_impacto > Number(element.valor2) && value_impacto<Number(element.valor1)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                    if(element.operador1 == "<="){
                                        if(value_impacto>Number(element.valor2) && value_impacto<=Number(element.valor1)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador2 == ">="){
                                    if(element.operador1 == "<"){
                                        if(value_impacto >= Number(element.valor2) && value_impacto<Number(element.valor1)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                    if(element.operador1 == "<="){
                                        if(value_impacto>=Number(element.valor2) && value_impacto<=Number(element.valor1)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador2 == "<"){
                                    if(element.operador1 == "<"){
                                        if(value_impacto < Number(element.valor2) && value_impacto<Number(element.valor1)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                    if(element.operador1 == "<="){
                                        if(value_impacto<Number(element.valor2) && value_impacto<=Number(element.valor1)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                }
                                if(element.operador2 == "<="){
                                    if(element.operador1 == "<"){
                                        if(value_impacto <= Number(element.valor2) && value_impacto<Number(element.valor1)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                    if(element.operador1 == "<="){
                                        if(value_impacto <= Number(element.valor2) && value_impacto<=Number(element.valor1)){
                                            found = true
                                            id_impacto = element.id
                                            impacto = element.descripcion
                                        }
                                    }
                                }
                            }
                        });
                    })
                    .fail(function(error) {
                    })
                    .always(function() {
                    });

                    Promise.all([probabilidad2,impacto2]).then(() => {
                        let valoracion = $.ajax({
                            method: "POST",
                            url: BASE_URL+"/getValoracionByProbabilidadImpacto",
                            data:{
                                id_probabilidad:id_probabilidad,
                                id_impacto:id_impacto
                            },
                            dataType: "JSON"
                        })
                        .done(function(respuesta){
                            if(respuesta.data.length > 0){
                                valor = respuesta.data[0].valor
                            }
                        })
                        Promise.all([valoracion]).then(() => {

                            $posiciones_probabilidad = []
                            $posiciones_impacto = []
                            let pp = $.ajax({
                                url:BASE_URL+"/main/getProbabilidadRiesgo/"+escenario,
                                dataType:'JSON'
                            })
                            .done(function(respuesta){
                                console.log(respuesta)
                                if(respuesta.data.length > 0){
                                    respuesta.data.map(item => {
                                        $posiciones_probabilidad.push(item.descripcion)
                                    })
                                }
                            })
                            let pi = $.ajax({
                                url:BASE_URL+"/main/getImpactoRiesgo/"+escenario,
                                dataType:'JSON'
                            })
                            .done(function(respuesta){
                                console.log(respuesta)
                                if(respuesta.data.length > 0){
                                    respuesta.data.map(item => {
                                        $posiciones_impacto.push(item.descripcion)
                                    })
                                }
                            })
                            Promise.all([pp,pi]).then(() => {
                                $.ajax({
                                    url:BASE_URL+"/getRegistroControlById/"+control_id,
                                    dataType:'JSON'
                                })
                                .done(function(respuesta){
                                    let cobertura = respuesta.data.idCobertura
                                    let evaluacion = respuesta.data.evaluacion.toLowerCase()
                                    let firsLetter = evaluacion.charAt(0).toUpperCase()
                                    let caracteristica = firsLetter+evaluacion.slice(1)
                                    let idProbabilidad = ''
                                    let idImpacto = ''
                                    console.log('Cobertura: ',cobertura)
                                    switch (cobertura) {
                                        case '1':
                                            $.ajax({
                                                method:'POST',
                                                url:BASE_URL+"/getAplicacionProbabilidadByCaracteristica",
                                                data:{
                                                    caracteristica:caracteristica,
                                                    escenario:escenario
                                                },
                                                dataType:'JSON'
                                            })
                                            .done(function(respuesta){
                                                $probabilidad_actual = probabilidad
                                                index = $posiciones_probabilidad.findIndex(element => element == $probabilidad_actual)
                                                // 1: 1 posicion hacia abajo
                                                // 2: 2 posicion hacia abajo
                                                // 3: 3 posicion hacia abajo
                                                // 4: 4 posicion hacia abajo
                                                // 5: 5 posicion hacia abajo
                                                if((index - Number(respuesta.data[0].posicion)) <= 0){
                                                    posicion = 0
                                                }else{
                                                    posicion = index - Number(respuesta.data[0].posicion);
                                                }
                                                new_posicion = $posiciones_probabilidad[posicion];
                                                riesgo_controlado_probabilidad = new_posicion;
                                                riesgo_controlado_impacto = impacto;
                                                //riesgo_controlado_impacto = item.riesgo_controlado_impacto // aqui es un numero y no trae
                                                //los datos que necesitamos
                                                let p1 = $.ajax({
                                                    method:'POST',
                                                    url:BASE_URL+"/getProbabilidadByDescription",
                                                    data:{
                                                        descripcion:riesgo_controlado_probabilidad
                                                    },
                                                    dataType:'JSON'
                                                })
                                                .done(function(respuesta){
                                                    idProbabilidad = respuesta.data[0].id
                                                })
                                                let p2 = $.ajax({
                                                    method:'POST',
                                                    url:BASE_URL+"/getImpactoByDescription",
                                                    data:{
                                                        descripcion:riesgo_controlado_impacto
                                                    },
                                                    dataType:'JSON'
                                                })
                                                .done(function(respuesta){
                                                    idImpacto = respuesta.data[0].id
                                                })
                                                Promise.all([p1,p2]).then(()=>{
                                                    $.ajax({
                                                        method: "POST",
                                                        url: BASE_URL+"/getValoracionByProbabilidadImpacto",
                                                        data:{
                                                            id_probabilidad:idProbabilidad,
                                                            id_impacto:idImpacto
                                                        },
                                                        dataType: "JSON"
                                                    })
                                                    .done(function(respuesta){
                                                        console.log(respuesta)
                                                        if(respuesta.data.length > 0){
                                                            riesgo_controlado_valor = respuesta.data[0].valor
                                                        }
                                                        updateData(item,probabilidad,impacto,valor,riesgo_controlado_probabilidad,riesgo_controlado_impacto,riesgo_controlado_valor)
                                                        $('#spinner_evaluacion').css('display','none')
                                                        $('#apart_evaluacion').css('display','block')
                                                    })
                                                })
                                            })
                                            break;
                                        case '2':
                                            $.ajax({
                                                method:'POST',
                                                url:BASE_URL+"/getAplicacionImpactoByCaracteristica",
                                                data:{
                                                    caracteristica:caracteristica,
                                                    escenario:escenario
                                                },
                                                dataType:'JSON'
                                            })
                                            .done(function(respuesta){
                                                $impacto_actual = impacto
                                                index = $posiciones_impacto.findIndex(element => element == $impacto_actual)
                                                // 1: 1 posicion hacia izquierda
                                                // 2: 2 posicion hacia izquierda
                                                // 3: 3 posicion hacia izquierda
                                                // 4: 4 posicion hacia izquierda
                                                // 5: 5 posicion hacia izquierda
                                                if((index - Number(respuesta.data[0].posicion)) <= 0){
                                                    posicion = 0
                                                }else{
                                                    posicion = index - Number(respuesta.data[0].posicion)
                                                }
                                                new_posicion = $posiciones_impacto[posicion]
                                                riesgo_controlado_impacto = new_posicion;
                                                riesgo_controlado_probabilidad = probabilidad;
                                               // riesgo_controlado_probabilidad = item.riesgo_controlado_probabilidad
                                                let p1 = $.ajax({
                                                    method:'POST',
                                                    url:BASE_URL+"/getProbabilidadByDescription",
                                                    data:{
                                                        descripcion:riesgo_controlado_probabilidad
                                                    },
                                                    dataType:'JSON'
                                                })
                                                .done(function(respuesta){
                                                    idProbabilidad = respuesta.data[0].id
                                                })
                                                let p2 = $.ajax({
                                                    method:'POST',
                                                    url:BASE_URL+"/getImpactoByDescription",
                                                    data:{
                                                        descripcion:riesgo_controlado_impacto
                                                    },
                                                    dataType:'JSON'
                                                })
                                                .done(function(respuesta){
                                                    idImpacto = respuesta.data[0].id
                                                })
                                                Promise.all([p1,p2]).then(()=>{
                                                    $.ajax({
                                                        method: "POST",
                                                        url: BASE_URL+"/getValoracionByProbabilidadImpacto",
                                                        data:{
                                                            id_probabilidad:idProbabilidad,
                                                            id_impacto:idImpacto
                                                        },
                                                        dataType: "JSON"
                                                    })
                                                    .done(function(respuesta){
                                                        console.log(respuesta)
                                                        if(respuesta.data.length > 0){
                                                            riesgo_controlado_valor = respuesta.data[0].valor
                                                        }
                                                        updateData(item,probabilidad,impacto,valor,riesgo_controlado_probabilidad,riesgo_controlado_impacto,riesgo_controlado_valor)
                                                        $('#spinner_evaluacion').css('display','none')
                                                        $('#apart_evaluacion').css('display','block')
                                                    })
                                                })
                                            })
                                            break;
                                        case '3':
                                            let pa1 = $.ajax({
                                                method:'POST',
                                                url:BASE_URL+"/getAplicacionProbabilidadByCaracteristica",
                                                data:{
                                                    caracteristica:caracteristica,
                                                    escenario:escenario
                                                },
                                                dataType:'JSON'
                                            })
                                            .done(function(respuesta){
                                                console.log(respuesta)
                                                $probabilidad_actual = probabilidad
                                                index = $posiciones_probabilidad.findIndex(element => element == $probabilidad_actual)
                                                // 1: 1 posicion hacia abajo
                                                // 2: 2 posicion hacia abajo
                                                // 3: 3 posicion hacia abajo
                                                // 4: 4 posicion hacia abajo
                                                // 5: 5 posicion hacia abajo
                                                if((index - Number(respuesta.data[0].posicion)) <= 0){
                                                    posicion = 0
                                                }else{
                                                    posicion = index - Number(respuesta.data[0].posicion);
                                                }
                                                new_posicion = $posiciones_probabilidad[posicion];
                                                riesgo_controlado_probabilidad = new_posicion
                                            })
                                            let pi2 = $.ajax({
                                                method:'POST',
                                                url:BASE_URL+"/getAplicacionImpactoByCaracteristica",
                                                data:{
                                                    caracteristica:caracteristica,
                                                    escenario:escenario
                                                },
                                                dataType:'JSON'
                                            })
                                            .done(function(respuesta){
                                                console.log(respuesta)
                                                $impacto_actual = impacto
                                                index = $posiciones_impacto.findIndex(element => element == $impacto_actual)
                                                // 1: 1 posicion hacia izquierda
                                                // 2: 2 posicion hacia izquierda
                                                // 3: 3 posicion hacia izquierda
                                                // 4: 4 posicion hacia izquierda
                                                // 5: 5 posicion hacia izquierda
                                                if((index - Number(respuesta.data[0].posicion)) <= 0){
                                                    posicion = 0
                                                }else{
                                                    posicion = index - Number(respuesta.data[0].posicion)
                                                }
                                                new_posicion = $posiciones_impacto[posicion]
                                                riesgo_controlado_impacto = new_posicion
                                            })
                                            Promise.all([pa1,pi2]).then(() => {
                                                let p1 = $.ajax({
                                                    method:'POST',
                                                    url:BASE_URL+"/getProbabilidadByDescription",
                                                    data:{
                                                        descripcion:riesgo_controlado_probabilidad
                                                    },
                                                    dataType:'JSON'
                                                })
                                                .done(function(respuesta){
                                                    console.log(respuesta)
                                                    console.log('probabilidad: ',probabilidad)
                                                    if(respuesta.data.length > 0){
                                                        idProbabilidad = respuesta.data[0].id
                                                    }
                                                })
                                                let p2 = $.ajax({
                                                    method:'POST',
                                                    url:BASE_URL+"/getImpactoByDescription",
                                                    data:{
                                                        descripcion:riesgo_controlado_impacto
                                                    },
                                                    dataType:'JSON'
                                                })
                                                .done(function(respuesta){
                                                    console.log(respuesta)
                                                    console.log('impacto: ',impacto)
                                                    if(respuesta.data.length > 0){
                                                        idImpacto = respuesta.data[0].id
                                                    }
                                                })
                                                Promise.all([p1,p2]).then(()=>{
                                                    $.ajax({
                                                        method: "POST",
                                                        url: BASE_URL+"/getValoracionByProbabilidadImpacto",
                                                        data:{
                                                            id_probabilidad:idProbabilidad,
                                                            id_impacto:idImpacto
                                                        },
                                                        dataType: "JSON"
                                                    })
                                                    .done(function(respuesta){
                                                        console.log(respuesta)
                                                        if(respuesta.data.length > 0){
                                                            riesgo_controlado_valor = respuesta.data[0].valor
                                                        }
                                                        updateData(item,probabilidad,impacto,valor,riesgo_controlado_probabilidad,riesgo_controlado_impacto,riesgo_controlado_valor)
                                                    
                                                        $('#spinner_evaluacion').css('display','none')
                                                        $('#apart_evaluacion').css('display','block')
                                                    })
                                                })
                                            })
                                            break;
                                        default:
                                            break;
                                    }
                                })
                            })
                        })
                    })
                    

                }else{
                    console.log("se aplica escenario 1 hacia le 2");
                    // escenario 1 probabilidad
                    let probabilidad1 = $.ajax({
                        method: "get",
                        url: BASE_URL+"/main/getProbabilidadRiesgo/"+escenario,
                        dataType: "JSON"
                    })
                    .done(function(respuesta){
                        console.log("getProbabilidadRiesgo");
                        console.log(respuesta);
                        if(respuesta.data.length > 0){
                            if(respuesta.data[0].tipo_valor == 'Formula'){
                                tipo_valor = 'Formula'
                                id_probabilidad = respuesta.data[0].id
                                let formula = respuesta.data[0].formula
                                let split_formula = formula.split(" ")
                                for (let index = 0; index < split_formula.length; index=index+3) {
                                    let operador = split_formula[index]
                                    let valor = Number(split_formula[index+1])
                                    let resultado = ''

                                    split_formula[index+2].split("_").forEach((item,index) => {
                                        if(index > 0){
                                            resultado = resultado+" "+item
                                        }else{
                                            resultado = resultado+item
                                        }
                                    })
                                    switch (operador) {
                                        case '=':
                                            if(value_probabilidad == valor){
                                                probabilidad = resultado
                                            }
                                            break;
                                        case '>':
                                            if(value_probabilidad > valor){
                                                probabilidad = resultado
                                            }
                                            break;
                                        case '>=':
                                            if(value_probabilidad >= valor){
                                                probabilidad = resultado
                                            }
                                            break;
                                        case '<':
                                            if(value_probabilidad < valor){
                                                probabilidad = resultado
                                            }
                                            break;
                                        case '<=':
                                            if(value_probabilidad <= valor){
                                                probabilidad = resultado
                                            }
                                            break;
                                    
                                        default:
                                            break;
                                    }
                                }
                            }else{
                                tipo_valor = 'Numero'
                            }
                        }
                    })
                    .fail(function(error) {
                    })
                    .always(function() {
                    });

                    // IMPACTO ESCENARIO 1
                    let impacto1 = $.ajax({
                        method: "get",
                        url: BASE_URL+"/main/getImpactoRiesgo/"+escenario,
                        dataType: "JSON"
                    })
                    .done(function(respuesta){
                        if(respuesta.data.length > 0){
                            if(respuesta.data[0].tipo_valor == 'Formula'){
                                tipo_valor = 'Formula'
                                
                                id_impacto = respuesta.data[0].id
                                let formula = respuesta.data[0].formula
                                let split_formula = formula.split(" ")
                                for (let index = 0; index < split_formula.length; index=index+3) {
                                    let operador = split_formula[index]
                                    let valor = Number(split_formula[index+1])
                                    let resultado = ''
                                    split_formula[index+2].split("_").forEach((item,index) => {
                                        if(index > 0){
                                            resultado = resultado+" "+item
                                        }else{
                                            resultado = resultado+item
                                        }
                                    })
                                    switch (operador) {
                                        case '=':
                                            if(value_impacto == valor){
                                               impacto = resultado
                                            }
                                            break;
                                        case '>':
                                            if(value_impacto > valor){
                                                impacto = resultado
                                            }
                                            break;
                                        case '>=':
                                            if(value_impacto >= valor){
                                               impacto = resultado
                                            }
                                            break;
                                        case '<':
                                            if(value_impacto < valor){
                                                impacto = resultado
                                            }
                                            break;
                                        case '<=':
                                            if(value_impacto <= valor){
                                                impacto = resultado
                                            }
                                            break;
                                    
                                        default:
                                            break;
                                    }
                                }
                            }else{
                                tipo_valor = 'Numero'

                            }
            
                        }
                    })
                    .fail(function(error) {
                    })
                    .always(function() {
                    });

                    Promise.all([probabilidad1,impacto1,]).then(() => {
                        var valoracion_ajax = ''
                        if(tipo_valor == 'Formula'){
                            valoracion_ajax = $.ajax({
                                method: "POST",
                                url: BASE_URL+"/getValoracionByProbabilidadImpacto",
                                data:{
                                    id_probabilidad:id_probabilidad,
                                    id_impacto:id_impacto
                                },
                                dataType: "JSON"
                            })
                            .done(function(respuesta){
                                if(respuesta.data.length > 0){
                                    valor = respuesta.data[0].valor
                                }
                            })
                        }else{
                            let value = Number(value_probabilidad)*Number(value_impacto)
                            valoracion_ajax = $.ajax({
                                method:"get",
                                url:BASE_URL+"/main/getNivelRiesgo",
                                dataType: "JSON"
                            })
                            .done(function(respuesta){
                                console.log(respuesta);
                                let found = false
                                respuesta.data.forEach(element => {
                                    if(!found){
                                        // OPERADOR 1
                                        if(element.operador1 == ">"){
                                            if(element.operador2 == "<"){
                                                if(value>Number(element.valor1) && value<Number(element.valor2)){
                                                    found = true
                                                    valor = element.descripcion
                                                }
                                            }
                                            if(element.operador2 == "<="){
                                                if(value>Number(element.valor1) && value<=Number(element.valor2)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                        }
                                        if(element.operador1 == ">="){
                                            if(element.operador2 == "<"){
                                                if(value>=Number(element.valor1) && value<Number(element.valor2)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                            if(element.operador2 == "<="){
                                                if(value>=Number(element.valor1) && value<=Number(element.valor2)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                        }
                                        if(element.operador1 == "<"){
                                            if(element.operador2 == ">"){
                                                if(value<Number(element.valor1) && value>Number(element.valor2)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                            if(element.operador2 == ">="){
                                                if(value<Number(element.valor1) && value>=Number(element.valor2)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                        }
                                        if(element.operador1 == "<="){
                                            if(element.operador2 == ">"){
                                                if(value<=Number(element.valor1) && value>Number(element.valor2)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                            if(element.operador2 == ">="){
                                                if(value<=Number(element.valor1) && value>=Number(element.valor2)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                        }
                                        // OPERADOR 2
                                        if(element.operador2 == ">"){
                                            if(element.operador1 == "<"){
                                                if(value > Number(element.valor2) && value<Number(element.valor1)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                            if(element.operador1 == "<="){
                                                if(value>Number(element.valor2) && value<=Number(element.valor1)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                        }
                                        if(element.operador2 == ">="){
                                            if(element.operador1 == "<"){
                                                if(value >= Number(element.valor2) && value<Number(element.valor1)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                            if(element.operador1 == "<="){
                                                if(value>=Number(element.valor2) && value<=Number(element.valor1)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                        }
                                        if(element.operador2 == "<"){
                                            if(element.operador1 == "<"){
                                                if(value < Number(element.valor2) && value<Number(element.valor1)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                            if(element.operador1 == "<="){
                                                if(value<Number(element.valor2) && value<=Number(element.valor1)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                        }
                                        if(element.operador2 == "<="){
                                            if(element.operador1 == "<"){
                                                if(value <= Number(element.valor2) && value<Number(element.valor1)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                            if(element.operador1 == "<="){
                                                if(value <= Number(element.valor2) && value<=Number(element.valor1)){
                                                    found = true
                                                    valor = element.descripcion

                                                }
                                            }
                                        }
                                    }
                                });
                            })
                        }
                        Promise.all([valoracion_ajax]).then(()=>{
                            $posiciones_probabilidad = []
                            $posiciones_impacto = []
                            let pp = $.ajax({
                                url:BASE_URL+"/main/getProbabilidadRiesgo/"+escenario,
                                dataType:'JSON'
                            })
                            .done(function(respuesta){
                                console.log(respuesta)
                                if(respuesta.data.length > 0){
                                    respuesta.data.map(item => {
                                        $posiciones_probabilidad.push(item.descripcion)
                                    })
                                }
                            })
                            let pi = $.ajax({
                                url:BASE_URL+"/main/getImpactoRiesgo/"+escenario,
                                dataType:'JSON'
                            })
                            .done(function(respuesta){
                                console.log(respuesta)
                                if(respuesta.data.length > 0){
                                    respuesta.data.map(item => {
                                        $posiciones_impacto.push(item.descripcion)
                                    })
                                }
                            })
                            Promise.all([pp,pi]).then(() => {
                                $.ajax({
                                    url:BASE_URL+"/getRegistroControlById/"+control_id,
                                    dataType:'JSON'
                                })
                                .done(function(respuesta){
                                    let cobertura = respuesta.data.idCobertura
                                    let evaluacion = respuesta.data.evaluacion.toLowerCase()
                                    let firsLetter = evaluacion.charAt(0).toUpperCase()
                                    let caracteristica = firsLetter+evaluacion.slice(1)
                                    console.log(cobertura);
                                    switch (cobertura) {
                                        case '1':
                                            $.ajax({
                                                method:'POST',
                                                url:BASE_URL+"/getAplicacionProbabilidadByCaracteristica",
                                                data:{
                                                    caracteristica:caracteristica,
                                                    escenario:escenario
                                                },
                                                dataType:'JSON'
                                            })
                                            .done(function(respuesta){
                                                console.log("caso 1");
                                                console.log(respuesta);
                                                $value = Number(respuesta.data[0].posicion.split("%")[0])/100;
                                                $probabilidad_actual = value_probabilidad
                                                $new_probabilidad = $probabilidad_actual - ($probabilidad_actual*$value);
                                                riesgo_controlado_probabilidad = $new_probabilidad
                                                console.log('item.riesgo_controlado_impacto')
                                                console.log(item.riesgo_controlado_impacto)
                                                riesgo_controlado_impacto = value_impacto
                                                let value = Number($new_probabilidad) * Number(value_impacto)
                                                $.ajax({
                                                    method:"get",
                                                    url:BASE_URL+"/main/getNivelRiesgo",
                                                    dataType: "JSON"
                                                })
                                                .done(function(respuesta){
                                                    console.log("caso 1");
                                                    console.log(respuesta);
                                                    riesgo_controlado_valor = ''
                                                    let found = false
                                                    respuesta.data.forEach(element => {
                                                        if(!found){
                                                            // OPERADOR 1
                                                            if(element.operador1 == ">"){
                                                                if(element.operador2 == "<"){
                                                                    if(value>Number(element.valor1) && value<Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == "<="){
                                                                    if(value>Number(element.valor1) && value<=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == ">="){
                                                                if(element.operador2 == "<"){
                                                                    if(value>=Number(element.valor1) && value<Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == "<="){
                                                                    if(value>=Number(element.valor1) && value<=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                       
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == "<"){
                                                                if(element.operador2 == ">"){
                                                                    if(value<Number(element.valor1) && value>Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == ">="){
                                                                    if(value<Number(element.valor1) && value>=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == "<="){
                                                                if(element.operador2 == ">"){
                                                                    if(value<=Number(element.valor1) && value>Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == ">="){
                                                                    if(value<=Number(element.valor1) && value>=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            // OPERADOR 2
                                                            if(element.operador2 == ">"){
                                                                if(element.operador1 == "<"){
                                                                    if(value > Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value>Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == ">="){
                                                                if(element.operador1 == "<"){
                                                                    if(value >= Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value>=Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == "<"){
                                                                if(element.operador1 == "<"){
                                                                    if(value < Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value<Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == "<="){
                                                                if(element.operador1 == "<"){
                                                                    if(value <= Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value <= Number(element.valor2)&& value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    });
                                                    // UPDATE DATOS
                                                    updateData(item,probabilidad,impacto,valor,riesgo_controlado_probabilidad,riesgo_controlado_impacto,riesgo_controlado_valor)
                                                    $('#spinner_evaluacion').css('display','none')
                                                    $('#apart_evaluacion').css('display','block')
                                                })
                                            })
                                            break;
                                        case '2':
                                            $.ajax({
                                                method:'POST',
                                                url:BASE_URL+"/getAplicacionImpactoByCaracteristica",
                                                data:{
                                                    caracteristica:caracteristica,
                                                    escenario:escenario
                                                },
                                                dataType:'JSON'
                                            })
                                            .done(function(respuesta){
                                                $value = Number(respuesta.data[0].posicion.split("%")[0])/100
                                                $impacto_actual = value_impacto
                                                $new_impacto = $impacto_actual - ($impacto_actual*$value)
                                                riesgo_controlado_impacto = $new_impacto
                                                riesgo_controlado_probabilidad = value_probabilidad
                                                let value = Number(value_probabilidad) * Number($new_impacto)
                                                $.ajax({
                                                    method:"get",
                                                    url:BASE_URL+"/main/getNivelRiesgo",
                                                    dataType: "JSON"
                                                })
                                                .done(function(respuesta){
                                                    console.log("caso 2");
                                                    console.log(respuesta);
                                                    riesgo_controlado_valor = ''
                                                    let found = false
                                                    respuesta.data.forEach(element => {
                                                        if(!found){
                                                            // OPERADOR 1
                                                            if(element.operador1 == ">"){
                                                                if(element.operador2 == "<"){
                                                                    if(value>Number(element.valor1) && value<Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == "<="){
                                                                    if(value>Number(element.valor1) && value<=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == ">="){
                                                                if(element.operador2 == "<"){
                                                                    if(value>=Number(element.valor1) && value<Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == "<="){
                                                                    if(value>=Number(element.valor1) && value<=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                       
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == "<"){
                                                                if(element.operador2 == ">"){
                                                                    if(value<Number(element.valor1) && value>Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == ">="){
                                                                    if(value<Number(element.valor1) && value>=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == "<="){
                                                                if(element.operador2 == ">"){
                                                                    if(value<=Number(element.valor1) && value>Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == ">="){
                                                                    if(value<=Number(element.valor1) && value>=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            // OPERADOR 2
                                                            if(element.operador2 == ">"){
                                                                if(element.operador1 == "<"){
                                                                    if(value > Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value>Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == ">="){
                                                                if(element.operador1 == "<"){
                                                                    if(value >= Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value>=Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == "<"){
                                                                if(element.operador1 == "<"){
                                                                    if(value < Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value<Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == "<="){
                                                                if(element.operador1 == "<"){
                                                                    if(value <= Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value <= Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    });
                                                    // UPDATE DATOS
                                                    updateData(item,probabilidad,impacto,valor,riesgo_controlado_probabilidad,riesgo_controlado_impacto,riesgo_controlado_valor)
                                                    $('#spinner_evaluacion').css('display','none')
                                                    $('#apart_evaluacion').css('display','block')
                                                })
                                            })
                                            break;
                                        case '3':
                                            let app = $.ajax({
                                                method:'POST',
                                                url:BASE_URL+"/getAplicacionProbabilidadByCaracteristica",
                                                data:{
                                                    caracteristica:caracteristica,
                                                    escenario:escenario
                                                },
                                                dataType:'JSON'
                                            })
                                            .done(function(respuesta){
                                                $value = Number(respuesta.data[0].posicion.split("%")[0])/100;
                                                $probabilidad_actual = value_probabilidad
                                                $new_probabilidad = $probabilidad_actual - ($probabilidad_actual*$value);
                                                riesgo_controlado_probabilidad = $new_probabilidad
                                            })
                                            let api = $.ajax({
                                                method:'POST',
                                                url:BASE_URL+"/getAplicacionImpactoByCaracteristica",
                                                data:{
                                                    caracteristica:caracteristica,
                                                    escenario:escenario
                                                },
                                                dataType:'JSON'
                                            })
                                            .done(function(respuesta){
                                                console.log("caso 3");
                                                console.log(respuesta);
                                                $value = Number(respuesta.data[0].posicion.split("%")[0])/100
                                                $impacto_actual = value_impacto
                                                $new_impacto = $impacto_actual - ($impacto_actual*$value)
                                                riesgo_controlado_impacto = $new_impacto
                                            })
                                            Promise.all([app,api]).then(function(){
                                                let value = Number(riesgo_controlado_probabilidad) * Number(riesgo_controlado_impacto)
                                                $.ajax({
                                                    method:"get",
                                                    url:BASE_URL+"/main/getNivelRiesgo",
                                                    dataType: "JSON"
                                                })
                                                .done(function(respuesta){
                                                    riesgo_controlado_valor = ''
                                                    let found = false
                                                    respuesta.data.forEach(element => {
                                                        if(!found){
                                                            // OPERADOR 1
                                                            if(element.operador1 == ">"){
                                                                if(element.operador2 == "<"){
                                                                    if(value>Number(element.valor1) && value<Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == "<="){
                                                                    if(value>Number(element.valor1) && value<=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == ">="){
                                                                if(element.operador2 == "<"){
                                                                    if(value>=Number(element.valor1) && value<Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == "<="){
                                                                    if(value>=Number(element.valor1) && value<=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                       
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == "<"){
                                                                if(element.operador2 == ">"){
                                                                    if(value<Number(element.valor1) && value>Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == ">="){
                                                                    if(value<Number(element.valor1) && value>=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador1 == "<="){
                                                                if(element.operador2 == ">"){
                                                                    if(value<=Number(element.valor1) && value>Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador2 == ">="){
                                                                    if(value<=Number(element.valor1) && value>=Number(element.valor2)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            // OPERADOR 2
                                                            if(element.operador2 == ">"){
                                                                if(element.operador1 == "<"){
                                                                    if(value > Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value>Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == ">="){
                                                                if(element.operador1 == "<"){
                                                                    if(value >= Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value>=Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == "<"){
                                                                if(element.operador1 == "<"){
                                                                    if(value < Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value<Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                            if(element.operador2 == "<="){
                                                                if(element.operador1 == "<"){
                                                                    if(value <= Number(element.valor2) && value<Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                                if(element.operador1 == "<="){
                                                                    if(value <= Number(element.valor2) && value<=Number(element.valor1)){
                                                                        found = true
                                                                        riesgo_controlado_valor = element.descripcion
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    });
                                                    // UPDATE DATOS
                                                    updateData(item,probabilidad,impacto,valor,riesgo_controlado_probabilidad,riesgo_controlado_impacto,riesgo_controlado_valor)
                                                    $('#spinner_evaluacion').css('display','none')
                                                    $('#apart_evaluacion').css('display','block')
                                                })
                                            })
                                            break;
                                    
                                        default:
                                            break;
                                    }
                                })
                            })
                            
                        })
                    })
                }
            })
        }
    })

    
    
})
function updateData(data,probabilidad,impacto,valor,rcp,rci,rcv){
   
    if(data.probabilidad != probabilidad
        || data.impacto != impacto
        || data.valor != valor
        || data.riesgo_controlado_probabilidad != rcp
        || data.riesgo_controlado_impacto != rci
        || data.riesgo_controlado_valor != rcv
    ){
        
        // const postDataHistorial = {
        //     id_tipo_riesgo:data.id_tipo_riesgo,
        //     id_empresa:data.id_empresa,
        //     id_area:data.id_area,
        //     id_unidad:data.id_unidad,
        //     id_macroproceso:data.id_macroproceso,
        //     id_proceso:data.id_proceso,
        //     id_activo:data.id_activo,
        //     id_tipo_amenaza:data.id_tipo_amenaza,
        //     id_descripcion_amenaza:data.id_descripcion_amenaza,
        //     id_tipo_vulnerabilidad:data.id_tipo_vulnerabilidad,
        //     id_descripcion_vulnerabilidad:data.id_descripcion_vulnerabilidad,
        //     riesgo:data.riesgo,
        //     valor_probabilidad:data.valor_probabilidad,
        //     probabilidad:data.probabilidad,
        //     valor_impacto:data.valor_impacto,
        //     impacto:data.impacto,
        //     valor:data.valor,
        //     id_control:data.id_control,
        //     riesgo_controlado_probabilidad:data.riesgo_controlado_probabilidad,
        //     riesgo_controlado_impacto:data.riesgo_controlado_impacto,
        //     riesgo_controlado_valor:data.riesgo_controlado_valor,
        //     estado:data.estado
        // }
        const postDataHistorial = {
            id_tipo_riesgo:data.id_tipo_riesgo,
            id_empresa:data.idempresa,
            id_area:data.idarea,
            id_unidad:data.idunidades,
            id_macroproceso:data.idmacroproceso,
            id_proceso:data.idproceso,
            id_activo:data.id_activo,
            id_tipo_amenaza:data.id_tipo_amenaza,
            id_descripcion_amenaza:data.id_descripcion_amenaza,
            id_tipo_vulnerabilidad:data.id_tipo_vulnerabilidad,
            id_descripcion_vulnerabilidad:data.id_descripcion_vulnerabilidad,
            riesgo:data.riesgo,
            valor_probabilidad:data.valor_probabilidad,
            probabilidad:data.probabilidad,
            valor_impacto:data.valor_impacto,
            impacto:data.impacto,
            valor:data.valor,
            id_control:data.id_control,
            riesgo_controlado_probabilidad:data.riesgo_controlado_probabilidad,
            riesgo_controlado_impacto:data.riesgo_controlado_impacto,
            riesgo_controlado_valor:data.riesgo_controlado_valor,
            estado:data.estado
        }
        //console.log(postDataHistorial);
        try {
            $.ajax({
                method:'POST',
                url:BASE_URL+"/addEvaluacionRiesgoHistorial",
                data:postDataHistorial,
                dataType:"JSON"
            })
            .done(function(response){
                console.log(response)
            })
        } catch (error) {
            console.log(error)
        }
        // const postData = {
        //     id_tipo_riesgo:data.id_tipo_riesgo,
        //     id_empresa:data.id_empresa,
        //     id_area:data.id_area,
        //     id_unidad:data.id_unidad,
        //     id_macroproceso:data.id_macroproceso,
        //     id_proceso:data.id_proceso,
        //     id_activo:data.id_activo,
        //     id_tipo_amenaza:data.id_tipo_amenaza,
        //     id_descripcion_amenaza:data.id_descripcion_amenaza,
        //     id_tipo_vulnerabilidad:data.id_tipo_vulnerabilidad,
        //     id_descripcion_vulnerabilidad:data.id_descripcion_vulnerabilidad,
        //     riesgo:data.riesgo,
        //     valor_probabilidad:data.valor_probabilidad,
        //     probabilidad:probabilidad,
        //     valor_impacto:data.valor_impacto,
        //     impacto:impacto,
        //     valor:valor,
        //     id_control:data.id_control,
        //     riesgo_controlado_probabilidad:rcp,
        //     riesgo_controlado_impacto:rci,
        //     riesgo_controlado_valor:rcv,
        //     estado:data.estado
        // }
        const postData = {
            id_tipo_riesgo:data.id_tipo_riesgo,
            id_empresa:data.idempresa,
            id_area:data.idarea,
            id_unidad:data.idunidades, //aqui aregle la entrada de datos 
            id_macroproceso:data.idmacroproceso,
            id_proceso:data.idproceso,
            id_activo:data.id_activo,
            id_tipo_amenaza:data.id_tipo_amenaza,
            id_descripcion_amenaza:data.id_descripcion_amenaza,
            id_tipo_vulnerabilidad:data.id_tipo_vulnerabilidad,
            id_descripcion_vulnerabilidad:data.id_descripcion_vulnerabilidad,
            riesgo:data.riesgo,
            valor_probabilidad:data.valor_probabilidad,
            probabilidad:probabilidad,
            valor_impacto:data.valor_impacto,
            impacto:impacto,
            valor:valor,
            id_control:data.id_control,
            riesgo_controlado_probabilidad:rcp,
            riesgo_controlado_impacto:rci,
            riesgo_controlado_valor:rcv,
            estado:data.estado,
            accion:'masivo'
        }
         console.log(postData);
        try {
            $.ajax({
                method:'POST',
                url:BASE_URL+"/updateEvaluacionRiesgo/"+data.id,
                data:postData,
                dataType:"JSON"
            })
            .done(function(response){
                console.log("ejecuto updateEvaluacionRiesgo");
                console.log(response);
                if(!response.error){
                    document.getElementById('form_eva').reset()
                    $("#table_evaluacion_riesgo").DataTable().ajax.reload(null, false);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
function getNivelRiesgoMasivo(){
    $.ajax({
        method:"get",
        url:BASE_URL+"/main/getNivelRiesgo",
        dataType: "JSON"
    })
    .done(function(respuesta){
        console.log(respuesta);
        let found = false
        respuesta.data.forEach(element => {
            if(!found){
                // OPERADOR 1
                if(element.operador1 == ">"){
                    if(element.operador2 == "<"){
                        if(value>element.valor1 && value<element.valor2){
                            found = true
                            valor = element.descripcion
                        }
                    }
                    if(element.operador2 == "<="){
                        if(value>element.valor1 && value<=element.valor2){
                            found = true
                            valor = element.descripcion
                        }
                    }
                }
                if(element.operador1 == ">="){
                    if(element.operador2 == "<"){
                        if(value>=element.valor1 && value<element.valor2){
                            found = true
                            valor = element.descripcion
                        }
                    }
                    if(element.operador2 == "<="){
                        if(value>=element.valor1 && value<=element.valor2){
                            found = true
                            valor = element.descripcion
                        }
                    }
                }
                if(element.operador1 == "<"){
                    if(element.operador2 == ">"){
                        if(value<element.valor1 && value>element.valor2){
                            found = true
                            valor = element.descripcion
                        }
                    }
                    if(element.operador2 == ">="){
                        if(value<element.valor1 && value>=element.valor2){
                            found = true
                            valor = element.descripcion
                        }
                    }
                }
                if(element.operador1 == "<="){
                    if(element.operador2 == ">"){
                        if(value<=element.valor1 && value>element.valor2){
                            found = true
                            valor = element.descripcion
                        }
                    }
                    if(element.operador2 == ">="){
                        if(value<=element.valor1 && value>=element.valor2){
                            found = true
                            valor = element.descripcion
                        }
                    }
                }
                // OPERADOR 2
                if(element.operador2 == ">"){
                    if(element.operador1 == "<"){
                        if(value > element.valor2 && value<element.valor1){
                            found = true
                            valor = element.descripcion
                        }
                    }
                    if(element.operador1 == "<="){
                        if(value>element.valor && value<=element.valor1){
                            found = true
                            valor = element.descripcion
                        }
                    }
                }
                if(element.operador2 == ">="){
                    if(element.operador1 == "<"){
                        if(value >= element.valor2 && value<element.valor1){
                            found = true
                            valor = element.descripcion
                        }
                    }
                    if(element.operador1 == "<="){
                        if(value>=element.valor && value<=element.valor1){
                            found = true
                            valor = element.descripcion
                        }
                    }
                }
                if(element.operador2 == "<"){
                    if(element.operador1 == "<"){
                        if(value < element.valor2 && value<element.valor1){
                            found = true
                            valor = element.descripcion
                        }
                    }
                    if(element.operador1 == "<="){
                        if(value<element.valor && value<=element.valor1){
                            found = true
                            valor = element.descripcion
                        }
                    }
                }
                if(element.operador2 == "<="){
                    if(element.operador1 == "<"){
                        if(value <= element.valor2 && value<element.valor1){
                            found = true
                            valor = element.descripcion
                        }
                    }
                    if(element.operador1 == "<="){
                        if(value <= element.valor && value<=element.valor1){
                            found = true
                            valor = element.descripcion
                        }
                    }
                }
            }
        });
    })
}

$('#modal_evaluacion_riesgo #control').on('change',function(){
    console.log('aquiii')
    // 1: aplicacion probabilidad
    // 2: aplicacion impacto
    // 3: aplicacion ambos
    $posiciones_probabilidad = []
    $posiciones_impacto = []
    let pp = $.ajax({
        url:BASE_URL+"/main/getProbabilidadRiesgo/"+escenario,
        dataType:'JSON'
    })
    .done(function(respuesta){
       // console.log(respuesta)
        if(respuesta.data.length > 0){
            respuesta.data.map(item => {
                $posiciones_probabilidad.push(item.descripcion)
            })
        }
    })
    let pi = $.ajax({
        url:BASE_URL+"/main/getImpactoRiesgo/"+escenario,
        dataType:'JSON'
    })
    .done(function(respuesta){
      //  console.log(respuesta)
        if(respuesta.data.length > 0){
            respuesta.data.map(item => {
                $posiciones_impacto.push(item.descripcion)
            })
        }
    })
    Promise.all([pp,pi]).then(() => {
        // Para bajar las posiciones:
        // 1. Obtener la posicion de la probabilidad actual
        // 2. Luego de eso restar la posicion segun lo obtenido en la aplicacion probabilidad
        // 3. Y establecer ese valor en el riesgo controlado probabilidad
        // Mismo proceso para impacto
       
           
        //
        let caracteristicas_controles = [];
        let posiciones_control = []
        let aux;
        let aux_caracteristica;
        let ajaxgetCaracteristicas = $.ajax({
            method: "GET",
            url: $('#base_url').val()+"/getCaracteristicaOpcion/"+escenario,
            dataType: "JSON"
        }).done(function(response){
            //console.log(response);
            if(response.data.length > 0){
                response.data.map(item => {
                    let posicion = Number(item.posicion.split("%")[0])
                    posiciones_control.push(posicion)
                    //aqui se edito por miguel cambie caracteristica por calificacion
                    caracteristicas_controles.push(item.calificacion.toUpperCase())
                })
               // console.log(caracteristicas_controles);
            }
        })
        $array_aux = [];
        Promise.all([ajaxgetCaracteristicas]).then(()=>{
            for (let i = 1; i < posiciones_control.length; i++) {
                for (let j = 0; j < (posiciones_control.length - i); j++) {
                    if(posiciones_control[j] <= posiciones_control[j+1]){
                        aux = posiciones_control[j];
                        posiciones_control[j] = posiciones_control[j+1]
                        posiciones_control[j+1] = aux
    
                        aux_caracteristica = caracteristicas_controles[j];
                        caracteristicas_controles[j] = caracteristicas_controles[j+1]
                        caracteristicas_controles[j+1] = aux_caracteristica
    
                    }
                }
            }
            // console.log('ordenamiento');
            // console.log(caracteristicas_controles);
            //primero ubicar el control mas fuerte utilizr let controles
        
            
            //se tiene que iterarlos controles del imput select
            //luego cada evaluacion guardarlo en un array con su id.
            //luego ordenarlos
            //y despues igualar
            
          
            //controles == 1 control encontrado
            // ejecutar caracteristicas_controles con 1 solo control
             //adiocionales miguel

            
            let controles = $('#modal_evaluacion_riesgo #control').val();
            if(controles.length == 0){
                $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val("")
                $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val("")
                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val("")
                $('#modal_evaluacion_riesgo #control_selected').val("")
            }else{

                let control_id = "";
                let cobertura = 0;
                console.log('controles')
                console.log(controles)
                let promiseControles = $.ajax({
                    url:BASE_URL+"/getControlMasFuerte",
                    method:'post',
                    data:{
                        "controles":controles
                    },
                    dataType:'JSON',
                })
                .done(function(response){
                    console.log('mas fuierte')
                    console.log(response)
                    control_id = response.id_control
                    cobertura = response.cobertura
                })
                Promise.all([promiseControles]).then(()=>{
                    caracteristicas_controles.map(caracteristica_control => {
                        if(control_id != ""){
                            let found = false
                            if(!found){
                                $.ajax({
                                    url:BASE_URL+"/getRegistroControlById/"+control_id,
                                    dataType:'JSON'
                                })
                                .done(function(respuesta){
                                   
                                    //console.log(respuesta);
                                    // let cobertura = respuesta.data.idCobertura
                                    let evaluacion = respuesta.data.evaluacion.toLowerCase()
                                    let firsLetter = evaluacion.charAt(0).toUpperCase()
                                    let caracteristica = firsLetter+evaluacion.slice(1)
                                    let caracteristica_upper = caracteristica.toUpperCase()
                                    let caracteristica_control_new = caracteristica_control.toUpperCase()
                                    
                                    if(caracteristica_upper == caracteristica_control_new){
                                        found = true
                                        cobertura = Number(cobertura)
                                        console.log(cobertura);
                                        $('#modal_evaluacion_riesgo #control_selected').val(control_id)
                                        switch (cobertura) {
                                            case 1:
                                                $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val("")
                                                $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val("")
                                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val("")
            
                                                let ap1 = getAplicacionProbabilidad(caracteristica)
                                                if(escenario == 2){
                                                    $impacto_actual = $('#modal_evaluacion_riesgo #impacto').val()
                                                }else{
                                                    $impacto_actual = $('#modal_evaluacion_riesgo #valor_impacto').val()
                                                }
                                                $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val($impacto_actual);
                                               
                                               // console.log($('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val($impacto_actual));
                                                Promise.all([ap1]).then(()=>{
                                                   
                                                    getRiesgoControladoValor($('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val(),$('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val(),$('#modal_evaluacion_riesgo #probabilidad').val(),$('#modal_evaluacion_riesgo #impacto').val())
                                                })
                                                break;
                                            case 2:
                                                $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val("")
                                                $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val("")
                                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val("")
            
                                                let ai2 = getAplicacionImpacto(caracteristica)
                                                if(escenario == 2){
                                                    $probabilidad_actual = $('#modal_evaluacion_riesgo #probabilidad').val()
                                                }else{
                                                    $probabilidad_actual = $('#modal_evaluacion_riesgo #valor_probabilidad').val();
                                                }
                                                 
                                                //console.log("estoy en el caso 2");
                                                $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val($probabilidad_actual)
                                                //console.log('este es el valo'+$('#modal_evaluacion_riesgo #riesgo_controlado_impacto'));
                                                Promise.all([ai2]).then(()=>{
                                                   
                                                    getRiesgoControladoValor($('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val(),$('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val(),$('#modal_evaluacion_riesgo #probabilidad').val(),$('#modal_evaluacion_riesgo #impacto').val())
                                                })
                                                break;
                                            case 3:
                                                    $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val("")
                                                    $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val("")
                                                    $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val("")
                                                let ap3 = getAplicacionProbabilidad(caracteristica)
                                                let ai3 = getAplicacionImpacto(caracteristica)
                                               
                                                // console.log($('#modal_evaluacion_riesgo #riesgo_controlado_impacto'));
                                                // console.log($('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val());
                                                Promise.all([ap3,ai3]).then(()=>{
                                                    
                                                   // getRiesgoControladoValor($('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val(),$('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val(),$('#modal_evaluacion_riesgo #probabilidad').val(),$('#modal_evaluacion_riesgo #impacto').val())
                                                
                                                    getRiesgoControladoValor($('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val(),$('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val(),$('#modal_evaluacion_riesgo #probabilidad').val(),$('#modal_evaluacion_riesgo #impacto').val())
                                             
                                                })
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                })
                            }
                        }else{
                            $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val("")
                            $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val("")
                            $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val("")
                            $('#modal_evaluacion_riesgo #control_selected').val("")
                        }
                    })
                })
            }
          
        })

    })
})

function getRiesgoControladoValor(valorProb=0,valorImp=0,descripcionProbabilidad="",descripcionImpacto=""){

    if(escenario == 2){
        let idProbabilidad = 0
        let idImpacto= 0
        // console.log("hol desde riesgocontrolado "+ valorProb);
        // console.log(valorProb);
        // console.log("hol desde riesgocontrolado "+ valorImp);
        // console.log(valorImp);
        let p1 = $.ajax({
            method:'POST',
            url:BASE_URL+"/getProbabilidadByDescription",
            data:{
                // descripcion:descripcionProbabilidad,
                descripcion:valorProb
            },
            dataType:'JSON'
        })
        .done(function(respuesta){
            console.log(respuesta);
            idProbabilidad = respuesta.data[0].id
        })
        let p2 = $.ajax({
            method:'POST',
            url:BASE_URL+"/getImpactoByDescription",
            data:{
                //descripcion:descripcionImpacto,
                descripcion:valorImp
            },
            dataType:'JSON'
        })
        .done(function(respuesta){
            console.log(respuesta);
            idImpacto = respuesta.data[0].id
        })
        console.log(idProbabilidad);
        console.log(idImpacto);
        Promise.all([p1,p2]).then(()=>{
            $.ajax({
                method: "POST",
                url: BASE_URL+"/getValoracionByProbabilidadImpacto",
                data:{
                    id_probabilidad:idProbabilidad,
                    id_impacto:idImpacto
                },
                dataType: "JSON"
            })
            .done(function(respuesta){
                console.log(respuesta)
                if(respuesta.data.length > 0){
                    $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(respuesta.data[0].valor)
                }
            })
        })
    }else{
        let value = Number(valorProb) * Number(valorImp)
        $.ajax({
            method:"get",
            url:BASE_URL+"/main/getNivelRiesgo",
            dataType: "JSON"
        })
        .done(function(respuesta){
            console.log(respuesta);
            $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val('')
            let found = false
            respuesta.data.forEach(element => {
                if(!found){
                    // OPERADOR 1
                    if(element.operador1 == ">"){
                        if(element.operador2 == "<"){
                            if(value>element.valor1 && value<element.valor2){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == "<="){
                            if(value>element.valor1 && value<=element.valor2){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == ">="){
                        if(element.operador2 == "<"){
                            if(value>=element.valor1 && value<element.valor2){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == "<="){
                            if(value>=element.valor1 && value<=element.valor2){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == "<"){
                        if(element.operador2 == ">"){
                            if(value<element.valor1 && value>element.valor2){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == ">="){
                            if(value<element.valor1 && value>=element.valor2){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador1 == "<="){
                        if(element.operador2 == ">"){
                            if(value<=element.valor1 && value>element.valor2){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                        if(element.operador2 == ">="){
                            if(value<=element.valor1 && value>=element.valor2){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                    }
                    // OPERADOR 2
                    if(element.operador2 == ">"){
                        if(element.operador1 == "<"){
                            if(value > element.valor2 && value<element.valor1){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value>element.valor && value<=element.valor1){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == ">="){
                        if(element.operador1 == "<"){
                            if(value >= element.valor2 && value<element.valor1){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value>=element.valor && value<=element.valor1){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == "<"){
                        if(element.operador1 == "<"){
                            if(value < element.valor2 && value<element.valor1){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value<element.valor && value<=element.valor1){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                    }
                    if(element.operador2 == "<="){
                        if(element.operador1 == "<"){
                            if(value <= element.valor2 && value<element.valor1){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                        if(element.operador1 == "<="){
                            if(value <= element.valor && value<=element.valor1){
                                found = true
                                $('#modal_evaluacion_riesgo #riesgo_controlado_valor').val(element.descripcion)
                            }
                        }
                    }
                }
            });
        })
    }
}
function getAplicacionProbabilidad(caracteristica){
    console.log(caracteristica);
    console.log(escenario);
    return $.ajax({
        method:'POST',
        url:BASE_URL+"/getAplicacionProbabilidadByCaracteristica",
        data:{
            caracteristica:caracteristica,
            escenario:escenario
        },
        dataType:'JSON'
    })
    .done(function(respuesta){
      console.log(respuesta);
        if(escenario == 2){
            $probabilidad_actual = $('#modal_evaluacion_riesgo #probabilidad').val()
            // busco la posicion actual de la probabilidad
            index = $posiciones_probabilidad.findIndex(element => element == $probabilidad_actual)
            console.log(index)
            // 1: 1 posicion hacia abajo
            // 2: 2 posicion hacia abajo
            // 3: 3 posicion hacia abajo
            // 4: 4 posicion hacia abajo
            // 5: 5 posicion hacia abajo
            if((index - Number(respuesta.data[0].posicion)) <= 0){
                posicion = 0
            }else{
                posicion = index - Number(respuesta.data[0].posicion);
            }
            new_posicion = $posiciones_probabilidad[posicion];
            $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val(new_posicion);
        }else{
            $value = Number(respuesta.data[0].posicion.split("%")[0])/100;
          
            $probabilidad_actual = $('#modal_evaluacion_riesgo #valor_probabilidad').val();
            $new_probabilidad = $probabilidad_actual - ($probabilidad_actual*$value);
       
            $('#modal_evaluacion_riesgo #riesgo_controlado_probabilidad').val($new_probabilidad)
        }
    })
}
function getAplicacionImpacto(caracteristica){
    return $.ajax({
        method:'POST',
        url:BASE_URL+"/getAplicacionImpactoByCaracteristica",
        data:{
            caracteristica:caracteristica,
            escenario:escenario
        },
        dataType:'JSON'
    })
    .done(function(respuesta){
      console.log(respuesta);
        if(escenario == 2){
            $impacto_actual = $('#modal_evaluacion_riesgo #impacto').val()
            index = $posiciones_impacto.findIndex(element => element == $impacto_actual)
            // 1: 1 posicion hacia izquierda
            // 2: 2 posicion hacia izquierda
            // 3: 3 posicion hacia izquierda
            // 4: 4 posicion hacia izquierda
            // 5: 5 posicion hacia izquierda
            if((index - Number(respuesta.data[0].posicion)) <= 0){
                posicion = 0
            }else{
                posicion = index - Number(respuesta.data[0].posicion)
            }
            new_posicion = $posiciones_impacto[posicion]
            $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val(new_posicion)
        }else{
            $value = Number(respuesta.data[0].posicion.split("%")[0])/100
            $impacto_actual = $('#modal_evaluacion_riesgo #valor_impacto').val()
            $new_impacto = $impacto_actual - ($impacto_actual*$value)
            $('#modal_evaluacion_riesgo #riesgo_controlado_impacto').val($new_impacto)
        }
    })
}
$(document).ready(function() { 
    $('.js-riesgos-basic-multiple').select2({ width: '100%' })
});

document.getElementById("unidad").addEventListener("change",function(){
    
   
        cargarMacroProceso($('#unidad').val());

   
    
});
document.getElementById("macroproceso").addEventListener("change",function(){
    
   
    cargarProceso($('#unidad').val(),$('#macroproceso').val());



});


