var alerta_impacto_riesgo = document.getElementById("alerta_impacto_riesgo");
console.log('Escenario ',escenario)
if(escenario == null){
    noEsceneImpacto()
}else{
    if(escenario == 2){
        activeScene2Impacto()
    }else{
        if(escenario == 1){
            activeScene1Impacto()
        }
    }
}

$('#impacto-1-tab').click(function(){
    $('#btn_add_impacto_2').css('display','none')
    $('#btn_add_impacto_1').css('display','block')
})
$('#impacto-2-tab').click(function(){
    $('#btn_add_impacto_1').css('display','none')
    $('#btn_add_impacto_2').css('display','block')
})
$('#modal_impacto_riesgo_escenario_1 #tipo_valor').on('change',function(){
    if($('#modal_impacto_riesgo_escenario_1 #tipo_valor').val() == 'Formula'){
        $('#modal_impacto_riesgo_escenario_1 .formula_1_probabilidad').css('display','block')
    }else{
        $('#modal_impacto_riesgo_escenario_1 .formula_1_probabilidad').css('display','none')
    }
})
function loadTableImpacto1($update,$delete){
    if ($.fn.DataTable.isDataTable('#table_impacto_1')){
        $('#table_impacto_1').DataTable().rows().remove();
        $('#table_impacto_1').DataTable().destroy();
    }

    $('#table_impacto_1').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Registro",
            "infoEmpty": "Mostrando 0 to 0 of 0 Registro",
            "infoFiltered": "(Filtrado de _MAX_ registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Registro",
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
        responsive: false,
        autoWidth: false,
        lengthMenu:[5,10,25,50],
        pageLength:5,
        clickToSelect:false,
        ajax: BASE_URL+"/main/getImpactoRiesgo/1",
        aoColumns: [
            { "data": "id" },
            { "data": "descripcion" },
            { "data": "tipo_regla" },
            { "data": null,
                "mRender":function(data){
                    let new_formula = ''
                    data.formula.split("_").forEach((item,index) => {
                        if(index > 0){
                            new_formula = new_formula+" "+item
                        }else{
                            new_formula = new_formula+item
                        }
                    })
                    return new_formula
                }
            },
            { "data": "tipo_valor" },
            { "data": "comentario" },
            {
                "data": null,
                "mRender":function(data){
                    if(data.estado == "1"){
                        return 'Activo'
                    }else{
                        return 'Inactivo'
                    }
                }
            },
            {
                data:null,
                "mRender":function(data){
                    $cadena = "";
                    if ($update == '1'){
                        $cadena =   $cadena +  `<editImpacto1 data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editImpacto1>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteImpacto1 data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteImpacto1>`
                    }
                    if ($update == '0' && $delete==0){
                        return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                    }
                    return $cadena;
                        
                }
            },
            // {
            //     data:null,
            //     "mRender":function(data){
            //         return `<editImpacto1 data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editImpacto1>
            //         <deleteImpacto1  data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteImpacto1>`
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
            $( 'table_impacto_1 tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}

document.getElementById("btn_add_impacto_1").addEventListener('click',function(){
    $('#modal_impacto_riesgo_escenario_1').modal('show')
    document.getElementById("title_impacto_riesgo_esc_1").innerHTML = "Agregar Impacto de Riesgo Escenario 1";
    document.getElementById("form_impacto_riesgo_escenario_1").reset();
    document.getElementById("add_impacto_riego_escenario_1").style.display = "block";
    document.getElementById("update_impacto_riego_escenario_1").style.display = "none";
    $('#modal_impacto_riesgo_escenario_1 #group_condicionales_formula .group_formula').remove()
    $('#modal_impacto_riesgo_escenario_1 .formula_1_probabilidad').css('display','none')

})
document.getElementById('add_impacto_riego_escenario_1').addEventListener('click',function(){
    $descripcion = $('#modal_impacto_riesgo_escenario_1 #descripcion').val()
    $tipo_regla = $('#modal_impacto_riesgo_escenario_1 #tipo_regla').val()
    $tipo_valor = $('#modal_impacto_riesgo_escenario_1 #tipo_valor').val()
    $estado = $('#modal_impacto_riesgo_escenario_1 #estado').val()
    $comentario = $('#modal_impacto_riesgo_escenario_1 #comentario').val()
    $items_formula = $('#modal_impacto_riesgo_escenario_1 .group_formula ')
    let formula = ''
    if($items_formula.length > 0){
        $items_formula.map((index,element) => {
            number = element.getAttribute('data-number')
            let operador = $(`#modal_impacto_riesgo_escenario_1 .group_formula_${number} #operador_formula_1`).val()
            let valor = $(`#modal_impacto_riesgo_escenario_1 .group_formula_${number} #value_formula_1`).val()
            let resultado = $(`#modal_impacto_riesgo_escenario_1 .group_formula_${number} #resultado_formula_1`).val()
            let new_resultado = ''
            resultado.split(" ").forEach((item,index) => {
                if(index > 0){
                    new_resultado = new_resultado + "_" + item
                }else {
                    new_resultado = new_resultado + item
                }
            })
            if(index == 0){            
                formula = formula + (operador+' '+valor+' '+new_resultado)
            }else{
                formula = formula + ' '+ (operador+' '+valor+' '+new_resultado)
            }
        });
    }
    console.log(formula)
    let activesProb = 0
    let activesImpacto = 0
    if(
        $descripcion != "" &&
        $tipo_regla != "" &&
        $tipo_valor != "" &&
        $estado != "" &&
        $comentario != ""
    ){
        const postData = {
            descripcion: $descripcion,
            tipo_regla:$tipo_regla,
            tipo_valor:$tipo_valor,
            estado:$estado,
            comentario:$comentario,
            formula:formula
        }
        $.ajax({
            method:'POST',
            url:BASE_URL+"/main/addImpactoRiesgo1",
            data:postData,
            dataType:"JSON"
        })
        .done(function(respuesta){
            console.log(respuesta)
            if(!respuesta.error){
                document.getElementById("form_impacto_riesgo_escenario_1").reset();
                $('#modal_impacto_riesgo_escenario_1').modal('hide')
                alerta_impacto_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha guardado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                $("#table_impacto_1").DataTable().ajax.reload(null, false);
                let p1 = $.ajax({
                    method:'get',
                    url:BASE_URL+"/main/getActives/1",
                    dataType:'json'
                })
                .done(function(resp){
                    activesProb = resp.data.length
                })
                let p2 = $.ajax({
                    method:'get',
                    url:BASE_URL+"/main/getActivesImpacto/1",
                    dataType:'json'
                })
                .done(function(res){
                    activesImpacto = res.data.length
                })
                Promise.all([p1,p2]).then(resp => {
                    if(activesImpacto > 0){
                        activeScene1Impacto()
                        escenario = 1
                    }else{
                        if(activesProb == 0){
                            escenario = null
                            noEsceneImpacto()
                        }
                    }
                })
            }else{
                if(respuesta.type == 'escenario'){
                    Swal.fire({
                        icon: 'info',
                        title: 'Alerta',
                        text: respuesta.msg
                    }) 
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.msg
                    }) 
                }
            }
        })
        .fail(function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Faltan Datos'
        })
    }
})

