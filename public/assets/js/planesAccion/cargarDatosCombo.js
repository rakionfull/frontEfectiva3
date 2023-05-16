var BASE_URL = $('#base_url').val();

function  cargarDatosPosEmpresa(){
       
try {
    $('#spinner-div').show();
    $.ajax({
        method: "POST",
        url: BASE_URL+"/activo/getEmpresasByActivo",
        dataType: "JSON"
    })
    .done(function(respuesta) {
        $('#spinner-div').hide();
       //////console.log(respuesta);
        if (respuesta) 
        {
            let datos = respuesta;
            $("#id_empresa_pos").empty();
            $("#id_empresa_pos").append('<option value="" selected>Empresa</option>');

            // document.getElementById('id_comboEmpresa').disabled  = true;
            // $("#id_comboEmpresa").empty();
            // $("#id_comboEmpresa").append('<option value="" selected>Empresa</option>');


            datos.data.forEach(dato => {

                    if(idempresa == dato['id']){
                        $("#id_empresa_pos").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');
                       // $("#id_comboEmpresa").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');
                    
                    }else{
                        $("#id_empresa_pos").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');
                       // $("#id_comboEmpresa").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');
                    
                    }
                
            
            });
        } 
        else
        {  }
    
    })
    .fail(function(error) {
       
    })
    .always(function() {
    }); 
} catch (error) {
    
}
    //cargando las empresas
         
    
}

function cargarDatosPosArea($empresa,$dato) {
        //cargando las areas
        try {
            $('#spinner-div').show();
            const postData = { 
                idempresa:$empresa,
               
                
            }
            //////console.log(postData);
                $.ajax({
                    method: "POST",
                    url: BASE_URL+"/activo/getAreasByActivo",
                    dataType: "JSON",
                    data: postData
                })
                .done(function(respuesta) {
                    //////console.log(respuesta);
                    $('#spinner-div').hide();
                    if (respuesta) 
                    {
                        let datos = respuesta;
                    
        
                       
                        $("#id_area_pos").empty();
                        $("#id_area_pos").append('<option value="" selected>Area</option>');
                        
                        
                        // document.getElementById('id_comboArea').disabled  = true;
                        // $("#id_comboArea").empty();
                        // $("#id_comboArea").append('<option value="" selected>Area</option>');
                
                
                        datos.data.forEach(dato => {
                            if(dato["id"] == $dato){
                        
                                $("#id_area_pos").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                                //$("#id_comboArea").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                            
                            }else{
                                $("#id_area_pos").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
                                //$("#id_comboArea").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
                           
                            }
                            
                            
                        
                        });
                    } 
                    else
                    {  }
        
            })
            .fail(function(error) {
              
            })
            .always(function() {
            });  
        } catch (error) {
            
        }
        
}

function cargarDatosPosUnidad($empresa,$idarea,$dato) {

    try {
        $('#spinner-div').show();
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
            $('#spinner-div').hide();
            if (respuesta) 
            {
                let datos = respuesta;
            

                $("#id_unidad_pos").empty();
                $("#id_unidad_pos").append('<option value="" selected>Unidad</option>');
                
                
                // $("#id_comboUnidades").empty();
                // $("#id_comboUnidades").append('<option value="" selected>Unidad</option>');
        
            
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_unidad_pos").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
                       // $("#id_comboUnidades").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
        

                    }else{
                        $("#id_unidad_pos").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>'); 
                       // $("#id_comboUnidades").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>'); 
                    
                    }
                    
                
                });
            } 
            else
            {  }

        })
        .fail(function(error) {
           
        })
        .always(function() {
        });
    } catch (error) {
        
    }
       

}


