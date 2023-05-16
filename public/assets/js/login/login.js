var BASE_URL = document.getElementById("base_url").value;
window.addEventListener("load", () => {
 
 });
 document.getElementById("btn_Acceder").addEventListener("click",function(){
    event.preventDefault();
    $username=document.getElementById("username").value;
    $pass=document.getElementById("pass").value;
   

    if($username !=""  && $pass != ""){
       
                const postData = { 
                    username:$username,
                    pass:$pass,
                 
                    
                };
          
                try {
                    $('#spinner-div').show();//Load button clicked show spinner
                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/auth/validaCaptcha",
                        data: postData,
                        dataType: "JSON"
                    })
                    
                    .done(function(respuesta) {
                        
                        $('#spinner-div').hide();//Request is complete so hide spinner
                        $('.alert').remove()
                       // //console.log(respuesta);
                        if(respuesta.error){
                            
                            document.getElementById("form_login").reset();
                           
                            $("#alert_login").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                            respuesta.error+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                             '</button>'+
                             '</div>'
                            );
                          
                        }else{
                            if (!respuesta.password) 
                            {
                                if(respuesta.change==0){
                                    Swal.fire({
                                        title: "Cambio de clave!!",
                                        text:  respuesta.msg,
                                        icon: 'warning',
                                        showCancelButton: false,
                                        confirmButtonText: "Ok",
                                        cancelButtonText: "Cancelar",
                                    })
                                    .then(resultado => {
                                        if (resultado.value) {
                                                window.location.href = BASE_URL+"/change_pass"
                                        } 
                                    });
                                    // Swal.fire(
                                    //     'Cambio de clave!!',
                                    //      respuesta.msg,
                                    //     'warning'
                                    //   );
                                    // setTimeout( function() { window.location.href = BASE_URL+"/change_pass"; }, 3000 );
                                   
                                }else{
                                    Swal.fire({
                                            title: "Éxito!!",
                                            text: "Logueado correctamente",
                                            icon: 'success',
                                            showCancelButton: false,
                                            confirmButtonText: "Ok",
                                            cancelButtonText: "Cancelar",
                                        })
                                        .then(resultado => {
                                            if (resultado.value) {
                                                    window.location.href = BASE_URL+"/inicio"
                                            } 
                                        });
                                    // Swal.fire(
                                    //     'Exito!!',
                                    //     'Logeado Correctamente',
                                    //     'success'
                                    //   );
                                    //setTimeout( function() { window.location.href = BASE_URL+"/inicio"; }, 2000 );
                                   
                                }
                                
                               
                                                       
                            }else{
                                //credenciales incorrectas
                                document.getElementById("form_login").reset();
                                $("#alert_login").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                                respuesta.password+
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                    '<span aria-hidden="true">&times;</span>'+
                                    '</button>'+
                                '</div>');
                               
                            }

                        }
                        
                        
                    })
                    .fail(function(error) {
                        $('#spinner-div').hide();//Request is complete so hide spinner
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo iniciar sesión, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema'
                          })
                    })
                    .always(function() {
                       
                    });
                }
                catch(err) {
                    $('#spinner-div').hide();//Request is complete so hide spinner
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo iniciar sesión, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema'
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