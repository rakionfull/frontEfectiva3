var BASE_URL = document.getElementById("base_url").value;
var plan = $('#id_plan').val();
var alerta_actividad = document.getElementById('alerta_actividad');


var alerta_actividadesPlan = document.getElementById("alert_actividadesPlan");

// function LoadTable_actividadesPlan() { 

//         $.ajax({
//             method: "POST",
//             url: BASE_URL+"/activo/getEmpresasByActivo",
//             dataType: "JSON"
//         })
//         .done(function(respuesta) {
//             ////console.log(idempresa);
//             if (respuesta) 
//             {
//                 let datos = respuesta;
//                 $("#id_comboEmpresa").empty();
//                 $("#id_comboEmpresa").append('<option value="" selected>Seleccione</option>');

            

//                 datos.data.forEach(dato => {
                    
//                         if(dato["id"] == idempresa){
//                             $("#id_comboEmpresa").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');
//                         }else{
//                             $("#id_comboEmpresa").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');

//                         }
                       
                    
                    
                
//                 });
//             } 
//             else
//             {  }

//         })
//         .fail(function(error) {
//             alert("Se produjo el siguiente error: ".err);
//         })
//         .always(function() {
//         });        





//         $.ajax({
//             method: "GET",
//             url: BASE_URL+"/activo/getComboAreas",
//             dataType: "JSON"
//         })
//         .done(function(respuesta) {
        
//             if (respuesta) 
//             {
//                 let datos = respuesta;
//                 $("#id_comboArea").empty();
//                 $("#id_comboArea").append('<option value="" selected>Seleccione</option>');

            

//                 datos.data.forEach(dato => {
                    
                
//                         $("#id_comboArea").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');

                    
                    
                
//                 });
//             } 
//             else
//             {  }

//         })
//         .fail(function(error) {
//             alert("Se produjo el siguiente error: ".err);
//         })
//         .always(function() {
//         });        



//         $.ajax({
//             method: "GET",
//             url: BASE_URL+"/activo/getComboUnidad",
//             dataType: "JSON"
//         })
//         .done(function(respuesta) {
        
//             if (respuesta) 
//             {
//                 let datos = respuesta;
//                 $("#id_comboUnidades").empty();
//                 $("#id_comboUnidades").append('<option value="" selected>Seleccione</option>');

            

//                 datos.data.forEach(dato => {
                    
                
//                         $("#id_comboUnidades").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>');

                    
                    
                
//                 });
//             } 
//             else
//             {  }

//         })
//         .fail(function(error) {
//             alert("Se produjo el siguiente error: ".err);
//         })
//         .always(function() {
//         });        



//         $.ajax({
//             method: "GET",
//             url: BASE_URL+"/activo/getComboPosicion",
//             dataType: "JSON"
//         })
//         .done(function(respuesta) {

//             if (respuesta) 
//             {
//                 let datos = respuesta;
//                 $("#id_comboPosicion").empty();
//                 $("#id_comboPosicion").append('<option value="" selected>Seleccione</option>');

            

//                 datos.data.forEach(dato => {
                    
                
//                         $("#id_comboPosicion").append('<option value='+dato["id"]+'>'+dato["posicion_puesto"]+'</option>');

                    
                    
                
//                 });
//             } 
//             else
//             {  }

//         })
//         .fail(function(error) {
//             alert("Se produjo el siguiente error: ".err);
//         })
//         .always(function() {
//         });        





//         $.ajax({
//             method: "GET",
//             url: BASE_URL+"/activo/getUserNombreByActivo",
//             dataType: "JSON"
//         })
//         .done(function(respuesta) {
        
//             if (respuesta) 
//             {
//                 let datos = respuesta;
//                 $("#id_comboUsers").empty();
//                 $("#id_comboUsers").append('<option value="" selected>Seleccione</option>');

            

//                 datos.data.forEach(dato => {
                    
                
//                         $("#id_comboUsers").append('<option value='+dato["id_us"]+'>'+dato["nombres_us"]+'</option>');

                    
                    
                
//                 });
//             } 
//             else
//             {  }

//         })
//         .fail(function(error) {
//             alert("Se produjo el siguiente error: ".err);
//         })
//         .always(function() {
//         });        



//         $.ajax({
//             method: "GET",
//             url: BASE_URL+"/activo/getAlerta",
//             dataType: "JSON"
//         })
//         .done(function(respuesta) {
        
