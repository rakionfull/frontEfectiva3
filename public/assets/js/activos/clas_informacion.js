var alerta_clas_informacion = document.getElementById("alert_clas_informacion");

//validamos
async function validacionClasificacion_Info(){

    let result; /* Variable Resultado de Funcion */

    // Validar existe
        try {

            const postData = {           
                clasificacion:document.getElementById("nom_informacion").value,
                
            };

            await $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/validarClasInfo",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
               console.log(respuesta);
                result = respuesta;
            })
            .fail(function(error) {
                // alert("Se produjo el siguiente error: ".err);
            })
            .always(function() {
            });
        }
        catch(err) {
            // alert("Se produjo el siguiente error: ".err);
        }
    // /.Validar existe

    return result; /* Retorno de Resultado */

};

function LoadTableClasificacion_informacion($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_clas_informacion')){
        
        $('#table_clas_informacion').DataTable().rows().remove();
        $('#table_clas_informacion').DataTable().destroy();
    
    }

    $('#table_clas_informacion').DataTable({
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
        scrollX: true,
        fixedColumns:   {
            heightMatch: 'none'
        },
        responsive: false,
        autoWidth: false,

        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:5,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/activo/getClasInformacion",
        aoColumns: [
            { "data": "id" },
            { "data": "clasificacion" },
            { "data": "descripcion" },
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
                    $cadena =   $cadena +  "<editClas_informacion class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editClas_informacion>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteClas_informacion class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteClas_informacion>";
              
                }  
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editClas_informacion class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editClas_informacion>"+
//             "<deleteClas_informacion class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteClas_informacion>"

// },
        ],
        columnDefs: [
            {
                 "targets": [ 0 ],
                "visible": false,
                "searchable": true
            },
            
        ],
        'drawCallback': function () {
            $( 'table_clas_informacion tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

document.getElementById("btnAgregar_Clas_informacion").addEventListener("click",function(){
                                
    $("#modal_clas_informacion").modal("show");
    document.getElementById("title-clas_informacion").innerHTML = "Agregar Clasificación de la información";
    document.getElementById("form_clas_informacion").reset();
    document.getElementById("Agregar_clas_informacion").style.display = "block";
    document.getElementById("Modificar_clas_informacion").style.display = "none";
});

// // boton de agregar Clasificacion de la informacion
document.getElementById("Agregar_clas_informacion").addEventListener("click",async function(){
    $nom_clasificacion=document.getElementById("nom_clasificacion").value;
    $descripcion_clasificacion=document.getElementById("descripcion_clasificacion").value;
    $est_clas_informacion=document.getElementById("est_clas_informacion").value;

    if($nom_clasificacion !=""  && $descripcion_clasificacion != "" && $est_clas_informacion != ""){
   
        // if (!(await validacionClasificacion_Info())){
                const postData = { 
                    clasificacion:$nom_clasificacion,
                    descripcion:$descripcion_clasificacion,
                    estado:$est_clas_informacion,
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/addClasInformacion",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                       
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_clas_informacion").reset();
                            $('#modal_clas_informacion').modal('hide');
                            alerta_clas_informacion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_clas_informacion").DataTable().ajax.reload(null, false); 
                           
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
        // }else{
            
        //         Swal.fire({
        //                  icon: 'error',
        //                  title: 'Error',
        //                  text: 'La clasificación de la Información ya se encuentra registrado'
        //                })
        // }
           
       
    }else{
        console.log("aqui");
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   


});
//editar clasificacion informacion
$('#table_clas_informacion tbody').on( 'click', 'editClas_informacion', function(){
    $("#modal_clas_informacion").modal("show");
    document.getElementById("title-clas_informacion").innerHTML = "Modificar Clasificación de la información";
    document.getElementById("form_clas_informacion").reset();
    document.getElementById("Agregar_clas_informacion").style.display = "none";
    document.getElementById("Modificar_clas_informacion").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_clas_informacion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{        
        document.getElementById("id_clas").value=regDat[0]["id"];
        document.getElementById("nom_clasificacion").value=regDat[0]["clasificacion"];
        document.getElementById("descripcion_clasificacion").value=regDat[0]["descripcion"];
        document.getElementById("est_clas_informacion").value=regDat[0]["estado"];
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_clas_informacion").addEventListener("click", function(){
    
    $nom_clasificacion=document.getElementById("nom_clasificacion").value;
    $descripcion_clasificacion=document.getElementById("descripcion_clasificacion").value;
    $est_clas_informacion=document.getElementById("est_clas_informacion").value;

    
    if($nom_clasificacion !=""  && $descripcion_clasificacion != "" && $est_clas_informacion != ""){
      
                const postData = { 
                    id:document.getElementById("id_clas").value,
                    clasificacion:$nom_clasificacion,
                    descripcion:$descripcion_clasificacion,
                    estado:$est_clas_informacion,
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/updateClasInformacion",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (!respuesta.error) 
                        {
                            document.getElementById("form_clas_informacion").reset();
                            $('#modal_clas_informacion').modal('hide');
                            alerta_clas_informacion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_clas_informacion").DataTable().ajax.reload(null, false); 
                           
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
        // }else{
            
        //         Swal.fire({
        //                  icon: 'error',
        //                  title: 'Error',
        //                  text: 'La clasificación de la Información ya se encuentra registrado'
        //                })
        // }
           
       
    }else{
        console.log("aqui");
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   


});
//eliminar clasificaicon_info
$('#table_clas_informacion tbody').on( 'click', 'deleteClas_informacion', function(){
     
    //recuperando los datos
    
    var table = $('#table_clas_informacion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
        title: 'Desea eliminar la clasificación de la información?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            try {

                $.ajax({
                    method: "POST",
                    url: $('#base_url').val()+"/activo/deleteClasInfo",
                    data: postData,
                    dataType: "JSON"
                })

            
                .done(function(respuesta) {
                //  console.log(respuesta);
                    if (!respuesta.error) 
                    {
                        alerta_clas_informacion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        respuesta.msg+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>';

                        $("#table_clas_informacion").DataTable().ajax.reload(null, true); 
                    
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
            }
            catch(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            }
        } else if (result.isDenied) {
            Swal.fire('No hubo ningún cambio', '', 'info')
        }
    })
});

