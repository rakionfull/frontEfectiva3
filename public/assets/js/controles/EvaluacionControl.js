var alerta_EvaluacionControl = document.getElementById("alerta_EvaluacionControl");

function CargarDisenioOperatividad() {
    
    
    //cargando las calificaicon de disneio
    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/main/getDisenioCalificacion",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       

        if (respuesta) 
        {
            let datos = respuesta;
          

            $("#disenio_eva").empty();
            $("#disenio_eva").append('<option value="" selected>Diseño</option>');

           

            datos.data.forEach(dato => {
                
              
                    $("#disenio_eva").append('<option value='+dato["id"]+'>'+dato["caracteristica"]+'</option>');

                
                
             
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

 //cargando las calificaicon de operatividad
 $.ajax({
    method: "GET",
    url: $('#base_url').val()+"/main/getOperatividadCalificacion",
    dataType: "JSON"
})
.done(function(respuesta) {
   
    
    if (respuesta) 
    {
        let datos = respuesta;
      

        $("#operatividad_eva").empty();
        $("#operatividad_eva").append('<option value="" selected>Operatividad</option>');

       

        datos.data.forEach(dato => {
            
          
                $("#operatividad_eva").append('<option value='+dato["id"]+'>'+dato["caracteristica"]+'</option>');

            
            
         
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

function cargarOpcionesCalificacion($id) {
    $opcion = $id.split('_');
    let Opciones = "";
    //cargando las calificaicon de operatividad
    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/main/getCalificacionOpcion/"+$opcion[1],
        dataType: "JSON"
    })
    .done(function(respuesta) {
        // $('#'+$id).append("");
        Opciones = respuesta.data;
        if (respuesta) 
        {
           
          
               
                    Opciones.forEach(element2 => {
                       
                             $('#'+$id).append('<option value="'+element2.id+'">'+element2.caracteristica+'</option>');
                               
                           
                        
                           
                       
                    });
            
           
           

        }

    })
    .fail(function(error) {
        // alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });

}
function CargarEvaluacion() {
    var contenedor = document.getElementById('contenedor_calificacion');
    let SubMenu =  "";
    
    //traer los datosde calificacion
    //cargando las calificaicon de disneio
    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/main/getCalificacionSubMenu",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       
        // //console.log('sub')
        // //console.log(respuesta);
        if (respuesta) 
        {
        SubMenu  = respuesta.data;
        contenedor.innerHTML = "";
        SubMenu.forEach(element1 => {
            contenedor.innerHTML += '<div class="col-lg-6"><div class="form-group">'+
            '<select name="" id="calificacion_'+element1.id+'" class="form-control form-control-sm califica">'+
            '<option value="">'+element1.caracteristica+'</option>'+
           '</select></div></div> ';
        });
        $data = document.querySelectorAll(".califica");
            $data.forEach((btn,i) => {  
                // //console.log(btn.id);
                cargarOpcionesCalificacion(btn.id);
            });
        } 

       
    
    })
    .fail(function(error) {
        // alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });

    
    



}
function cargarDatosEvaluacionControl($dato) {
    // //console.log($dato);
    
    //traer los datosde calificacion
    //cargando las calificaicon de disneio
    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/main/getDetalleEvaluacionControl/"+$dato,
        dataType: "JSON"
    })
    .done(function(respuesta) {
       
       //console.log(respuesta);
       //dano value a los combox
       $data = document.querySelectorAll(".califica");
       
       $data.forEach((btn,i) => {  
        $opcion = btn.id.split('_');
        respuesta.data.forEach(element => {
            if(element.idOpcion == $opcion[1]){
                document.getElementById(btn.id).value = element.ID_CC; 
            }
        });
        //    //console.log(btn.id);
         
       });
   
       
       
    
    })
    .fail(function(error) {
        // alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });

    
    



}

//cargar Diseño
function CargarDisenioEvaluacion($dato) {
    
    
    //cargando las calificaicon de disneio
    $.ajax({
        method: "GET",
        url: $('#base_url').val()+"/main/getDisenioCalificacion",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       

        if (respuesta.data  != 0) 
        {
            let datos = respuesta;
          

            $("#cali_eva").empty();
            $("#cali_eva").append('<option value="" selected>Calificación</option>');

           

            datos.data.forEach(dato => {
                
              if($dato == dato["caracteristica"] ){
                $("#cali_eva").append('<option value='+dato["id"]+' selected>'+dato["caracteristica"]+'</option>');

              }else{
                $("#cali_eva").append('<option value='+dato["id"]+'>'+dato["caracteristica"]+'</option>');

                
              }
                   
                
             
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



function LoadTableEvaluacionControl($update,$delete) {
    //traer datos de la bd cabeceras y agregarlos

    $array_data = [];
    try {

        $.ajax({
            method: "GET",
            url: $('#base_url').val()+"/main/getEvaluacionControl",
            dataType: "JSON"
        })
        .done(function(respuesta) {
            
             header = respuesta.header;
            //  //console.log(header);
          
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
                        $cadena =   $cadena +  "<editEvaluacionControl class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editEvaluacionControl>";
                   
                    } 
                    if ($delete == '1') {
                        $cadena =     $cadena +  "<deleteEvaluacionControl class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteEvaluacionControl>";
                  
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
            // cabeceras.innerHTML += "<th>"+header[0].id+"</th>"+
            //                         "<th>"+header[1].IEC+"</th>";
            
           
            if ($.fn.DataTable.isDataTable('#table_EvaluacionControl')){
            
                $('#table_EvaluacionControl').DataTable().rows().remove();
                $('#table_EvaluacionControl').DataTable().destroy();
            
            }
    
            $('#table_EvaluacionControl').DataTable({
                
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
                        "targets": [0,1,2],
                        "visible": false,
                        "searchable": false,
                        // "width": "20%",
                      
                    },
                    
                ],
                'drawCallback': function () {
                    $( 'table_EvaluacionControl tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
                }
                
            })
       
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

document.getElementById("btnAgregar_EvaluacionControl").addEventListener("click",function(){

    $("#modal_EvaluacionControl").modal("show");
    document.getElementById("title-EvaluacionControl").innerHTML = "Agregar evaluación de control";
    document.getElementById("form_EvaluacionControl").reset();
    document.getElementById("Agregar_EvaluacionControl").style.display = "block";
    document.getElementById("Modificar_EvaluacionControl").style.display = "none";
   
});



// // boton de agregar evlauacion de control
document.getElementById("Agregar_EvaluacionControl").addEventListener("click", function(){
    // $disenio_eva=document.getElementById("disenio_eva").value;
    // $operatividad_eva=document.getElementById("operatividad_eva").value;
    $cali_eva=document.getElementById("cali_eva").value;
    $data = document.querySelectorAll(".califica");
    $arrayDatos = [];
    $validado = 1;
    $data.forEach((btn,i) => {   
        if(btn.value != ""){
            $arrayDatos.push(btn.value);
        }else{
            $validado = 0;
        }
       
        
    });
    //validar primero lo agregado
    if($validado == 1){
        if($cali_eva != "" ){
    
                
            const postData = { 
               
                valores:$arrayDatos,
                calificacion:$('select[name="cali_eva"] option:selected').text()
                //calificacion : document.getElementById("cali_eva").value,
            };
         ////console.log(postData);
            try {

                $.ajax({
                    method: "POST",
                    url: $('#base_url').val()+"/main/addEvaluacionControl",
                    data: postData,
                    dataType: "JSON"
                })
                .done(function(respuesta) {
                 ////console.log(respuesta);
                    if (respuesta.error==1) 
                    {
                    
                        
                        $("#modal_EvaluacionControl").modal("hide");    
                        document.getElementById("form_EvaluacionControl").reset();
                       
                        alerta_EvaluacionControl.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        respuesta.msg+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>';
                        // $("#table_EvaluacionControl").DataTable().ajax.reload(null, false); 
                        // location.href = $('#base_url').val()+"/controles";
                        // location.href = "#/EvaluacionControl";
                        LoadTableEvaluacionControl(update_control,delete_control);
                       // window.location.href = $('#base_url').val()+"/controles"
                    //    CargarDisenioOperatividad();
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
    }else{
        
        Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe completar todos los campos'
            })
        }
        

});

//editar  evlauacion de control
$('#table_EvaluacionControl tbody').on( 'click', 'editEvaluacionControl', function(){
    $("#modal_EvaluacionControl").modal("show");
    document.getElementById("title-EvaluacionControl").innerHTML = "Modificar evaluación de control";
    document.getElementById("form_EvaluacionControl").reset();
    document.getElementById("Agregar_EvaluacionControl").style.display = "none";
    document.getElementById("Modificar_EvaluacionControl").style.display = "block";
   
    var table = $('#table_EvaluacionControl').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        ////console.log("error");
    }else{
    //console.log(regDat[0]);
        document.getElementById("id_EvaluacionControl").value=regDat[0]['id'];
       // document.getElementById("cali_eva").value=regDat[0][2];
       CargarDisenioEvaluacion(regDat[0]['califica']);
        //$('select[name="cali_eva"] option:selected').text(regDat[0]['califica'])
        cargarDatosEvaluacionControl(regDat[0]['id']);
        
        // document.getElementById("operatividad_eva").value=regDat[0]["idOperatividad"];   
        // document.getElementById("cali_eva").value=regDat[0]["calificacion"];   
     
    }
});
//guardando  evlauacion de control
document.getElementById("Modificar_EvaluacionControl").addEventListener("click",function(){
    
    $cali_eva=document.getElementById("cali_eva").value;
    $data = document.querySelectorAll(".califica");
    $arrayDatos = [];
    $validado = 1;
    $data.forEach((btn,i) => {  
        if(btn.value != ""){ 
            $array_aux = {
                'valor' : btn.value
            };
            $arrayDatos.push(btn.value);
        }else{
            $validado = 0;
        }
    });
    // if($disenio_eva !=""  && $operatividad_eva != "" && $cali_eva != "" ){
        if($validado == 1){
            if($cali_eva != "" ){
                
                const postData = { 
                    // disenio : document.getElementById("disenio_eva").value,
                    // operatividad : document.getElementById("operatividad_eva").value,
                    valores:$arrayDatos,
                    calificacion:$('select[name="cali_eva"] option:selected').text(),
                    // calificacion : document.getElementById("cali_eva").value,
                    id : document.getElementById("id_EvaluacionControl").value,
                };
                ////console.log(postData);
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateEvaluacionControl",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        //console.log(respuesta);
                        if (!respuesta.error) 
                        {
                        
                            
                            $("#modal_EvaluacionControl").modal("hide");    
                            document.getElementById("form_EvaluacionControl").reset();
                           
                            alerta_EvaluacionControl.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            // $("#table_EvaluacionControl").DataTable().ajax.reload(null, false); 
                            // location.href = $('#base_url').val()+"/controles";
                            // location.href = "#/EvaluacionControl";
                            LoadTableEvaluacionControl(update_control,delete_control);
                           // window.location.href = $('#base_url').val()+"/controles"
                        //    CargarDisenioOperatividad();
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
        }else{
                
                Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Debe completar todos los campos'
                    })
        }
           
       
//     }else{
        
//         Swal.fire({
//                  icon: 'error',
//                  title: 'Error',
//                  text: 'Debe completar todos los campos'
//                })
//   }

});

//eliminar  evlauacion de control
$('#table_EvaluacionControl tbody').on( 'click', 'deleteEvaluacionControl', function(){
     
    //recuperando los datos
    var table = $('#table_EvaluacionControl').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    //console.log(regDat);
    const postData = { 
        // id:regDat[0]["id"],
        id:regDat[0]['id']
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteEvaluacionControl",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
            
            if (!respuesta) 
            {
                
                alerta_EvaluacionControl.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                'Eliminado correctamente'+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                // $("#table_EvaluacionControl").DataTable().ajax.reload(null, true); 
                //cargarOpciones();
                // location.href = "#/EvaluacionControl";
                LoadTableEvaluacionControl(update_control,delete_control);
                //window.location.href = $('#base_url').val()+"/controles"
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