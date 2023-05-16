var BASE_URL = document.getElementById("base_url").value;


$.ajax({
    method: "POST",
    url: BASE_URL+"/activo/getEmpresasByActivo",
    dataType: "JSON"
})
.done(function(respuesta) {
   //console.log(respuesta);
    if (respuesta) 
    {
        let datos = respuesta;
        $("#id_comboEmpresa").empty();
        $("#id_comboEmpresa").append('<option value="" selected>Seleccione</option>');

    

        datos.data.forEach(dato => {
            
        
                $("#id_comboEmpresa").append('<option value='+dato["id"]+'>'+dato["empresa"]+'</option>');

            
            
        
        });
    } 
    else
    {  }

})
.fail(function(error) {
  
})
.always(function() {
});        





$.ajax({
    method: "GET",
    url: BASE_URL+"/activo/getComboAreas",
    dataType: "JSON"
})
.done(function(respuesta) {
   
    if (respuesta) 
    {
        let datos = respuesta;
        $("#id_comboArea").empty();
        $("#id_comboArea").append('<option value="" selected>Seleccione</option>');

    

        datos.data.forEach(dato => {
            
        
                $("#id_comboArea").append('<option value='+dato["id"]+'>'+dato["area"]+'</option>');

            
            
        
        });
    } 
    else
    {  }

})
.fail(function(error) {
   
})
.always(function() {
});        



$.ajax({
    method: "GET",
    url: BASE_URL+"/activo/getComboUnidad",
    dataType: "JSON"
})
.done(function(respuesta) {
   
    if (respuesta) 
    {
        let datos = respuesta;
        $("#id_comboUnidades").empty();
        $("#id_comboUnidades").append('<option value="" selected>Seleccione</option>');

    

        datos.data.forEach(dato => {
            
        
                $("#id_comboUnidades").append('<option value='+dato["id"]+'>'+dato["unidad"]+'</option>');

            
            
        
        });
    } 
    else
    {  }

})
.fail(function(error) {
   
})
.always(function() {
});        



$.ajax({
    method: "GET",
    url: BASE_URL+"/activo/getComboPosicion",
    dataType: "JSON"
})
.done(function(respuesta) {

    if (respuesta) 
    {
        let datos = respuesta;
        $("#id_comboPosicion").empty();
        $("#id_comboPosicion").append('<option value="" selected>Seleccione</option>');

    

        datos.data.forEach(dato => {
            
        
                $("#id_comboPosicion").append('<option value='+dato["id"]+'>'+dato["posicion_puesto"]+'</option>');

            
            
        
        });
    } 
    else
    {  }

})
.fail(function(error) {
    
})
.always(function() {
});        





$.ajax({
    method: "GET",
    url: BASE_URL+"/activo/getUserNombreByActivo",
    dataType: "JSON"
})
.done(function(respuesta) {
   
    if (respuesta) 
    {
        let datos = respuesta;
        $("#id_comboUsers").empty();
        $("#id_comboUsers").append('<option value="" selected>Seleccione</option>');

    

        datos.data.forEach(dato => {
            
        
                $("#id_comboUsers").append('<option value='+dato["id"]+'>'+dato["nombres_us"]+'</option>');

            
            
        
        });
    } 
    else
    {  }

})
.fail(function(error) {
   
})
.always(function() {
});        



$.ajax({
    method: "GET",
    url: BASE_URL+"/activo/getAlerta",
    dataType: "JSON"
})
.done(function(respuesta) {
   
    if (respuesta) 
    {
        let datos = respuesta;
        $("#id_comboAlert").empty();
        $("#id_comboAlert").append('<option value="" selected>Seleccione</option>');

    

        datos.data.forEach(dato => {
            
        
                $("#id_comboAlert").append('<option value='+dato["id"]+'>'+dato["alerta"]+'</option>');

            
            
        
        });
    } 
    else
    {  }

})
.fail(function(error) {
    
})
.always(function() {
});   
