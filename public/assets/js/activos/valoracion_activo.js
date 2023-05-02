var alert_valActivo = document.getElementById("alert_valActivo");

function cargarDatosValActivo(){
             //Carga los valores
        try {

            $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/getValorActivoByActivo",
                dataType: "JSON"
            })
            .done(function(respuesta) {
                if (respuesta) 
                {
                    let datos = respuesta["data"];
                    //console.log(datos);
                    $("#id_valor_val").empty();
                    $("#id_valor_val").append('<option value=>Valor</option>');
                
                    datos.forEach(dato => {
                        $("#id_valor_val").append('<option value='+dato["id"]+'>'+dato["valor"]+'</option>');
                        
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

// function LoadTableValActivo($update,$delete) {
//     if ($.fn.DataTable.isDataTable('#table_valActivo')){
        
//         $('#table_valActivo').DataTable().rows().remove();
//         $('#table_valActivo').DataTable().destroy();
    
//     }

//     $('#table_valActivo').DataTable({
//         language: {
//             "decimal": "",
//             "emptyTable": "No hay información",
//             "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
//             "infoEmpty":  "Mostrando 0 a 0 de 0 Registros",
//             "infoFiltered": "(Filtrado de _MAX_ registros)",
//             "infoPostFix": "",
//             "thousands": ",",
//             "lengthMenu": "Mostrar _MENU_ Registros",
//             "loadingRecords": "Cargando...",
//             "processing": "Procesando...",
//             "search": "Buscar:",
//             "zeroRecords": "Sin resultados encontrados",
//             "paginate": {
//                 "first": "Primero",
//                 "last": "Ultimo",
//                 "next": "Siguiente",
//                 "previous": "Anterior"
//             }
//         },
//         scrollX: true,
//         fixedColumns:   {
//             heightMatch: 'none'
//         },
//         responsive: false,
//         autoWidth: false,
//         // processing: true,
//         lengthMenu:[5,10,25,50],
//         pageLength:5,
//         clickToSelect:false,
//         ajax: $('#base_url').val()+"/activo/getValActivo",
//         aoColumns: [
//             { "data": "id_valActivo" },
//             { "data": "idaspecto1" },
//             { "data": "aspecto1" },
//             { "data": "valoracion1" },
//             { "data": "idaspecto2" },
//             { "data": "aspecto2" },
//             { "data": "valoracion2" },
//             { "data": "idaspecto3" },
//             { "data": "aspecto3" },
//             { "data": "valoracion3" },
//             { "data": "valor" },
//             { "data": "idvalor" },
//             {  "data": "id",
                        
//             "mRender": function(data, type, value) {
//                 $cadena = "";
//                 if ($update == '1'){
//                     $cadena =   $cadena +  "<editvalActivo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editvalActivo>";
               
//                 } 
//                 if ($delete == '1') {
//                     $cadena =     $cadena +  "<deletevalActivo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deletevalActivo>";
              
//                 }
//                 if ($update == '0' && $delete==0){
//                     return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
//                 }
//                 return $cadena;
                

//                 }
//             },
// //             { "defaultContent": "<editvalActivo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editvalActivo>"+
// //             "<deletevalActivo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deletevalActivo>"

// // },
//         ],
//         columnDefs: [
//             {
//                 "targets": [ 0,1,4,7,11 ],
//                 "visible": false,
//                 "searchable": false
//             },
            
//         ],
//         'drawCallback': function () {
//             $( 'table_valActivo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
//         }
        
//     })
   
// }


function LoadTableValActivo($update,$delete) {
    //traer datos de la bd cabeceras y agregarlos
    if ($.fn.DataTable.isDataTable('#table_valActivo')){
            
        $('#table_valActivo').DataTable().rows().remove();
        $('#table_valActivo').DataTable().destroy();
    
    }
    $array_data = [];
    try {

        $.ajax({
            method: "GET",
            url: $('#base_url').val()+"/activo/getValoracionActivo",
            dataType: "JSON"
        })
        .done(function(respuesta) {
         
          
            //console.log(header);
            // console.log(respuesta.data);
          if(respuesta.header){
            header = respuesta.header;
            var cabeceras = document.getElementById("cabeceras_control");
            cabeceras.innerHTML = "";
            header.forEach(element => {
              
                cabeceras.innerHTML += "<th>"+element+"</th>";
               $array_aux= {
                    
                     data: element 
                    }
                $array_data.push($array_aux);
            });
         
            cabeceras.innerHTML += "<th>Mantenimiento</th>";
                $array_aux= {
                "data": "id",
                        
                "mRender": function(data, type, value) {
                    $cadena = "";
                    if ($update == '1'){
                        $cadena =   $cadena +  "<editvalActivo class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editvalActivo>";
                   
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  "<deletevalActivo class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deletevalActivo>";
                  
                    }
                    if ($update == '0' && $delete==0){
                        return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                    }
                    return $cadena;
                    
    
                    }
                
                // defaultContent: 
                // "<editEvaluacionControl class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editEvaluacionControl>"+
                // "<deleteEvaluacionControl class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteEvaluacionControl>"
       
               }
            $array_data.push($array_aux);
          
            
           
    
            $('#table_valActivo').DataTable({
                
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
                fixedHeader: true,
                fixedColumns:  true,
                responsive: false,
                autoWidth: false,
                // processing: true,
                lengthMenu:[5,10,25,50],
                pageLength:10,
                clickToSelect:false,
                // ajax: $('#base_url').val()+"/main/getEvaluacionControl",
                data:
                
                    respuesta.data
                
              
                        ,
                 columns: $array_data
              
                         ,
                columnDefs: [
                    {
                        "targets": [0,1,3],
                        "visible": false,
                        "searchable": false,
                        // "width": "20%",
                      
                    },
                    
                ],
                "order": [[ 2, 'asc' ]],
                'drawCallback': function () {
                    $( 'table_valActivo tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
                }
                
            })
            
          }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar la tabla, ya que no existen datos registrados. Es necesario agregar datos.'
            })
          }
           
       
        })
        .fail(function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al traer los datos, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        })
        .always(function() {
        });
    }
    catch(err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al traer los datos, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
        })
    }


       
}
function CargarValuesValoracion($dato) {

    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/activo/getDetalleEvaluacionActivo/"+$dato,
        dataType: "JSON"
    })
    .done(function(respuesta) {
       
   
       //dano value a los combox
       data = document.querySelectorAll(".valoracion");
       
       data.forEach((btn,i) => {  
        // $opcion = btn.id.split('_');
        respuesta.data.forEach(element => {
            if(element.idaspectos_seguridad == btn.id){
                document.getElementById(btn.id).value = element.valoracion; 
            }
        });
        //    console.log(btn.id);
         
       });
    })
}


