
var alerta_posicion = document.getElementById("alert_posicion");
function inicializaPosicion() {
    $("#id_area_pos").empty();
    $("#id_area_pos").append('<option value="" selected>Seleccione</option>');
    $("#id_unidad_pos").empty();
    $("#id_unidad_pos").append('<option value="" selected>Seleccione</option>');
   
}
function  cargarDatosPosEmpresa($dato){
       
    //cargando las empresas
    $.ajax({
        method: "POST",
        url: BASE_URL+"/activo/getEmpresasByActivo",
        dataType: "JSON"
    })
    .done(function(respuesta) {
       
        if (respuesta) 
        {
            let datos = respuesta;
            $("#id_empresa_pos").empty();
            $("#id_empresa_pos").append('<option value="" selected>Empresa</option>');

        

            datos.data.forEach(dato => {
                
                if($dato == dato['id']){
                    $("#id_empresa_pos").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');

                
                }else{
                    $("#id_empresa_pos").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');

                
                }
                   
                
            
            });
            cargarDatosPosArea(idempresa);
        } 
        else
        {  }
    
    })
    .fail(function(error) {
        alert("Se produjo el siguiente error: ".err);
    })
    .always(function() {
    });        
    
}
    function cargarDatosPosArea($empresa,$dato) {
        //cargando las areas
        const postData = { 
            idempresa:$empresa,
           
            
        }
        console.log(postData);
            $.ajax({
                method: "POST",
                url: BASE_URL+"/activo/getAreasByActivo",
                dataType: "JSON",
                data: postData
            })
            .done(function(respuesta) {
                console.log(respuesta);
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    $("#id_area_pos").empty();
                    $("#id_area_pos").append('<option value="" selected>Área</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id"] == $dato){
                    
                            $("#id_area_pos").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                        }else{
                            $("#id_area_pos").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
                        }
                        
                        
                    
                    });
                } 
                else
                {  }
    
        })
        .fail(function(error) {
            alert("Se produjo el siguiente error: ".err);
        })
        .always(function() {
        });   
    }
    function cargarDatosPosUnidad($empresa,$idarea,$dato) {
        const postData = { 
            idempresa:$empresa,
            idarea:$idarea,
            
        }
      
        //cargando las Unidades
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getUnidadByActivo",
            dataType: "JSON",
            data:postData
        })
        .done(function(respuesta) {
        
            if (respuesta) 
            {
                let datos = respuesta;
            

                $("#id_unidad_pos").empty();
                $("#id_unidad_pos").append('<option value="" selected>Unidad</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_unidad_pos").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
        
                    }else{
                        $("#id_unidad_pos").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>'); 
                    }
                    
                
                });
            } 
            else
            {  }

        })
        .fail(function(error) {
            alert("Se produjo el siguiente error: ".err);
        })
        .always(function() {
        });

    }
