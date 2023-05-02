var BASE_URL = document.getElementById("base_url").value;
var alerta_plan = document.getElementById("alerta_plan");



function LoadTable_PlanAccion($create,$update,$delete) {   
    

    if ($.fn.DataTable.isDataTable('#table_planAccion')){
        
        $('#table_planAccion').DataTable().rows().remove();
        $('#table_planAccion').DataTable().destroy();
    
    }

    $('#table_planAccion').DataTable({
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
        
        //ajax: $('#base_url').val()+"/activo/getEstado",
        ajax: BASE_URL+"/activo/getPlanAccion",
        aoColumns: [            
            { "data": "id" },
            { "data": "id" },
            { "data": "id" },
            { "data": "plan_accion" },            
            { "data": "actividades" },
            { "data": "responsable" },            
            { "data": "estado" },
            { "data": "prioridad" },
      
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
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                if($create == 1){
                    return ("<a href='"+BASE_URL+"/verDetalle/"+value.id+"'class='float-right btn btn-primary waves-effect waves-light'>Ver detalle</a>")
                }else return "<i class='fas fa-exclamation-circle text-danger font-size-18'></i>";
               
            }
            },   
            {
                data:null,
                "mRender":function(data){
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<a href='"+BASE_URL+"/modificarPlanAccion/"+data.id+"'class='float-center  btn waves-effect waves-light text-primary'><i class='fas fa-edit font-size-18'></i></a>";
               
                } 
                 if ($delete == '1') {
                    $cadena =     $cadena +  "<deletePlan class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deletePlan>";
                  }
                  if ($update == '0' && $delete==0){
                    return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                }
                return $cadena;
            }
            },       
            // {  "data": "id",
                        
            // "mRender": function(data, type, value) {
            //     return ("<a href='"+BASE_URL+"/modificarPlanAccion/"+value.id+"'class='float-center  waves-effect waves-light'><i class='mdi mdi-pencil font-size-18'></i></a> "+
            //     "<deletePlan class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='mdi mdi-trash-can font-size-18'></i></deletePlan>")
            
            // },   


        //},
        ],
        columnDefs: [
            {
                "targets": [ 0,1,2 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_planAccion tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }

    })

// $('#table_planAccion tbody').on('click', '.verDetalle', function () {

//         var data = $('#table_planAccion').DataTable().row($(this).parents('tr')).data();
//         var id = data.id;
//         window.location.href = 'verDetalle?id=' + id;
// });    
   
}
window.addEventListener("load", () => { 
    LoadTable_PlanAccion($('#create').val(),$('#update').val(),$('#delete').val());
});

$('#table_planAccion tbody').on( 'click', 'deletePlan', function(){
     
    //recuperando los datos
    var table = $('#table_planAccion').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
        title: 'Desea eliminar el plan de acción?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/activo/deletePlanAccion",
                        data: postData,
                        dataType: "JSON"
                    })

                
                    .done(function(respuesta) {
                        console.log(respuesta);
                        if (respuesta.msg) 
                        {
                        
                            alerta_plan.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                            respuesta.msg+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>';
                            
                            $("#table_planAccion").DataTable().ajax.reload(null, true); 
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