//             if (respuesta) 
//             {
//                 let datos = respuesta;
//                 $("#id_comboAlert").empty();
//                 $("#id_comboAlert").append('<option value="" selected>Seleccione</option>');

            

//                 datos.data.forEach(dato => {
                    
                
//                         $("#id_comboAlert").append('<option value='+dato["id"]+'>'+dato["alerta"]+'</option>');

                    
                    
                
//                 });
//             } 
//             else
//             {  }

//         })
//         .fail(function(error) {
//             alert("Se produjo el siguiente error: ".err);
//         })
//         .always(function() {
//         });   


    

    
   
// }

function cargarTablaAtividades($id) {
    if ($.fn.DataTable.isDataTable('#table_actividadesPlan')){
        
        $('#table_actividadesPlan').DataTable().rows().remove();
        $('#table_actividadesPlan').DataTable().destroy();
    
    }

    $('#table_actividadesPlan').DataTable({
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
        
        ajax: BASE_URL+"/activo/getActividadPlan/" + $id,
        //ajax: BASE_URL+"/activo/getActividadPlan",
        aoColumns: [            
            { "data": "id" },
            { "data": "idempresa" },      
            { "data": "idarea" },    
            { "data": "idunidades" },  
            { "data": "idposicion_puesto" },  
            { "data": "idusuario" },
            { "data": "idalerta" },   
            { "data": "progreso" },                                         
            { "data": "empresa" },
            { "data": "area" },
            { "data": "unidad" },
            { "data": "posicion" },            
            { "data": "nombre" },
            { "data": "descripcion" },            
         
            {  "data": "fecha_inicio",
                "bSortable": false,
                "mRender": function(data, type, value) {

                    return  data.split(" ")[0].split("-").reverse().join("-");
                    
                    

                }
            },
            {  "data": "fecha_fin",
                "bSortable": false,
                "mRender": function(data, type, value) {

                    return  data.split(" ")[0].split("-").reverse().join("-");
                    
                    

                }
            },          
          

            { "defaultContent": "<editActividad class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editActividad>"+
            "<deleteActividad class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteActividad>"

},
        ],
        columnDefs: [
            {
                "targets": [ 0,1,2,3,4,5,6 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_actividadesPlan tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
}
$(document).ready(function() { 
    $('.js-riesgos-basic-multiple').select2({ width: '100%' })
    $('.js-controles-basic-multiple').select2({ width: '100%' })
  });
 
// const urlParams = new URLSearchParams(window.location.search);
// const idPlanAccion = urlParams.get('id');
function cargarDatos($id) {
   try {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/activo/getPlan/"+$id,
        dataType: "JSON"
    })
    .done(function(respuesta) {
      
        var response = respuesta.data;
       
      
             //    Cargar la información en los campos correspondientes
            // $('#id_riesgo').val(response.id_riesgo);
            // $('#id_control').val(response.id_control);
            $('#nombre_plan').val(response.plan_accion);
            $('#descripcion_plan').val(response.descripcion);

            

            $('#fecha_inicio_plan').val(fecha(response.fecha_inicio));
            $('#fecha_fin_plan').val(fecha(response.fecha_fin));
    

            //agregando los controles y riesgos

            $array_aux=response.id_riesgo.split("-");
            $array_nuevo=[]  ;
            $array_aux.forEach(element => {
               
                if(element !=""){
                    $array_nuevo.push(element);
        
                }
               
            });
            $('.js-riesgos-basic-multiple').val($array_nuevo).change();
            $array_aux2=response.id_control.split("-");
            $array_nuevo2=[]  ;
            $array_aux2.forEach(element => {
               
                if(element !=""){
                    $array_nuevo2.push(element);
        
                }
               
            });
            $('.js-controles-basic-multiple').val($array_nuevo2).change();
            // cargarDatosPosEmpresa(response.idempresa);
             $('#id_empresa_pos').val(response.idempresa);
            // cargarDatosPosArea(response.idempresa,response.idarea);

            // cargarDatosPosArea(response.idempresa,response.idarea);
            // cargarDatosPosUnidad(response.idempresa,response.idarea,response.idunidad);
            cargarDatosPosPosicion(response.idempresa,response.idarea,response.idunidades,response.idposicion_puesto);
            // cargarDatosPosNombre(response.idempresa,response.idusuario);
            cargarDatosPosEstado(response.idempresa,response.idestado);
            cargarDatosPosPrioridad(response.idempresa,response.idprioridad);
            cargarDatosPosNombre(response.idempresa,response.idarea,response.idunidades,response.idposicion_puesto,response.idusuario);
            // //////console.log('unidad'.response.idunidad)
             cargarDatosPosUnidad(response.idempresa,response.idarea,response.idunidades);
            cargarDatosPosAlerta(response.idempresa,response.idalerta);
            // cargarDatosPosNombre(response.idempresa,response.idusuario);
            
            
            
            // $('#id_area_pos').val(response.idarea);
            // $('#id_unidad_pos').val(response.idunidad);
            // $('#id_puesto').val(response.idposicion);
            // $('#id_nombre_pos').val(response.idusuario);
    
            // $('#id_prioridad_pos').val(response.idprioridad);
            // $('#id_estado_pos').val(response.idestado);
            // $('#id_alerta_pos').val(response.idalerta);

    })
    .fail(function(error) {
        alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });        
   } catch (error) {
    
   }
   

    // $.ajax({
    //     //url: 'ruta/al/controlador/getPlanAccionById/' + idPlanAccion,
    //     url: BASE_URL+"/getPlan/" + $id,
    //     type: 'GET',
    //     dataType: 'json',
    //     success: function(response) {
    //         ////console.log(response);
   
    //         // Y así sucesivamente para los demás campos
    
    //     },
    //     error: function(xhr, status, error) {
    //         //////console.log(error);
    //         //console.error(error);
    //     }
    // });
}

function validarFechasActividades(fecha_inicio, fecha_fin) {
    ////console.log(fecha_inicio);
    ////console.log(fecha_fin);
     ////console.log($('#fecha_inicio_plan').val());
     ////console.log($('#fecha_fin_plan').val());
     let resultado =false ;
     let msg = "";
    
     if($('#fecha_inicio_plan').val() > fecha_inicio){
       
         resultado = true;
         msg = "La fecha de inicio debe estar en el intervalo de las fechas del Plan de Acción";
     }
     if($('#fecha_fin_plan').val() < fecha_inicio){
       
         resultado = true;
         msg = "La fecha de inicio debe estar en el intervalo de las fechas del Plan de Acción";
     }
     if($('#fecha_inicio_plan').val() > fecha_fin){
        
         resultado = true;
         msg = "La fecha de fin debe estar en el intervalo de las fechas del Plan de Acción";
     }
     if($('#fecha_fin_plan').val() < fecha_fin){
       
         resultado = true;
         msg = "La fecha de fin debe estar en el intervalo de las fechas del Plan de Acción";
     }
    
     if(fecha_inicio > fecha_fin){
         resultado = true;
         msg = "La Fecha Fin debe ser mayor a la Fecha de Inicio";
       }
     return $array = {
       resultado: resultado,
       msg: msg
     };
   
     
    
} 
document.getElementById("btnRegistro_actividades").addEventListener("click",function(){
                                
    $("#modal_actividadesPlan").modal("show");    
    document.getElementById("title-actividadesPlan").innerHTML = "Agregar Actividad";
    document.getElementById("form_actividadesPlan").reset();
    document.getElementById("Agregar_actividad").style.display = "block";
    document.getElementById("Modificar_actividadesPlan").style.display = "none"; 
   
    
});


document.getElementById("Agregar_actividad").addEventListener("click",function(){
    $id_comboEmpresa=document.getElementById("id_comboEmpresa").value;
    $combo_area=document.getElementById("id_comboArea").value;
    $combo_unidades=document.getElementById("id_comboUnidades").value;
    $combo_posicion=document.getElementById("id_comboPosicion").value;
    $combo_user=document.getElementById("id_comboUsers").value;
    $descripcion_actividad=document.getElementById("descripcion_actividad").value;
    $fecha_inicio=document.getElementById("fecha_inicio").value;
    $fecha_fin=document.getElementById("fecha_fin").value;
    $comboAlert=document.getElementById("id_comboAlert").value;
    $progreso=document.getElementById("progreso").value;
    
    $valor = validarFechasActividades($('#fecha_inicio').val(),$('#fecha_fin').val());
    // ////console.log($valor);
    if($valor.resultado){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: $valor.msg
                })
    } else{
            if($id_comboEmpresa !=""  && $combo_area != "" && $combo_unidades != ""
            && $combo_posicion != "" && $combo_user != "" && $descripcion_actividad != ""
            && $fecha_inicio != "" && $fecha_fin != "" && $comboAlert != "" && $progreso != ""){
        
                    const postData = { 
                        idempresa:$id_comboEmpresa,
                        idarea:$combo_area,
                        idunidad:$combo_unidades,
                        idposicion:$combo_posicion,
                        idusuario:$combo_user,
                        descripcion:$descripcion_actividad,
                        fecha_inicio:$fecha_inicio,
                        fecha_fin:$fecha_fin,
                        idalerta:$comboAlert,
                        progreso:$progreso,
                        idplanaccion:$('#id_plan').val()
                        
                        
                    };
                
                    try {

                        $.ajax({
                            method: "POST",
                            url: BASE_URL+"/activo/addActividadPlan",
                            data: postData,
                            dataType: "JSON"
                        })
                        .done(function(respuesta) {
                            ////console.log(respuesta);
                            if (respuesta.error==1) 
                            {
                                document.getElementById("form_actividadesPlan").reset();
                                $('#modal_actividadesPlan').modal('hide');
                                
                                alerta_actividad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                                +  respuesta.msg +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                    '<span aria-hidden="true">&times;</span>'+
                                    '</button>'+
                                '</div>';
                                
                                $("#table_actividadesPlan").DataTable().ajax.reload(null, false); 
                            
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
                    
                    }
                
            
        
        }else{
            //////console.log("aqui5");
            Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Faltan Datos'
                })
        }
}
    
   


});
window.addEventListener("load", () => { 
    var contador = $('#contador').val();
   
    // if(contador  0){
    //     document.getElementById('apart_mensaje').style.display = 'none'
    //     document.getElementById('apart_actividad').style.display = 'block';
      
    //     // LoadTable_actividadesPlan(plan);
    //     cargarDatos(plan)
    //     // cargarDatosPosEmpresa();
    // }else{
        document.getElementById('apart_mensaje').style.display = 'none'
        document.getElementById('apart_actividad').style.display = 'block';
        
        // cargarDatosPosEmpresa();
        cargarDatos(plan);
        cargarTablaAtividades(plan);
        cargarDatosEmpresaAct(idempresa);
    
        document.getElementById('id_comboEmpresa').disabled  = true;
        //document.getElementById('id_comboArea').disabled  = true;
        cargarDatosAreaAct(idempresa);
        // cargarDatosPosPosicion(idempresa);
        
        //cargarDatosUnidadAct(idempresa,idarea);
       // cargarDatosPosicionAct(idempresa,idarea,idunidad);
        // cargarDatosNombreAct(idempresa,idarea);
      
        cargarDatosAlertaAct(idempresa);
       
    //}
    
   
});

//editar Actividades
$('#table_actividadesPlan tbody').on( 'click', 'editActividad', function(){
   
    $("#modal_actividadesPlan").modal("show");
    document.getElementById("title-actividadesPlan").innerHTML = "Modificar Actividad";
    document.getElementById("form_actividadesPlan").reset();
    document.getElementById("Agregar_actividad").style.display = "none";
    document.getElementById("Modificar_actividadesPlan").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_actividadesPlan').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        ////console.log("error");
    }else{
        document.getElementById("id").value=regDat[0]["id"];
        document.getElementById("id_comboEmpresa").value=regDat[0]["idempresa"];
        cargarDatosAreaAct(regDat[0]["idempresa"],regDat[0]["idarea"]);
       
        cargarDatosUnidadAct(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idunidades"]);
        cargarDatosPosicionAct(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idunidades"],regDat[0]["idposicion_puesto"]);
        cargarDatosNombreAct(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idunidades"],regDat[0]["idposicion_puesto"],regDat[0]["idusuario"]);
        // document.getElementById("id_comboArea").value=regDat[0]["idarea"];
        // document.getElementById("id_comboUnidades").value=regDat[0]["idunidades"];
        // document.getElementById("id_comboPosicion").value=regDat[0]["idposicion_puesto"];
        // document.getElementById("id_comboUsers").value=regDat[0]["idusuario"];
        document.getElementById("descripcion_actividad").value=regDat[0]["descripcion"];
        document.getElementById("fecha_inicio").value=fecha(regDat[0]["fecha_inicio"]);
        document.getElementById("fecha_fin").value=fecha(regDat[0]["fecha_fin"]);
        
        document.getElementById("id_comboAlert").value=regDat[0]["idalerta"];
        document.getElementById("progreso").value=regDat[0]["progreso"];      
     
    }
});


//guardando la nueva info
document.getElementById("Modificar_actividadesPlan").addEventListener("click", function(){
   
    $id_comboEmpresa=document.getElementById("id_comboEmpresa").value;
    $combo_area=document.getElementById("id_comboArea").value;
    $combo_unidades=document.getElementById("id_comboUnidades").value;
    $combo_posicion=document.getElementById("id_comboPosicion").value;
    $combo_user=document.getElementById("id_comboUsers").value;
    $descripcion_actividad=document.getElementById("descripcion_actividad").value;
    $fecha_inicio=document.getElementById("fecha_inicio").value;
    $fecha_fin=document.getElementById("fecha_fin").value;
    $comboAlert=document.getElementById("id_comboAlert").value;
    $progreso=document.getElementById("progreso").value;
    
    $valor = validarFechasActividades($('#fecha_inicio').val(),$('#fecha_fin').val());
    // ////console.log($valor);
    if($valor.resultado){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: $valor.msg
                })
    } else{

            if($id_comboEmpresa !=""  && $combo_area != "" && $combo_unidades != ""
                && $combo_posicion != "" && $combo_user != "" && $descripcion_actividad != ""
                && $fecha_inicio != "" && $fecha_fin != "" && $comboAlert != "" && $progreso != ""){
            
                        const postData = { 
                            idempresa:$id_comboEmpresa,
                            idarea:$combo_area,
                            idunidad:$combo_unidades,
                            idposicion:$combo_posicion,
                            idusuario:$combo_user,
                            descripcion:$descripcion_actividad,
                            fecha_inicio:$fecha_inicio,
                            fecha_fin:$fecha_fin,
                            idalerta:$comboAlert,
                            progreso:$progreso,
                            idplanaccion:$('#id_plan').val(),
                            id:$('#id').val()
                            
                            
                        };
                    ////console.log(postData);
                        try {

                            $.ajax({
                                method: "POST",
                                url: BASE_URL+"/activo/updateActividadPlan",
                                data: postData,
                                dataType: "JSON"
                            })
                            .done(function(respuesta) {
                            ////console.log(respuesta);
                                if (respuesta.error==1) 
                                {
                                    document.getElementById("form_actividadesPlan").reset();
                                    $('#modal_actividadesPlan').modal('hide');
                                    
                                    alerta_actividad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                                    +  respuesta.msg +
                                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                        '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                    '</div>';
                                    $("#table_actividadesPlan").DataTable().ajax.reload(null, true); 
                                    
                                
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
                        
                        }
                    
                
            
            }else{
                //////console.log("aqui5");
                Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Faltan Datos'
                    })
        }
    }
   
   


});


$('#table_actividadesPlan tbody').on( 'click', 'deleteActividad', function(){
     
    //recuperando los datos
    var table = $('#table_actividadesPlan').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
        title: 'Desea eliminar la actividad?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/deleteActividadPlan",
                        data: postData,
                        dataType: "JSON"
                    })

                
                    .done(function(respuesta) {
                        ////console.log(respuesta);
                        if (respuesta.msg) 
                        {
                        
                            alerta_actividad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            
                            $("#table_actividadesPlan").DataTable().ajax.reload(null, true); 
                        /*
                        }else{
                            alerta_actividadesPlan.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                            respuesta.error+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';*/
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
                    // alert("Error en el try");
                }
            } else if (result.isDenied) {
                Swal.fire('No hubo ningún cambio', '', 'info')
          }
      })
});
document.getElementById("id_comboPosicion").addEventListener("change",function(){
    
    if($('#id_comboPosicion').val() != "" ){
        cargarDatosNombreAct($('#id_comboEmpresa').val(),$('#id_comboArea').val(),$('#id_comboUnidades').val(),$('#id_comboPosicion').val());

    }
    
});
document.getElementById("id_comboUnidades").addEventListener("change",function(){
    
    if($('#id_comboUnidades').val() != "" ){
        cargarDatosPosicionAct($('#id_comboEmpresa').val(),$('#id_comboArea').val(),$('#id_comboUnidades').val());

    }
    
});
document.getElementById("id_comboArea").addEventListener("change",function(){
    
    if($('#id_comboArea').val() != "" ){
        cargarDatosUnidadAct($('#id_comboEmpresa').val(),$('#id_comboArea').val());

    }
    
});


// document.getElementById("id_comboUnidades").addEventListener("change",function(){
    
//     if($('#id_comboUnidades').val() != "" ){
//         cargarDatosPosicionAct(idempresa,$('#id_comboArea').val(),$('#id_comboUnidades').val());

//     }
    
// });