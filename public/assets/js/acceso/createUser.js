var BASE_URL = $('#base_url').val();

function cargarDatosPosArea($empresa,$dato) {
        //cargando las areas
        const postData = { 
            idempresa:$empresa,
           
            
        }
        //console.log(postData);
            $.ajax({
                method: "POST",
                url: BASE_URL+"/activo/getAreasByActivo",
                dataType: "JSON",
                data: postData
            })
            .done(function(respuesta) {
                //console.log(respuesta);
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    $("#id_area").empty();
                    $("#id_area").append('<option value="" selected>Area</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id"] == $dato){
                    
                            $("#id_area").append('<option value='+dato["id"]+' selected>'+dato["area"]+'</option>');
                        }else{
                            $("#id_area").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');
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
    }
    function cargarDatosPosUnidad($empresa,$idarea,$dato) {
        const postData = { 
            idempresa:$empresa,
            idarea:$idarea,
            
        }
        //console.log(postData);
        //cargando las Unidades
        $.ajax({
            method: "POST",
            url: BASE_URL+"/activo/getUnidadByActivo",
            dataType: "JSON",
            data:postData
        })
        .done(function(respuesta) {
            //console.log(respuesta);
             
            if (respuesta) 
            {
                let datos = respuesta;
            
                $("#id_unidad").empty();
                $("#id_unidad").append('<option value="" selected>Unidad</option>'); 
        
                datos.data.forEach(dato => {
                    if(dato["id"] == $dato){
                
                        $("#id_unidad").append('<option value='+dato["id"]+' selected>'+dato["unidad"]+'</option>');
        
                    }else{
                        $("#id_unidad").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>'); 
                    }
                    
                
                });
            } 
            else
            {
                $("#id_unidad").empty();
                $("#id_unidad").append('<option value="" selected>Unidad</option>'); 
            }

        })
        .fail(function(error) {
           
        })
        .always(function() {
        });

    }
    function cargarDatosPosPosicion($empresa,$area,$unidad,$dato) {
        //cargando las areas
        const postData = { 
            idempresa:$empresa,
            idarea: $area,
            idunidad:$unidad,
            
        }
        //console.log(postData);
            $.ajax({
                method: "POST",
                url: BASE_URL+"/activo/getPosicionByUnidad",
                dataType: "JSON",
                data: postData
            })
            .done(function(respuesta) {
              
                if (respuesta) 
                {
                    let datos = respuesta;
                
    
                   
                    $("#id_puesto").empty();
                    $("#id_puesto").append('<option value="" selected>Posicion/Puesto</option>');
            
                
            
                    datos.data.forEach(dato => {
                        if(dato["id_pos"] == $dato){
                    
                            $("#id_puesto").append('<option value='+dato["id_pos"]+' selected>'+dato["posicion_puesto"]+'</option>');
                        }else{
                            $("#id_puesto").append('<option value='+dato["id_pos"]+'>'+dato["posicion_puesto"]+'</option>');
                        }
                        
                        
                    
                    });
                } 
                else
                {  
                    $("#id_puesto").empty();
                    $("#id_puesto").append('<option value="" selected>Posicion/Puesto</option>');
            
                }
    
        })
        .fail(function(error) {
           
        })
        .always(function() {
        });   
    }
    window.addEventListener("load", () => {
       
    })

    document.getElementById("id_empresa").addEventListener("change",function(){
        // //console.log($('#select_areaMacro').val());
     
            cargarDatosPosArea($('#id_empresa').val());
            // cargarDatosPosPosicion($('#id_empresa').val());
        
        
    });
    document.getElementById("id_area").addEventListener("change",function(){
        // //console.log($('#select_areaMacro').val());
       
            cargarDatosPosUnidad($('#id_empresa').val(),$('#id_area').val());
        
        
    });
    document.getElementById("id_unidad").addEventListener("change",function(){
        // //console.log($('#select_areaMacro').val());
       
            cargarDatosPosPosicion($('#id_empresa').val(),$('#id_area').val(),$('#id_unidad').val());
        
        
    });