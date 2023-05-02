var BASE_URL = document.getElementById("base_url").value;
window.addEventListener("hashchange", async () => {
    let opcion = window.location.hash;
    $('.alert').remove()
    switch(opcion)
    {
        case "#/ValoracionRiesgo":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartValoracionRiesgo").style.display = "block";
            if(escenario == 2){
                document.getElementById("apartMatriz").style.display = "block";
            }
           

            document.getElementById("ValoracionRiesgo").className = "activado";
            permisos = await getPermisos('Valoracion de riesgo');
            if(permisos['create_det'] == 0){
                document.getElementById('btnAgregar_ValoracionRiesgo').style.display = 'none';
            }
            loadTableValoracionRiesgo(permisos['update_det'],permisos['delete_det']);

            cargarProbabilidadRiesgo();
            cargarImpactoRiesgo();
            cargarMatrisRiesgo();
            window.location.hash = '#';
        break;
        case "#/TipoRiesgo":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartTipoRiesgo").style.display = "block";
            document.getElementById("tipo_riesgo").className = "activado";
            permisos = await getPermisos('Tipo de riesgo');
            if(permisos['create_det'] == 0){
                document.getElementById('btn_add_tipo_reisgo').style.display = 'none';
            }
            loadTableTipoRiesgo(permisos['update_det'],permisos['delete_det']);
          
            window.location.hash = '#';   
            break;
        case "#/ProbabilidadRiesgo":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartProbabilidadRiesgo").style.display = "block";
            document.getElementById("probabilidad_riesgo").className = "activado";
            window.location.hash = '#';
            if(escenario == null){
                noEscene()
            }else{
                if(escenario == 2){
                    activeScene2()
                }else{
                    if(escenario == 1){
                        activeScene1()
                    }
                }
            }
            permisos = await getPermisos('Probabilidad de riesgo');
            if(permisos['create_det'] == 0){
                document.getElementById('btn_add_probabilidad_1').style.display = 'none';
                document.getElementById('btn_add_probabilidad_2').style.display = 'none';
            }
            
            loadTableProbabilidad1(permisos['update_det'],permisos['delete_det']);
            loadTableProbabilidad2(permisos['update_det'],permisos['delete_det']);
            break;
        case "#/ImpactoRiesgo":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartImpactoRiesgo").style.display = "block";
            document.getElementById("impacto_riesgo").className = "activado";
            window.location.hash = '#';
            console.log("Escenario",escenario);

            permisos = await getPermisos('Impacto de riesgo');
            if(permisos['create_det'] == 0){
                document.getElementById('btn_add_impacto_1').style.display = 'none';
                document.getElementById('btn_add_impacto_2').style.display = 'none';
            }
            
            loadTableImpacto1(permisos['update_det'],permisos['delete_det']);
            loadTableImpacto2(permisos['update_det'],permisos['delete_det']);

            if(escenario == null){
                noEsceneImpacto()
            }else{
                if(escenario == 2){
                    activeScene2Impacto()
                }else{
                    if(escenario == 1){
                       activeScene1Impacto()
                    }
                }
            }
            break;
        
        case "#/NivelRiesgo":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartNivelRiesgo").style.display = "block";
            document.getElementById("nivel_riesgo").className = "activado";
            permisos = await getPermisos('Nivel de riesgo');
            if(permisos['create_det'] == 0){
                document.getElementById('btn_add_nivel_riesgo').style.display = 'none';
            }
            loadTableNivelRiesgo(permisos['update_det'],permisos['delete_det']);
          
            window.location.hash = '#';
            break;
        case "#/TipoAmenaza":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartTipoAmenaza").style.display = "block";
            document.getElementById("tipo_amenaza").className = "activado";
            permisos = await getPermisos('Tipo de amenaza');
            if(permisos['create_det'] == 0){
                document.getElementById('btn_add_tipo_amenaza').style.display = 'none';
            }
            loadTableTipoAmenaza(permisos['update_det'],permisos['delete_det']);
            
            window.location.hash = '#';
            break;
        case "#/DescAmenaza":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartDescAmenaza").style.display = "block";
            document.getElementById("descripcion_amenaza").className = "activado";
            permisos = await getPermisos('Descripción de amenaza');
            if(permisos['create_det'] == 0){
                document.getElementById('btn_add_desc_amenaza').style.display = 'none';
            }
            loadTableDescAmenaza(permisos['update_det'],permisos['delete_det']);
            
            window.location.hash = '#';
            break;
        case "#/CategoriaVulnerabilidad":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartCategoriaVulnerabilidad").style.display = "block";
            document.getElementById("categoria_vulnerabilidad").className = "activado";
            permisos = await getPermisos('Categoría de vulnerabilidad');
            if(permisos['create_det'] == 0){
                document.getElementById('btn_add_categoria_vulnerabilidad').style.display = 'none';
            }
            loadTableCategoriasVulnerabilidad(permisos['update_det'],permisos['delete_det']);
        
            window.location.hash = '#';
            break;
        case "#/DescVulnerabilidad":
            for(let i=0; i<document.getElementsByClassName("opcion").length; i++){
                document.getElementsByClassName("opcion")[i].style.display = "none";
            }
            document.querySelectorAll(".menu li").forEach(element => {
                element.classList.remove("activado");
            });
            document.getElementById("apartDescVulnerabilidad").style.display = "block";
            document.getElementById("descripcion_vulnerabilidad").className = "activado";
            permisos = await getPermisos('Descripción de vulnerabilidad');
            if(permisos['create_det'] == 0){
                document.getElementById('btn_add_desc_vulnerabilidad').style.display = 'none';
            }
            loadTableDescVulnerabilidad(permisos['update_det'],permisos['delete_det']);
           
            window.location.hash = '#';
            break;
        
    }
});