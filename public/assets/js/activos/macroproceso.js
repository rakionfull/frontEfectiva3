var alerta_macroproceso = document.getElementById("alert_macroproceso");

function inicializaMacroproceso() {
    $("#select_areaMacro").empty();
    $("#select_areaMacro").append('<option value="" selected>Seleccione</option>');
   
    $("#select_unidadesMacro").empty();
    $("#select_unidadesMacro").append('<option value="" selected>Seleccione</option>');
}
function  cargarDatosMacroEmpresa($dato){
   
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
            $("#select_empresaMacro").empty();
            $("#select_empresaMacro").append('<option value="" selected>Empresa</option>');

        

            datos.data.forEach(dato => {
                if($dato == dato['id']){
                    $("#select_empresaMacro").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');

                
                }else{
                    $("#select_empresaMacro").append('<option value='+dato["id"]+' >'+dato["empresa"]+'</option>');

                
                }
            
                   
                
            
            });
            cargarDatosMacroArea(idempresa);
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
    function cargarDatosMacroArea($empresa,$dato) {
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
                
    
                   
                        $("#select_areaMacro").empty();
                        $("#select_areaMacro").append('<option value="" selected>Seleccione</option>');

                    

                        datos.data.forEach(dato => {
                            
                            if(dato["id"] == $dato){
                                $("#select_areaMacro").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                            }else{
                                $("#select_areaMacro").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
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
    function cargarDatosMacroUnidad($empresa,$idarea,$dato) {
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
            

                $("#select_unidadesMacro").empty();
                $("#select_unidadesMacro").append('<option value="" selected>Seleccione</option>');

            

                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#select_unidadesMacro").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
                    }else{
                        $("#select_unidadesMacro").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>');
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
function LoadTableMacroproceso($update,$delete) {

    $dato = 0 ;
    if(idempresa != 0 || idempresa !=""){
        $dato = idempresa;
    }


    if ($.fn.DataTable.isDataTable('#table_macroproceso')){
        
        $('#table_macroproceso').DataTable().rows().remove();
        $('#table_macroproceso').DataTable().destroy();
    
    }

    $('#table_macroproceso').DataTable({
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
        ajax: BASE_URL+"/activo/getMacroproceso/"+$dato,
        aoColumns: [
            { "data": "id" },
            { "data": "macroproceso" },
            { "data": "empresa" },
            { "data": "area" },
            { "data": "unidad" },
            {  "data": "estado",
                        
            "mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }
            },
            { "data": "idempresa" },
            { "data": "idarea" },
            { "data": "idunidades" },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editMacroproceso class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editMacroproceso>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteMacroproceso class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteMacroproceso>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editMacroproceso class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editMacroproceso>"+
//             "<deleteMacroproceso class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteMacroproceso>"

// },
        ],
        columnDefs: [
            {
                "targets": [0, 6,7,8 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_macroproceso tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}
document.getElementById("btnAgregar_Macroproceso").addEventListener("click",function(){
   
    $("#modal_macroproceso").modal("show");
    
    document.getElementById("title-macroproceso").innerHTML = "Agregar ";
    document.getElementById("form_macroproceso").reset();
    inicializaMacroproceso();
    document.getElementById("Agregar_Macroproceso").style.display = "block";
    document.getElementById("Modificar_Macroproceso").style.display = "none";
    if(idempresa != 0){
        $('#select_empresaMacro').attr('disabled',true);
    }
   
});

// // boton de agregar Macroproceso
document.getElementById("Agregar_Macroproceso").addEventListener("click",function(){
    $select_empresaMacro=document.getElementById("select_empresaMacro").value;
    $select_areaMacro=document.getElementById("select_areaMacro").value;
    $select_unidadesMacro=document.getElementById("select_unidadesMacro").value;
    $nom_mac=document.getElementById("nom_macroproceso").value;
    $est_mac=document.getElementById("est_macroproceso").value;
    
    if($select_empresaMacro !="" && $select_areaMacro !="" && $select_unidadesMacro !="" && $nom_mac !="" && $est_mac != ""){
       
                const postData = { 
                    idempresa:$select_empresaMacro,
                    idarea:$select_areaMacro,
                    idunidad:$select_unidadesMacro,
                    macroproceso:$nom_mac,
                    estado:$est_mac,
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/addMacroproceso",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            document.getElementById("form_macroproceso").reset();
                            $('#modal_macroproceso').modal('hide');
                            alerta_macroproceso.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_macroproceso").DataTable().ajax.reload(null, false); 
                            inicializaMacroproceso();
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

//editar Macroproceso
$('#table_macroproceso tbody').on( 'click', 'editMacroproceso', function(){
    $("#modal_macroproceso").modal("show");
    
    document.getElementById("title-macroproceso").innerHTML = "Modificar";
    document.getElementById("form_macroproceso").reset();
    document.getElementById("Agregar_Macroproceso").style.display = "none";
    document.getElementById("Modificar_Macroproceso").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_macroproceso').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        ////console.log("error");
    }else{
        document.getElementById("id_macroproceso").value=regDat[0]["id"];
        document.getElementById("select_empresaMacro").value=regDat[0]["idempresa"];
        cargarDatosMacroArea(regDat[0]["idempresa"], regDat[0]["idarea"]);
        cargarDatosMacroUnidad( regDat[0]["idempresa"],regDat[0]["idarea"], regDat[0]["idunidades"]);
    
        // document.getElementById("select_areaMacro").value=regDat[0]["idarea"];
        // document.getElementById("select_unidadesMacro").value=regDat[0]["idunidad"];
        document.getElementById("nom_macroproceso").value=regDat[0]["macroproceso"];
        document.getElementById("est_macroproceso").value=regDat[0]["estado"];
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Macroproceso").addEventListener("click", function(){
    $select_empresaMacro=document.getElementById("select_empresaMacro").value;
    $select_areaMacro=document.getElementById("select_areaMacro").value;
    $select_unidadesMacro=document.getElementById("select_unidadesMacro").value;
    $nom_mac=document.getElementById("nom_macroproceso").value;
    $est_mac=document.getElementById("est_macroproceso").value;
    
    if($select_empresaMacro !="" && $select_areaMacro !="" && $select_unidadesMacro !="" && $nom_mac !="" && $est_mac != ""){
       
                const postData = { 
                    id:document.getElementById("id_macroproceso").value,
                    idempresa:$select_empresaMacro,
                    idarea:$select_areaMacro,
                    idunidad:$select_unidadesMacro,
                    macroproceso:$nom_mac,
                    estado:$est_mac,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/updateMacroproceso",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (!respuesta.error) 
                        {
                        
                            document.getElementById("form_macroproceso").reset();
                            $('#modal_macroproceso').modal('hide');
                            alerta_macroproceso.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_macroproceso").DataTable().ajax.reload(null, false); 
                             inicializaMacroproceso();
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

//eliminar Macroproceso
$('#table_macroproceso tbody').on( 'click', 'deleteMacroproceso', function(){
     
    //recuperando los datos
    var table = $('#table_macroproceso').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
        title: 'Desea eliminar el macroproceso?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            try {

                $.ajax({
                    method: "POST",
                    url: $('#base_url').val()+"/activo/deleteMacroproceso",
                    data: postData,
                    dataType: "JSON"
                })

            
                .done(function(respuesta) {
                
                    if (!respuesta) 
                    {
                        alerta_macroproceso.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        'Eliminado correctamente'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>';

                        $("#table_macroproceso").DataTable().ajax.reload(null, true); 
                    
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

document.getElementById("select_empresaMacro").addEventListener("change",function(){
    // //console.log($('#select_empresaMacro').val());
    if($('#select_empresaMacro').val() != "" ){
        cargarDatosMacroArea($('#select_empresaMacro').val(),"");
    }
    
});
document.getElementById("select_areaMacro").addEventListener("change",function(){
    // //console.log($('#select_areaMacro').val());
    if($('#select_areaMacro').val() != "" ){
        cargarDatosMacroUnidad($('#select_empresaMacro').val(),$('#select_areaMacro').val(),"");
    }
    
});
