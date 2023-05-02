var alerta_desc_vulnerabilidad = document.getElementById("alerta_desc_vulnerabilidad");

function loadTableDescVulnerabilidad($update,$delete){
    if ($.fn.DataTable.isDataTable('#table_desc_vulnerabilidad')){
        $('#table_desc_vulnerabilidad').DataTable().rows().remove();
        $('#table_desc_vulnerabilidad').DataTable().destroy();
    }

    $('#table_desc_vulnerabilidad').DataTable({
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
        ajax: BASE_URL+"/main/getDescVulnerabilidad",
        aoColumns: [
            { "data": "id" },
            { "data": "categoria"},
            { "data": "vulnerabilidad" },
            {
                data:null,
                "mRender":function(data){
                    $cadena = "";
                    if ($update == '1'){
                        $cadena =   $cadena +  `<editVulnerabilidad data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editVulnerabilidad>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteVulnerabilidad data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteVulnerabilidad>`
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
            //         return `<editVulnerabilidad data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editVulnerabilidad>
            //         <deleteVulnerabilidad data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteVulnerabilidad>`
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
            $( 'table_desc_vulnerabilidad tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}

document.getElementById("btn_add_desc_vulnerabilidad").addEventListener("click",function(){
    $('#modal_desc_vulnerabilidad #id_categoria_vulnerabilidad option').remove()

    $.ajax({
        method: "GET",
        url: BASE_URL+"/main/getCategoriasVulnerabilidad",
        dataType: "JSON"
    })
    .done(function(respuesta) {
        if (respuesta) 
        {
            let options = ''
            $("#modal_desc_vulnerabilidad").modal("show");
            document.getElementById("title_desc_vulnerabilidad").innerHTML = "Agregar descripción de vulnerabilidad";
            document.getElementById("form_desc_vulnerabilidad").reset();
            document.getElementById("add_desc_vulnerabilidad").style.display = "block";
            document.getElementById("update_desc_vulnerabilidad").style.display = "none";
            respuesta.data.forEach(item => {
                options += `<option value="${item.id}">${item.categoria}</option>`
            });
            $('#modal_desc_vulnerabilidad #id_categoria_vulnerabilidad').append(options)
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

document.getElementById("add_desc_vulnerabilidad").addEventListener('click',function(){
    $id_categoria=$('#modal_desc_vulnerabilidad #id_categoria_vulnerabilidad').val()
    $vulnerabilidad=$('#modal_desc_vulnerabilidad #vulnerabilidad').val()
    if(
        $id_categoria != "" &&
        $vulnerabilidad != ""
    ){
        const postData = { 
            idcategoria:$id_categoria,
            vulnerabilidad:$vulnerabilidad,
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/addDescVulnerabilidad",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (respuesta) 
                {
                    document.getElementById("form_desc_vulnerabilidad").reset();
                    $('#modal_desc_vulnerabilidad').modal('hide');
                    alerta_desc_vulnerabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha guardado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_desc_vulnerabilidad").DataTable().ajax.reload(null, false); 
                   
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
$('#table_desc_vulnerabilidad tbody').on( 'click', 'editVulnerabilidad', function(event){
    $('#modal_desc_vulnerabilidad #id_categoria_vulnerabilidad option').remove()
    var table = $('#table_desc_vulnerabilidad').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    $.ajax({
        method: "GET",
        url: BASE_URL+"/main/getCategoriasVulnerabilidad",
        dataType: "JSON"
    })
    .done(function(respuesta) {
        if (respuesta) 
        {
            let options = ''
            $('#modal_desc_vulnerabilidad #title_desc_vulnerabilidad').html('Modificar descripción de vulnerabilidad')
            document.getElementById("form_desc_vulnerabilidad").reset();
            document.getElementById("add_desc_vulnerabilidad").style.display = "none";
            document.getElementById("update_desc_vulnerabilidad").style.display = "block";
            respuesta.data.forEach(item => {
                options += `<option value="${item.id}">${item.categoria}</option>`
                if(item.categoria == regDat[0]['categoria']){
                    selected = item.id
                }
            });
            $('#modal_desc_vulnerabilidad #id_categoria_vulnerabilidad').append(options)

            if(regNum == '0'){

            }else{
                $("#modal_desc_vulnerabilidad").modal("show");
                document.getElementById("id_desc_vulnerabilidad").value=event.currentTarget.getAttribute('data-id');
                $('#modal_desc_vulnerabilidad #id_categoria_vulnerabilidad').val(selected)
                $('#modal_desc_vulnerabilidad #vulnerabilidad').val(regDat[0]['vulnerabilidad'])
                $("#modal_desc_vulnerabilidad").modal("show");
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
    
});

$('#table_desc_vulnerabilidad tbody').on( 'click', 'deleteVulnerabilidad', function(event){

    //recuperando los datos
    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar la descripción de vulnerabilidad?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/deleteDescVulnerabilidad/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    alerta_desc_vulnerabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha eliminado satisfactoriamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_desc_vulnerabilidad").DataTable().ajax.reload(null, false); 
                   
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

document.getElementById("update_desc_vulnerabilidad").addEventListener("click", function(){
    $id_categoria=$('#modal_desc_vulnerabilidad #id_categoria_vulnerabilidad').val()
    $vulnerabilidad=$('#modal_desc_vulnerabilidad #vulnerabilidad').val()
    const id = Number(document.getElementById("id_desc_vulnerabilidad").value)
    if(
        $id_categoria != "" &&
        $vulnerabilidad != "" 
    ){
        const postData = {
            idcategoria:$id_categoria,
            vulnerabilidad:$vulnerabilidad
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateDescVulnerabilidad/"+id,
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    document.getElementById("form_desc_vulnerabilidad").reset();
                    $('#modal_desc_vulnerabilidad').modal('hide');
                    alerta_desc_vulnerabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha modificado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_desc_vulnerabilidad").DataTable().ajax.reload(null, false); 
                   
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
});