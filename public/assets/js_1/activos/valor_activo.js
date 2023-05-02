var alerta_valorActivo = document.getElementById("alert_valorActivo");

function LoadTableValorActivo($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_valorActivo')){
        
        $('#table_valorActivo').DataTable().rows().remove();
        $('#table_valorActivo').DataTable().destroy();
    
    }

    $('#table_valorActivo').DataTable({
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
        ajax: BASE_URL+"/activo/getValorActivo",
        aoColumns: [
            { "data": "id" },
            { "data": "valor" },
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
                    $cadena =   $cadena +  "<editValorActivo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editValorActivo>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteValorActivo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteValorActivo>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editValorActivo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editValorActivo>"+
//             "<deleteValorActivo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteValorActivo>"

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
            $( 'table_valorActivo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_valorActivo").DataTable().ajax.reload(null, true); 
}

//validamos
async function validacionValorActivo(dato){

    let result; /* Variable Resultado de Funcion */

    // Validar existe
        try {

            const postData = {           
                valor : dato
            };

            await $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/validarValorActivo",
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

document.getElementById("btnAgregar_ValorActivo").addEventListener("click",function(){

    $("#modal_valorActivo").modal("show");
    document.getElementById("title-valorActivo").innerHTML = "Agregar Valor Activo";
    document.getElementById("form_valorActivo").reset();
    document.getElementById("Agregar_valorActivo").style.display = "block";
    document.getElementById("Modificar_valorActivo").style.display = "none";
});



// // boton de agregar Valor Activo
document.getElementById("Agregar_valorActivo").addEventListener("click",async function(){
    $nom_val=document.getElementById("nom_valor").value;

    $est_val=document.getElementById("est_valor").value;
    
    if($nom_val !=""  && $est_val != ""){
        // if (!(await validacionValorActivo($nom_val))){
                
                const postData = { 
                    valor:$nom_val.trim(),
                    estado:$est_val.trim(),
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/addValorActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     console.log(respuesta);
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_valorActivo").reset();
                            $('#modal_valorActivo').modal('hide');
                            alerta_valorActivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_valorActivo").DataTable().ajax.reload(null, false); 
                           
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
        //                  text: 'El valor ya se encuentra registrado'
        //                })
        //   }
           
       
    }else{
       
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }

});

//editar Valor Activo
$('#table_valorActivo tbody').on( 'click', 'editValorActivo', function(){
    $("#modal_valorActivo").modal("show");
    document.getElementById("title-valorActivo").innerHTML = "Modificar Valor Activo";
    document.getElementById("form_valorActivo").reset();
    document.getElementById("Agregar_valorActivo").style.display = "none";
    document.getElementById("Modificar_valorActivo").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_valorActivo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_valorActivo").value=regDat[0]["id"];
        document.getElementById("nom_valor").value=regDat[0]["valor"];
        document.getElementById("est_valor").value=regDat[0]["estado"];
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_valorActivo").addEventListener("click", function(){
    
    $nom_val=document.getElementById("nom_valor").value;

    $est_val=document.getElementById("est_valor").value;
    
    if($nom_val !="" && $est_val != ""){
       
                const postData = { 
                    id:document.getElementById("id_valorActivo").value,
                    valor:$nom_val,
                    estado:$est_val,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/updateValorActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (!respuesta.error) 
                        {
                            document.getElementById("form_valorActivo").reset();
                            $('#modal_valorActivo').modal('hide');
                            alerta_valorActivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_valorActivo").DataTable().ajax.reload(null, false); 
                           
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

//eliminar Valor Activo
$('#table_valorActivo tbody').on( 'click', 'deleteValorActivo', function(){
     
    //recuperando los datos
    var table = $('#table_valorActivo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/deleteValorActivo",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
            if (!respuesta.error) 
            {
                
                alerta_valorActivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_valorActivo").DataTable().ajax.reload(null, true); 
               
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
