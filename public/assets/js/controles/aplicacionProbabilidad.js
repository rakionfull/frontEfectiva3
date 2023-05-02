var alerta_AplicacionProbabilidad = document.getElementById("alerta_AplicacionProbabilidad");
var escenario =  $('#escenario').val();
// console.log(escenario);
function CargarDisenioProbabilidad() {
    
    
    //cargando las calificaicon de disneio
    $.ajax({
        method: "GET",
        //url: $('#base_url').val()+"/main/getDisenioCalificacion",
        url: $('#base_url').val()+"/main/getCalificacionTotal",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       
      
        if (respuesta.data != 0) 
        {
            let datos = respuesta;
          

            $("#disenio_proba").empty();
            $("#disenio_proba").append('<option value="" selected>Calificacion</option>');

           

            datos.data.forEach(dato => {
                
              
                   // $("#disenio_proba").append('<option value='+dato["id"]+'>'+dato["caracteristica"]+'</option>');

                    $("#disenio_proba").append('<option value='+dato["id"]+'>'+dato["calificacion"]+'</option>');

                
             
            });
        } 
        else
        {  }
    
    })
    .fail(function(error) {
        // alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });

    

   
}

function LoadTableAplicacionProbabilidad($update,$delete) {
    if(escenario == ""){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay un escenario establecido'
          })
    }else{

    
        if ($.fn.DataTable.isDataTable('#table_AplicacionProbabilidad')){
            
            $('#table_AplicacionProbabilidad').DataTable().rows().remove();
            $('#table_AplicacionProbabilidad').DataTable().destroy();
        
        }

        $('#table_AplicacionProbabilidad').DataTable({
            
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
            ajax: $('#base_url').val()+"/main/getAplicacionProbabilidad",
            aoColumns: [
                { "data": "id" },
                { "data": "idclasificacion" },
                { "data": "disenio" },
                { "data": "posicion" },
                { "data": "descripcion" },
                {
                    data:null,
                    "mRender":function(data){
                        $cadena = "";
                        if ($update == '1'){
                            $cadena =   $cadena +  `<editAplicacionProbabilidad data-id="${data.id}" class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAplicacionProbabilidad>`;
                        
                        } 
                        if ($delete == '1') {
                            $cadena =     $cadena +  `<deleteAplicacionProbabilidad data-id="${data.id}" class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAplicacionProbabilidad>`
                        }
                        if ($update == '0' && $delete==0){
                            return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                        }
                        return $cadena;
                            
                    }
                },
    //             { "defaultContent": "<editAplicacionProbabilidad class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAplicacionProbabilidad>"+
    //             "<deleteAplicacionProbabilidad class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAplicacionProbabilidad>"

    // },
            ],
            columnDefs: [
                {
                    "targets": [0,1 ],
                    "visible": false,
                    "searchable": false
                },
                
            ],
            'drawCallback': function () {
                $( 'table_AplicacionProbabilidad tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
            }
            
        })
        $("#table_AplicacionProbabilidad").DataTable().ajax.reload(null, true); 
    }
}

document.getElementById("btnAgregar_AplicacionProbabilidad").addEventListener("click",function(){
    if(escenario == ""){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay un escenario establecido'
          })
    }else{
        $("#modal_AplicacionProbabilidad").modal("show");
        document.getElementById("title-AplicacionProbabilidad").innerHTML = "Agregar Aplicación de la Probabilidad";
        document.getElementById("form_AplicacionProbabilidad").reset();
        document.getElementById("Agregar_AplicacionProbabilidad").style.display = "block";
        document.getElementById("Modificar_AplicacionProbabilidad").style.display = "none";
        if(escenario == 1){
            document.getElementById("apart_porcentaje_proba").style.display = "block";
        }else{
            document.getElementById("apart_posicion_proba").style.display = "block";
        }
    }

  
});



// // boton de agregar evlauacion de control
document.getElementById("Agregar_AplicacionProbabilidad").addEventListener("click", function(){
    $escenario_proba=document.getElementById("escenario_proba").value;
    $disenio_proba=document.getElementById("disenio_proba").value;
    // $posicion_proba=document.getElementById("posicion_proba").value;
    $posicion_proba = "";
    $desc_proba=document.getElementById("desc_proba").value;
    if(escenario == 1){
        $posicion_proba=document.getElementById("porcentaje_proba").value;
    }else{
        $posicion_proba = document.getElementById("posicion_proba").value;
    }


    if($escenario_proba !=""  && $disenio_proba != "" && $posicion_proba != ""   && $desc_proba != ""){

                
                const postData = { 
                    escenario: document.getElementById("escenario_proba").value,
                    disenio:document.getElementById("disenio_proba").value,
                    posicion:  $posicion_proba,
                    descripcion: document.getElementById("desc_proba").value,
                };
                console.log(postData);
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addAplicacionProbabilidad",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     console.log(respuesta);
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_AplicacionProbabilidad").modal("hide");    
                            document.getElementById("form_AplicacionProbabilidad").reset();
                           
                            alerta_AplicacionProbabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_AplicacionProbabilidad").DataTable().ajax.reload(null, false); 
                            CargarDisenioProbabilidad();
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
                 text: 'Debe completar todos los campos'
               })
  }

});

