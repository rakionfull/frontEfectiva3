var alerta_desc_amenaza = document.getElementById("alerta_desc_amenaza");

function loadTableDescAmenaza($update,$delete){
    if ($.fn.DataTable.isDataTable('#table_desc_amenaza')){
        $('#table_desc_amenaza').DataTable().rows().remove();
        $('#table_desc_amenaza').DataTable().destroy();
    }

    $('#table_desc_amenaza').DataTable({
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
        ajax: BASE_URL+"/main/getDescAmenaza",
        aoColumns: [
            { "data": "id" },
            { "data": "tipo_amenaza" },
            { "data": "amenaza" },
            {
                data:null,
                "mRender":function(data){
                    $cadena = "";
                    if ($update == '1'){
                        $cadena =   $cadena +  `<editDesc data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editDesc>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteDesc data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteDesc>`
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
            //         return `<editDesc data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editDesc>
            //         <deleteDesc data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteDesc>`
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
            $( 'table_desc_amenaza tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}

document.getElementById("btn_add_desc_amenaza").addEventListener("click",function(){
    $('#modal_desc_amenaza #id_tipo option').remove()

    $.ajax({
        method: "GET",
        url: BASE_URL+"/main/getTiposAmenaza",
        dataType: "JSON"
    })
    .done(function(respuesta) {
        if (respuesta) 
        {
            let options = ''
            $("#modal_desc_amenaza").modal("show");
            document.getElementById("title_desc_amenaza").innerHTML = "Agregar descripción de amenaza";
            document.getElementById("form_desc_amenaza").reset();
            document.getElementById("add_desc_amenaza").style.display = "block";
            document.getElementById("update_desc_amenaza").style.display = "none";
            respuesta.data.forEach(item => {
                options += `<option value="${item.id}">${item.tipo}</option>`
            });
            $('#modal_desc_amenaza #id_tipo').append(options)
        } 
        
    })
    .fail(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
        })
    })         
    
});

document.getElementById("add_desc_amenaza").addEventListener('click',function(){
    $id_tipo=$('#modal_desc_amenaza #id_tipo').val()
    $amenaza=$('#modal_desc_amenaza #amenaza').val()
    if(
        $id_tipo != "" &&
        $amenaza != ""
    ){
        const postData = { 
            idtipo_amenaza:$id_tipo,
            amenaza:$amenaza,
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/addDescAmenaza",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    document.getElementById("form_desc_amenaza").reset();
                    $('#modal_desc_amenaza').modal('hide');
                    alerta_desc_amenaza.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha guardado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_desc_amenaza").DataTable().ajax.reload(null, false); 
                   
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
$('#table_desc_amenaza tbody').on( 'click', 'editDesc', function(event){
    $('#modal_desc_amenaza #id_tipo option').remove()
    var table = $('#table_desc_amenaza').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    $.ajax({
        method: "GET",
        url: BASE_URL+"/main/getTiposAmenaza",
        dataType: "JSON"
    })
    .done(function(respuesta) {
        if (respuesta) 
        {
            let options = ''
            $('#modal_desc_amenaza #title_desc_amenaza').html('Modificar descripción de amenaza')
            document.getElementById("form_desc_amenaza").reset();
            document.getElementById("add_desc_amenaza").style.display = "none";
            document.getElementById("update_desc_amenaza").style.display = "block";
            respuesta.data.forEach(item => {
                options += `<option value="${item.id}">${item.tipo}</option>`
                if(item.tipo = regDat[0]['tipo_amenaza']){
                    selected = item.id
                }
            });
            $('#modal_desc_amenaza #id_tipo').append(options)

            
            if(regNum == '0'){

            }else{
                document.getElementById("id_desc_amenaza").value=event.currentTarget.getAttribute('data-id');
                $('#modal_desc_amenaza #id_tipo').val(selected)
                $('#modal_desc_amenaza #amenaza').val(regDat[0]["amenaza"])
                $("#modal_desc_amenaza").modal("show");
                $("#modal_desc_amenaza").modal("show");
            }

        } 
        
    })
    .fail(function(error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
        })
    })
    
});

$('#table_desc_amenaza tbody').on( 'click', 'deleteDesc', function(event){

    //recuperando los datos
    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar la descripcion de amenaza?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancel`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/deleteDescAmenaza/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    alerta_desc_amenaza.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_desc_amenaza").DataTable().ajax.reload(null, false); 
                   
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

document.getElementById("update_desc_amenaza").addEventListener("click", function(){
    $tipo=$('#modal_desc_amenaza #id_tipo').val()
    $amenaza=$('#modal_desc_amenaza #amenaza').val()
    const id = Number(document.getElementById("id_desc_amenaza").value)
    if(
        $tipo != "" &&
        $amenaza != "" 
    ){
        const postData = {
            idtipo_amenaza:$tipo,
            amenaza:$amenaza
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateDescAmenaza/"+id,
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    document.getElementById("form_desc_amenaza").reset();
                    $('#modal_desc_amenaza').modal('hide');
                    alerta_desc_amenaza.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha modificado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_desc_amenaza").DataTable().ajax.reload(null, false); 
                   
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
});