function cargarDatosPosPosicion($empresa,$idarea,$idunidad,$dato) {
    //cargando las areas
    try {
        $('#spinner-div').show();
        const postData = { 
            idempresa:$empresa,
            idarea:$idarea,
            idunidad:$idunidad,
            // empresa:$empresa,
            // area:$area,
            // unidad:$unidad,
        } 
        // //////console.log("hola");
        //////console.log(postData);
            $.ajax({
                method: "POST",
                url: BASE_URL+"/activo/getPosicionByUnidad",
                // url: BASE_URL+"/activo/getPosicionByArea",
                dataType: "JSON",
                data: postData
            })
            .done(function(respuesta) {
                $('#spinner-div').hide();
                 //////console.log(respuesta);
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    $("#id_puesto").empty();
                    $("#id_puesto").append('<option value="" selected>Posicion/Puesto</option>');
                    
                    
                    // $("#id_comboPosicion").empty();
                    // $("#id_comboPosicion").append('<option value="" selected>Posicion/Puesto</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id_pos"] == $dato){
                    
                            $("#id_puesto").append('<option value='+dato["id_pos"]+' selected>'+dato["posicion_puesto"]+'</option>');
                           // $("#id_comboPosicion").append('<option value='+dato["id_pos"]+' selected>'+dato["posicion_puesto"]+'</option>');
                        
                        }else{
                            $("#id_puesto").append('<option value='+dato["id_pos"]+'>'+dato["posicion_puesto"]+'</option>');
                           // $("#id_comboPosicion").append('<option value='+dato["id_pos"]+'>'+dato["posicion_puesto"]+'</option>');
                        
                        }
                        
                        
                    
                    });
                } 
                else
                {  }
    
        })
        .fail(function(error) {
            
        })
        .always(function() {
        });
    } catch (error) {
        
    }
      
}
// function cargarDatosPosPosicion($empresa,$dato) {
//     //cargando las areas
//     const postData = { 
//         //idempresa:$empresa,
//         empresa:$empresa,
//         area:$area,
//         unidad:$unidad,
//     } 
//     // //////console.log("hola");
//     //////console.log(postData);
//         $.ajax({
//             method: "POST",
//             url: BASE_URL+"/activo/getPosicionByActivo",
//             url: BASE_URL+"/activo/getPosicionByArea",
//             dataType: "JSON",
//             data: postData
//         })
//         .done(function(respuesta) {
//              //////console.log(respuesta);
//             if (respuesta) 
//             {
//                 let datos = respuesta;
            

               
//                 $("#id_puesto").empty();
//                 $("#id_puesto").append('<option value="" selected>Posicion/Puesto</option>');
        
            
        
//                 datos.data.forEach(dato => {
//                     if(dato["id_pos"] == $dato){
                
//                         $("#id_puesto").append('<option value='+dato["id_pos"]+' selected>'+dato["posicion_puesto"]+'</option>');
//                     }else{
//                         $("#id_puesto").append('<option value='+dato["id_pos"]+'>'+dato["posicion_puesto"]+'</option>');
//                     }
                    
                    
                
//                 });
//             } 
//             else
//             {  }

//     })
//     .fail(function(error) {
        
//     })
//     .always(function() {
//     });   
// }


function cargarDatosPosNombre($empresa,$area,$idunidad,$posicion,$dato) {
    //console.log($empresa,$area,$idunidad,$posicion);
    //cargando Nombre
    try {
        $('#spinner-div').show();
        const postData = { 
            idempresa:$empresa,
            idarea:$area,
            idunidad:$idunidad,
            idposicion:$posicion
            
        }
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getUserByActivo",
            dataType: "JSON",
            data: postData
        })
        .done(function(respuesta) {
            //console.log(respuesta);
            $('#spinner-div').hide();
            if (respuesta) 
            {
                let datos = respuesta;
            

               
                $("#id_nombre_pos").empty();
                $("#id_nombre_pos").append('<option value="" selected>Responsable</option>');
        
                // $("#id_comboUsers").empty();
                // $("#id_comboUsers").append('<option value="" selected>Responsable</option>');
        
                datos.data.forEach(dato => {
                    if(dato["id_us"] == $dato){
                
                        $("#id_nombre_pos").append('<option value='+dato["id_us"]+' selected>'+dato["nombres_us"]+'</option>');
                     //   $("#id_comboUsers").append('<option value='+dato["id_us"]+' selected>'+dato["nombres_us"]+'</option>');
                    
                    }else{
                        $("#id_nombre_pos").append('<option value='+dato["id_us"]+'>'+dato["nombres_us"]+'</option>');
                       // $("#id_comboUsers").append('<option value='+dato["id_us"]+' >'+dato["nombres_us"]+'</option>');
                    
                    }
                    
                    
                
                });
            } 
            else
            {  }

    })
    .fail(function(error) {
        
    })
    .always(function() {
    });   
    } catch (error) {
        
    }
    
    // //////console.log(postData);
       
}

