var alerta_tipo_riesgo = document.getElementById("alerta_tipo_riesgo");

function loadTableTipoRiesgo($update,$delete){
    if ($.fn.DataTable.isDataTable('#table_tipo_riesgo')){
        $('#table_tipo_riesgo').DataTable().rows().remove();
        $('#table_tipo_riesgo').DataTable().destroy();
    }

    $('#table_tipo_riesgo').DataTable({
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
        ajax: BASE_URL+"/main/getTipoRiesgos",
        aoColumns: [
            { "data": "id" },
            { "data": "tipo_riesgo" },
            { "data": "descripcion" },
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
                        $cadena =   $cadena +  `<editEmpresa data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editEmpresa>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteEmpresa data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteEmpresa>`
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
            //         return `<editEmpresa data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editEmpresa>
            //         <deleteEmpresa data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteEmpresa>`
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
            $( 'table_tipo_riesgo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}

document.getElementById("btn_add_tipo_reisgo").addEventListener("click",function(){              
    $("#modal_tipo_riesgo").modal("show");
    document.getElementById("title-tipo_riesgo").innerHTML = "Agregar Tipo de Riesgo";
    document.getElementById("form_tipo_riesgo").reset();
    document.getElementById("add_tipo_riego").style.display = "block";
    document.getElementById("update_tipo_riesgo").style.display = "none";
});

document.getElementById("add_tipo_riego").addEventListener('click',function(){
    $tipo_riesgo=document.getElementById("input_tipo_riesgo").value;
    $descripcion=document.getElementById("descripcion").value;
    $estado=document.getElementById("estado").value;
    if($tipo_riesgo != "" && $descripcion != "" && $estado != ""){
        const postData = { 
            tipo_riesgo:$tipo_riesgo,
            descripcion:$descripcion,
            estado:$estado
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/addTipoRiesgo",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                console.log(respuesta);
                if (!respuesta.error) 
                {
                    document.getElementById("form_tipo_riesgo").reset();
                    $('#modal_tipo_riesgo').modal('hide');
                    alerta_tipo_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha guardado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_tipo_riesgo").DataTable().ajax.reload(null, false); 
                   
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
                    text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
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

//editar Empresa
$('#table_tipo_riesgo tbody').on( 'click', 'editEmpresa', function(event){
    document.getElementById("title-tipo_riesgo").innerHTML = "Modificar Tipo de Riesgo";
    document.getElementById("form_tipo_riesgo").reset();
    document.getElementById("add_tipo_riego").style.display = "none";
    document.getElementById("update_tipo_riesgo").style.display = "block";

    var table = $('#table_tipo_riesgo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if(regNum == '0'){

    }else{
        document.getElementById("id_tipo_riesgo").value=event.currentTarget.getAttribute('data-id');
        $('#modal_tipo_riesgo #input_tipo_riesgo').val(regDat[0]["tipo_riesgo"])
        $('#modal_tipo_riesgo #descripcion').val(regDat[0]["descripcion"])
        $('#modal_tipo_riesgo #estado').val(regDat[0]["estado"])
        $("#modal_tipo_riesgo").modal("show");
    }
});
//Eliminar Empresa
$('#table_tipo_riesgo tbody').on( 'click', 'deleteEmpresa', function(event){

    //recuperando los datos
    var table = $('#table_tipo_riesgo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    let id = 0
    console.log(regNum)
    if (regNum == '0') {
        //console.log("error");
    }else{
        console.log(regDat)
        id=event.currentTarget.getAttribute('data-id');
    }
    console.log(id)
    Swal.fire({
        title: 'Desea eliminar el tipo de riesgo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/deleteTipoRiesgo/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                console.log(respuesta)
                if (!respuesta.error) 
                {
                    alerta_tipo_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_tipo_riesgo").DataTable().ajax.reload(null, false); 
                   
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

document.getElementById("update_tipo_riesgo").addEventListener("click", function(){
    
    $tipo_riesgo=document.getElementById("input_tipo_riesgo").value;
    $descripcion=document.getElementById("descripcion").value;
    $estado=document.getElementById("estado").value;
    
    if($tipo_riesgo != "" && $descripcion != "" && $estado != ""){
        const postData = { 
            id:document.getElementById("id_tipo_riesgo").value,
            tipo_riesgo:$tipo_riesgo,
            descripcion:$descripcion,
            estado:$estado
        };
        
        try {

            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateTipoRiesgo",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    document.getElementById("form_tipo_riesgo").reset();
                    $('#modal_tipo_riesgo').modal('hide');
                    alerta_tipo_riesgo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha modificado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_tipo_riesgo").DataTable().ajax.reload(null, false); 
                   
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
                    text: 'No se pudo editar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo editar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
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

