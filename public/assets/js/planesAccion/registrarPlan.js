var BASE_URL = $('#base_url').val();

var alerta_plan = document.getElementById("alerta_plan");
//cargarDatosPosEmpresa();

var alerta_planAccion = document.getElementById("alert_planAccion");
$(document).ready(function() { 
  $('.js-riesgos-basic-multiple').select2({ width: '100%' })
  $('.js-controles-basic-multiple').select2({ width: '100%' })
});

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

document.getElementById("btn_crear_plan").addEventListener("click",function(){
  event.preventDefault();
  // ////console.log($('#fecha_inicio_plan').val());
  // ////console.log($('#fecha_fin_plan').val());
  $valida = validarFechas($('#fecha_inicio_plan').val(),$('#fecha_fin_plan').val());
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
  // $id_riesgo=document.getElementById("id_riesgo").value;
  // $id_control=document.getElementById("id_control").value;
  $nombre_plan=document.getElementById("nombre_plan").value;
  $descripcion_plan=document.getElementById("descripcion_plan").value;
  $fecha_inicio_plan=document.getElementById("fecha_inicio_plan").value;
  $fecha_fin_plan=document.getElementById("fecha_fin_plan").value;

  $id_empresa_pos=document.getElementById("id_empresa_pos").value;
  $id_area_pos=document.getElementById("id_area_pos").value;
  $id_unidad_pos=document.getElementById("id_unidad_pos").value;
  $id_puesto=document.getElementById("id_puesto").value;
  $id_nombre_pos=document.getElementById("id_nombre_pos").value;

  $id_prioridad_pos=document.getElementById("id_prioridad_pos").value;
  $id_estado_pos=document.getElementById("id_estado_pos").value;
  $id_alerta_pos=document.getElementById("id_alerta_pos").value;
  
  
  
  if($valida.resultado){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: $valida.msg
    })
  }else{
      if(datos1 !=""  && data2 != "" && $nombre_plan != ""
      && $descripcion_plan != "" && $fecha_inicio_plan != "" && $fecha_fin_plan != ""

      && $id_empresa_pos != "" && $id_area_pos != "" && $id_unidad_pos != ""
      && $id_puesto != "" && $id_nombre_pos != "" && $id_prioridad_pos != ""
      && $id_estado_pos != "" && $id_alerta_pos != ""){
     
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
                  
                //   id:$('#id').val()

                  
                  
                  
              };
            //   ////console.log(postData);
              try {

                  $.ajax({
                      method: "POST",
                      url: BASE_URL+"/activo/addPlanAccion",
                      data: postData,
                      dataType: "JSON"
                  })
                  .done(function(respuesta) {
                    //console.log(respuesta);

                      if (respuesta.error==1) 
                      {
                         
                          
                        alerta_plan.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                          +  respuesta.msg +
                          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                              '<span aria-hidden="true">&times;</span>'+
                              '</button>'+
                          '</div>';
                        
                        $('#id_plan').val(respuesta.idplan);
                        
                        document.getElementById('btn_crear_plan').style.display = 'none';
                        document.getElementById('apart_actividad').style.display = 'block';
                        document.getElementById('apart_mensaje').style.display = 'block';
                        document.getElementById('apart_tabla').style.display = 'none';
                        // LoadTable_actividadesPlan();
                        cargarTablaActividades(respuesta.idplan);
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
          
         
     
  }
  else{
      //////console.log("aqui5");
      Swal.fire({
               icon: 'error',
               title: 'Error',
               text: 'Faltan Datos'
             })
}
  }

 


});

// document.getElementById("id_area_pos").addEventListener("change",function(){
    
//   if($('#id_area_pos').val() != "" ){
//       cargarDatosPosUnidad($('#id_comboEmpresa').val(),$('#id_area_pos').val());

//   }
  
// });

document.getElementById("id_comboArea").addEventListener("change",function(){
    
  if($('#id_comboArea').val() != "" ){
      cargarDatosUnidadAct($('#id_comboEmpresa').val(),$('#id_comboArea').val());
      //cargarDatosNombreAct($('#id_comboEmpresa'),$('#id_comboArea').val());
  }
  
});
document.getElementById("id_comboUnidades").addEventListener("change",function(){
    
  if($('#id_comboUnidades').val() != "" ){
      cargarDatosPosicionAct($('#id_comboEmpresa').val(),$('#id_comboArea').val(),$('#id_comboUnidades').val());

  }
  
});
document.getElementById("id_comboPosicion").addEventListener("change",function(){
    
  if($('#id_comboPosicion').val() != "" ){
      cargarDatosNombreAct($('#id_comboEmpresa').val(),$('#id_comboArea').val(),$('#id_comboUnidades').val(),$('#id_comboPosicion').val());

  }
  
});












