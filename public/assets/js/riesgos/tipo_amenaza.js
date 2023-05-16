var alerta_tipo_amenaza = document.getElementById("alerta_tipo_amenaza");

function loadTableTipoAmenaza($update,$delete){
    if ($.fn.DataTable.isDataTable('#table_tipo_amenaza')){
        $('#table_tipo_amenaza').DataTable().rows().remove();
        $('#table_tipo_amenaza').DataTable().destroy();
    }

    $('#table_tipo_amenaza').DataTable({
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
        ajax: BASE_URL+"/main/getTiposAmenaza",
        aoColumns: [
            { "data": "id" },
            { "data": "tipo" },
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
                        $cadena =   $cadena +  `<editAmenaza data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAmenaza>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteAmenaza data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAmenaza>`
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
            //         return `<editAmenaza data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editAmenaza>
            //         <deleteAmenaza data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteAmenaza>`
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
            $( 'table_tipo_amenaza tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}

document.getElementById("btn_add_tipo_amenaza").addEventListener("click",function(){              
    $("#modal_tipo_amenaza").modal("show");
    document.getElementById("title_tipo_amenaza").innerHTML = "Agregar tipo de amenaza";
    document.getElementById("form_tipo_amenaza").reset();
    document.getElementById("add_tipo_amenaza").style.display = "block";
    document.getElementById("update_tipo_amenaza").style.display = "none";
});

document.getElementById("add_tipo_amenaza").addEventListener('click',function(){
    $tipo=$('#modal_tipo_amenaza #tipo').val()
    $estado=$('#modal_tipo_amenaza #estado').val()
    if(
        $tipo != "" &&
        $estado != ""
    ){
        const postData = { 
            tipo:$tipo,
            estado:$estado,
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/addTipoAmenaza",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                //console.log(respuesta)
                if (!respuesta.error) 
                {
                    document.getElementById("form_tipo_amenaza").reset();
                    $('#modal_tipo_amenaza').modal('hide');
                    alerta_tipo_amenaza.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha guardado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_tipo_amenaza").DataTable().ajax.reload(null, false); 
                   
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
$('#table_tipo_amenaza tbody').on( 'click', 'editAmenaza', function(event){
    $('#modal_tipo_amenaza #title_tipo_amenaza').html('Modificar Tipo de Amenaza')
    document.getElementById("form_tipo_amenaza").reset();
    document.getElementById("add_tipo_amenaza").style.display = "none";
    document.getElementById("update_tipo_amenaza").style.display = "block";

    var table = $('#table_tipo_amenaza').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if(regNum == '0'){
    }else{
        $("#modal_tipo_amenaza").modal("show");
        document.getElementById("id_tipo_amenaza").value=event.currentTarget.getAttribute('data-id');
        $('#modal_tipo_amenaza #tipo').val(regDat[0]['tipo'])
        $('#modal_tipo_amenaza #estado').val(regDat[0]['estado'])
    }

});

$('#table_tipo_amenaza tbody').on( 'click', 'deleteAmenaza', function(event){

    //recuperando los datos
    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar el tipo de amenaza?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "post",
                url: BASE_URL+"/main/deleteTipoAmenaza/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                //console.log(respuesta);
                if (!respuesta.error) 
                {
                    alerta_tipo_amenaza.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_tipo_amenaza").DataTable().ajax.reload(null, false); 
                   
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

document.getElementById("update_tipo_amenaza").addEventListener("click", function(){
    $tipo=$('#modal_tipo_amenaza #tipo').val()
    $estado=$('#modal_tipo_amenaza #estado').val()
    const id = Number(document.getElementById("id_tipo_amenaza").value)
    if(
        $tipo != "" &&
        $estado != "" 
    ){
        const postData = {
            tipo:$tipo,
            estado:$estado
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateTipoAmenaza/"+id,
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    document.getElementById("form_tipo_amenaza").reset();
                    $('#modal_tipo_amenaza').modal('hide');
                    alerta_tipo_amenaza.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha modificado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_tipo_amenaza").DataTable().ajax.reload(null, false); 
                   
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