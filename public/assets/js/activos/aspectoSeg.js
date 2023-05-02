var alerta_aspectoSeg = document.getElementById("alert_aspectoSeg");
function LoadTableAspectoSeg($update,$delete) {
    if ($.fn.DataTable.isDataTable('#table_aspectoSeg')){
        
        $('#table_aspectoSeg').DataTable().rows().remove();
        $('#table_aspectoSeg').DataTable().destroy();
    
    }

    $('#table_aspectoSeg').DataTable({
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
        ajax: $('#base_url').val()+"/activo/getAspectoSeg",
        aoColumns: [
            { "data": "id" },
            { "data": "aspecto" },
            { "data": "estado",
                        
            "mRender": function(data, type, value) {
                if (data == '1') return  'Activo';
                else return 'Inactivo'
                  

                }
            },
            {  "data": "id",
                        
            "mRender": function(data, type, value) {
                $cadena = "";
                if ($update == '1'){
                    $cadena =   $cadena +  "<editAspectoSeg class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAspectoSeg>";
               
                } 
                if ($delete == '1') {
                    $cadena =     $cadena +  "<deleteAspectoSeg class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAspectoSeg>";
              
                }
                if ($update == '0' && $delete==0){
                  return "<i class='fas fa-exclamation-circle text-danger font-size-18' title='No tiene permisos'></i>";
                 }
              return $cadena;
                

                }
            },
            //{ "defaultContent": "<editAspectoSeg class='text-primary btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Editar' data-original-title='Editar'><i class='fas fa-edit font-size-18'></i></editAspectoSeg>"+
//             "<deleteAspectoSeg class='text-danger btn btn-opcionTabla' data-toggle='tooltip' data-placement='top' title='Eliminar' data-original-title='Eliminar'><i class='far fa-trash-alt font-size-18'></i></deleteAspectoSeg>"

// },
        ],
        columnDefs: [
            {
                 "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_aspectoSeg tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   
}

//validamos
async function validacionApectoSeg(dato){

    let result; /* Variable Resultado de Funcion */

    // Validar existe
        try {

            const postData = {           
                aspecto : dato
            };

            await $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/validarApectoSeg",
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

document.getElementById("btnAgregar_AspectoSeg").addEventListener("click",function(){
                                
    $("#modal_aspectoSeg").modal("show");
    document.getElementById("title-aspectoSeg").innerHTML = "Agregar Aspectos de Seguridad";
    document.getElementById("form_aspectoSeg").reset();
    document.getElementById("Agregar_AspectoSeg").style.display = "block";
    document.getElementById("Modificar_AspectoSeg").style.display = "none";
});


// // boton de agregar Aspectos de Seguridad
document.getElementById("Agregar_AspectoSeg").addEventListener("click", async () => {
    const nom_asp = document.getElementById("nom_aspecto").value;
    const est_asp = document.getElementById("est_aspecto").value;
  
    if (nom_asp !== "" && est_asp !== "") {
      if (!(await validacionApectoSeg(nom_asp))) {
        const postData = { 
          aspecto: nom_asp,
          estado: est_asp
        };
  
        try {
          $.ajax({
            method: "POST",
            url: `${$('#base_url').val()}/activo/addAspectoSeg`,
            data: postData,
            dataType: "JSON"
          })
          .done(respuesta => {
            if (respuesta) {
              document.getElementById("form_aspectoSeg").reset();
              $('#modal_aspectoSeg').modal('hide');
              alerta_aspectoSeg.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                Aspecto Registrado
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>`;
              $("#table_aspectoSeg").DataTable().ajax.reload(null, false); 
            } 
          })
          .fail(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo agregar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            });
          })
          .always(() => {});
        }
        catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El aspecto de seguridad ya se encuentra registrado'
        });
      }  
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Faltan Datos'
      });
    }
  });
  




//editar Aspecto de Seguridad
$('#table_aspectoSeg tbody').on( 'click', 'editAspectoSeg', function(){
    $("#modal_aspectoSeg").modal("show");
    document.getElementById("title-aspectoSeg").innerHTML = "Modificar Aspectos de Seguridad";
    document.getElementById("form_aspectoSeg").reset();
    document.getElementById("Agregar_AspectoSeg").style.display = "none";
    document.getElementById("Modificar_AspectoSeg").style.display = "block";
   
    //recuperando los datos
    var table = $('#table_aspectoSeg').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    if (regNum == '0') {
        //console.log("error");
    }else{
        document.getElementById("id_aspecto").value=regDat[0]["id"];
        document.getElementById("nom_aspecto").value=regDat[0]["aspecto"];
        document.getElementById("est_aspecto").value=regDat[0]["estado"];
     
    }
});

//guardando la nueva info


    // document.getElementById("Modificar_AspectoSeg").addEventListener("click", async function () {
  
    //   $nom_asp = document.getElementById("nom_aspecto").value;
  
    //   $est_asp = document.getElementById("est_aspecto").value;
  
    //   if ($nom_asp != "" && $est_asp != "") {
  
    //     const postData = {
    //       id: document.getElementById("id_aspecto").value,
    //       aspecto: $nom_asp,
    //       estado: $est_asp,
    //     };
  
    //     try {
  
    //       // const respuesta = await $.ajax({
    //       //   method: "POST",
    //       //   url: $('#base_url').val() + "/activo/validacionApectoSeg",
    //       //   data: postData,
    //       //   dataType: "JSON"
    //       // });
  
    //       // if (respuesta.existe) {
    //       //   Swal.fire({
    //       //     icon: 'warning',
    //       //     title: 'Atención',
    //       //     text: 'Ya existe un aspecto de seguridad con ese nombre.',
    //       //   });
    //       // } else {
  
    //         // try {
  
    //         //   const respuesta = await $.ajax({
    //         //     method: "POST",
    //         //     url: $('#base_url').val() + "/activo/updateAspectoSeg",
    //         //     data: postData,
    //         //     dataType: "JSON"
    //         //   });
  
    //           if (respuesta) {
    //             document.getElementById("form_aspectoSeg").reset();
    //             $('#modal_aspectoSeg').modal('hide');
    //             alerta_aspectoSeg.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
    //               'Aspecto de Seguridad Modificado' +
    //               '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
    //               '<span aria-hidden="true">&times;</span>' +
    //               '</button>' +
    //               '</div>';
    //             $("#table_aspectoSeg").DataTable().ajax.reload(null, false);
  
    //           }
  
    //         // } catch (error) {
    //         //   Swal.fire({
    //         //     icon: 'error',
    //         //     title: 'Error',
    //         //     text: 'No se pudo editar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
    //         //   })
    //         // }
  
    //       //}
  
    //     } catch (error) {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'Ya existe un aspecto de seguridad con ese nombre.'
    //       })
    //     }
  
    //   } else {
    //     console.log("aqui3");
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error',
    //       text: 'Faltan Datos'
    //     })
    //   }
  
    // });
    document.getElementById("Modificar_AspectoSeg").addEventListener("click", async function () {
  
      $nom_asp = document.getElementById("nom_aspecto").value;
  
      $est_asp = document.getElementById("est_aspecto").value;
  
      if ($nom_asp != "" && $est_asp != "") {
  
        const postData = {
          id: document.getElementById("id_aspecto").value,
          aspecto: $nom_asp,
          estado: $est_asp,
        };
  
        try {
  
          $.ajax({
            method: "POST",
            url: $('#base_url').val()+"/activo/updateAspectoSeg",
            data: postData,
            dataType: "JSON"
          }) 
          .done(function(respuesta) {
            console.log(respuesta);
              if (!respuesta.error) 
              {
                  document.getElementById("form_aspectoSeg").reset();
                  $('#modal_aspectoSeg').modal('hide');
                  alerta_aspectoSeg.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                    'Aspecto de seguridad modificado' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '</div>';
                  $("#table_aspectoSeg").DataTable().ajax.reload(null, false);

            
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
             
  
            // } catch (error) {
            //   Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: 'No se pudo editar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            //   })
            // }
  
          //}
  
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un aspecto de seguridad con ese nombre.'
          })
        }
  
      } else {
        console.log("aqui3");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Faltan Datos'
        })
      }
  
    });
  

//eliminar aspecto de segudidad
$('#table_aspectoSeg tbody').on( 'click', 'deleteAspectoSeg', function(){
     
    //recuperando los datos
    var table = $('#table_aspectoSeg').DataTable();
    var regNum = table.rows( $(this).parents('tr') ).count().toString();
    var regDat = table.rows( $(this).parents('tr') ).data().toArray();
    const postData = { 
        id:regDat[0]["id"],
 
    };
    Swal.fire({
      title: 'Desea eliminar el aspecto de seguridad?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {

            $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/activo/deleteAspectoSeg",
                data: postData,
                dataType: "JSON"
            })

        
            .done(function(respuesta) {
              console.log(respuesta);
                if (!respuesta) 
                {
                    
                    alerta_aspectoSeg.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                    'Eliminado correctamente'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>';

                    $("#table_aspectoSeg").DataTable().ajax.reload(null, true); 
                  
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