function cargarDatosPosEstado($empresa,$dato) {
    //cargando las areas
    try {
        $('#spinner-div').show();
        const postData = { 
            idempresa:$empresa,
           
            
        }
        // //////console.log(postData);
            $.ajax({
                method: "POST",
                url: BASE_URL+"/activo/getEstadoByActivo",
                dataType: "JSON",
                data: postData
            })
            .done(function(respuesta) {
                $('#spinner-div').hide();
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    $("#id_estado_pos").empty();
                    $("#id_estado_pos").append('<option value="" selected>Estado</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id"] == $dato){
                    
                            $("#id_estado_pos").append('<option value='+dato["id"]+' selected>'+dato["estado"]+'</option>');
                        }else{
                            $("#id_estado_pos").append('<option value='+dato["id"]+'>'+dato["estado"]+'</option>');
                        }
                        
                        
                    
                    });
                } 
                else
                {  }
    
        })
        .fail(function(error) {
           
        })
        .always(function() {
        });  
    } catch (error) {
        
    }
    
}

function cargarDatosPosPrioridad($empresa,$dato) {
    //cargando las areas
   
        
        try {
            $('#spinner-div').show();
            const postData = { 
                idempresa:$empresa,
               
                
            }
            // //////console.log(postData);
                $.ajax({
                    method: "POST",
                    url: BASE_URL+"/activo/getPrioridadByActivo",
                    dataType: "JSON",
                    data: postData
                })
                .done(function(respuesta) {
                    $('#spinner-div').hide();
                    if (respuesta) 
                    {
                        let datos = respuesta;
                    
        
                       
                        $("#id_prioridad_pos").empty();
                        $("#id_prioridad_pos").append('<option value="" selected>Prioridad</option>');
                
                    
                
                        datos.data.forEach(dato => {
                            if(dato["id"] == $dato){
                        
                                $("#id_prioridad_pos").append('<option value='+dato["id"]+' selected>'+dato["prioridad"]+'</option>');
                            }else{
                                $("#id_prioridad_pos").append('<option value='+dato["id"]+'>'+dato["prioridad"]+'</option>');
                            }
                            
                            
                        
                        });
                    } 
                    else
                    {  }
        
            })
            .fail(function(error) {
              
            })
            .always(function() {
            });   
        } catch (error) {
            
        }
    
}

function cargarDatosPosAlerta($empresa,$dato) {
    //cargando las areas
    try {
        $('#spinner-div').show();
// //////console.log(postData);
            const postData = { 
                idempresa:$empresa,
            
                
            }
            $.ajax({
                method: "POST",
                url: BASE_URL+"/activo/getAlertaByActivo",
                dataType: "JSON",
                data: postData
            })
            .done(function(respuesta) {
                $('#spinner-div').hide();
                if (respuesta) 
                {
                    let datos = respuesta;
                

                
                    $("#id_alerta_pos").empty();
                    $("#id_alerta_pos").append('<option value="" selected>Alerta de Seguimiento</option>');

                    // $("#id_comboAlert").empty();
                    // $("#id_comboAlert").append('<option value="" selected>Alerta de Seguimiento</option>');

                

                    datos.data.forEach(dato => {
                        if(dato["id"] == $dato){
                    
                            $("#id_alerta_pos").append('<option value='+dato["id"]+' selected>'+dato["alerta"]+'</option>');
                            //$("#id_comboAlert").append('<option value='+dato["id"]+' selected>'+dato["alerta"]+'</option>');
                        
                        }else{
                            $("#id_alerta_pos").append('<option value='+dato["id"]+'>'+dato["alerta"]+'</option>');
                            //$("#id_comboAlert").append('<option value='+dato["id"]+'>'+dato["alerta"]+'</option>');
                            
                        }
                        
                        
                    
                    });
                } 
                else
                {  }

            })
            .fail(function(error) {

            })
            .always(function() {
            });   
    } catch (error) {
        
    }
   
    
}

