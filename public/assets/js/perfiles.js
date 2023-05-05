
var alerta = document.getElementById("alert_perfil");
async function validacionPerfil(dato){

    let result; /* Variable Resultado de Funcion */

    // Validar existe
        try {

            const postData = {           
                perfil : dato
            };

            await $.ajax({
                method: "POST",
                url: BASE_URL+"/main/validarPerfil",
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

// function LoadPerfiles($est){
  
//     if ($.fn.DataTable.isDataTable('#table_perfiles')){
//         alerta.innerHTML = "";
//         $('#table_perfiles').DataTable().rows().remove();
//         $('#table_perfiles').DataTable().destroy();
    
//     }

//     var table = $('#table_perfiles').DataTable({
//         language: {
//             "decimal": "",
//             "emptyTable": "No hay información",
//             "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
//             "infoEmpty":  "Mostrando 0 a 0 de 0 Registros",
//             "infoFiltered": "(Filtrado de _MAX_ registros)",
//             "infoPostFix": "",
//             "thousands": ",",
//             "lengthMenu": "Mostrar _MENU_ Registro",
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
//         // scrollY: true,
//         // fixedColumns:   {
//         //     heightMatch: 'none'
//         // },
//          scrollY: true,
//         fixedColumns:   {
//             heightMatch: 'none'
//         },
//         responsive: false,
//         autoWidth: false,
//         // processing: true,
//         lengthMenu:[5,10,25,50],
//         pageLength:5,
//         clickToSelect:false,
//         ajax: $('#base_url').val()+"/main/getPerfiles/"+$est,
//         aoColumns: [
//             { "data": "id_perfil" },
//             { "data": "is_user_negocio" },
    
//             { "data": "perfil" },
//             { "data": "desc_perfil" },
    
//             {  "data": "est_perfil",
                        
//                         "mRender": function(data, type, value) {
//                             if (data == '1') return  'Activo';
//                             else return 'Inactivo'
                              
    
//                         }
//                     },
//             {  "data": "id_perfil",
//                     "bSortable": false,
//                     "mRender": function(data, type, value) {
//                        $cadena =  "";
//                         if(modificar == 1){
//                             $cadena = $cadena + "<editPerfil class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editPerfil>";
//                         }
//                         if(eliminar == 1){
//                             $cadena = $cadena + "<a href='"+ $('#base_url').val() + "/main/deletePerfil/"+ data +"' class='btn btn-opcionTabla text-danger' data-toggle='tooltip' data-placement='top' title='' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></a>";
//                         }
//                         if(crear == 1){
//                             $cadena = $cadena + "<a href='"+ $('#base_url').val() + "/main/detPerfil/"+ data +"' class='btn btn-opcionTabla text-danger' data-toggle='tooltip' data-placement='top' title='' data-original-title='Detalle'><i class='fas fa-user-edit font-size-18'></i></a>";
//                         }
//                         if(crear == 0 && modificar==0 && eliminar ==0){
//                              return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene Permisos'></i>";
                       
//                         }
                       
//                         return $cadena;
                 
                          

//                     }
//                 },

            
//         ],
//         buttons : [           
//             {
//                 extend: 'selectAll',
//                 text: "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-check-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z'/></svg>",
//                 className: 'botDatTab',
//             },

//             { extend: 'pageLength', className: 'botDatTab', },

//             {
//                 extend: 'selectNone',
//                 text: "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-x-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>", 
//                 className: 'botDatTab',
//             },
            
          
//         ],
//         columnDefs: [
//             {
//                 "targets": [ 0,1 ],
//                 "visible": false,
//                 "searchable": false
//             },
            
//         ],
//         'drawCallback': function () {
//             $( 'table_perfiles tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
//         }
        
//     });
//     $("#table_perfiles").DataTable().ajax.reload(null, false); 
// }
function LoadPerfiles(){
  
    if ($.fn.DataTable.isDataTable('#table_perfiles')){
        alerta.innerHTML = "";
        $('#table_perfiles').DataTable().rows().remove();
        $('#table_perfiles').DataTable().destroy();
    
    }

    var table = $('#table_perfiles').DataTable({
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
        // scrollY: true,
        // fixedColumns:   {
        //     heightMatch: 'none'
        // },
         scrollY: true,
        fixedColumns:   {
            heightMatch: 'none'
        },
        responsive: false,
        autoWidth: false,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:5,
        clickToSelect:false,
       
        buttons : [           
            // {
            //     extend: 'selectAll',
            //     text: "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-check-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z'/></svg>",
            //     className: 'botDatTab',
            // },

            { extend: 'pageLength', className: 'botDatTab', },

            // {
            //     extend: 'selectNone',
            //     text: "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-x-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>", 
            //     className: 'botDatTab',
            // },
            
          
        ],
        columnDefs: [
            {
                "targets": [ 0,1,5 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_perfiles tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    });
    //$("#table_perfiles").DataTable().ajax.reload(null, false); 
}
document.getElementById("btnAgregar_perfil").addEventListener("click",async function(){
                                
    $("#modal_perfil").modal("show");
    document.getElementById("title-perfil").innerHTML = "Agregar Perfil";
    document.getElementById("form_perfil").reset();
    document.getElementById("Agregar_Perfil").style.display = "block";
    document.getElementById("Modificar_Perfil").style.display = "none";
});

// // boton de agregar perfil
document.getElementById("Agregar_Perfil").addEventListener("click",async function(){
    $nom_perfil=document.getElementById("nom_perfil").value;
    $desc_perfil=document.getElementById("desc_perfil").value;
    $est_perfil=document.getElementById("est_perfil").value;
    $evaluador = 1;
    if(document.getElementById('opcion_us').checked){
        
        $evaluador = 0;
    }
    //console.log($('#opcion_us').val());
    if($nom_perfil !="" && $desc_perfil !="" && $est_perfil != ""){
        if (!(await validacionPerfil($nom_perfil))){
            
                const postData = { 
                    perfil:$nom_perfil,
                    desc_perfil:$desc_perfil,
                    est_perfil:$est_perfil,
                    evaluador : $evaluador 
                };
               console.log(postData);
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/main/addPerfil",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta) 
                        {
                            document.getElementById("form_perfil").reset();
                            $('#modal_perfil').modal('hide');
                            alerta.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            'Perfil registrado'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_perfiles").DataTable().ajax.reload(null, false); 
                           
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
                         text: 'El perfil ya se encuentra registrado'
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
//editar perfil
$('#table_perfiles tbody').on( 'click', 'editPerfil', function(){
    $("#modal_perfil").modal("show");
    document.getElementById("title-perfil").innerHTML = "Modificar Perfil";
    document.getElementById("form_perfil").reset();
    document.getElementById("Agregar_Perfil").style.display = "none";
    document.getElementById("Modificar_Perfil").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_perfiles').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        // console.log(regDat[0]);
        // document.getElementById("id_perfil").value=regDat[0]["id_perfil"];
        // document.getElementById("desc_perfil").value=regDat[0]["desc_perfil"];
        // document.getElementById("nom_perfil").value=regDat[0]["perfil"];
        // document.getElementById("est_perfil").value=regDat[0]["est_perfil"];
        // if(regDat[0]["is_user_negocio"] == 0){
        //     document.getElementById("opcion_us").checked = true;
        // }
        document.getElementById("id_perfil").value=regDat[0][0];
        document.getElementById("desc_perfil").value=regDat[0][3];
        document.getElementById("nom_perfil").value=regDat[0][2];
        document.getElementById("est_perfil").value=regDat[0][5];
        if(regDat[0][1] == 0){
            document.getElementById("opcion_us").checked = true;
        }
       // document.getElementById("evaluador").value=regDat[0]["is_user_negocio"];
    }
});
//guardando la nueva info
document.getElementById("Modificar_Perfil").addEventListener("click", function(){
    
    $nom_perfil=document.getElementById("nom_perfil").value;
    $desc_perfil=document.getElementById("desc_perfil").value;
    $est_perfil=document.getElementById("est_perfil").value;
    $evaluador = 1;
    
    if(document.getElementById('opcion_us').checked){
        
        $evaluador = 0;
    }
    if($nom_perfil !="" && $desc_perfil !="" && $est_perfil != ""){
       
                const postData = { 
                    id_perfil:document.getElementById("id_perfil").value,
                    perfil:$nom_perfil,
                    desc_perfil:$desc_perfil,
                    est_perfil:$est_perfil,
                    evaluador:$evaluador,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/main/updatePerfil",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       //console.log(respuesta);
                        if (!respuesta.error) 
                        {
                        
                            document.getElementById("form_perfil").reset();
                            $('#modal_perfil').modal('hide');
                            alerta.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_perfiles").DataTable().ajax.reload(null, false); 
                           
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
                 text: 'Faltan Datos'
               })
  }
   
});
//modal de detalle de perfil
//editar perfil
$('#table_perfiles tbody').on( 'click', 'detPerfil', function(){
    $("#modal_DetPerfil").modal("show");
   
    document.getElementById("title-DetPerfil").innerHTML = "Detalle Perfil";
    document.getElementById("form_DetPerfil").reset();
  
    //recuperando los datos
    var table = $('#table_perfiles').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        LoadDetPerfil(parseInt(regDat[0]["id_perfil"]));
        // document.getElementById("id_perfil").value=regDat[0]["id_perfil"];
        document.getElementById("det_desc_perfil").value=regDat[0]["desc_perfil"];
        document.getElementById("det_nom_perfil").value=regDat[0]["perfil"];
        document.getElementById("det_est_perfil").value=regDat[0]["est_perfil"];
   
    }
});

//cambiar estado del view
function EjecutarChangeView(id1,estado){
    try {
        const postData = { 
            id_op:id1,
           
            estado:estado,
        };
        console.log(postData);
        try {
            
            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateView",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Dato Guardado, opción ver'
                })
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    }
    catch(err) {
      
    
    }
}
function EjecutarChangeCreate(id1,estado){
    try {
        const postData = { 
            id_op:id1,
           
            estado:estado,
        };
       // console.log(postData);
        try {

            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateCreate",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Dato Guardado, opción crear'
                })
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    }
    catch(err) {
      
    }
}
function EjecutarChangeUpdate(id1,estado){
    try {
        const postData = { 
            id_op:id1,
        
            estado:estado,
        };
       // console.log(postData);
        try {

            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateUpdate",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Dato Guardado, opción modificar'
                })
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    }
    catch(err) {
       
    
    }
}
function EjecutarChangeDelete(id1,estado){
    try {
        const postData = { 
            id_op:id1,
        
            estado:estado,
        };
       // console.log(postData);
        try {

            $.ajax({
                method: "POST",
                url: BASE_URL+"/main/updateDelete",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Dato Guardado, opción eliminar'
                })
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    }
    catch(err) {
        alert("Se produjo el siguiente error: ".err);
    
    }
}
function changeView(elemento){

                    let usuario = elemento.id.split('_');
                    var dato1 = usuario[1];
                   
                    if(elemento.checked){
                        EjecutarChangeView(dato1,1);
                    }else{
                        EjecutarChangeView(dato1,0);
                    }

};
function changeCreate(elemento){

    let usuario = elemento.id.split('_');
    var dato1 = usuario[1];
   
    if(elemento.checked){
        EjecutarChangeCreate(dato1,1);
    }else{
        EjecutarChangeCreate(dato1,0);
    }

};
function changeUpdate(elemento){

    let usuario = elemento.id.split('_');
    var dato1 = usuario[1];
   
    if(elemento.checked){
        EjecutarChangeUpdate(dato1,1);
    }else{
        EjecutarChangeUpdate(dato1,0);
    }

};
function changeDelete(elemento){

    let usuario = elemento.id.split('_');
    var dato1 = usuario[1];
   
    if(elemento.checked){
        EjecutarChangeDelete(dato1,1);
    }else{
        EjecutarChangeDelete(dato1,0);
    }

};

window.addEventListener("load", () => {
    LoadPerfiles();
    if(crear == 1){
        document.getElementById('btnAgregar_perfil').style.display='block';
    }else{
        document.getElementById('btnAgregar_perfil').style.display='none';
    }
   
});

document.getElementById("select_estado").addEventListener("change",function(){
    $value=$('#select_estado').val();
    window.location.href = $('#base_url').val()+"/perfiles/"+ $value;
    // LoadPerfiles();
});

document.getElementById("descarga_detalle_perfil").addEventListener("click",function(){
    event.preventDefault();
    // console.log('liock en report');
    const postData = { 

    };
    try {
        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/reporteDetallePerfil",
            data: postData,
            dataType: "JSON"
        })
        .done(function(respuesta) {
            // console.log(respuesta);
            $url = $('#base_url').val()+'/public/assets/reportes/'+respuesta;
            // console.log($url);
            // document.getElementById(element.id).target = "_blank"
            // $('#'+element.id).prop('href',$url);
            location.href=$url;
        })
        .fail(function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo ejecutar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        })
        .always(function() {
        });
    }
    catch(err) {
        // alert("Error en el try");
    }
});