function cargarDatosAspectosSeguridad() {
    // console.log($dato);
    
    //traer los datos de los aspectos e seguridad
    
    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/activo/getAspectoSeguridad",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       
         $contenedor_aspecto = document.getElementById('contenedor_aspecto');
        $contenedor_aspecto.innerHTML = "";
         if(respuesta){
         respuesta.data.forEach(element => {
              $contenedor_aspecto.innerHTML += '<div class="col-lg-12">'+
              '<div class="form-group row">'+
                    '<div class="col-sm-2">'+
                        '<span>'+element.aspecto+'</span>'+
                    '</div>'+
                    ' <div class="col-sm-10">'+
                        '<input maxlength="150" type="text" placeholder="valoración de '+element.aspecto+'" class="form-control form-control-sm valoracion" id="'+element.id+'" >'+
                    '</div>'+
             '</div>'+
              
          '</div>';
         });
         }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al traer los datos, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
         }
       //});
   
        // if (respuesta) 
        // {
        // SubMenu  = respuesta.data;
        // SubMenu.forEach(element1 => {
        //     contenedor.innerHTML += '<div class="col-lg-6"><div class="form-group">'+
        //     '<select name="" id="calificacion_'+element1.id+'" class="form-control form-control-sm califica">'+
        //     '<option value="">'+element1.caracteristica+'</option>'+
        //    '</select></div></div> ';
        // });
        // $data = document.querySelectorAll(".califica");
        //     $data.forEach((btn,i) => {  
        //         console.log(btn.id);
        //         cargarOpcionesCalificacion(btn.id);
        //     });
        // } 

       
    
    })
    .fail(function(error) {
        // alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });

    
    



}

document.getElementById("btnAgregar_valActivo").addEventListener("click",function(){
                                
    $("#modal_valActivo").modal("show");
    document.getElementById("title-valActivo").innerHTML = "Agregar Valoración de Activo";
    document.getElementById("form_valActivo").reset();
    document.getElementById("Agregar_valActivo").style.display = "block";
    document.getElementById("Modificar_valActivo").style.display = "none";
   
});


// // boton de agregar Valoracion de activo
document.getElementById("Agregar_valActivo").addEventListener("click",async function(){
    // $id_aspecto1=document.getElementById("id_aspecto1").value;
    // $id_aspecto2=document.getElementById("id_aspecto2").value;
    // $id_aspecto3=document.getElementById("id_aspecto3").value;
    // $nom_val1=document.getElementById("nom_val1").value;
    // $nom_val2=document.getElementById("nom_val2").value;
    // $nom_val3=document.getElementById("nom_val3").value;
    // $id_valor_val=document.getElementById("id_valor_val").value;
    
    //if($id_aspecto1 !=""  && $id_aspecto2 != "" && $id_aspecto3 !=""  && $nom_val1 != "" && $nom_val2 !=""  && $nom_val3 != "" && $id_valor_val !="" ){
        // if (!(await validacionValActivo())){

    $data = document.querySelectorAll('.valoracion');
    const array_aux=[];
    $data.forEach(element => {
        
        $array = {
            idaspecto:element.id,
            valoracion:element.value,
        };
        array_aux.push($array);
    });
   // console.log(array_aux);
                const postData = { 
                    // id_aspecto1:document.getElementById("id_aspecto1").value,
                    // id_aspecto2:document.getElementById("id_aspecto2").value,
                    // id_aspecto3:document.getElementById("id_aspecto3").value,
                    // nom_val1:document.getElementById("nom_val1").value,
                    // nom_val2:document.getElementById("nom_val2").value,
                    // nom_val3:document.getElementById("nom_val3").value,
                    valores : array_aux,
                    id_valor_val:document.getElementById("id_valor_val").value,
                    
                    
                };
                console.log(postData);
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/addValActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        console.log(respuesta);
                      
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_valActivo").reset();
                            $('#modal_valActivo').modal('hide');
                            alert_valActivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                           // $("#table_valActivo").DataTable().ajax.reload(null, false); 
                           LoadTableValActivo(update_valoracion,delete_valoracion);
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
       
//     }else{
        
//         Swal.fire({
//                  icon: 'error',
//                  title: 'Error',
//                  text: 'Faltan Datos'
//                })
//   }

});

//editar valoracion activo
$('#table_valActivo tbody').on( 'click', 'editvalActivo', function(){
    $("#modal_valActivo").modal("show");
    document.getElementById("title-valActivo").innerHTML = "Modificar Valoración de Activo";
    document.getElementById("form_valActivo").reset();
    document.getElementById("Agregar_valActivo").style.display = "none";
    document.getElementById("Modificar_valActivo").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_valActivo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
       
    
        document.getElementById("id_valor_val").value=regDat[0]["valor_activo"];
        document.getElementById("id_valActivo").value=regDat[0]["id_val"];
        CargarValuesValoracion(regDat[0]["id_val"]);
    }
});

