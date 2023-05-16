var alerta_proceso = document.getElementById("alert_proceso");


function inicializaProceso() {
    $("#select_areaPro").empty();
    $("#select_areaPro").append('<option value="" selected>Seleccione</option>');
    $("#select_unidadesPro").empty();
    $("#select_unidadesPro").append('<option value="" selected>Seleccione</option>');
    $("#select_MacroprocesosPro").empty();
    $("#select_MacroprocesosPro").append('<option value="" selected>Seleccione</option>');
}

function  cargarDatosProEmpresa($dato){
       
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
            $("#select_empresaPro").empty();
            $("#select_empresaPro").append('<option value="" selected>Seleccione</option>');

        

            datos.data.forEach(dato => {
                
            if($dato == dato['id']){
                $("#select_empresaPro").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');

                
            }else{
                $("#select_empresaPro").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');

                
            }
                   
                
            
            });
            cargarDatosProArea(idempresa);
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
    function cargarDatosProArea($empresa,$dato) {
        //cargando las areas
        const postData = { 
            idempresa:$empresa,
           
            
        }
       
            $.ajax({
                method: "POST",
                url: BASE_URL+"/activo/getAreasByActivo",
                dataType: "JSON",
                data: postData
            })
            .done(function(respuesta) {
               
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    $("#select_areaPro").empty();
                    $("#select_areaPro").append('<option value="" selected>Seleccione</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id"] == $dato){
                    
                            $("#select_areaPro").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
            
                        }else{
                            $("#select_areaPro").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
            
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
    function cargarDatosProUnidad($empresa,$idarea,$dato) {
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
            

                $("#select_unidadesPro").empty();
                $("#select_unidadesPro").append('<option value="" selected>Seleccione</option>');
        
            
        
                datos.data.forEach(dato => {
                    
                    if(dato["id"] == $dato){
                        $("#select_unidadesPro").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
                    }else{
                        $("#select_unidadesPro").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>');
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
    function cargarDatosProMacro($empresa,$idarea,$idunidad,$dato) {
        const postData = { 
            idempresa:$empresa,
            idarea:$idarea,
            idunidad:$idunidad,
            
        }
        //cargando las Macroprocesos
        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/getMacroprocesoByActivo",
            dataType: "JSON",
            data:postData
        })
        .done(function(respuesta) {
        
            if (respuesta) 
            {
                let datos = respuesta;
            
        
                $("#select_MacroprocesosPro").empty();
                $("#select_MacroprocesosPro").append('<option value="" selected>Seleccione</option>');
        
            
        
                datos.data.forEach(dato => {
                    
                    if(dato["id"] == $dato){
                        $("#select_MacroprocesosPro").append('<option value='+dato["id"]+' selected>'+dato["macroproceso"]+'</option>');
                    }else{
                        $("#select_MacroprocesosPro").append('<option value='+dato["id"]+'>'+dato["macroproceso"]+'</option>');
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
function LoadTableProceso($update,$delete) {
    $dato = 0 ;
    if(idempresa != 0 || idempresa !=""){
        $dato = idempresa;
    }


    if ($.fn.DataTable.isDataTable('#table_proceso')){
        
        $('#table_proceso').DataTable().rows().remove();
        $('#table_proceso').DataTable().destroy();
    
    }

    $('#table_proceso').DataTable({
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
        ajax: BASE_URL+"/activo/getProceso/"+$dato,
        aoColumns: [
            { "data": "id" },
            { "data": "proceso" },
            { "data": "empresa" },
            { "data": "area" },
            { "data": "unidad" },
            { "data": "macroproceso" },
            {  "data": "estado",
                        
            "mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }
            },
            { "data": "idempresa" },
            { "data": "idarea" },
            { "data": "idunidades" },
            { "data": "idmacroproceso" },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editProceso class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editProceso>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteProceso class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteProceso>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editProceso class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editProceso>"+
//             "<deleteProceso class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteProceso>"

// },
        ],
        columnDefs: [
            {
                "targets": [ 0,7,8,9,10 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_proceso tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

document.getElementById("btnAgregar_Proceso").addEventListener("click",function(){
                                
    $("#modal_proceso").modal("show");
  
    document.getElementById("title-proceso").innerHTML = "Agregar Proceso";
    document.getElementById("form_proceso").reset();
    document.getElementById("Agregar_Proceso").style.display = "block";
    document.getElementById("Modificar_Proceso").style.display = "none";
    if(idempresa != 0){
        $('#select_empresaPro').attr('disabled',true);
    }
    // inicializaProceso();
});


// // boton de agregar Proceso
document.getElementById("Agregar_Proceso").addEventListener("click",function(){
    $select_empresaPro=document.getElementById("select_empresaPro").value;
    $select_areaPro=document.getElementById("select_areaPro").value;
    $select_unidadesPro=document.getElementById("select_unidadesPro").value;
    $select_MacroprocesosPro=document.getElementById("select_MacroprocesosPro").value;
    $nom_pro=document.getElementById("nom_pro").value;
    $est_pro=document.getElementById("est_pro").value;
    
    if($select_empresaPro !=""  && $select_areaPro != "" && $select_unidadesPro != "" 
        && $select_MacroprocesosPro != "" && $nom_pro != "" && $est_pro != ""){
       
                const postData = { 
                    idempresa:$select_empresaPro,
                    idarea:$select_areaPro,
                    idunidad:$select_unidadesPro,
                    idmacroproceso:$select_MacroprocesosPro,
                    proceso:$nom_pro,
                    estado:$est_pro,
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/addProceso",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                      
                        if (respuesta.error==1) 
                        {
                            document.getElementById("form_proceso").reset();
                            $('#modal_proceso').modal('hide');
                            alerta_proceso.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_proceso").DataTable().ajax.reload(null, false); 
                           
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
                 text: 'Faltan Datos'
               })
  }


});


//editar Proceso
$('#table_proceso tbody').on( 'click', 'editProceso', function(){
    $("#modal_proceso").modal("show");
   
    document.getElementById("title-proceso").innerHTML = "Modificar Proceso";
    document.getElementById("form_proceso").reset();
    document.getElementById("Agregar_Proceso").style.display = "none";
    document.getElementById("Modificar_Proceso").style.display = "block";
    if(idempresa != 0){
        $('#select_empresaPro').attr('disabled',true);
    }
    //recuperando los datos
    var table = $('#table_proceso').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        ////console.log("error");
    }else{
        document.getElementById("id_proceso").value=regDat[0]["id"];
        document.getElementById("select_empresaPro").value=regDat[0]["idempresa"];
        cargarDatosProArea(regDat[0]["idempresa"],regDat[0]["idarea"]);
        cargarDatosProUnidad(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idunidades"]);
        cargarDatosProMacro(regDat[0]["idempresa"],regDat[0]["idarea"],regDat[0]["idunidades"],regDat[0]["idmacroproceso"]);
      
        document.getElementById("select_MacroprocesosPro").value=regDat[0]["idmacroproceso"];
        document.getElementById("nom_pro").value=regDat[0]["proceso"];
        document.getElementById("est_pro").value=regDat[0]["estado"];
     
    }
});


//guardando la nueva info
document.getElementById("Modificar_Proceso").addEventListener("click", function(){
    
    $select_empresaPro=document.getElementById("select_empresaPro").value;
    $select_areaPro=document.getElementById("select_areaPro").value;
    $select_unidadesPro=document.getElementById("select_unidadesPro").value;
    $select_MacroprocesosPro=document.getElementById("select_MacroprocesosPro").value;
    $nom_pro=document.getElementById("nom_pro").value;
    $est_pro=document.getElementById("est_pro").value;
    
    if($nom_pro !="" && $est_pro != "" && $select_empresaPro != "" && $select_areaPro != "" && $select_unidadesPro != "" && $select_MacroprocesosPro != ""){
       
                const postData = { 
                    id:document.getElementById("id_proceso").value,
                    idempresa:$select_empresaPro,
                    idarea:$select_areaPro,
                    idunidad:$select_unidadesPro,
                    idmacroproceso:$select_MacroprocesosPro,
                    proceso:$nom_pro,
                    estado:$est_pro,
                    
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/updateProceso",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       //console.log(respuesta);
                        if (!respuesta.error) 
                        {
                            document.getElementById("form_proceso").reset();
                            $('#modal_proceso').modal('hide');
                            alerta_proceso.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_proceso").DataTable().ajax.reload(null, false); 
                           
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
//eliminar Macroproceso
$('#table_proceso tbody').on( 'click', 'deleteProceso', function(){
     
    //recuperando los datos
    var table = $('#table_proceso').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
        title: 'Desea eliminar el proceso?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            try {

                $.ajax({
                    method: "POST",
                    url: $('#base_url').val()+"/activo/deleteProceso",
                    data: postData,
                    dataType: "JSON"
                })

            
                .done(function(respuesta) {
            
                    if (!respuesta)     
                    {
                        alerta_proceso.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        'Eliminado correctamente'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>';

                        $("#table_proceso").DataTable().ajax.reload(null, true); 
                    
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


document.getElementById("select_empresaPro").addEventListener("change",function(){
    // //console.log($('#select_empresaMacro').val());
    if($('#select_empresaPro').val() != "" ){
        cargarDatosProArea($('#select_empresaPro').val());
    }
    
});
document.getElementById("select_areaPro").addEventListener("change",function(){
    // //console.log($('#select_areaMacro').val());
    if($('#select_areaPro').val() != "" ){
        cargarDatosProUnidad($('#select_empresaPro').val(),$('#select_areaPro').val(),"");
    }
    
});
document.getElementById("select_unidadesPro").addEventListener("change",function(){
    // //console.log($('#select_areaMacro').val());
    if($('#select_unidadesPro').val() != "" ){
        cargarDatosProMacro($('#select_empresaPro').val(),$('#select_areaPro').val(),$('#select_unidadesPro').val(),"");
    }
    
});