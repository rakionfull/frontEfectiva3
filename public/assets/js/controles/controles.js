
window.addEventListener("hashchange", async () => {

    let dato = window.location.hash;
    opcion = dato.split('_');
    $('.alert').remove()

    switch(opcion[0])
    {
        case "#/Cobertura":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.querySelectorAll(".menu .submenu li").forEach(element => {
                element.classList.remove("activado_sub");
            });
            document.querySelectorAll(".menu .submenu li a").forEach(element => {
                element.classList.remove("activado_sub");
            });
            document.querySelectorAll(".menu .cajitas a").forEach(element => {
                element.classList.remove("activado_item");
                element.classList.add("items");
            }); 
            document.querySelectorAll(".subir").forEach(element2 => {
                $opcion2 = element2.id.split('_');
               
                 document.getElementById("caja_"+$opcion2[1]).style.display="none";
                 document.getElementById("bajar_"+$opcion2[1]).style.display="block";
                 document.getElementById("subir_"+$opcion2[1]).style.display="none";
              });
            document.getElementById("apartCobertura").style.display = "block";
            document.getElementById("Cobertura").className = "activado";

            permisos = await getPermisos('Cobertura');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_Cobertura').style.display = 'none';
            }
            LoadTableCobertura(permisos['update_det'],permisos['delete_det']);

            
            
            window.location.hash = '#';   
        break;
        case "#/Opcion":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

            }
            permisos = await getPermisos('Características de control');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_Opcion').style.display = 'none';
            }
          
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
      
            document.getElementById("apartOpcion").style.display = "block";
           
            if(opcion[1] == "general"){
                document.querySelectorAll(".menu .submenu li").forEach(element => {
                    element.classList.remove("activado_sub");
                   
                   
                });
                document.querySelectorAll(".menu .submenu li a").forEach(element => {
                    element.classList.remove("activado_sub");
                   
                   
                });
                document.querySelectorAll(".menu .cajitas").forEach(element => {
       
                    document.getElementById(element.id).style.display="none";
                });
                document.querySelectorAll(".menu .submenu li a").forEach(element => {
                       
                    $opcion = element.id.split('_');
                   
                    if($opcion[0] == "bajar"){
                        element.classList.remove("activado_sub");
                        //console.log($opcion[0]);
                        element.classList.add("bajar");
                    }
                   
                   
                   
                });
                document.querySelectorAll(".bajar").forEach(element2 => {
                    $opcion2 = element2.id.split('_');
                    //console.log($opcion2[1]);
                     document.getElementById("caja_"+$opcion2[1]).style.display="none";
                     document.getElementById("bajar_"+$opcion2[1]).style.display="block";
                     document.getElementById("subir_"+$opcion2[1]).style.display="none";
                  });

                document.getElementById("Opcion").className = "activado";
                
                LoadTableOpcion("general",0,"menu",0,permisos['update_det'],permisos['delete_det']);
            }else{
                document.querySelectorAll(".menu a").forEach(element => {
                    element.classList.remove("activado");
                });
               
                if(opcion[3] == "menu"){
                    document.querySelectorAll(".bajar").forEach(element2 => {
                        $opcion2 = element2.id.split('_');
                        //console.log($opcion2[1]);
                         document.getElementById("caja_"+$opcion2[1]).style.display="none";
                         document.getElementById("bajar_"+$opcion2[1]).style.display="block";
                         document.getElementById("subir_"+$opcion2[1]).style.display="none";
                      });
    
                    document.querySelectorAll(".menu .submenu li").forEach(element => {
                        element.classList.remove("activado_sub");
                      
                       
                    });
                    document.querySelectorAll(".menu .cajitas").forEach(element => {
       
                        document.getElementById(element.id).style.display="none";
                    });
                    document.querySelectorAll(".menu .submenu li a").forEach(element => {
                       
                        $opcion = element.id.split('_');
                       
                        if($opcion[0] == "bajar"){
                            element.classList.remove("activado_sub");
                            //console.log($opcion[0]);
                            element.classList.add("bajar");
                        }
                       
                       
                       
                    });
                    document.getElementById(opcion[2]).className = "activado_sub";
                    document.getElementById('bajar_'+opcion[2]).className = "activado_sub";
                   
                }else{
                    document.querySelectorAll(".menu .cajitas a").forEach(element => {
                        element.classList.remove("activado_item");
                        element.classList.add("items");
                    }); 
                    document.getElementById(opcion[2]).className = "activado_item";
                   
                }
                LoadTableOpcion(opcion[1],opcion[2],opcion[3],opcion[4],permisos['update_det'],permisos['delete_det']);
                
            }
            
            
            window.location.hash = '#';   
        break;
    case "#/EvaluacionControl":
            
         
        for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
        {
            document.getElementsByClassName("opcion")[i].style.display = "none";

        }
    
        document.querySelectorAll(".menu li").forEach(element => {
            element.classList.remove("activado");
        });
        document.querySelectorAll(".menu .submenu li").forEach(element => {
            element.classList.remove("activado_sub");
        });
        document.querySelectorAll(".menu .submenu li a").forEach(element => {
            element.classList.remove("activado_sub");
        });
        document.querySelectorAll(".menu .cajitas a").forEach(element => {
            element.classList.remove("activado_item");
            element.classList.add("items");
        }); 
        document.querySelectorAll(".subir").forEach(element2 => {
            $opcion2 = element2.id.split('_');
            
             document.getElementById("caja_"+$opcion2[1]).style.display="none";
             document.getElementById("bajar_"+$opcion2[1]).style.display="block";
             document.getElementById("subir_"+$opcion2[1]).style.display="none";
          });
        document.getElementById("apartEvaluacionControl").style.display = "block";
        document.getElementById("EvaluacionControl").className = "activado";
        permisos = await getPermisos('Evaluación de Control');
        if(permisos['create_det'] == 0){
            document.getElementById('btnAgregar_EvaluacionControl').style.display = 'none';
        }
        LoadTableEvaluacionControl(permisos['update_det'],permisos['delete_det']);
        
        // CargarDisenioOperatividad();
        CargarDisenioEvaluacion();
        CargarEvaluacion();
        window.location.hash = '#';   
    break;
    case "#/AplicacionProbabilidad":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

            }
        
            document.querySelectorAll(".menu li").forEach(element => {
            element.classList.remove("activado");
            });
            document.querySelectorAll(".menu .submenu li").forEach(element => {
                element.classList.remove("activado_sub");
            });
            document.querySelectorAll(".menu .submenu li a").forEach(element => {
                element.classList.remove("activado_sub");
            });
            document.querySelectorAll(".menu .cajitas a").forEach(element => {
                element.classList.remove("activado_item");
                element.classList.add("items");
            }); 
            document.querySelectorAll(".subir").forEach(element2 => {
                $opcion2 = element2.id.split('_');
              
                 document.getElementById("caja_"+$opcion2[1]).style.display="none";
                 document.getElementById("bajar_"+$opcion2[1]).style.display="block";
                 document.getElementById("subir_"+$opcion2[1]).style.display="none";
              });
            document.getElementById("apartAplicacionProbabilidad").style.display = "block";
            document.getElementById("aplicProba").className = "activado";
            permisos = await getPermisos('Aplicación de Probabilidad');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_AplicacionProbabilidad').style.display = 'none';
            }
            LoadTableAplicacionProbabilidad(permisos['update_det'],permisos['delete_det']);
          
            CargarDisenioProbabilidad();
            window.location.hash = '#';   
    break;
    case "#/AplicacionImpacto":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

            }
        
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.querySelectorAll(".menu .submenu li").forEach(element => {
                element.classList.remove("activado_sub");
            });
            document.querySelectorAll(".menu .submenu li a").forEach(element => {
                element.classList.remove("activado_sub");
            });
            document.querySelectorAll(".menu .cajitas a").forEach(element => {
                element.classList.remove("activado_item");
                element.classList.add("items");
            }); 

            document.querySelectorAll(".subir").forEach(element2 => {
                $opcion2 = element2.id.split('_');
               
                 document.getElementById("caja_"+$opcion2[1]).style.display="none";
                 document.getElementById("bajar_"+$opcion2[1]).style.display="block";
                 document.getElementById("subir_"+$opcion2[1]).style.display="none";
              });

            document.getElementById("apartAplicacionImpacto").style.display = "block";
            document.getElementById("aplicImpac").className = "activado";
            permisos = await getPermisos('Aplicacón de Impacto');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_AplicacionImpacto').style.display = 'none';
            }
            LoadTableAplicacionImpacto(permisos['update_det'],permisos['delete_det']);
            CargarDisenioImpacto();
            window.location.hash = '#';   
    break;
    
    }    

});
function MostrarCaja(element) {
    event.preventDefault();
    $opcion = element.id.split('_');
    document.querySelectorAll(".menu li").forEach(element => {
        element.classList.remove("activado");
    });
    document.querySelectorAll(".menu .submenu li").forEach(element => {
        element.classList.remove("activado_sub");
      
       
    });
    document.querySelectorAll(".menu .submenu li a").forEach(element => {
                       
        $opcion3 = element.id.split('_');
       
        if($opcion3[0] == "bajar"){
            element.classList.remove("activado_sub");
            //console.log($opcion3[0]);
            element.classList.add("bajar");
        }
       
    });
    document.querySelectorAll(".bajar").forEach(element2 => {
      $opcion2 = element2.id.split('_');
      //console.log($opcion2[1]);
       document.getElementById("caja_"+$opcion2[1]).style.display="none";
       document.getElementById("bajar_"+$opcion2[1]).style.display="block";
       document.getElementById("subir_"+$opcion2[1]).style.display="none";
    });
    document.querySelectorAll(".menu .cajitas").forEach(element => {
       
        document.getElementById(element.id).style.display="none";
    }); 
    document.querySelectorAll(".menu .cajitas a").forEach(element => {
        element.classList.remove("activado_item");
        element.classList.add("items");
    }); 
   
    document.getElementById("caja_"+$opcion[1]).style.display="block";
    document.getElementById("bajar_"+$opcion[1]).style.display="none";
    document.getElementById("subir_"+$opcion[1]).style.display="block";
    document.getElementById($opcion[1]).className = "activado_sub";
    // $('#camp_'+$opcion[2]).addClass('activado'); 
}
function OcultarCaja(element) {
    event.preventDefault();
    $opcion = element.id.split('_');


    document.getElementById("caja_"+$opcion[1]).style.display="none";
    document.getElementById("bajar_"+$opcion[1]).style.display="block";
    document.getElementById("subir_"+$opcion[1]).style.display="none";
    document.querySelectorAll(".menu .cajitas a").forEach(element => {
        element.classList.remove("activado_item");
        element.classList.add("items");
    }); 

    // $('#camp_'+$opcion[2]).addClass('activado'); 
}

