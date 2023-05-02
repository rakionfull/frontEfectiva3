var alerta_prioridad = document.getElementById("alert_prioridad");

function LoadTablePrioridad($update,$delete) {
   
    if ($.fn.DataTable.isDataTable('#table_prioridad')){
        
        $('#table_prioridad').DataTable().rows().remove();
        $('#table_prioridad').DataTable().destroy();
    
    }

    $('#table_prioridad').DataTable({
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
        ajax: BASE_URL+"/activo/getPrioridad",
        aoColumns: [            
            { "data": "id" },    
            { "data": "id" },                        
            { "data": "prioridad" },                                   
            { "data": "prioridad" },                                   
            { "data": "decripcion"},            
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editPrioridad class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editPrioridad>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deletePrioridad class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deletePrioridad>";
              
                }
                if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
                

                }
            },
//             { "defaultContent": "<editPrioridad class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='mdi mdi-pencil font-size-18'></i></editPrioridad>"+
//             "<deletePrioridad class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deletePrioridad>"

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
            $( 'table_prioridad tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

// Prioridad
document.getElementById("btnAgregar_prioridad").addEventListener("click",function(){
                                
    $("#modal_prioridad").modal("show");    
    document.getElementById("title-prioridad").innerHTML = "Agregar";
    document.getElementById("form_prioridad").reset();
    document.getElementById("Agregar_prioridad").style.display = "block";
    document.getElementById("Modificar_prioridad").style.display = "none";
});

// Agregar
document.getElementById("Agregar_prioridad").addEventListener("click",function(){
    $nom_pri=document.getElementById("nom_pri").value;    
    $des_pri=document.getElementById("des_pri").value;
    
    if($nom_pri !=""  && $des_pri != ""){
       
                const postData = { 
                    prioridad:$nom_pri,                    
                    decripcion:$des_pri,
                    
                };
               
                try {

                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/addPrioridad",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                        // console.log(respuesta);
                         if (respuesta.error==1) 
                         {
                             document.getElementById("form_prioridad").reset();
                             $('#modal_prioridad').modal('hide');
                             alerta_prioridad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                             +  respuesta.msg +
                             '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                 '<span aria-hidden="true">&times;</span>'+
                                 '</button>'+
                             '</div>';
                             $("#table_prioridad").DataTable().ajax.reload(null, false); 
                            
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


//Editar
$('#table_prioridad tbody').on( 'click', 'editPrioridad', function(){
    $("#modal_prioridad").modal("show");
    document.getElementById("title-prioridad").innerHTML = "Modificar";
    document.getElementById("form_prioridad").reset();
    document.getElementById("Agregar_prioridad").style.display = "none";
    document.getElementById("Modificar_prioridad").style.display = "block";  

   
    //recuperando los datos
    var table = $('#table_prioridad').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_prioridad").value=regDat[0]["id"];
        document.getElementById("nom_pri").value=regDat[0]["prioridad"];        
        document.getElementById("des_pri").value=regDat[0]["decripcion"];
     
    }
});

document.getElementById("Modificar_prioridad").addEventListener("click", function(){
    
    $nom_pri=document.getElementById("nom_pri").value;    
    $des_pri=document.getElementById("des_pri").value;
    
    
    if($nom_pri !="" && $des_pri != ""){
       
                const postData = { 
                    id:document.getElementById("id_prioridad").value,
                    prioridad:$nom_pri,                    
                    decripcion:$des_pri,
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        //url: BASE_URL+"/activo/addPrioridad",
                        url: BASE_URL+"/activo/updatePrioridad",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                        if (!respuesta.error) 
                         {
                             document.getElementById("form_prioridad").reset();
                             $('#modal_prioridad').modal('hide');
                             alerta_prioridad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                             +  respuesta.msg +
                             '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                 '<span aria-hidden="true">&times;</span>'+
                                 '</button>'+
                             '</div>';
                             $("#table_prioridad").DataTable().ajax.reload(null, false); 
                            
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

//Eliminar
$('#table_prioridad tbody').on( 'click', 'deletePrioridad', function(){
     
    //recuperando los datos
    var table = $('#table_prioridad').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    
    try {

        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/deletePrioridad",
            data: postData,
            dataType: "JSON"
        })

     
        .done(function(respuesta) {
        //  console.log(respuesta);
            if (!respuesta.error) 
            {
                
                alerta_prioridad.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                 respuesta.msg +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>';

                $("#table_prioridad").DataTable().ajax.reload(null, true); 
               
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
