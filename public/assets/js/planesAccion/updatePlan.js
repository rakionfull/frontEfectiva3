var plan = $('#id_plan').val();


  function cargarDatos($id) {
    //console.log(idunidad);
   try {
    $('#spinner-div').show();
    $.ajax({
      method: "GET",
      url: BASE_URL+"/activo/getPlan/"+$id,
      dataType: "JSON"
  })
  .done(function(respuesta) {
    $('#spinner-div').hide();
      var response = respuesta.data;
    
      //console.log(respuesta);
           //    Cargar la información en los campos correspondientes
          // $('#id_riesgo').val(response.id_riesgo);
          // $('#id_control').val(response.id_control);
          $('#nombre_plan').val(response.plan_accion);
          $('#descripcion_plan').val(response.descripcion);

          

          $('#fecha_inicio_plan').val(fecha(response.fecha_inicio));
          $('#fecha_fin_plan').val(fecha(response.fecha_fin));
  

          //agregando los controles y riesgos

          $array_aux=response.id_riesgo.split("-");
          $array_nuevo=[]  ;
          $array_aux.forEach(element => {
             
              if(element !=""){
                  $array_nuevo.push(element);
      
              }
             
          });
          $('.js-riesgos-basic-multiple').val($array_nuevo).change();
          $array_aux2=response.id_control.split("-");
          $array_nuevo2=[]  ;
          $array_aux2.forEach(element => {
             
              if(element !=""){
                  $array_nuevo2.push(element);
      
              }
             
          });
          $('.js-controles-basic-multiple').val($array_nuevo2).change();
          // cargarDatosPosEmpresa(response.idempresa);
           $('#id_empresa_pos').val(response.idempresa);
          // cargarDatosPosArea(response.idempresa,response.idarea);

          // cargarDatosPosArea(response.idempresa,response.idarea);
          cargarDatosPosUnidad(response.idempresa,response.idarea,response.idunidades);
          cargarDatosPosPosicion(response.idempresa,response.idarea,response.idunidades,response.idposicion_puesto);
          // cargarDatosPosNombre(response.idempresa,response.idusuario);
          cargarDatosPosEstado(response.idempresa,response.idestado);
          cargarDatosPosPrioridad(response.idempresa,response.idprioridad);
          cargarDatosPosNombre(response.idempresa,response.idusuario);
          cargarDatosPosAlerta(response.idempresa,response.idalerta);
          cargarDatosPosNombre(response.idempresa,response.idusuario);
     

  })
  .fail(function(error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cargar los datos, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
  })
  })
  .always(function() {
  });    
   } catch (error) {
    
   }
       
  
  }
  function validarFechas(fecha_ini,fecha_fin) {
    let resultado =false ;
    let msg = "";
    if(fecha_ini > fecha_fin){
      resultado = true;
      msg = "La Fecha Fin debe ser mayor a la Fecha de Inicio";
    }
    return $array = {
      resultado: resultado,
      msg: msg
    };
     
  
    
  }
  $(document).ready(function() { 
    $('.js-riesgos-basic-multiple').select2({ width: '100%' })
    $('.js-controles-basic-multiple').select2({ width: '100%' })
  });

  document.getElementById("btn_crear_plan").addEventListener("click",function(){
    //console.log("hola");
    var data1 = $('.js-riesgos-basic-multiple').select2('data');
    var datos1 = "";
    data1.forEach(element => {
        datos1 += element.id + "-";
     
    });
    var data2 = $('.js-controles-basic-multiple').select2('data');
    var datos2 = "";
  
    data2.forEach(element => {
        datos2 += element.id + "-";
       
    });
    // if($valida.resultado){
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: $valida.msg
    //   })
    // }else{
      // $id_riesgo=document.getElementById("id_riesgo").value;
          // $id_control=document.getElementById("id_control").value;
          $nombre_plan=document.getElementById("nombre_plan").value;
          $descripcion_plan=document.getElementById("descripcion_plan").value;
          $fecha_inicio_plan=document.getElementById("fecha_inicio_plan").value;
          $fecha_fin_plan=document.getElementById("fecha_fin_plan").value;
        
          $id_empresa_pos=document.getElementById("id_empresa_pos").value;
          $id_area_pos=document.getElementById("id_area_pos").value;
        
          $id_nombre_pos=document.getElementById("id_nombre_pos").value;
        
          $id_prioridad_pos=document.getElementById("id_prioridad_pos").value;
          $id_estado_pos=document.getElementById("id_estado_pos").value;
          $id_alerta_pos=document.getElementById("id_alerta_pos").value;
          $id_unidad_pos=document.getElementById("id_unidad_pos").value;
          $id_puesto=document.getElementById("id_puesto").value;
          
          
          
        //   if($id_riesgo !=""  && $id_control != "" && $nombre_plan != ""
        //       && $descripcion_plan != "" && $fecha_inicio_plan != "" && $fecha_fin_plan != ""
        
        //       && $id_empresa_pos != "" && $id_area_pos != "" && $id_unidad_pos != ""
        //       && $id_puesto != "" && $id_nombre_pos != "" && $id_prioridad_pos != ""
        //       && $id_estado_pos != "" && $id_alerta_pos != ""){
            
                      const postData = { 
                          id_riesgo:datos1.slice(0, -1),
                          id_control:datos2.slice(0, -1),
                          plan_accion:$nombre_plan,
                          descripcion:$descripcion_plan,
                          fecha_inicio:$fecha_inicio_plan,
                          fecha_fin:$fecha_fin_plan,
        
                          idempresa:$id_empresa_pos,
                          idarea:$id_area_pos,
                          idunidad:$id_unidad_pos,
                          idposicion:$id_puesto,
                          idusuario:$id_nombre_pos,
                          idprioridad:$id_prioridad_pos,
                          idestado:$id_estado_pos,
                          idalerta:$id_alerta_pos,
                          
                        id:$('#id_plan').val()
        
                          
                          
                          
                      };
                      //console.log(postData);
                      try {
        
                          $.ajax({
                              method: "POST",
                              url: BASE_URL+"/activo/updatePlanAccion",
                              data: postData,
                              dataType: "JSON"
                          })
                          .done(function(respuesta) {
                          
                            console.log(respuesta);
                              if (respuesta.error==1) 
                              {
                                
                                  
                                alerta_plan.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                                  +  respuesta.msg +
                                  '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                      '<span aria-hidden="true">&times;</span>'+
                                      '</button>'+
                                  '</div>';
                                
                              
                                location.href = $('#base_url').val() + '/planAccion'
                              
                                //   $("#table_actividadesPlan").DataTable().ajax.reload(null, false); 
                                
        
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
                              text: 'No se pudo editar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                          })
                          })
                          .always(function() {
                          });
                      }
                      catch(err) {
                        
                      }
                  
                
            
          //}
        //   else{
        //       ////console.log("aqui5");
        //       Swal.fire({
        //                icon: 'error',
        //                title: 'Error',
        //                text: 'Faltan Datos'
        //              })
        // }
        
    
    
  
  
});
  window.addEventListener("load", () => {  
    // //console.log(plan);
     cargarDatos(plan);
    
  })
    