async function cargarOpciones() {
    
    let promise = new Promise((resolve, reject) => {
    //   setTimeout(() => resolve("done!"), 1000)
    let result;
          
                            $.ajax({
                                method: "GET",
                                // url: $('#base_url').val()+"/main/getDataMatriz",
                                url: $('#base_url').val()+"/main/getOpcionesCaracteristica/menu",
                                dataType: "JSON"
                            })
                            .done(function(respuesta) {
                           
                               resolve(respuesta['data']);
        
                            })
                            
    });
    let promise2 = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        let result;
              
                                $.ajax({
                                    method: "GET",
                                    url: $('#base_url').val()+"/main/getOpcionesCaracteristica/submenu",
                                   
                                    dataType: "JSON"
                                })
                                .done(function(respuesta) {
                               
                                   resolve(respuesta['data']);
            
                                })
                                
    });
    let promise3 = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        let result;
              
                                $.ajax({
                                    method: "GET",
                                    url: $('#base_url').val()+"/main/getOpcionesCaracteristica/opcion",
                                   
                                    dataType: "JSON"
                                })
                                .done(function(respuesta) {
                               
                                   resolve(respuesta['data']);
            
                                })
                                
    });
    let resultado = await promise; // wait until the promise resolves (*
    let resultado2 = await promise2;
    // let resultado3 = await promise3;
    
    var opciones_caracteristica = document.getElementById("caja_caracteristica");
    opciones_caracteristica.innerHTML ="";
    
    resultado.forEach(element => {
        
        opciones_caracteristica.innerHTML+=
    '<li id="'+element.id+'">'+
    
        '<div class="opciones">'+
                '<a href="#/Opcion_'+element.caracteristica+'_'+element.id+'_'+element.tipo+'_'+element.clasificacion+'" style="width:80%">'+element.caracteristica+' </a>'+
                '<a href="" id="bajar_'+element.id+'" class="bajar" style="width:30%"><i class=" fas fa-angle-down font-size-20"></i></a>'+
                '<a href="" id="subir_'+element.id+'" class="subir" style="display:none" style="width:30%"><i class=" fas fa-angle-up font-size-20"></i></a>'+
        '</div>'+
        '<div id="caja_'+element.id+'"  class="cajitas" style="display:none">'+
            
        '</div>'+
    '</li>';
   
     
    });
    
 
    resultado.forEach(element => {
    
            resultado2.forEach(element2 => {
               
                if(element.id == element2.idOpcion){
                    document.getElementById("caja_"+element.id).innerHTML+='<a  id="'+element2.id+'" class="items" href="#/Opcion_'+element2.caracteristica+'_'+element2.id+'_'+element2.tipo+'_'+element2.clasificacion+'">'+element2.caracteristica+'</a>';
                }
            });
      
    
        });
      



    // resultado.forEach(element => {
       
         
    //         resultado3.forEach(element3 => {
    //             $valor = element3.caracteristica.slice(0,4);
    //             if(element3.caracteristica == "Calificacion de Operatividad"){
    //                 $valor = element3.caracteristica.slice(0,4)+"Opera";
    //                 // //console.log($valor);
    //             }
    //             if(element.caracteristica == "Operatividad"){
                    
                   
    //                 document.getElementById("caja_"+element.caracteristica).innerHTML+='<a  id="'+$valor+'" href="#/'+$valor+'">'+element3.caracteristica+'</a>';
    //             }
    //         });
    //         resultado2.forEach(element2 => {
    //             $valor = element2.caracteristica.slice(0,4);
    //             if(element2.caracteristica == "Calificacion de Diseño"){
    //                 $valor = element2.caracteristica.slice(0,4)+"Dise";
    //                 // //console.log("estoy en diseñpo");
    //                 // //console.log($valor);
    //             }
    //             if(element.caracteristica == "Diseño"){
    //                 document.getElementById("caja_"+element.caracteristica).innerHTML+='<a  id="'+$valor+'" href="#/'+$valor+'">'+element2.caracteristica+'</a>';
    //             }
    //         });
      
    
    //     });
      

       
        // var opciones_operatividad = document.getElementById("caja_2");
       
        
   

    // '<a  id="Definicion" href="#/Definicion">Definición</a>'+
    //         '<a  id="Objetivo" href="#/Objetivo">Objetivo</a>'+
    //         '<a id="CalificacionDise" href="#/CalificacionDise">Calificacion de Diseño</a>'+
    // var datos_matriz = document.getElementById("datos");

    $bajar = document.querySelectorAll(".bajar");
    $subir = document.querySelectorAll(".subir");
   
    $bajar.forEach((btn,i) => {   
        btn.addEventListener('click',()=>MostrarCaja(btn));
    });
    $subir.forEach((btn,i) => {   
        btn.addEventListener('click',()=>OcultarCaja(btn));
    });
    
}
window.addEventListener("load", () => {
    cargarOpciones();
})