//funciones para los combobox de actividades
function  cargarDatosEmpresaAct(){
       
    try {
        $('#spinner-div').show();
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getEmpresasByActivo",
            dataType: "JSON"
        })
        .done(function(respuesta) {
            $('#spinner-div').hide();
           //////console.log(respuesta);
            if (respuesta) 
            {
                let datos = respuesta;
                // $("#id_empresa_pos").empty();
                // $("#id_empresa_pos").append('<option value="" selected>Empresa</option>');
    
                document.getElementById('id_comboEmpresa').disabled  = true;
                $("#id_comboEmpresa").empty();
                $("#id_comboEmpresa").append('<option value="" selected>Empresa</option>');
    
    
                datos.data.forEach(dato => {
    
                        if(idempresa == dato['id']){
                          //  $("#id_empresa_pos").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');
                            $("#id_comboEmpresa").append('<option value='+dato["id"]+' selected>'+dato["empresa"]+'</option>');
                        
                        }else{
                           // $("#id_empresa_pos").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');
                            $("#id_comboEmpresa").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');
                        
                        }
                    
                
                });
            } 
            else
            {  }
        
        })
        .fail(function(error) {
           
        })
        .always(function() {
        }); 
    } catch (error) {
        
    }
        //cargando las empresas
             
        
    }
    
    function cargarDatosAreaAct($empresa,$dato) {
            //cargando las areas
            try {
                // $('#spinner-div').show();
                const postData = { 
                    idempresa:$empresa,
                   
                    
                }
                //////console.log(postData);
                    $.ajax({
                        method: "POST",
                        url: BASE_URL+"/activo/getAreasByActivo",
                        dataType: "JSON",
                        data: postData
                    })
                    .done(function(respuesta) {
                        //////console.log(respuesta);
                        // $('#spinner-div').hide();
                        if (respuesta) 
                        {
                            let datos = respuesta;
                        
            
                           
                            // $("#id_area_pos").empty();
                            // $("#id_area_pos").append('<option value="" selected>Area</option>');
                            
                            
                            //document.getElementById('id_comboArea').disabled  = true;
                            $("#id_comboArea").empty();
                            $("#id_comboArea").append('<option value="" selected>Area</option>');
                    
                    
                            datos.data.forEach(dato => {
                                if(dato["id"] == $dato){
                            
                                    //$("#id_area_pos").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                                    $("#id_comboArea").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                                
                                }else{
                                //$("#id_area_pos").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
                                    $("#id_comboArea").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
                               
                                }
                                
                                
                            
                            });
                        } 
                        else
                        {  }
            
                })
                .fail(function(error) {
                  
                })
                .always(function() {
                });  
            } catch (error) {
                
            }
            
    }
    
    function cargarDatosUnidadAct($empresa,$idarea,$dato) {
    
        try {
            // $('#spinner-div').show();
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
                // $('#spinner-div').hide();
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                    // $("#id_unidad_pos").empty();
                    // $("#id_unidad_pos").append('<option value="" selected>Unidad</option>');
                    
                    
                    $("#id_comboUnidades").empty();
                    $("#id_comboUnidades").append('<option value="" selected>Unidad</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id"] == $dato){
                    
                           // $("#id_unidad_pos").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
                            $("#id_comboUnidades").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
            
    
                        }else{
                            //$("#id_unidad_pos").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>'); 
                            $("#id_comboUnidades").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>'); 
                        
                        }
                        
                    
                    });
                } 
                else
                {  }
    
            })
            .fail(function(error) {
               
            })
            .always(function() {
            });
        } catch (error) {
            
        }
           
    
    }
    
    
    function cargarDatosPosicionAct($empresa,$idarea,$idunidad,$dato) {
        //cargando las areas
        try {
            // $('#spinner-div').show();
            const postData = { 
                idempresa:$empresa,
                idarea:$idarea,
                idunidad:$idunidad,
                // empresa:$empresa,
                // area:$area,
                // unidad:$unidad,
            } 
            // //////console.log("hola");
            //////console.log(postData);
                $.ajax({
                    method: "POST",
                    url: BASE_URL+"/activo/getPosicionByUnidad",
                    // url: BASE_URL+"/activo/getPosicionByArea",
                    dataType: "JSON",
                    data: postData
                })
                .done(function(respuesta) {
                    // $('#spinner-div').hide();
                     //////console.log(respuesta);
                    if (respuesta) 
                    {
                        let datos = respuesta;
                    
        
                       
                        // $("#id_puesto").empty();
                        // $("#id_puesto").append('<option value="" selected>Posicion/Puesto</option>');
                        
                        
                        $("#id_comboPosicion").empty();
                        $("#id_comboPosicion").append('<option value="" selected>Posicion/Puesto</option>');
                
                    
                
                        datos.data.forEach(dato => {
                            if(dato["id_pos"] == $dato){
                        
                               // $("#id_puesto").append('<option value='+dato["id_pos"]+' selected>'+dato["posicion_puesto"]+'</option>');
                               $("#id_comboPosicion").append('<option value='+dato["id_pos"]+' selected>'+dato["posicion_puesto"]+'</option>');
                            
                            }else{
                               // $("#id_puesto").append('<option value='+dato["id_pos"]+'>'+dato["posicion_puesto"]+'</option>');
                                $("#id_comboPosicion").append('<option value='+dato["id_pos"]+'>'+dato["posicion_puesto"]+'</option>');
                            
                            }
                            
                            
                        
                        });
                    } 
                    else
                    {  }
        
            })
            .fail(function(error) {
                
            })
            .always(function() {
            });
        } catch (error) {
            
        }
          
    }
        // }
    
    
    function cargarDatosNombreAct($empresa,$area,$unidad,$posicion,$dato) {
        //cargando Nombre
        //console.log($empresa,$area,$unidad,$posicion);
        try {
            // $('#spinner-div').show();
            const postData = { 
                idempresa:$empresa,
                idarea:$area,
                idunidad:$unidad,
                idposicion:$posicion
                
            }
            $.ajax({
                method: "POST",
                url: BASE_URL+"/activo/getUserByActivo",
                dataType: "JSON",
                data: postData
            })
            .done(function(respuesta) {
                //////console.log(respuesta);
                // $('#spinner-div').hide();
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    // $("#id_nombre_pos").empty();
                    // $("#id_nombre_pos").append('<option value="" selected>Responsable</option>');
            
                    $("#id_comboUsers").empty();
                    $("#id_comboUsers").append('<option value="" selected>Responsable</option>');
            
                    datos.data.forEach(dato => {
                        if(dato["id_us"] == $dato){
                    
                           // $("#id_nombre_pos").append('<option value='+dato["id_us"]+' selected>'+dato["nombres_us"]+'</option>');
                            $("#id_comboUsers").append('<option value='+dato["id_us"]+' selected>'+dato["nombres_us"]+'</option>');
                        
                        }else{
                            //$("#id_nombre_pos").append('<option value='+dato["id_us"]+'>'+dato["nombres_us"]+'</option>');
                            $("#id_comboUsers").append('<option value='+dato["id_us"]+' >'+dato["nombres_us"]+'</option>');
                        
                        }
                        
                        
                    
                    });
                } 
                else
                {  }
    
        })
        .fail(function(error) {
            
        })
        .always(function() {
        });   
        } catch (error) {
            
        }
        
        // //////console.log(postData);
           
    }
    
    
    
    function cargarDatosAlertaAct($empresa,$dato) {
        //cargando las areas
        try {
            $('#spinner-div').show();
    // //////console.log(postData);
                const postData = { 
                    idempresa:$empresa,
                
                    
                }
                $.ajax({
                    method: "POST",
                    url: BASE_URL+"/activo/getAlertaByActivo",
                    dataType: "JSON",
                    data: postData
                })
                .done(function(respuesta) {
                    $('#spinner-div').hide();
                    if (respuesta) 
                    {
                        let datos = respuesta;
                    
    
                    
                      
    
                        $("#id_comboAlert").empty();
                        $("#id_comboAlert").append('<option value="" selected>Alerta de Seguimiento</option>');
    
                    
    
                        datos.data.forEach(dato => {
                            if(dato["id"] == $dato){
                        
                            //    $("#id_alerta_pos").append('<option value='+dato["id"]+' selected>'+dato["alerta"]+'</option>');
                                $("#id_comboAlert").append('<option value='+dato["id"]+' selected>'+dato["alerta"]+'</option>');
                            
                            }else{
                              //  $("#id_alerta_pos").append('<option value='+dato["id"]+'>'+dato["alerta"]+'</option>');
                                $("#id_comboAlert").append('<option value='+dato["id"]+'>'+dato["alerta"]+'</option>');
                                
                            }
                            
                            
                        
                        });
                    } 
                    else
                    {  }
    
                })
                .fail(function(error) {
    
                })
                .always(function() {
                });   
        } catch (error) {
            
        }
       
        
    }


