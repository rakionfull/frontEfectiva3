var alerta_ubi_activo = document.getElementById("alert_UbiActivo");
function inicializaContinente() {
    $("#idpais").empty();
    $("#idpais").append('<option value="" selected>Seleccione</option>');
    $("#idciudad").empty();
    $("#idciudad").append('<option value="" selected>Seleccione</option>');
   
}
function cargarDatosContinentes() {
   
    
    //Carga todas los Continentes
    try {

       $.ajax({
           method: "POST",
           url: $('#base_url').val()+"/activo/getContinente",
           dataType: "JSON"
       })
       .done(function(respuesta) {
           if (respuesta) 
           {
               let datos = respuesta["data"];
               //console.log(datos);
               $("#idcontinente").empty();
               $("#idcontinente").append('<option value=>Continente</option>');
               datos.forEach(dato => {
                   $("#idcontinente").append('<option value='+dato["ContinenteCodigo"]+'>'+dato["PaisContinente"]+'</option>');
               });
           } 
           else
           { //swal("Error", "Error al recoger los datos", "error"); }
           }
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

}
function cargarDatosPaises(continente,$dato) {
    //Carga todas los Continentes
    const postData = {           
                continente:continente,        
     };
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/getPais",
            data: postData,
            dataType: "JSON"
        })
        .done(function(respuesta) {
            if (respuesta) 
            {
                let datos = respuesta["data"];
                //console.log(datos);
                $("#idpais").empty();
                $("#idpais").append('<option value=>Pais</option>');
                datos.forEach(dato => {
                    if(dato["id"] == $dato){
                        $("#idpais").append('<option value='+dato["id"]+' selected>'+dato["paisnombre"]+'</option>');
                    }else{
                        $("#idpais").append('<option value='+dato["id"]+'>'+dato["paisnombre"]+'</option>');
                    }
                });
            } 
            else
            { //swal("Error", "Error al recoger los datos", "error"); }
            }
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
}
function cargarDatosCiudades(pais,$dato) {
    //Carga todas los Continentes
    const postData = {           
        pais:pais,        
     };
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/getCiudad",
            data: postData,
            dataType: "JSON"
        })
        .done(function(respuesta) {
            if (respuesta) 
            {
                let datos = respuesta["data"];
                //console.log(datos);
                $("#idciudad").empty();
                $("#idciudad").append('<option value=>Ciudad</option>');
                datos.forEach(dato => {
                    if(dato["id"] == $dato){
                    $("#idciudad").append('<option value='+dato["id"]+' selected>'+dato["estadonombre"]+'</option>');
                    }else{
                        $("#idciudad").append('<option value='+dato["id"]+'>'+dato["estadonombre"]+'</option>');  
                    }
                });
            } 
            else
            { //swal("Error", "Error al recoger los datos", "error"); }
            }
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
}


function LoadTableUbiActivo($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_ubi_activo')){
        
        $('#table_ubi_activo').DataTable().rows().remove();
        $('#table_ubi_activo').DataTable().destroy();
    
    }

    $('#table_ubi_activo').DataTable({
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
        pageLength:10,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/activo/getUbiActivo",
        aoColumns: [
            { "data": "id" },
            { "data": "PaisContinente" },
            { "data": "continente" },
            { "data": "paisnombre" },
            { "data": "pais" },
            { "data": "estadonombre" },
            { "data": "ciudad" },
            { "data": "direccion" },
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
                    $cadena =   $cadena +  "<editUbiActivo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editUbiActivo>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteUbiActivo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteUbiActivo>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editUbiActivo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editUbiActivo>"+
//             "<deleteUbiActivo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteUbiActivo>"

// },
        ],
        columnDefs: [
            {
                "targets": [ 0,2,4,6 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_ubi_activo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

document.getElementById("btnAgregar_UbiActivo").addEventListener("click",function(){
                                
    $("#modal_ubi_activo").modal("show");
    document.getElementById("title-ubi_activo").innerHTML = "Agregar Ubicación de Activo";
    document.getElementById("form_ubi_activo").reset();
    document.getElementById("Agregar_ubi_activo").style.display = "block";
    document.getElementById("Modificar_ubi_activo").style.display = "none";
    inicializaContinente();
});
document.getElementById("idcontinente").addEventListener("change",function(){
    if($('#idcontinente').val() != "" ){
        cargarDatosPaises($('#idcontinente').val(),"");
    }
    
});
document.getElementById("idpais").addEventListener("change",function(){
    if($('#idpais').val() != "" ){
        cargarDatosCiudades($('#idpais').val(),"");
    }
    
});
// // boton de agregar Clasificacion de la informacion
document.getElementById("Agregar_ubi_activo").addEventListener("click",async function(){
    $idcontinente=document.getElementById("idcontinente").value;
    $idpais=document.getElementById("idpais").value;
    $idciudad=document.getElementById("idciudad").value;
    $direccion_ubi=document.getElementById("direccion_ubi").value;
    $desc_ubi=document.getElementById("desc_ubi").value;
    $est_ubi_activo=document.getElementById("est_ubi_activo").value;
    
    if($idcontinente !=""  && $idpais !="" && $idciudad !=""  && $direccion_ubi !=""
    && $desc_ubi !=""  && $est_ubi_activo !=""){
       
                const postData = { 
                    idcontinente:document.getElementById("idcontinente").value,
                    idpais:document.getElementById("idpais").value,
                    idciudad:document.getElementById("idciudad").value,
                    direccion_ubi:document.getElementById("direccion_ubi").value,
                    desc_ubi:document.getElementById("desc_ubi").value,
                    est_ubi_activo:document.getElementById("est_ubi_activo").value,
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/addUbiActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        // console.log(respuesta);
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_ubi_activo").reset();
                            $('#modal_ubi_activo').modal('hide');
                            alerta_ubi_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
            
                            $("#table_ubi_activo").DataTable().ajax.reload(null, true); 
                           
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
//editar clasificacion informacion
$('#table_ubi_activo tbody').on( 'click', 'editUbiActivo', function(){
    $("#modal_ubi_activo").modal("show");
    document.getElementById("title-ubi_activo").innerHTML = "Modificar Ubicación de Activo";
    document.getElementById("form_ubi_activo").reset();
    document.getElementById("Agregar_ubi_activo").style.display = "none";
    document.getElementById("Modificar_ubi_activo").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_ubi_activo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
   
    if (regNum == '0') {
        //console.log("error");
    }else{        
        document.getElementById("id_ubi_activo").value=regDat[0]["id"];
        document.getElementById("idcontinente").value=regDat[0]["continente"];
    
        cargarDatosPaises(regDat[0]["continente"],regDat[0]["pais"]);
        cargarDatosCiudades(regDat[0]["pais"],regDat[0]["ciudad"]);
      
        document.getElementById("direccion_ubi").value=regDat[0]["direccion"];
        document.getElementById("desc_ubi").value=regDat[0]["descripcion"];
        document.getElementById("est_ubi_activo").value=regDat[0]["estado"];
    }
});
//guardando la nueva info
document.getElementById("Modificar_ubi_activo").addEventListener("click", function(){
    
    $idcontinente=document.getElementById("idcontinente").value;
    $idpais=document.getElementById("idpais").value;
    $idciudad=document.getElementById("idciudad").value;
    $direccion_ubi=document.getElementById("direccion_ubi").value;
    $desc_ubi=document.getElementById("desc_ubi").value;
    $est_ubi_activo=document.getElementById("est_ubi_activo").value;

    
    if($idcontinente !=""  && $idpais !="" && $idciudad !=""  && $direccion_ubi !=""
    && $desc_ubi !=""  && $est_ubi_activo !=""){
       
                const postData = { 
                    id:document.getElementById("id_ubi_activo").value,
                    idcontinente:document.getElementById("idcontinente").value,
                    idpais:document.getElementById("idpais").value,
                    idciudad:document.getElementById("idciudad").value,
                    direccion_ubi:document.getElementById("direccion_ubi").value,
                    desc_ubi:document.getElementById("desc_ubi").value,
                    est_ubi_activo:document.getElementById("est_ubi_activo").value,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/updateUbiActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (!respuesta.error) 
                        {
                            document.getElementById("form_ubi_activo").reset();
                            $('#modal_ubi_activo').modal('hide');
                            alerta_ubi_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
            
                            $("#table_ubi_activo").DataTable().ajax.reload(null, true); 
                           
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


//eliminar ubicacion de activo
$('#table_ubi_activo tbody').on( 'click', 'deleteUbiActivo', function(){
     
    //recuperando los datos
    
    var table = $('#table_ubi_activo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
        title: 'Desea eliminar la ubicación de activo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/deleteUbiActivo",
                        data: postData,
                        dataType: "JSON"
                    })

                
                    .done(function(respuesta) {
                    //  console.log(respuesta);
                        if (!respuesta.error) 
                        {
                            
                            alerta_ubi_activo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';

                            $("#table_ubi_activo").DataTable().ajax.reload(null, true); 

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

