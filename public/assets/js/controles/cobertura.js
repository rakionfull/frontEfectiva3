
var alerta_cobertura = document.getElementById("alerta_cobertura");

function LoadTableCobertura($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_cobertura')){
        
        $('#table_cobertura').DataTable().rows().remove();
        $('#table_cobertura').DataTable().destroy();
    
    }

    $('#table_cobertura').DataTable({
        
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
        autoWidth: true,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:10,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/main/getCobertura",
        aoColumns: [
            { "data": "id" },
            { "data": "cobertura" },
            { "data": "descripcion" },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editCobertura class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCobertura>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteCobertura class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCobertura>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
            // { "defaultContent": "<editCobertura class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editCobertura>"+
            // "<deleteCobertura class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteCobertura>"

            //},
        ],
        columnDefs: [
            {
                 "targets": [0],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_cobertura tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
    $("#table_cobertura").DataTable().ajax.reload(null, true); 
}

document.getElementById("btnAgregar_Cobertura").addEventListener("click",function(){

    $("#modal_cobertura").modal("show");
    document.getElementById("title-cobertura").innerHTML = "Agregar Cobertura";
    document.getElementById("form_cobertura").reset();
    document.getElementById("Agregar_Cobertura").style.display = "block";
    document.getElementById("Modificar_Cobertura").style.display = "none";
  
});



// // boton de agregar cobertura
document.getElementById("Agregar_Cobertura").addEventListener("click", function(){
    $nom_cobertura=document.getElementById("nom_cobertura").value;
    $desc_cobertura=document.getElementById("desc_cobertura").value;
    
    
    if($nom_cobertura !=""  && $desc_cobertura != "" ){
      
                
                const postData = { 
                    cobertura : document.getElementById("nom_cobertura").value,
                    descripcion : document.getElementById("desc_cobertura").value,
                   
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/addCobertura",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                     
                        if (respuesta.error==1) 
                        {
                        
                            
                            $("#modal_cobertura").modal("hide");    
                            document.getElementById("form_cobertura").reset();
                           
                            alerta_cobertura.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_cobertura").DataTable().ajax.reload(null, false); 
                           
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

//editar cobertura
$('#table_cobertura tbody').on( 'click', 'editCobertura', function(){
    $("#modal_cobertura").modal("show");
    document.getElementById("title-cobertura").innerHTML = "Modificar Cobertura";
    document.getElementById("form_cobertura").reset();
    document.getElementById("Agregar_Cobertura").style.display = "none";
    document.getElementById("Modificar_Cobertura").style.display = "block";


    var table = $('#table_cobertura').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_cobertura").value=regDat[0]["id"];
        document.getElementById("nom_cobertura").value=regDat[0]["cobertura"];
        document.getElementById("desc_cobertura").value=regDat[0]["descripcion"];   
     
    }
});
//guardando la nueva info
document.getElementById("Modificar_Cobertura").addEventListener("click",async function(){
    
    $nom_cobertura=document.getElementById("nom_cobertura").value;
    $desc_cobertura=document.getElementById("desc_cobertura").value;
    
    
    if($nom_cobertura !=""  && $desc_cobertura != "" ){
       
                
       
                const postData = { 
                    id:document.getElementById("id_cobertura").value,
                    cobertura : document.getElementById("nom_cobertura").value,
                    descripcion : document.getElementById("desc_cobertura").value,
                   
                };
              
                try {
                   
                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/main/updateCobertura",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (!respuesta.error) 
                        {
                        
                            
                            $("#modal_cobertura").modal("hide");    
                            document.getElementById("form_cobertura").reset();
                           
                            alerta_cobertura.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            $("#table_cobertura").DataTable().ajax.reload(null, false); 
                           
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

//eliminar cobertura
$('#table_cobertura tbody').on( 'click', 'deleteCobertura', function(){
     
    //recuperando los datos
    var table = $('#table_cobertura').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/deleteCobertura",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
           
            if (!respuesta.error) 
            {
                
                alerta_cobertura.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                respuesta.msg+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_cobertura").DataTable().ajax.reload(null, true); 
               
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
