var BASE_URL = document.getElementById("base_url").value;
var alerta_actividad = document.getElementById("alerta_actividad");

window.addEventListener("load", () => { 
    var contador = $('#contador').val();
   
    if(contador == 0){
        document.getElementById('apart_mensaje').style.display = 'block'
        document.getElementById('apart_actividad').style.display = 'none';
        document.getElementById('btn_crear_plan').style.display = 'block';
        cargarDatosPosEmpresa();
    }else{
        document.getElementById('apart_mensaje').style.display = 'none'
        document.getElementById('apart_actividad').style.display = 'block';
        document.getElementById('btn_crear_plan').style.display = 'none';
        LoadTable_actividadesPlan();
        cargarDatosPosEmpresa();
    }

   
    
});


//---------------- Actividades Plan --------------------

// var alerta_actividadesPlan = document.getElementById("alert_actividadesPlan");
function cargarTablaActividades($id) {
    
    //console.log($id);

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
        
        
        ajax: BASE_URL+"/activo/getActividadPlan/"+$id,        
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
// function LoadTable_actividadesPlan() {     


    
// $.ajax({
//     method: "POST",
//     url: BASE_URL+"/activo/getEmpresasByActivo",
//     dataType: "JSON"
// })
// .done(function(respuesta) {
   
//     if (respuesta) 
//     {
//         let datos = respuesta;
//         $("#id_comboEmpresa").empty();
//         $("#id_comboEmpresa").append('<option value="" selected>Seleccione</option>');

    

//         datos.data.forEach(dato => {
            
        
//                 $("#id_comboEmpresa").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');

            
            
        
//         });
//     } 
//     else
//     {  }

// })
// .fail(function(error) {
//     alert("Se produjo el siguiente error: ".err);
// })
// .always(function() {
// });        





// $.ajax({
//     method: "GET",
//     url: BASE_URL+"/activo/getComboAreas",
//     dataType: "JSON"
// })
// .done(function(respuesta) {
   
//     if (respuesta) 
//     {
//         let datos = respuesta;
//         $("#id_comboArea").empty();
//         $("#id_comboArea").append('<option value="" selected>Seleccione</option>');

    

//         datos.data.forEach(dato => {
            
        
//                 $("#id_comboArea").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');

            
            
        
//         });
//     } 
//     else
//     {  }

// })
// .fail(function(error) {
//     alert("Se produjo el siguiente error: ".err);
// })
// .always(function() {
// });        



// $.ajax({
//     method: "GET",
//     url: BASE_URL+"/activo/getComboUnidad",
//     dataType: "JSON"
// })
// .done(function(respuesta) {
   
//     if (respuesta) 
//     {
//         let datos = respuesta;
//         $("#id_comboUnidades").empty();
//         $("#id_comboUnidades").append('<option value="" selected>Seleccione</option>');

    

//         datos.data.forEach(dato => {
            
        
//                 $("#id_comboUnidades").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>');

            
            
        
//         });
//     } 
//     else
//     {  }

// })
// .fail(function(error) {
//     alert("Se produjo el siguiente error: ".err);
// })
// .always(function() {
// });        



// $.ajax({
//     method: "GET",
//     url: BASE_URL+"/activo/getComboPosicion",
//     dataType: "JSON"
// })
// .done(function(respuesta) {

//     if (respuesta) 
//     {
//         let datos = respuesta;
//         $("#id_comboPosicion").empty();
//         $("#id_comboPosicion").append('<option value="" selected>Seleccione</option>');

    

//         datos.data.forEach(dato => {
            
        
//                 $("#id_comboPosicion").append('<option value='+dato["id"]+'>'+dato["posicion_puesto"]+'</option>');

            
            
        
//         });
//     } 
//     else
//     {  }

// })
// .fail(function(error) {
//     alert("Se produjo el siguiente error: ".err);
// })
// .always(function() {
// });        





// $.ajax({
//     method: "GET",
//     url: BASE_URL+"/activo/getUserNombreByActivo",
//     dataType: "JSON"
// })
// .done(function(respuesta) {
   
//     if (respuesta) 
//     {
//         let datos = respuesta;
//         $("#id_comboUsers").empty();
//         $("#id_comboUsers").append('<option value="" selected>Seleccione</option>');

    

//         datos.data.forEach(dato => {
            
        
//                 $("#id_comboUsers").append('<option value='+dato["id_us"]+'>'+dato["nombres_us"]+'</option>');

            
            
        
//         });
//     } 
//     else
//     {  }

// })
// .fail(function(error) {
//     alert("Se produjo el siguiente error: ".err);
// })
// .always(function() {
// });        



// $.ajax({
//     method: "GET",
//     url: BASE_URL+"/activo/getAlerta",
//     dataType: "JSON"
// })
// .done(function(respuesta) {
   
//     if (respuesta) 
//     {
//         let datos = respuesta;
//         $("#id_comboAlert").empty();
//         $("#id_comboAlert").append('<option value="" selected>Seleccione</option>');

    

//         datos.data.forEach(dato => {
            
        
//                 $("#id_comboAlert").append('<option value='+dato["id"]+'>'+dato["alerta"]+'</option>');

            
            
        
//         });
//     } 
//     else
//     {  }

// })
// .fail(function(error) {
//     alert("Se produjo el siguiente error: ".err);
// })
// .always(function() {
// });   


   
// }



document.getElementById("btnRegistro_actividades").addEventListener("click",function(){
                                
    $("#modal_actividadesPlan").modal("show");    
    document.getElementById("title-actividadesPlan").innerHTML = "Agregar Actividad";
    document.getElementById("form_actividadesPlan").reset();
    document.getElementById("Agregar_actividad").style.display = "block";
    document.getElementById("Modificar_actividadesPlan").style.display = "none"; 
    cargarDatosEmpresaAct(idempresa);
    
    document.getElementById('id_comboEmpresa').disabled  = true;
    //document.getElementById('id_comboArea').disabled  = false;
        cargarDatosAreaAct(idempresa);
    // // cargarDatosPosPosicion(idempresa);
    
    // cargarDatosUnidadAct(idempresa,idarea);
    // cargarDatosPosicionAct(idempresa,idarea,idunidad);
    //cargarDatosNombreAct(idempresa,$('#id_comboArea').val());
  
    cargarDatosAlertaAct(idempresa);
  
});


function validarFechasActividades(fecha_inicio, fecha_fin) {
   //console.log(fecha_inicio);
   //console.log(fecha_fin);
    //console.log($('#fecha_inicio_plan').val());
    //console.log($('#fecha_fin_plan').val());
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



// // boton de agregar Actividad
document.getElementById("Agregar_actividad").addEventListener("click",function(){
  
    $valor = validarFechasActividades($('#fecha_inicio').val(),$('#fecha_fin').val());
    // //console.log($valor);
if($valor.resultado){
            Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: $valor.msg
               })
} else{
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
                        console.log(respuesta);
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
                            
                           
                            document.getElementById('btn_crear_plan').style.display = 'none';
                            document.getElementById('apart_actividad').style.display = 'block';
                            document.getElementById('apart_mensaje').style.display = 'none';
                            document.getElementById('apart_tabla').style.display = 'block';
                          
                            cargarTablaActividades($('#id_plan').val());
                           
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
        ////console.log("aqui5");
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
  }
}

   


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
        //console.log("error");
    }else{
        
        document.getElementById("id").value=regDat[0]["id"];
        document.getElementById("id_comboEmpresa").value=regDat[0]["idempresa"];
        cargarDatosAreaAct(regDat[0]["idempresa"],regDat[0]["idarea"]);
       
        cargarDatosUnidadAct(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idunidades"]);
        cargarDatosPosicionAct(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idunidades"],regDat[0]["idposicion_puesto"]);
        cargarDatosNombreAct(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idusuario"]);
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
               //console.log(postData);
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/updateActividadPlan",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       //console.log(respuesta);
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
        ////console.log("aqui5");
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Faltan Datos'
               })
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
   
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/deleteActividadPlan",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
            //console.log(respuesta);
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
});