$('#table_impacto_1 tbody').on('click','editImpacto1',function(){
    $('#modal_impacto_riesgo_escenario_1').modal('show')
    document.getElementById("title_impacto_riesgo_esc_1").innerHTML = "Modificar Impacto de Riesgo Escenario 1";
    document.getElementById("form_impacto_riesgo_escenario_1").reset();
    document.getElementById("add_impacto_riego_escenario_1").style.display = "none";
    document.getElementById("update_impacto_riego_escenario_1").style.display = "block";
    $('#modal_impacto_riesgo_escenario_1 .formula_1_probabilidad').css('display','none')
    $('#modal_impacto_riesgo_escenario_1 #group_condicionales_formula .group_formula').remove()

    //recuperando los datos
    var table = $('#table_impacto_1').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    let formula = regDat[0]['formula']

    if(regDat[0]["tipo_valor"] == "Formula"){
        $('#modal_impacto_riesgo_escenario_1 .formula_1_probabilidad').css('display','block')
        let split_formula = formula.split(" ")
        
        let count = 1
        if(split_formula.length > 0){
            $('#modal_impacto_riesgo_escenario_1 #group_condicionales_formula .group_formula').remove()
            for (let index = 0; index < split_formula.length; index=index+3) {
                let new_formula = ''
                split_formula[index+2].split("_").forEach((item,index) => {
                    if(index > 0){
                        new_formula = new_formula+" "+item
                    }else{
                        new_formula = new_formula+item
                    }
                })
                $('#modal_impacto_riesgo_escenario_1 #group_condicionales_formula').append(`
                    <div class="row group_formula mt-2 group_formula_${count}" data-number="${count}">
                        <div class="col-md-3">
                            <select id="operador_formula_1" class="form-control form-control-sm">
                                <option value="=" ${split_formula[index] == "=" ? 'selected' : ''}>=</option>
                                <option value=">" ${split_formula[index] == ">" ? 'selected' : ''}>></option>
                                <option value=">=" ${split_formula[index] == ">=" ? 'selected' : ''}>>=</option>
                                <option value="<" ${split_formula[index] == "<" ? 'selected' : ''}><</option>
                                <option value="<=" ${split_formula[index] == "<=" ? 'selected' : ''}><=</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <input value="${split_formula[index+1]}" type="number" id="value_formula_1" class="form-control form-control-sm"/>
                        </div>
                        <div class="col-md-3">
                            <input value="${new_formula}" type="text" id="resultado_formula_1" class="form-control form-control-sm"/>
                        </div>
                        <div class="col-md-3">
                            <button onclick="delete_row_formula_imp(this)" index=${count} type="button" class="form-control form-control-sm" id="btn_delete_row_formula">X</button>
                        </div>
                    </div>
                `)
                count++
            }
        }
        console.log(split_formula)
    }
    if (regNum == '0') {
        //console.log("error");
    }else{
        $('#modal_impacto_riesgo_escenario_1 #id_impacto_riesgo').val(regDat[0]["id"])
        $('#modal_impacto_riesgo_escenario_1 #descripcion').val(regDat[0]["descripcion"])
        $('#modal_impacto_riesgo_escenario_1 #tipo_regla').val(regDat[0]["tipo_regla"])
        $('#modal_impacto_riesgo_escenario_1 #tipo_valor').val(regDat[0]["tipo_valor"])
        $('#modal_impacto_riesgo_escenario_1 #estado').val(regDat[0]["estado"])
        $('#modal_impacto_riesgo_escenario_1 #comentario').val(regDat[0]["comentario"])
        $('#modal_impacto_riesgo_escenario_1 #formula').val(regDat[0]["formula"])
    }
})
$('#update_impacto_riego_escenario_1').click(function(){
    $descripcion = $('#modal_impacto_riesgo_escenario_1 #descripcion').val()
    $tipo_regla = $('#modal_impacto_riesgo_escenario_1 #tipo_regla').val()
    $tipo_valor = $('#modal_impacto_riesgo_escenario_1 #tipo_valor').val()
    $estado = $('#modal_impacto_riesgo_escenario_1 #estado').val()
    $comentario = $('#modal_impacto_riesgo_escenario_1 #comentario').val()
    $items_formula = $('#modal_impacto_riesgo_escenario_1 .group_formula ')
    let formula = ''
    console.log()
    if($items_formula.length > 0){
        $items_formula.map((index,element) => {
            number = element.getAttribute('data-number')
            let operador = $(`#modal_impacto_riesgo_escenario_1 .group_formula_${number} #operador_formula_1`).val()
            let valor = $(`#modal_impacto_riesgo_escenario_1 .group_formula_${number} #value_formula_1`).val()
            let resultado = $(`#modal_impacto_riesgo_escenario_1 .group_formula_${number} #resultado_formula_1`).val()
            let new_resultado = ''
            resultado.split(" ").forEach((item,index) => {
                if(index > 0){
                    new_resultado = new_resultado + "_" + item
                }else {
                    new_resultado = new_resultado + item
                }
            })
            if(index == 0){            
                formula = formula + (operador+' '+valor+' '+new_resultado)
            }else{
                formula = formula + ' '+ (operador+' '+valor+' '+new_resultado)
            }
        });
    }
    let activesProb = 0
    let activesImpacto = 0
    if(
        $descripcion != "" &&
        $tipo_regla != "" &&
        $tipo_valor != "" &&
        $estado != "" &&
        $comentario != ""
    ){
        const postData = {
            id:$('#modal_impacto_riesgo_escenario_1 #id_impacto_riesgo').val(),
            descripcion: $descripcion,
            tipo_regla:$tipo_regla,
            tipo_valor:$tipo_valor,
            estado:$estado,
            comentario:$comentario,
            formula:formula
        }
        $.ajax({
            method:'POST',
            url:BASE_URL+"/main/updateImpactoRiesgo1",
            data:postData,
            dataType:"JSON"
        })
        .done(function(respuesta){
            console.log(respuesta)
            if(!respuesta.error){
                document.getElementById("form_impacto_riesgo_escenario_1").reset();
                $('#modal_impacto_riesgo_escenario_1').modal('hide')
                alerta_impacto_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha modificado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                $("#table_impacto_1").DataTable().ajax.reload(null, false);
                let p1 = $.ajax({
                    method:'get',
                    url:BASE_URL+"/main/getActives/1",
                    dataType:'json'
                })
                .done(function(resp){
                    activesProb = resp.data.length
                })
                let p2 = $.ajax({
                    method:'get',
                    url:BASE_URL+"/main/getActivesImpacto/1",
                    dataType:'json'
                })
                .done(function(res){
                    activesImpacto = res.data.length
                })
                Promise.all([p1,p2]).then(resp => {
                    if(activesImpacto > 0){
                        activeScene1Impacto()
                        escenario = 1
                    }else{
                        if(activesProb == 0){
                            escenario = null
                            noEsceneImpacto()
                        }
                    }
                })

            }else{
                if(respuesta.type == 'escenario'){
                    Swal.fire({
                        icon: 'info',
                        title: 'Alerta',
                        text: respuesta.msg
                    }) 
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.msg
                    }) 
                }
            }
        })
        .fail(function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Faltan Datos'
        })
    }
})

