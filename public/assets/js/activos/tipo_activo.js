var alerta_tipo_activo = document.getElementById("alert_tipo_activo");
function LoadTableTipo_activo($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_tipo_activo')){
        
        $('#table_tipo_activo').DataTable().rows().remove();
        $('#table_tipo_activo').DataTable().destroy();
    
    }

    $('#table_tipo_activo').DataTable({
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
        pageLength:10,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/activo/getTipoActivo",
        aoColumns: [
            { "data": "id" },
            { "data": "tipo" },
            { "data": "estado",
                        
            "mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }
            },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editTipo_activo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editTipo_activo>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteTipo_activo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteTipo_activo>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editTipo_activo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editTipo_activo>"+
//             "<deleteTipo_activo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteTipo_activo>"

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
            $( 'table_tipo_activo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

//validamos
async function validacionTipoActivo(dato){

    let result; /* Variable Resultado de Funcion */

    // Validar existe
        try {

            const postData = {           
                tipo:dato,
            };

            await $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/validarTipoActivo",
                data: postData,
                dataType: "JSON"
            })
            .done(function(respuesta) {
               
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


document.getElementById("btnAgregar_Tipo_activo").addEventListener("click",function(){
                                
    $("#modal_tipo_activo").modal("show");
    document.getElementById("title-tipo_activo").innerHTML = "Agregar tipo de activo";
    document.getElementById("form_tipo_activo").reset();
    document.getElementById("Agregar_tipo_activo").style.display = "block";
    document.getElementById("Modificar_tipo_activo").style.display = "none";
});

            // boton de agregar Tipo Activo
document.getElementById("Agregar_tipo_activo").addEventListener("click",async function(){
    $nom_tip=document.getElementById("nom_tipo").value;

    $est_tip=document.getElementById("est_tipo").value;
    
    if($nom_tip !=""  && $est_tip != ""){
       
        // if (!(await validacionTipoActivo($nom_tip))){
           
                const postData = { 
                    tipo:$nom_tip,
                    estado:$est_tip,
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/addTipoActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        console.log(respuesta);
                        // if (respuesta) 
                        // {
                        //     document.getElementById("form_tipo_activo").reset();
                        //     $('#modal_tipo_activo').modal('hide');
                        //     alerta_tipo_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        //     'Tipo Activo Registrado correctamente'+
                        //     '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        //         '<span aria-hidden="true">&times;</span>'+
                        //         '</button>'+
                        //     '</div>';
                        //     $("#table_tipo_activo").DataTable().ajax.reload(null, false); 
                           
                        // } 
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_tipo_activo").reset();
                            $('#modal_tipo_activo').modal('hide');
                            alerta_tipo_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_tipo_activo").DataTable().ajax.reload(null, false); 
                           
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
        //                  text: 'El tipo de activo ya se encuentra registrado'
        //                })
        // }
           
       
    }else{
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   


});

                //editar Tipo de activo
$('#table_tipo_activo tbody').on( 'click', 'editTipo_activo', function(){
    $("#modal_tipo_activo").modal("show");
    document.getElementById("title-tipo_activo").innerHTML = "Modificar Tipo de Activo";
    document.getElementById("form_tipo_activo").reset();
    document.getElementById("Agregar_tipo_activo").style.display = "none";
    document.getElementById("Modificar_tipo_activo").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_tipo_activo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_tipo_activo").value=regDat[0]["id"];
        document.getElementById("nom_tipo").value=regDat[0]["tipo"];
        document.getElementById("est_tipo").value=regDat[0]["estado"];
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_tipo_activo").addEventListener("click", function(){
    
    $nom_tip=document.getElementById("nom_tipo").value;

    $est_tip=document.getElementById("est_tipo").value;
   
    if($nom_tip !="" && $est_tip != ""){
       
                const postData = { 
                    id:document.getElementById("id_tipo_activo").value,
                    tipo:$nom_tip,
                    estado:$est_tip,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/updateTipoActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (!respuesta.error) 
                        {
                            document.getElementById("form_tipo_activo").reset();
                            $('#modal_tipo_activo').modal('hide');
                            alerta_tipo_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_tipo_activo").DataTable().ajax.reload(null, false); 
                           
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
        //                  text: 'El tipo de activo ya se encuentra registrado'
        //                })
        // }
           
       
    }else{
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
   


});

//eliminar tipo_activo
$('#table_tipo_activo tbody').on( 'click', 'deleteTipo_activo', function(){
     
    //recuperando los datos
    
    var table = $('#table_tipo_activo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/deleteTipoActivo",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
            
            if (!respuesta) 
            {
                
                alerta_tipo_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                'Eliminado correctamente'+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_tipo_activo").DataTable().ajax.reload(null, true); 
               
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
});
