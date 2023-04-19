var BASE_URL = document.getElementById("base_url").value;
var permisos = [];
window.addEventListener("hashchange",async () => {

    let opcion = window.location.hash;
    $('.alert').remove()
    switch(opcion)
    {
        case "#/Empresa":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartEmpresa").style.display = "block";
            document.getElementById("empresa").className = "activado";
         
            permisos = await getPermisos('Empresa');
           
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_Empresa').style.display = 'none';
            }
            LoadTableEmpresa(permisos['update_det'],permisos['delete_det']);
            
            
            
        window.location.hash = '#';   
        break;
        
        case "#/Area":
           
       
        for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
        {
            document.getElementsByClassName("opcion")[i].style.display = "none";
        }
        document.querySelectorAll(".menu li").forEach(element => {
            element.classList.remove("activado");
        });
        document.getElementById("apartArea").style.display = "block";
        document.getElementById("area").className = "activado";
        permisos = await getPermisos('Areas');
           
        if(permisos['create_det'] == 0){
            document.getElementById('btnAgregar_area_empresa').style.display = 'none';
        }
        LoadTableAreaEmpresa(permisos['update_det'],permisos['delete_det']);
        cargarEmpresaArea(idempresa);  
        

        window.location.hash = '#';   
        break;

        case "#/Unidades":
          
        for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
        {
            document.getElementsByClassName("opcion")[i].style.display = "none";
        }
        document.querySelectorAll(".menu li").forEach(element => {
            element.classList.remove("activado");
        });
        document.getElementById("apartUnidades").style.display = "block";
        document.getElementById("unidades").className = "activado";
        permisos = await getPermisos('Unidades');
           
        if(permisos['create_det'] == 0){
            document.getElementById('btnAgregar_Unidades').style.display = 'none';
        }
        LoadTableUnidades(permisos['update_det'],permisos['delete_det']);
        cargarDatosUnidadesEmpresa(idempresa,0);
        

        window.location.hash = '#';   
        break;

        case "#/Macroproceso":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartMacroproceso").style.display = "block";
            document.getElementById("macroproceso").className = "activado";
            permisos = await getPermisos('Macroprocesos');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_Macroproceso').style.display = 'none';
            }
            LoadTableMacroproceso(permisos['update_det'],permisos['delete_det']);
            cargarDatosMacroEmpresa(idempresa);
          
            
        window.location.hash = '#';   
        break;
                
        case "#/Proceso":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartProceso").style.display = "block";
            document.getElementById("proceso").className = "activado";

            permisos = await getPermisos('Macroprocesos');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_Proceso').style.display = 'none';
            }
            LoadTableProceso(permisos['update_det'],permisos['delete_det']);

            cargarDatosProEmpresa(idempresa);
            // cargarDatosProEmpresa(idempresa);
            
        window.location.hash = '#';   
        break;
        
        case "#/Posicion":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartPosicion").style.display = "block";
            document.getElementById("posicion_puesto").className = "activado";

            permisos = await getPermisos('Posicion/Puesto');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_Posicion').style.display = 'none';
            }
            LoadTablePosicion(permisos['update_det'],permisos['delete_det']);
            cargarDatosPosEmpresa(idempresa);

            
            // s
            
            
        window.location.hash = '#';   
        break;
        
        case "#/AspectoSeg":
          
        for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
        {
            document.getElementsByClassName("opcion")[i].style.display = "none";
        }
        document.querySelectorAll(".menu li").forEach(element => {
            element.classList.remove("activado");
        });
        document.getElementById("apartAspectoSeg").style.display = "block";
        document.getElementById("aspectoSeg").className = "activado";

        permisos = await getPermisos('Aspecto de Seguridad');
        if(permisos['create_det'] == 0){
            document.getElementById('btnAgregar_AspectoSeg').style.display = 'none';
        }
        LoadTableAspectoSeg(permisos['update_det'],permisos['delete_det']);


        window.location.hash = '#';   
        break;

        case "#/Valor_activo":
            
       
        for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
        {
            document.getElementsByClassName("opcion")[i].style.display = "none";
        }
        document.querySelectorAll(".menu li").forEach(element => {
            element.classList.remove("activado");
        });
        document.getElementById("apartValor_activo").style.display = "block";
        document.getElementById("valor_activo").className = "activado";
        permisos = await getPermisos('Valor de activo');
        if(permisos['create_det'] == 0){
            document.getElementById('btnAgregar_ValorActivo').style.display = 'none';
        }
        LoadTableValorActivo(permisos['update_det'],permisos['delete_det']);
        
        
        window.location.hash = '#';   
        break;

        case "#/Tipo_activo":
                   
        for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
        {
            document.getElementsByClassName("opcion")[i].style.display = "none";
        }
        document.querySelectorAll(".menu li").forEach(element => {
            element.classList.remove("activado");
        });
        document.getElementById("apartTipo_activo").style.display = "block";
        document.getElementById("tipo_activo").className = "activado";
        permisos = await getPermisos('Tipo de activo');
        if(permisos['create_det'] == 0){
            document.getElementById('btnAgregar_Tipo_activo').style.display = 'none';
        }
        LoadTableTipo_activo(permisos['update_det'],permisos['delete_det']);
      

        window.location.hash = '#';   
        break;

        case "#/Categoria_activo":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartCatActivo").style.display = "block";
            document.getElementById("Categoria_activo").className = "activado";

            permisos = await getPermisos('Categoría de activo');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_catActivo').style.display = 'none';
            }
            LoadTableCatActivo(permisos['update_det'],permisos['delete_det']);
            cargarDatosCatActivo();
        window.location.hash = '#';   
        break;
        
        case "#/Ubicacion_activo":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartUbiActivo").style.display = "block";
            document.getElementById("ubicacion_activo").className = "activado";
            permisos = await getPermisos('Ubicación de activo');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_catActivo').style.display = 'none';
            }
            LoadTableUbiActivo(permisos['update_det'],permisos['delete_det']);
           
            cargarDatosContinentes();
            
        window.location.hash = '#';   
        break;
        
        case "#/Valoracion_activo":
            
           
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
            {
                document.getElementsByClassName("opcion")[i].style.display = "none";

                // $(".menu li").removeClass("activado");
            }
           
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartValActivo").style.display = "block";
            document.getElementById("valoracion_activo").className = "activado";
            permisos = await getPermisos('Valor de activo');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_catActivo').style.display = 'none';
            }
            LoadTableValActivo(permisos['update_det'],permisos['delete_det']);
            
            cargarDatosAspectosSeguridad();
            cargarDatosValActivo();
        window.location.hash = '#';   
        break;
        
        case "#/Clasificacion_informacion":
            
       
        for(let i=0; i<document.getElementsByClassName("opcion").length; i++)
        {
            document.getElementsByClassName("opcion")[i].style.display = "none";
        }
        document.querySelectorAll(".menu li").forEach(element => {
            element.classList.remove("activado");
        });
        document.getElementById("apartClasificacion_informacion").style.display = "block";
        document.getElementById("clasificacion_informacion").className = "activado";
        permisos = await getPermisos('Clasificación de información');
        if(permisos['create_det'] == 0){
            document.getElementById('btnAgregar_catActivo').style.display = 'none';
        }
        LoadTableClasificacion_informacion(permisos['update_det'],permisos['delete_det']);
       
        window.location.hash = '#';   
        break;

       }    

});