window.addEventListener("load", () => {
    cargarDatosPosEmpresa();
    
    document.getElementById('id_empresa_pos').disabled  = true;
    document.getElementById('id_area_pos').disabled  = true;
    // cargarDatosPosArea(idempresa,idarea);
    // // cargarDatosPosPosicion(idempresa);
    // cargarDatosPosPosicion(idempresa,idarea,idunidad);
    // cargarDatosPosUnidad(idempresa,idarea);
    // cargarDatosPosNombre(idempresa,idarea);
    // cargarDatosPosEstado(idempresa);
    // cargarDatosPosPrioridad(idempresa);
    // cargarDatosPosAlerta(idempresa);

    cargarDatosPosArea(idempresa,idarea);
    // cargarDatosPosPosicion(idempresa);
    // cargarDatosPosPosicion(idempresa,idarea,idunidad);
    cargarDatosPosUnidad(idempresa,idarea);
    // cargarDatosPosNombre(idempresa,idarea);
    cargarDatosPosEstado(idempresa);
    cargarDatosPosPrioridad(idempresa);
    cargarDatosPosAlerta(idempresa);
})

document.getElementById("id_empresa_pos").addEventListener("change",function(){
    
    if($('#id_empresa_pos').val() != "" ){
        // cargarDatosPosArea($('#id_empresa_pos').val());
        // s

        // cargarDatosPosNombre($('#id_empresa_pos').val());
        cargarDatosPosEstado($('#id_empresa_pos').val());
        cargarDatosPosPrioridad($('#id_empresa_pos').val());
        cargarDatosPosAlerta($('#id_empresa_pos').val());
    }
    
});

document.getElementById("id_area_pos").addEventListener("change",function(){
    
    if($('#id_area_pos').val() != "" ){
        cargarDatosPosUnidad($('#id_empresa_pos').val(),$('#id_area_pos').val());

    }
    
});
document.getElementById("id_unidad_pos").addEventListener("change",function(){
    
    if($('#id_unidad_pos').val() != "" ){
        cargarDatosPosPosicion($('#id_empresa_pos').val(),$('#id_area_pos').val(),$('#id_unidad_pos').val());

    }
    
});
document.getElementById("id_puesto").addEventListener("change",function(){
    
    if($('#id_puesto').val() != "" ){
        cargarDatosPosNombre($('#id_empresa_pos').val(),$('#id_area_pos').val(),$('#id_unidad_pos').val(),$('#id_puesto').val());

    }
    
});


function fecha($dato){
    var fecha=$dato;

    var nueva=fecha.split(" ")[0].split("-").join("-");
  
    return nueva;
}