$('#table_impacto_1 tbody').on( 'click', 'deleteImpacto1', function(event){
    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar el impacto de riesgo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancel`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "post",
                url: BASE_URL+"/main/deleteImpactoRiesgo/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                   
                    alerta_impacto_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_impacto_1").DataTable().ajax.reload(null, false);
                    let p1 = $.ajax({
                        method:'get',
                        url:BASE_URL+"/main/getActives/1",
                        dataType:'json'
                    })
                    .done(function(resp){
                        activesProb = resp.data.length
                    })
                    let p2 = $.ajax({
                        method:'get',
                        url:BASE_URL+"/main/getActivesImpacto/1",
                        dataType:'json'
                    })
                    .done(function(res){
                        activesImpacto = res.data.length
                    })
                    Promise.all([p1,p2]).then(resp => {
                        if(activesImpacto > 0){
                            activeScene1Impacto()
                            escenario = 1
                        }else{
                            if(activesProb == 0){
                                escenario = null
                                noEsceneImpacto()
                            }
                        }
                    })
                } else{
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


// ESCENARIO 2

function loadTableImpacto2($update,$delete){
    if ($.fn.DataTable.isDataTable('#table_impacto_2')){
        $('#table_impacto_2').DataTable().rows().remove();
        $('#table_impacto_2').DataTable().destroy();
    }

    $('#table_impacto_2').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
            "infoEmpty":  "Mostrando 0 a 0 de 0 Registros",
            "infoFiltered": "(Filtrado de _MAX_ registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Registro",
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
        responsive: false,
        autoWidth: false,
        lengthMenu:[5,10,25,50],
        pageLength:5,
        clickToSelect:false,
        ajax: BASE_URL+"/main/getImpactoRiesgo/2",
        aoColumns: [
            { "data": "id" },
            { "data": "descripcion" },
            { "data": "tipo_regla" },
            { "data": "tipo_valor" },
            { "data": "operador1" },
            { "data": "valor1" },
            { "data": "operador2" },
            { "data": "valor2" },
            { "data": "comentario" },
            {
                "data": null,
                "mRender":function(data){
                    if(data.estado == "1"){
                        return 'Activo'
                    }else{
                        return 'Inactivo'
                    }
                }
            },
            {
                data:null,
                "mRender":function(data){
                    $cadena = "";
                    if ($update == '1'){
                        $cadena =   $cadena +  `<editImpacto2 data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editImpacto2>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteImpacto2 data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteImpacto2>`
                    }
                    if ($update == '0' && $delete==0){
                        return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                    }
                    return $cadena;
                        
                }
            },
            // {
            //     data:null,
            //     "mRender":function(data){
            //         return `<editImpacto2 data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editImpacto2>
            //         <deleteImpacto2  data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteImpacto2>`
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
            $( 'table_impacto_2 tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}

document.getElementById("btn_add_impacto_2").addEventListener('click',function(){
    $('#modal_impacto_riesgo_escenario_2 #operador_1 option').remove()
    $('#modal_impacto_riesgo_escenario_2 #operador_1').append(
        `
            <option value="">Seleccione</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="<"><</option>
            <option value="<="><=</option>
        `
    )
    $('#modal_impacto_riesgo_escenario_2 #operador_2 option').remove()
    $('#modal_impacto_riesgo_escenario_2 #operador_2').append(
        `
            <option value="">Seleccione</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="<"><</option>
            <option value="<="><=</option>
        `
    )
    $('#modal_impacto_riesgo_escenario_2').modal('show')
    document.getElementById("title_impacto_riesgo_esc_2").innerHTML = "Agregar Impacto de Riesgo Escenario 2";
    document.getElementById("form_impacto_riesgo_escenario_2").reset();
    document.getElementById("add_impacto_riego_escenario_2").style.display = "block";
    document.getElementById("update_impacto_riego_escenario_2").style.display = "none";
})

document.getElementById('add_impacto_riego_escenario_2').addEventListener('click',function(){
    $descripcion = $('#modal_impacto_riesgo_escenario_2 #descripcion').val()
    $tipo_regla = $('#modal_impacto_riesgo_escenario_2 #tipo_regla').val()
    $tipo_valor = $('#modal_impacto_riesgo_escenario_2 #tipo_valor').val()
    $operador_1 = $('#modal_impacto_riesgo_escenario_2 #operador_1').val()
    $valor_1 = $('#modal_impacto_riesgo_escenario_2 #valor_1').val()
    $operador_2 = $('#modal_impacto_riesgo_escenario_2 #operador_2').val()
    $valor_2 = $('#modal_impacto_riesgo_escenario_2 #valor_2').val()
    $estado = $('#modal_impacto_riesgo_escenario_2 #estado').val()
    $comentario = $('#modal_impacto_riesgo_escenario_2 #comentario').val()
    let activesProb = 0
    let activesImpacto = 0
    if(
        $descripcion != "" &&
        $tipo_regla != "" &&
        $tipo_valor != "" &&
        $estado != "" &&
        $comentario != "",
        $operador_1 != "",
        $operador_2 != "",
        $valor_1 != "",
        $valor_2 != ""
    ){
        if(validateOperators($operador_1,$valor_1,$operador_2,$valor_2)){

            const postData = {
                descripcion: $descripcion,
                tipo_regla:$tipo_regla,
                tipo_valor:$tipo_valor,
                estado:$estado,
                comentario:$comentario,
                operador1:$operador_1,
                valor1:$valor_1,
                operador2:$operador_2,
                valor2:$valor_2
            }
            $.ajax({
                method:'POST',
                url:BASE_URL+"/main/addImpactoRiesgo2",
                data:postData,
                dataType:"JSON"
            })
            .done(function(respuesta){
                console.log(respuesta)
                if(!respuesta.error){
                    document.getElementById("form_impacto_riesgo_escenario_2").reset();
                    $('#modal_impacto_riesgo_escenario_2').modal('hide')
                    alerta_impacto_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        'Se ha guardado exitosamente'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>';
                    $("#table_impacto_2").DataTable().ajax.reload(null, false);
                    let p1 = $.ajax({
                        method:'get',
                        url:BASE_URL+"/main/getActives/2",
                        dataType:'json'
                    })
                    .done(function(resp){
                        activesProb = resp.data.length
                    })
                    let p2 = $.ajax({
                        method:'get',
                        url:BASE_URL+"/main/getActivesImpacto/2",
                        dataType:'json'
                    })
                    .done(function(res){
                        activesImpacto = res.data.length
                    })
                    Promise.all([p1,p2]).then(resp => {
                        if(activesImpacto > 0){
                            activeScene2Impacto()
                            escenario = 2
                        }else{
                            if(activesProb == 0){
                                escenario = null
                                noEsceneImpacto()
                            }
                        }
                    })
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
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Opps',
                text: 'Esa combinatoria de operadores no es logica'
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

$('#table_impacto_2 tbody').on('click','editImpacto2',function(){
    $('#modal_impacto_riesgo_escenario_2 #operador_1 option').remove()
    $('#modal_impacto_riesgo_escenario_2 #operador_1').append(
        `
            <option value="">Seleccione</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="<"><</option>
            <option value="<="><=</option>
        `
    )
    $('#modal_impacto_riesgo_escenario_2 #operador_2 option').remove()
    $('#modal_impacto_riesgo_escenario_2 #operador_2').append(
        `
            <option value="">Seleccione</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="<"><</option>
            <option value="<="><=</option>
        `
    )
    $('#modal_impacto_riesgo_escenario_2').modal('show')
    document.getElementById("title_impacto_riesgo_esc_2").innerHTML = "Modificar Impacto de Riesgo Escenario 2";
    document.getElementById("form_impacto_riesgo_escenario_2").reset();
    document.getElementById("add_impacto_riego_escenario_2").style.display = "none";
    document.getElementById("update_impacto_riego_escenario_2").style.display = "block";
    //recuperando los datos
    var table = $('#table_impacto_2').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        $('#modal_impacto_riesgo_escenario_2 #id_impacto_riesgo').val(regDat[0]["id"])
        $('#modal_impacto_riesgo_escenario_2 #descripcion').val(regDat[0]["descripcion"])
        $('#modal_impacto_riesgo_escenario_2 #tipo_regla').val(regDat[0]["tipo_regla"])
        $('#modal_impacto_riesgo_escenario_2 #tipo_valor').val(regDat[0]["tipo_valor"])
        $('#modal_impacto_riesgo_escenario_2 #operador_1').val(regDat[0]["operador1"])
        $('#modal_impacto_riesgo_escenario_2 #operador_2').val(regDat[0]["operador2"])
        $('#modal_impacto_riesgo_escenario_2 #valor_1').val(regDat[0]["valor1"])
        $('#modal_impacto_riesgo_escenario_2 #valor_2').val(regDat[0]["valor2"])
        $('#modal_impacto_riesgo_escenario_2 #estado').val(regDat[0]["estado"])
        $('#modal_impacto_riesgo_escenario_2 #comentario').val(regDat[0]["comentario"])
    }
})

document.getElementById('update_impacto_riego_escenario_2').addEventListener('click',function(){
    $descripcion = $('#modal_impacto_riesgo_escenario_2 #descripcion').val()
    $tipo_regla = $('#modal_impacto_riesgo_escenario_2 #tipo_regla').val()
    $tipo_valor = $('#modal_impacto_riesgo_escenario_2 #tipo_valor').val()
    $operador_1 = $('#modal_impacto_riesgo_escenario_2 #operador_1').val()
    $valor_1 = $('#modal_impacto_riesgo_escenario_2 #valor_1').val()
    $operador_2 = $('#modal_impacto_riesgo_escenario_2 #operador_2').val()
    $valor_2 = $('#modal_impacto_riesgo_escenario_2 #valor_2').val()
    $estado = $('#modal_impacto_riesgo_escenario_2 #estado').val()
    $comentario = $('#modal_impacto_riesgo_escenario_2 #comentario').val()
    let activesProb = 0
    let activesImpacto = 0
    if(
        $descripcion != "" &&
        $tipo_regla != "" &&
        $tipo_valor != "" &&
        $estado != "" &&
        $comentario != "",
        $operador_1 != "",
        $operador_2 != "",
        $valor_1 != "",
        $valor_2 != ""
    ){
        if(validateOperators($operador_1,$valor_1,$operador_2,$valor_2)){

            const postData = {
                id:$('#modal_impacto_riesgo_escenario_2 #id_impacto_riesgo').val(),
                descripcion: $descripcion,
                tipo_regla:$tipo_regla,
                tipo_valor:$tipo_valor,
                estado:$estado,
                comentario:$comentario,
                operador1:$operador_1,
                valor1:$valor_1,
                operador2:$operador_2,
                valor2:$valor_2
            }
            $.ajax({
                method:'POST',
                url:BASE_URL+"/main/updateImpactoRiesgo2",
                data:postData,
                dataType:"JSON"
            })
            .done(function(respuesta){
                console.log(respuesta)
                if(!respuesta.error){
                    document.getElementById("form_impacto_riesgo_escenario_2").reset();
                    $('#modal_impacto_riesgo_escenario_2').modal('hide')
                    alerta_impacto_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        'Se ha modificado exitosamente'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>';
                    $("#table_impacto_2").DataTable().ajax.reload(null, false); 
                    let p1 = $.ajax({
                        method:'get',
                        url:BASE_URL+"/main/getActives/2",
                        dataType:'json'
                    })
                    .done(function(resp){
                        activesProb = resp.data.length
                    })
                    let p2 = $.ajax({
                        method:'get',
                        url:BASE_URL+"/main/getActivesImpacto/2",
                        dataType:'json'
                    })
                    .done(function(res){
                        activesImpacto = res.data.length
                    })
                    Promise.all([p1,p2]).then(resp => {
                        if(activesImpacto > 0){
                            activeScene2Impacto()
                            escenario = 2
                        }else{
                            if(activesProb == 0){
                                escenario = null
                                noEsceneImpacto()
                            }
                        }
                    })
    
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
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Opps',
                text: 'Esa combinatoria de operadores no es logica'
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
$('#table_impacto_2 tbody').on( 'click', 'deleteImpacto2', function(event){

    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar el impacto de riesgo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancel`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "post",
                url: BASE_URL+"/main/deleteImpactoRiesgo/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    alerta_impacto_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_impacto_2").DataTable().ajax.reload(null, false);
                    let p1 = $.ajax({
                        method:'get',
                        url:BASE_URL+"/main/getActives/2",
                        dataType:'json'
                    })
                    .done(function(resp){
                        activesProb = resp.data.length
                    })
                    let p2 = $.ajax({
                        method:'get',
                        url:BASE_URL+"/main/getActivesImpacto/2",
                        dataType:'json'
                    })
                    .done(function(res){
                        activesImpacto = res.data.length
                    })
                    Promise.all([p1,p2]).then(resp => {
                        if(activesImpacto > 0){
                            activeScene2Impacto()
                            escenario = 2
                        }else{
                            if(activesProb == 0){
                                escenario = null
                                noEsceneImpacto()
                            }
                        }
                    })
                } else {
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

function noEsceneImpacto(){
    $('#btn_add_impacto_2').css('display','none')
    $('#btn_add_impacto_1').css('display','block')
    $('#impacto-2-tab').attr('disabled',false)
    $('#impacto-2-tab').removeClass('active')
    $('#impacto-1-tab').attr('disabled',false)
    $('#impacto-1-tab').addClass('active')
    $('#impacto-1-tab-pane').addClass('show')
    $('#impacto-1-tab-pane').addClass('active')
    $('#impacto-2-tab-pane').removeClass('active')
    $('#impacto-2-tab-pane').removeClass('show')
}
function activeScene1Impacto(){
    $('#btn_add_impacto_2').css('display','none')
    $('#btn_add_impacto_1').css('display','block')
    $('#impacto-2-tab').attr('disabled',true)
    $('#impacto-2-tab').removeClass('active')
    $('#impacto-1-tab').attr('disabled',false)
    $('#impacto-1-tab').addClass('active')
    $('#impacto-1-tab-pane').addClass('show')
    $('#impacto-1-tab-pane').addClass('active')
    $('#impacto-2-tab-pane').removeClass('show')
    $('#impacto-2-tab-pane').removeClass('active')
}
function activeScene2Impacto(){
    $('#btn_add_impacto_1').css('display','none')
    $('#btn_add_impacto_2').css('display','block')
    $('#impacto-1-tab').attr('disabled',true)
    $('#impacto-1-tab').removeClass('active')
    $('#impacto-2-tab').attr('disabled',false)
    $('#impacto-2-tab').addClass('active')
    $('#impacto-2-tab-pane').addClass('show')
    $('#impacto-2-tab-pane').addClass('active')
    $('#impacto-1-tab-pane').removeClass('show')
    $('#impacto-1-tab-pane').removeClass('active')
}

$('#modal_impacto_riesgo_escenario_2 #operador_1').change(function(){
    let option =$('#modal_impacto_riesgo_escenario_2 #operador_1').val()
    let option2 =$('#modal_impacto_riesgo_escenario_2 #operador_2').val()

    if(option == ">" || option == ">="){
        $('#modal_impacto_riesgo_escenario_2 #operador_2 option').remove()
        $('#modal_impacto_riesgo_escenario_2 #operador_2').append(
            `
                <option value="<" ${option2 == "<" ? 'selected' :''}><</option>
                <option value="<=" ${option2 == "<=" ? 'selected' :''}><=</option>
            `
        )
    }else{
        if(option == "<" || option == "<="){
            $('#modal_impacto_riesgo_escenario_2 #operador_2 option').remove()
            $('#modal_impacto_riesgo_escenario_2 #operador_2').append(
                `
                    <option value=">" ${option2 == ">" ? 'selected' :''}>></option>
                    <option value=">=" ${option2 == ">=" ? 'selected' :''}>>=</option>
                `
            )
        }
    }
})
$('#modal_impacto_riesgo_escenario_2 #operador_2').change(function(){
    let option =$('#modal_impacto_riesgo_escenario_2 #operador_2').val()
    let option1 =$('#modal_impacto_riesgo_escenario_2 #operador_1').val()

    if(option == ">" || option == ">="){
        $('#modal_impacto_riesgo_escenario_2 #operador_1 option').remove()
        $('#modal_impacto_riesgo_escenario_2 #operador_1').append(
            `
                <option value="<" ${option1 == "<" ? 'selected' :''}><</option>
                <option value="<=" ${option1 == "<=" ? 'selected' :''}><=</option>
            `
        )
    }else{
        if(option == "<" || option == "<="){
            $('#modal_impacto_riesgo_escenario_2 #operador_1 option').remove()
            $('#modal_impacto_riesgo_escenario_2 #operador_1').append(
                `
                    <option value=">" ${option1 == ">" ? 'selected' :''}>></option>
                    <option value=">=" ${option1 == ">=" ? 'selected' :''}>>=</option>
                `
            )
        }
    }
})


function validateOperators(operador1,valor1,operador2,valor2){
    if(operador1 == ">" || operador1 == ">="){
        if(Number(valor1) <= Number(valor2)){
            return true
        }
        return false
    }
    if(operador1 == "<" || operador1 == "<="){
        if(Number(valor1) >= Number(valor2)){
            return true
        }
        return false
    }
    if(operador2 == ">" || operador2 == ">="){
        if(Number(valor2) <= Number(valor1)){
            return true
        }
        return false
    }
    if(operador2 == "<" || operador2 == "<="){
        if(Number(valor2) >= Number(valor1)){
            return true
        }
        return false
    }
}

$('#modal_impacto_riesgo_escenario_1 #btn_add_row_formula').click(function(){
    console.log('aqui impacto')
    let number_item = $('#modal_impacto_riesgo_escenario_1 .group_formula').length + 1
    $('#modal_impacto_riesgo_escenario_1 #group_condicionales_formula').append(`
        <div class="row group_formula mt-2 group_formula_${number_item}" data-number="${number_item}">
            <div class="col-md-3">
                <select id="operador_formula_1" class="form-control form-control-sm">
                    <option value="=">=</option>
                    <option value=">">></option>
                    <option value=">=">>=</option>
                    <option value="<"><</option>
                    <option value="<="><=</option>
                </select>
            </div>
            <div class="col-md-3">
                <input type="number" id="value_formula_1" class="form-control form-control-sm"/>
            </div>
            <div class="col-md-3">
                <input type="text" id="resultado_formula_1" class="form-control form-control-sm"/>
            </div>
            <div class="col-md-3">
                <button onclick="delete_row_formula_imp(this)" index=${number_item} type="button" class="form-control form-control-sm" id="btn_delete_row_formula">X</button>
            </div>
        </div>
    `)
})

function delete_row_formula_imp(arg){
    let number_item = $(arg).attr('index')
    console.log(number_item)
    $('#modal_impacto_riesgo_escenario_1 .group_formula_'+number_item).remove()
}