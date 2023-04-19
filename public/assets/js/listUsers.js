
function LoadTableUsers($est) {
    
    if ($.fn.DataTable.isDataTable('#table_users')){
        
        $('#table_users').DataTable().rows().remove();
        $('#table_users').DataTable().destroy();
    
    }
    var table = $('#table_users').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
            "infoEmpty":  "Mostrando 0 a 0 de 0 Registros",
            "infoFiltered": "(Filtrado de _MAX_ total Registros)",
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
        autoWidth: true,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:10,
        clickToSelect:false,
        ajax: $('#base_url').val()+"/main/getUsers/"+$est,
        aoColumns: [
            { "data": "id" },
            { "data": "nombres_us"},
            {  "data": "apepat_us",
                "bSortable": false,
                "mRender": function(data, type, value) {

                return  value["apepat_us"]+" "+value["apemat_us"];
                
                

                }
            },
            
            { "data": "usuario_us" },
            {  "data": "creacion_us",
                "bSortable": false,
                "mRender": function(data, type, value) {

                    return  data.split(" ")[0].split("-").reverse().join("-");
                    
                    

                }
            },
            {  "data": "bloqueo_us",
                        
            "mRender": function(data, type, value) {
                if (data == '1' ) return  'Bloqueado';
                else return 'Desbloqueado'
                  

            }
            },
            {  "data": "estado_us",
                        
                        "mRender": function(data, type, value) {
                            if (data == '1') return  'Activo';
                            else return 'Inactivo'
                              
    
                        }
                    },
            {  "data": "loged",
                   
                    "mRender": function(data, type, value) {
                        if (data == '1') return  "<span class='badge badge-primary font-size-12'>Conectado</span>";
                        else return "<span class='badge badge-danger font-size-12'>Desconectado</span>";
                          

                    }
            },
            { "data": "id",
                "bSortable": false,
                    "mRender": function(data, type, value) {
                        $cadena = "";
                        if($('#edit').val() == 1){
                            $cadena = $cadena + "<a href='"+ $('#base_url').val() + "/modifyUser/"+ data +"' class='mr-3 text-primary' data-toggle='tooltip' data-placement='top' title='' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></a>";
                        }
                        if($('#delete').val() == 1){
                            $cadena = $cadena +   "<a href='"+ $('#base_url').val() + "/deleteUser/"+ data +"' class='mr-3 text-danger' data-toggle='tooltip' data-placement='top' title='' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></a>";
                        }
                        $cadena = $cadena +  "<a href='' id='estado_"+ data + "_"+ value["bloqueo_us"] +"' onclick='changeEstadoUser(this, event)'  class='mr-3 text-info' data-toggle='tooltip' data-placement='top' title='' data-original-title='Cambio de Estado'><i class='fas fa-ban font-size-18'></i></a>";
                   
                        if ($('#edit').val() == '0' && $('#delete').val()==0){
                            return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                        }
                        return $cadena;     
                   
                  

                }
            },
    
        ],
        columnDefs: [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_users tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    });
    $("#table_users").DataTable().ajax.reload(null, false); 
}

window.addEventListener("load", () => {
    LoadTableUsers('all');

});
//cambiar estado del usuario
function EjecutarChangeUser(id,estado){
    console.log(estado);
    try {
        const postData = { 
            id_us:id,
            estado_us:estado,
        };
      
        try {

            $.ajax({
                method: "POST",
                url: $('#base_url').val() +"/main/updateEstadoUser",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
            //    console.log(data);
                if(estado==0){
                    Swal.fire('Listo','Desbloqueado','success');
                    $("#table_users").DataTable().ajax.reload(null, false); 
                }else{
                    Swal.fire('Listo','Bloqueado','success');
                    $("#table_users").DataTable().ajax.reload(null, false); 
                }
                
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cambiar estado, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cambiar estado, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    }
    catch(err) {
       
    }
}
function changeEstadoUser(elemento){
    event.preventDefault();
    let usuario = elemento.id.split('_');
    var dato = usuario[1];
    var estado = usuario[2];
    $msg = "";
    if(estado ==  0){
        $msg = 'Bloquear';
    }else{
        $msg = 'Desbloquear';
    }
    //console.log(elemento.id);
    Swal.fire({
        title: 'Bloqueo',
        text: $msg+" Usuario",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(55 157 52)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        
                if (result.isConfirmed) {
                   

                   if(estado == 0){
                    estado=1;
                   }else{
                    estado=0;
                   }
                  
                     EjecutarChangeUser(dato,estado);
                   
                       
                    
                    
                } 

      })
    
    
};

// listado por combobox
document.getElementById("select_estado").addEventListener("change",function(){
    $value=$('#select_estado').val();
    LoadTableUsers($value);
});

document.getElementById("descarga_users").addEventListener("click",function(){
    event.preventDefault();
    // console.log('liock en report');
    const postData = { 

    };
    try {
        $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/main/reporteUsuarios",
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