function LoadTablePosicion($update,$delete) {

    $dato = 0 ;
    if(idempresa != 0 || idempresa !=""){
        $dato = idempresa;
    }

    if ($.fn.DataTable.isDataTable('#table_posicion')){
        
        $('#table_posicion').DataTable().rows().remove();
        $('#table_posicion').DataTable().destroy();
    
    }

    $('#table_posicion').DataTable({
        
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
        ajax: $('#base_url').val()+"/activo/getPosicion/"+$dato,
        aoColumns: [
            { "data": "id_pos" },
            { "data": "posicion_puesto" },
            { "data": "idempresa" },
            { "data": "empresa" },
            { "data": "idarea" },
            { "data": "area" },
            { "data": "idunidades" },
            { "data": "unidad" },
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
                    $cadena =   $cadena +  "<editPosicion class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editPosicion>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deletePosicion class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deletePosicion>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;

                }
            },
//             { "defaultContent": "<editPosicion class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editPosicion>"+
//             "<deletePosicion class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deletePosicion>"

// },
        ],
        columnDefs: [
            {
                "targets": [0,2,4,6 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_posicion tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_posicion").DataTable().ajax.reload(null, true); 
}

//validamos
async function validacionPosicion(){

    let result; /* Variable Resultado de Funcion */

    // Validar existe
        try {

            const postData = {   
              
                posicion : document.getElementById("nom_posicion").value,
                idempresa : document.getElementById("id_empresa_pos").value,
                idarea:document.getElementById("id_area_pos").value,
                idunidad:document.getElementById("id_unidad_pos").value,
            };
           
            await $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/validarPosicion",
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

document.getElementById("btnAgregar_Posicion").addEventListener("click",function(){

    $("#modal_posicion").modal("show");
   
    document.getElementById("title-posicion").innerHTML = "Agregar Posición/Puesto";
    document.getElementById("form_posicion").reset();
    document.getElementById("Agregar_Posicion").style.display = "block";
    document.getElementById("Modificar_Posicion").style.display = "none";
    if(idempresa != 0){
        $('#id_empresa_pos').attr('disabled',true);
    }
    // inicializaPosicion();
});



// // boton de agregar Valor Activo
document.getElementById("Agregar_Posicion").addEventListener("click",async function(){
    $nom_posicion=document.getElementById("nom_posicion").value;
    $est_posicion=document.getElementById("est_posicion").value;
    $id_empresa_pos=document.getElementById("id_empresa_pos").value;
    $id_area_pos=document.getElementById("id_area_pos").value;
    $id_unidad_pos=document.getElementById("id_unidad_pos").value;
    
    if($nom_posicion !=""  && $est_posicion != "" && $id_empresa_pos != "" && $id_area_pos != "" && $id_unidad_pos != ""){
        // if (!(await validacionPosicion())){
                
                const postData = { 
                    posicion : document.getElementById("nom_posicion").value,
                    idempresa : document.getElementById("id_empresa_pos").value,
                    idarea:document.getElementById("id_area_pos").value,
                    idunidad:document.getElementById("id_unidad_pos").value,
                    estado:$est_posicion,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/addPosicion",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        console.log(respuesta);
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_posicion").reset();
                            $('#modal_posicion').modal('hide');
                            alerta_posicion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_posicion").DataTable().ajax.reload(null, false); 
                           
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
        //                  text: 'El puesto ya fue registrado para esa empresa, area y unidad'
        //                })
        //   }
           
       
    }else{
       
        Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Debe completar todos los campos'
               })
  }

});

//editar Valor Activo
$('#table_posicion tbody').on( 'click', 'editPosicion', function(){
    $("#modal_posicion").modal("show");
   
    if(idempresa != 0){
        $('#id_empresa_pos').attr('disabled',true);
    }
    document.getElementById("title-posicion").innerHTML = "Modificar Posición/Puesto";
    document.getElementById("form_posicion").reset();
    document.getElementById("Agregar_Posicion").style.display = "none";
    document.getElementById("Modificar_Posicion").style.display = "block";
    //recuperando los datos
    var table = $('#table_posicion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_posicion").value=regDat[0]["id_pos"];
        document.getElementById("nom_posicion").value=regDat[0]["posicion_puesto"];
        document.getElementById("est_posicion").value=regDat[0]["estado"];
        document.getElementById("id_empresa_pos").value=regDat[0]["idempresa"];
        // document.getElementById("id_area_pos").value=regDat[0]["idarea"];
        cargarDatosPosArea(regDat[0]["idempresa"],regDat[0]["idarea"]);
        cargarDatosPosUnidad(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idunidades"]);
     
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Posicion").addEventListener("click",async function(){
    
    $nom_posicion=document.getElementById("nom_posicion").value;
    $est_posicion=document.getElementById("est_posicion").value;
    $id_empresa_pos=document.getElementById("id_empresa_pos").value;
    $id_area_pos=document.getElementById("id_area_pos").value;
    $id_unidad_pos=document.getElementById("id_unidad_pos").value;
    
    if($nom_posicion !=""  && $est_posicion != "" && $id_empresa_pos != "" && $id_area_pos != "" && $id_unidad_pos != ""){
        // if (!(await validacionPosicion())){
                
       
                const postData = { 
                    id:document.getElementById("id_posicion").value,
                    posicion : document.getElementById("nom_posicion").value,
                    idempresa : document.getElementById("id_empresa_pos").value,
                    idarea:document.getElementById("id_area_pos").value,
                    idunidad:document.getElementById("id_unidad_pos").value,
                    estado:$est_posicion,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/updatePosicion",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                      
                        if (!respuesta.error) 
                        {
                            document.getElementById("form_posicion").reset();
                            $('#modal_posicion').modal('hide');
                            alerta_posicion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                            +  respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_posicion").DataTable().ajax.reload(null, false); 
                           
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
                 text: 'Debe completar todos los campos'
               })
  }

});

//eliminar Valor Activo
$('#table_posicion tbody').on( 'click', 'deletePosicion', function(){
     
    //recuperando los datos
    var table = $('#table_posicion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id_pos"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/deletePosicion",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
          
            if (!respuesta) 
            {
                
                alerta_posicion.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                'Eliminado correctamente'+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_posicion").DataTable().ajax.reload(null, true); 
               
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
document.getElementById("id_empresa_pos").addEventListener("change",function(){
    // console.log($('#select_empresaMacro').val());
    if($('#id_empresa_pos').val() != "" ){
        cargarDatosPosArea($('#id_empresa_pos').val());
    }
    
});
document.getElementById("id_area_pos").addEventListener("change",function(){
    // console.log($('#select_areaMacro').val());
    if($('#id_area_pos').val() != "" ){
        cargarDatosPosUnidad($('#id_empresa_pos').val(),$('#id_area_pos').val(),"");
    }
    
});