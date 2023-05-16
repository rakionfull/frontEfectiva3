var alerta_categoria_vulnerabilidad = document.getElementById("alerta_categoria_vulnerabilidad");

function loadTableCategoriasVulnerabilidad($update,$delete){
    if ($.fn.DataTable.isDataTable('#table_categoria_vulnerabilidad')){
        $('#table_categoria_vulnerabilidad').DataTable().rows().remove();
        $('#table_categoria_vulnerabilidad').DataTable().destroy();
    }

    $('#table_categoria_vulnerabilidad').DataTable({
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
        ajax: BASE_URL+"/main/getCategoriasVulnerabilidad",
        aoColumns: [
            { "data": "id" },
            { "data": "categoria" },
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
                        $cadena =   $cadena +  `<editCategoria data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCategoria>`;
                    
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  `<deleteCategoria data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCategoria>`
                    }
                    if ($update == '0' && $delete==0){
                        return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                    }
                    return $cadena;
                        
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
            $( 'table_categoria_vulnerabilidad tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}

document.getElementById("btn_add_categoria_vulnerabilidad").addEventListener("click",function(){              
    $("#modal_categoria_vulnerabilidad").modal("show");
    document.getElementById("title_categoria_vulnerabilidad").innerHTML = "Agregar Categoría de Vulnerabilidad";
    document.getElementById("form_categoria_vulnerabilidad").reset();
    document.getElementById("add_categoria_vulnerabilidad").style.display = "block";
    document.getElementById("update_categoria_vulnerabilidad").style.display = "none";
});

document.getElementById("add_categoria_vulnerabilidad").addEventListener('click',function(){
    $categoria=$('#modal_categoria_vulnerabilidad #categoria').val()
    $estado=$('#modal_categoria_vulnerabilidad #estado').val()
    if(
        $categoria != "" &&
        $estado != ""
    ){
        const postData = { 
            categoria:$categoria,
            estado:$estado,
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/addCategoriasVulnerabilidad",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    document.getElementById("form_categoria_vulnerabilidad").reset();
                    $('#modal_categoria_vulnerabilidad').modal('hide');
                    alerta_categoria_vulnerabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha guardado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_categoria_vulnerabilidad").DataTable().ajax.reload(null, false); 
                   
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.msg.categoria
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

$('#table_categoria_vulnerabilidad tbody').on( 'click', 'editCategoria', function(event){
    
    $('#modal_categoria_vulnerabilidad #title_categoria_vulnerabilidad').html('Modificar Categoría de Vulnerabilidad')
    document.getElementById("form_categoria_vulnerabilidad").reset();
    document.getElementById("add_categoria_vulnerabilidad").style.display = "none";
    document.getElementById("update_categoria_vulnerabilidad").style.display = "block";

    var table = $('#table_categoria_vulnerabilidad').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if(regNum == '0'){

    }else{
        document.getElementById("id_categoria_vulnerabilidad").value=event.currentTarget.getAttribute('data-id');
        $('#modal_categoria_vulnerabilidad #categoria').val(regDat[0]['categoria'])
        $('#modal_categoria_vulnerabilidad #estado').val(regDat['0']['estado'])
        $("#modal_categoria_vulnerabilidad").modal("show");
    }

});

$('#table_categoria_vulnerabilidad tbody').on( 'click', 'deleteCategoria', function(event){

    //recuperando los datos
    let id = event.currentTarget.getAttribute('data-id')
    Swal.fire({
        title: 'Desea eliminar la categoría de vulnerabilidad?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "post",
                url: BASE_URL+"/main/deleteCategoriasVulnerabilidad/"+Number(id),
                dataType: "JSON"
            })
            .done(function(respuesta) {
                // //console.log(respuesta);
                if (!respuesta) 
                {
                    alerta_categoria_vulnerabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Eliminado correctamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_categoria_vulnerabilidad").DataTable().ajax.reload(null, false); 
                   
                }else {
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

document.getElementById("update_categoria_vulnerabilidad").addEventListener("click", function(){
    $categoria=$('#modal_categoria_vulnerabilidad #categoria').val()
    $estado=$('#modal_categoria_vulnerabilidad #estado').val()
    const id = Number(document.getElementById("id_categoria_vulnerabilidad").value)
    if(
        $categoria != "" &&
        $estado != "" 
    ){
        const postData = {
            categoria:$categoria,
            estado:$estado
        };
        try {
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateCategoriasVulnerabilidad/"+id,
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (!respuesta.error) 
                {
                    document.getElementById("form_categoria_vulnerabilidad").reset();
                    $('#modal_categoria_vulnerabilidad').modal('hide');
                    alerta_categoria_vulnerabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Se ha modificado exitosamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
                    $("#table_categoria_vulnerabilidad").DataTable().ajax.reload(null, false); 
                   
                }  else{
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