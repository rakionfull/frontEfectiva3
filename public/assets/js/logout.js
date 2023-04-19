
document.getElementById("btn_Logout").addEventListener("click",function(){
    event.preventDefault();
                const postData = { 
                 
                };
              
                try {

                    $.ajax({
                        method: "POST",
                        url: $('#base_url').val()+"/logout",
                        data: postData,
                        dataType: "JSON"
                    })
                    .done(function(respuesta) {
                       
                       if(respuesta.dato){
                        Swal.fire({
                            title: "Éxito!!",
                            text:  "Deslogueo normal por sistema",
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonText: "Ok",
                            cancelButtonText: "Cancelar",
                        })
                        .then(resultado => {
                            if (resultado.value) {
                                    window.location.href = $('#base_url').val()+"/iniciosesion"
                            } 
                        });
                        //setTimeout( function() { window.location.href = BASE_URL+"/login"; }, 2000 );
                       }
                               
                                              
                    })
                    .fail(function(error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo Cerrar Sesion, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                        });
                        window.location.href = $('#base_url').val()+"/iniciosesion"
                    })
                    .always(function() {
                    });
                }
                catch(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo Cerrar Sesion, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                    });
                    window.location.href = $('#base_url').val()+"/iniciosesion"
                }
            

   


});