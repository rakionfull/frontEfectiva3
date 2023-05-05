function validarFechas(fecha_ini,fecha_fin) {
    let resultado =false ;
    let msg = "";
    // console.log(fecha_ini);
    // console.log(fecha_fin);
    fecha1 = new Date(fecha_ini).getTime();
    fecha2 = new Date(fecha_fin).getTime();
    // console.log(fecha1);
    // console.log(fecha2);
    if (fecha1 > fecha2 ){
      resultado = true;
      msg = "La fecha fin debe ser mayor o igual a la fecha de inicio";
    }
    return $array = {
      resultado: resultado,
      msg: msg
    };
     
  
    
  }
document.getElementById("btnDescargar").addEventListener("click",function(){
    event.preventDefault();
    // console.log('liock en report');
   
    $valida = validarFechas($('#fecha_ini').val(),$('#fecha_fin').val());
    if($valida.resultado){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: $valida.msg
        })
      }else{
            const postData = { 
                fecha_ini: $('#fecha_ini').val(),
                fecha_fin: $('#fecha_fin').val()
            };
            try {
                $.ajax({
                    method: "POST",
                    url: $('#base_url').val()+"/main/getReporteSeguridad",
                    data: postData,
                    dataType: "JSON"
                })
                .done(function(respuesta) {
                    // console.log(respuesta);
                    $url = $('#base_url').val()+'/public/assets/reportes/'+respuesta;
                
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
      }
   
});