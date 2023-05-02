var alerta_empresa = document.getElementById("alerta_empresa");


function LoadTableEmpresa($update,$delete) {
    console.log($delete);
    if ($.fn.DataTable.isDataTable('#table_empresa')){
        
        $('#table_empresa').DataTable().rows().remove();
        $('#table_empresa').DataTable().destroy();
    
    }

    $('#table_empresa').DataTable({
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
        responsive: true,
        autoWidth: false,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:5,
        clickToSelect:false,
        ajax: BASE_URL+"/activo/getEmpresas",
        aoColumns: [
            { "data": "id" },
            { "data": "empresa" },
            {  "data": "estado",
                        
            "mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }
            },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editEmpresa class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editEmpresa>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteEmpresa class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteEmpresa>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
//             { "defaultContent": 
//             "<editEmpresa class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editEmpresa>"+
//             "<deleteEmpresa class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteEmpresa>"

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
            $( 'table_empresa tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}
document.getElementById("btnAgregar_Empresa").addEventListener("click",function(){
                                
    $("#modal_empresa").modal("show");
    document.getElementById("title-empresa").innerHTML = "Agregar Empresa";
    document.getElementById("form_empresa").reset();
    document.getElementById("Agregar_Empresa").style.display = "block";
    document.getElementById("Modificar_Empresa").style.display = "none";
});

// // boton de agregar Empresa
document.getElementById("Agregar_Empresa").addEventListener("click",function(){
    $nom_emp=document.getElementById("nom_empresa").value;

    $est_emp=document.getElementById("est_empresa").value;
    
    if($nom_emp !=""  && $est_emp != ""){
       
                const postData = { 
                    empresa:$nom_emp,
                    estado:$est_emp,
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/addEmpresa",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       // console.log(respuesta);
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_empresa").reset();
                            $('#modal_empresa').modal('hide');
                            alerta_empresa.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_empresa").DataTable().ajax.reload(null, false); 
                           
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
                            text: 'No se pudo agregar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                        })
                    })
                    .always(function() {
                    });
                }
                catch(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo agregar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
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
//editar Empresa
$('#table_empresa tbody').on( 'click', 'editEmpresa', function(){
    $("#modal_empresa").modal("show");
    document.getElementById("title-empresa").innerHTML = "Modificar Empresa";
    document.getElementById("form_empresa").reset();
    document.getElementById("Agregar_Empresa").style.display = "none";
    document.getElementById("Modificar_Empresa").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_empresa').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_empresa").value=regDat[0]["id"];
        document.getElementById("nom_empresa").value=regDat[0]["empresa"];
        document.getElementById("est_empresa").value=regDat[0]["estado"];
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Empresa").addEventListener("click", function(){
    
    $nom_emp=document.getElementById("nom_empresa").value;

    $est_emp=document.getElementById("est_empresa").value;
    
    if($nom_emp !="" && $est_emp != ""){
       
                const postData = { 
                    id:document.getElementById("id_empresa").value,
                    empresa:$nom_emp,
                    estado:$est_emp,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/updateEmpresa",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       // console.log(respuesta);
                        if (!respuesta.error) 
                        {
                            document.getElementById("form_empresa").reset();
                            $('#modal_empresa').modal('hide');
                            alerta_empresa.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_empresa").DataTable().ajax.reload(null, false); 
                           
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
   
});
//eliminar Empresa
$('#table_empresa tbody').on( 'click', 'deleteEmpresa', function(){
     
    //recuperando los datos
    var table = $('#table_empresa').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    // try {

        // $.ajax({
        //     method: "POST",
        //     url: $('#base_url').val()+"/activo/deleteEmpresa",
        //     data: postData,
        //     dataType: "JSON"
        // })

     
        // .done(function(respuesta) {
        //     // console.log(respuesta);
        //     if (!respuesta) 
        //     {
                
        //         alerta_empresa.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
        //        'Eliminado correctamente'+
        //         '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
        //             '<span aria-hidden="true">&times;</span>'+
        //             '</button>'+
        //         '</div>';

        //         $("#table_empresa").DataTable().ajax.reload(null, true); 
               
        //     }else{
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Error',
        //             text: respuesta.msg
        //         })
        //     } 
            
        // })
        // .fail(function(error) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: 'No se pudo eliminar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
        //     })
        // })
        // .always(function() {
        // });
    // }
    // catch(err) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'No se pudo eliminar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
    //     })
    // }

    Swal.fire({
        title: 'Desea eliminar la empresa?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/deleteEmpresa",
                data: postData,
                dataType: "JSON"
            })
    
         
            .done(function(respuesta) {
                // console.log(respuesta);
                if (!respuesta) 
                {
                    
                    alerta_empresa.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                   'Eliminado correctamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';
    
                    $("#table_empresa").DataTable().ajax.reload(null, true); 
                   
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
})
    


