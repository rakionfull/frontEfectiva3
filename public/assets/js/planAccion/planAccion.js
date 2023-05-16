var BASE_URL = document.getElementById("base_url").value;

window.addEventListener("hashchange", async () => {

    let opcion = window.location.hash;
    $('.alert').remove()

    switch(opcion)
    {
        
        case "#/Estado":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartEstado").style.display = "block";
            document.getElementById("estado").className = "activado";
            permisos = await getPermisos('Estado');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_estado').style.display = 'none';
            }
            //console.log(permisos['update_det']);
            LoadTableEstado(permisos['update_det'],permisos['delete_det']);
            
            
            
            
        window.location.hash = '#';   
        break;

        case "#/Prioridad":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartPrioridad").style.display = "block";
            document.getElementById("prioridad").className = "activado";
            permisos = await getPermisos('Prioridad');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_prioridad').style.display = 'none';
            }
            LoadTablePrioridad(permisos['update_det'],permisos['delete_det']);
            
            
            
            
        window.location.hash = '#';   
        break;

        case "#/AlertaSeguimiento":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartAlertaSeguimiento").style.display = "block";
            document.getElementById("alertaSeguimiento").className = "activado";
            permisos = await getPermisos('Alerta de Seguimiento');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_alerSeguimiento').style.display = 'none';
            }
            LoadTableAlerSeguimiento(permisos['update_det'],permisos['delete_det']);
            
            
            
            
            
        window.location.hash = '#';   
        break;

    }    

});