//guardando la nueva info
document.getElementById("Modificar_valActivo").addEventListener("click", function(){
    
    // $id_aspecto1=document.getElementById("id_aspecto1").value;
    // $id_aspecto2=document.getElementById("id_aspecto2").value;
    // $id_aspecto3=document.getElementById("id_aspecto3").value;
    // $nom_val1=document.getElementById("nom_val1").value;
    // $nom_val2=document.getElementById("nom_val2").value;
    // $nom_val3=document.getElementById("nom_val3").value;
    // $id_valor_val=document.getElementById("id_valor_val").value;
    
    //if($id_aspecto1 !=""  && $id_aspecto2 != "" && $id_aspecto3 !=""  && $nom_val1 != "" && $nom_val2 !=""  && $nom_val3 != "" && $id_valor_val !="" ){
        $data = document.querySelectorAll('.valoracion');
        const array_aux=[];
        $data.forEach(element => {
            $array = {
                idaspecto:element.id,
                valoracion:element.value,
            };
            array_aux.push($array);
        });   
                const postData = { 
                    valores:array_aux,
                    id_valor_val:document.getElementById("id_valor_val").value,
                    id:document.getElementById("id_valActivo").value
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/updateValActivo",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       console.log(respuesta);
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_valActivo").reset();
                            $('#modal_valActivo').modal('hide');
                            alert_valActivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            //$("#table_valActivo").DataTable().ajax.reload(null, false); 
                            LoadTableValActivo(update_valoracion,delete_valoracion);
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
        //     }else{
        //         Swal.fire({
        //                  icon: 'error',
        //                  title: 'Error',
        //                  text: 'La Valoracion de activo ya se encuentra registrado'
        //                })
        //   }
           
       
//     }else{
        
//         Swal.fire({
//                  icon: 'error',
//                  title: 'Error',
//                  text: 'Faltan Datos'
//                })
//   }

});

//eliminar valoracion de activo
$('#table_valActivo tbody').on( 'click', 'deletevalActivo', function(){
     
    //recuperando los datos
    
    var table = $('#table_valActivo').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    console.log(regDat);
    const postData = { 
        id:regDat[0]["id_val"],
 
    };
   // console.log(postData);
   Swal.fire({
    title: 'Desea eliminar la valoración de activo?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            try {

                $.ajax({
                    method: "POST",
                    url: $('#base_url').val()+"/activo/deleteValActivo",
                    data: postData,
                    dataType: "JSON"
                })

            
                .done(function(respuesta) {
                    //  console.log(respuesta);
                    if (!respuesta.error) 
                    {
                        
                        alert_valActivo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        respuesta.msg+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>';
                        LoadTableValActivo(update_valoracion,delete_valoracion);
                        //$("#table_valActivo").DataTable().ajax.reload(null, true); 
                    
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