//editar  evlauacion de control
$('#table_AplicacionProbabilidad tbody').on( 'click', 'editAplicacionProbabilidad', function(){
    $("#modal_AplicacionProbabilidad").modal("show");
    document.getElementById("title-AplicacionProbabilidad").innerHTML = "Modificar Aplicación de la Probabilidad";
    document.getElementById("form_AplicacionProbabilidad").reset();
    document.getElementById("Agregar_AplicacionProbabilidad").style.display = "none";
    document.getElementById("Modificar_AplicacionProbabilidad").style.display = "block";


    var table = $('#table_AplicacionProbabilidad').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
       
        document.getElementById("id_AplicacionProbabilidad").value=regDat[0]["id"];
        document.getElementById("disenio_proba").value=regDat[0]["idclasificacion"];
        document.getElementById("desc_proba").value=regDat[0]["descripcion"];   
        document.getElementById("posicion_proba").value=regDat[0]["posicion"];   
        document.getElementById("escenario_proba").value=regDat[0]["escenario"]; 
        if(escenario == 1){
            document.getElementById("apart_porcentaje_proba").style.display = "block";
        }else{
            document.getElementById("apart_posicion_proba").style.display = "block";
        }
        if(escenario == 1){
            document.getElementById("porcentaje_proba").value = regDat[0]["posicion"];
        }else{
            document.getElementById("posicion_proba").value= regDat[0]["posicion"];
        }
    }
});
//guardando  evlauacion de control
document.getElementById("Modificar_AplicacionProbabilidad").addEventListener("click",function(){
    
    $escenario_proba=document.getElementById("escenario_proba").value;
    $disenio_proba=document.getElementById("disenio_proba").value;
    // $posicion_proba=document.getElementById("posicion_proba").value;
    $desc_proba=document.getElementById("desc_proba").value;
    if(escenario == 1){
        $posicion_proba=document.getElementById("porcentaje_proba").value;
    }else{
        $posicion_proba = document.getElementById("posicion_proba").value;
    }

    if($escenario_proba !=""  && $disenio_proba != "" && $posicion_proba != ""   && $desc_proba != ""){
      
                
                const postData = { 
                    escenario: document.getElementById("escenario_proba").value,
                    disenio:document.getElementById("disenio_proba").value,
                    posicion: $posicion_proba,
                    descripcion: document.getElementById("desc_proba").value,
                    id : document.getElementById("id_AplicacionProbabilidad").value,
                };
               
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateAplicacionProbabilidad",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                      
                      if (!respuesta.error) 
                      {
                      
                          
                          $("#modal_AplicacionProbabilidad").modal("hide");    
                          document.getElementById("form_AplicacionProbabilidad").reset();
                         
                          alerta_AplicacionProbabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                          respuesta.msg+
                          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                              '<span aria-hidden="true">&times;</span>'+
                              '</button>'+
                          '</div>';
                          $("#table_AplicacionProbabilidad").DataTable().ajax.reload(null, false); 
                          CargarDisenioProbabilidad();
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
               text: 'Debe completar todos los campos'
             })
}

});

//eliminar  evlauacion de control
$('#table_AplicacionProbabilidad tbody').on( 'click', 'deleteAplicacionProbabilidad', function(){
     
    //recuperando los datos
    var table = $('#table_AplicacionProbabilidad').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
        title: 'Desea eliminar la aplicación de la probabilidad?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/deleteAplicacionProbabilidad",
                        data: postData,
                        dataType: "JSON"
                    })

                
                    .done(function(respuesta) {
                
                        if (respuesta.msg) 
                        {
                            
                            alerta_AplicacionProbabilidad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';

                            $("#table_AplicacionProbabilidad").DataTable().ajax.reload(null, true); 
                            cargarOpciones();
                        }else{
                            alerta_AplicacionProbabilidad.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                            respuesta.error+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
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