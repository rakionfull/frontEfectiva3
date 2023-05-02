var alerta_estado = document.getElementById("alert_estado");
function LoadTableEstado($update,$delete) {   
    if ($.fn.DataTable.isDataTable('#table_estado')){
        
        $('#table_estado').DataTable().rows().remove();
        $('#table_estado').DataTable().destroy();
    
    }

    $('#table_estado').DataTable({
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
        // scrollY: "200px",
        // fixedColumns:   {
        //     heightMatch: 'none'
        // },
        responsive: true,
        autoWidth: false,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:5,
        clickToSelect:false,
        
        //ajax: $('#base_url').val()+"/activo/getEstado",
        ajax: BASE_URL+"/activo/getEstado",
        aoColumns: [            
            { "data": "id" },
            { "data": "id" },
            { "data": "estado" },
            { "data": "estado" },                       
            { "data": "descripcion",
            
            /*"mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }*/
            },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editEstado class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editEstado>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteEstado class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteEstado>";
              
                }  
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;

                }
            },   
//             { "defaultContent": "<editEstado class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editEstado>"+
//             "<deleteEstado class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deleteEstado>"

// },
        ],
        columnDefs: [
            {
                "targets": [ 0,1,2 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_estado tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}


//estado
document.getElementById("btnAgregar_estado").addEventListener("click",function(){
                                
    $("#modal_estado").modal("show");    
    document.getElementById("title-estado").innerHTML = "Agregar";
    document.getElementById("form_estado").reset();
    document.getElementById("Agregar_estado").style.display = "block";
    document.getElementById("Modificar_estado").style.display = "none";
});

document.getElementById("Agregar_estado").addEventListener("click",function(){
    $nom_est=document.getElementById("nom_est").value;    
    $des_est=document.getElementById("des_est").value;
    
    if($nom_est !=""  && $des_est != ""){
       
                const postData = { 
                    estado:$nom_est,
                    descripcion:$des_est,                    
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        //url: BASE_URL+"/activo/addEstado",
                        url: BASE_URL+"/activo/addEstado",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        // console.log(respuesta);
                         if (respuesta.error==1) 
                         {
                             document.getElementById("form_estado").reset();
                             $('#modal_estado').modal('hide');
                             alerta_estado.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                             +  respuesta.msg +
                             '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                 '<span aria-hidden="true">&times;</span>'+
                                 '</button>'+
                             '</div>';
                             $("#table_estado").DataTable().ajax.reload(null, false); 
                            
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


$('#table_estado tbody').on( 'click', 'editEstado', function(){
    $("#modal_estado").modal("show");
    document.getElementById("title-estado").innerHTML = "Modificar";
    document.getElementById("form_estado").reset();
    document.getElementById("Agregar_estado").style.display = "none";
    document.getElementById("Modificar_estado").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_estado').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_estado").value=regDat[0]["id"];
        document.getElementById("nom_est").value=regDat[0]["estado"];        
        document.getElementById("des_est").value=regDat[0]["descripcion"];
     
    }
});

document.getElementById("Modificar_estado").addEventListener("click", function(){
    
    $nom_est=document.getElementById("nom_est").value;    
    $des_est=document.getElementById("des_est").value;
    
    
    if($nom_est !="" && $des_est != ""){
       
                const postData = { 
                    id:document.getElementById("id_estado").value,
                    estado:$nom_est,                    
                    descripcion:$des_est,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        //url: BASE_URL+"/activo/updateEstado",
                        url: BASE_URL+"/activo/updateEstado",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (!respuesta.error) 
                         {
                             document.getElementById("form_estado").reset();
                             $('#modal_estado').modal('hide');
                             alerta_estado.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                             +  respuesta.msg +
                             '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                 '<span aria-hidden="true">&times;</span>'+
                                 '</button>'+
                             '</div>';
                             $("#table_estado").DataTable().ajax.reload(null, false); 
                            
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



$('#table_estado tbody').on( 'click', 'deleteEstado', function(){
     
    //recuperando los datos
    var table = $('#table_estado').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
        title: 'Desea eliminar el estado?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/deleteEstado",
                        data: postData,
                        dataType: "JSON"
                    })

                
                    .done(function(respuesta) {
                
                        if (!respuesta.error) 
                        {
                            
                            alerta_estado.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';

                            $("#table_estado").DataTable().ajax.reload(null, true); 
                        
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
                    // alert("Error en el try");
                }
            } else if (result.isDenied) {
                Swal.fire('No hubo ningún cambio', '', 'info')
          }
      })
});



