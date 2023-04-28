<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (is_file(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.

        //$routes->get('/', 'Home::index');
        // rutas login

        $routes->get('/iniciosesion', 'Auth::index');
        $routes->post('/login', 'Auth::index');
        $routes->get('/inicio', 'Main::inicio');
        $routes->get('/cambio_clave', 'Main::cambio_clave');
        $routes->get('/reseteo_pass/(:num)', 'Main::reseteo_pass/$1');
        $routes->post('/updateClave', 'Main::updateClave');
        $routes->post('/updateClave2/(:num)', 'Main::updateClave2/$id');
        $routes->post('/logout', 'Auth::logout');
        $routes->get('/change_pass', 'Auth::change_pass');
        $routes->post('/updatePass', 'Auth::updatePass');
        $routes->get('auth/getNewCaptcha', 'Auth::getNewCaptcha');
        $routes->post('auth/validaCaptcha', 'Auth::validaCaptcha');

        // rutas panel principal

        $routes->post('/getPermisos', 'Main::getPermisos');

        $routes->get('/listUsers', 'Main::listUsers');
        $routes->post('main/updateEstadoUser', 'Main::updateEstadoUser');
        $routes->get('main/getUsers/(:any)', 'Main::getUsers/$1');
        $routes->get('/createUser', 'Main::createUser');
      //  $routes->addPlaceholder('uuid', '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}');
        $routes->get('/modifyUser/(:any)', 'Main::modifyUser/$1');
        $routes->get('/deleteUser/(:num)', 'Main::deleteUser/$1');
        $routes->get('/configPass', 'Main::configPass');
        $routes->post('/main/addConfigPass', 'Main::addConfigPass');
        $routes->post('/main/addUser', 'Main::addUser');
        $routes->post('/updateUser/(:num)', 'Main::updateUser/$1');
        $routes->get('perfiles', 'Main::perfiles');
        $routes->get('main/getPerfiles/(:any)', 'Main::getPerfiles/$1');
        $routes->get('main/getPerfiles/(:any)', 'Main::getPerfiles/$1');

        $routes->get('main/detPerfil/(:num)', 'Main::detPerfil/$1');

        $routes->post('/main/addPerfil', 'Main::addPerfil');
        $routes->post('/main/validarPerfil', 'Main::validarPerfil');
        $routes->post('/main/updatePerfil', 'Main::updatePerfil');
        $routes->get('/main/deletePerfil/(:num)', 'Main::deletePerfil/$1');
        $routes->post('/main/updateView', 'Main::updateView');
        $routes->post('/main/updateCreate', 'Main::updateCreate');
        $routes->post('/main/updateUpdate', 'Main::updateUpdate');
        $routes->post('/main/updateDelete', 'Main::updateDelete');

        //reportes

        $routes->post('/main/reporteUsuarios', 'Main::reporteUsuarios');
        $routes->post('/reporteDetallePerfil', 'Main::reporteDetallePerfil');

        // rutas para paremetrizacion
        $routes->get('/activos', 'Main::activos');
        $routes->get('/riesgos', 'Main::riesgos');
        $routes->get('/controles', 'Main::controles');
        $routes->get('/planesAccion', 'Main::planesAccion');
        $routes->get('/planAccion', 'Main::planAccion');

        //registro de controles
        $routes->get('/registro-controles', 'Main::registro_controles');
        $routes->get('/create-controles', 'Main::create_controles');
        $routes->get('/update-controles/(:num)', 'Main::update_controles/$1');
        $routes->get('/delete-controles/(:num)', 'Main::delete_controles/$1');

        $routes->get('activo/getEmpresas', 'Activo::getEmpresas');


        $routes->post('activo/getEmpresasByActivo', 'Activo::getEmpresasByActivo');
        $routes->post('/activo/addEmpresa', 'Activo::addEmpresa');
        $routes->post('/activo/updateEmpresa', 'Activo::updateEmpresa');
        $routes->post('/activo/deleteEmpresa', 'Activo::deleteEmpresa');

        //rutas para areas
        $routes->get('activo/getArea/(:num)', 'Activo::getArea/$1');
        $routes->post('activo/getAreasByActivo', 'Activo::getAreasByActivo');
        $routes->post('/activo/addArea', 'Activo::addArea');
        $routes->post('/activo/deleteArea', 'Activo::deleteArea');
        $routes->post('/activo/updateArea', 'Activo::updateArea');
        $routes->get('activo/getAreasEmpresa/(:num)', 'Activo::getAreasEmpresa/$1');
         $routes->post('/activo/addAreaEmpresa', 'Activo::addAreaEmpresa');
        $routes->post('/activo/updateAreaEmpresa', 'Activo::updateAreaEmpresa');

        //valo activo
        $routes->post('activo/getValorActivoByActivo', 'Activo::getValorActivoByActivo');
        $routes->get('activo/getValorActivo', 'Activo::getValorActivo');
        $routes->post('/activo/validarValorActivo', 'Activo::validarValorActivo');
        $routes->post('/activo/addValorActivo', 'Activo::addValorActivo');
        $routes->post('/activo/updateValorActivo', 'Activo::updateValorActivo');
        $routes->post('/activo/deleteValorActivo', 'Activo::deleteValorActivo');

        //tipo activo
        $routes->post('activo/getTipoActivoByActivo', 'Activo::getTipoActivoByActivo');
        $routes->get('activo/getTipoActivo', 'Activo::getTipoActivo');
        $routes->post('/activo/validarTipoActivo', 'Activo::validarTipoActivo');
        $routes->post('/activo/addTipoActivo', 'Activo::addTipoActivo');
        $routes->post('/activo/updateTipoActivo', 'Activo::updateTipoActivo');
        $routes->post('/activo/deleteTipoActivo', 'Activo::deleteTipoActivo');

        $routes->post('activo/listaCategoriaByActivo', 'Activo::listaCategoriaByActivo');

        //clasificaicon de activo
        $routes->get('activo/getClasInformacion', 'Activo::getClasInformacion');
        $routes->post('/activo/validarClasInfo', 'Activo::validarClasInfo');
        $routes->post('/activo/addClasInformacion', 'Activo::addClasInformacion');
        $routes->post('/activo/updateClasInformacion', 'Activo::updateClasInformacion');
        $routes->post('/activo/deleteClasInfo', 'Activo::deleteClasInfo');

        //aspecto de seguridad
        $routes->post('activo/getAspectoByActivo', 'Activo::getAspectoByActivo');
        $routes->get('activo/getAspectoSeg', 'Activo::getAspectoSeg');
        $routes->post('/activo/validarApectoSeg', 'Activo::validarApectoSeg');
        $routes->post('/activo/addAspectoSeg', 'Activo::addAspectoSeg');
        $routes->post('/activo/updateAspectoSeg', 'Activo::updateAspectoSeg');
        $routes->post('/activo/deleteAspectoSeg', 'Activo::deleteAspectoSeg');

        //posicion y puesto
        $routes->get('activo/getPosicion/(:num)', 'Activo::getPosicion/$1');
        $routes->get('activo/getPosicionByArea/(:num)', 'Activo::getPosicionByArea/$1');
        $routes->post('activo/getPosicionByUnidad', 'Activo::getPosicionByUnidad');
        $routes->post('/activo/validarPosicion', 'Activo::validarPosicion');
        $routes->post('activo/getPosicionByActivo', 'Activo::getPosicionByActivo');
        $routes->post('/activo/addPosicion', 'Activo::addPosicion');
        $routes->post('/activo/updatePosicion', 'Activo::updatePosicion');
        $routes->post('/activo/deletePosicion', 'Activo::deletePosicion');

        // Unidades
        $routes->get('activo/getUnidades/(:num)', 'Activo::getUnidades/$1');
        $routes->post('activo/getUnidadadesByEmpresaByArea/', 'Activo::getUnidadadesByEmpresaByArea');
        $routes->post('/activo/addUnidades', 'Activo::addUnidades');
        $routes->post('/activo/updateUnidades', 'Activo::updateUnidades');
        $routes->post('activo/getUnidadByActivo', 'Activo::getUnidadByActivo');
        $routes->post('/activo/deleteUnidad', 'Activo::deleteUnidad');

        $routes->get('activo/getEmpresaAreaUnidades', 'Main::getEmpresaAreaUnidades');

        //maroproceso

        $routes->get('activo/getMacroproceso/(:num)', 'Activo::getMacroproceso/$1');
        $routes->post('/activo/addMacroproceso', 'Activo::addMacroproceso');
        $routes->post('/activo/updateMacroproceso', 'Activo::updateMacroproceso');
        $routes->post('/activo/deleteMacroproceso', 'Activo::deleteMacroproceso');
        $routes->post('activo/getMacroprocesoByActivo', 'Activo::getMacroprocesoByActivo');
        $routes->post('activo/listaProcesoByMacro', 'Activo::listaProcesoByMacro');

        //proceso
        $routes->get('/activo/getProceso/(:num)', 'Activo::getProceso/$1');
        $routes->post('/activo/addProceso', 'Activo::addProceso');
        $routes->post('/activo/updateProceso', 'Activo::updateProceso');
        $routes->post('/activo/getProcesoByActivo', 'Activo::getProcesoByActivo');
        $routes->post('/activo/deleteProceso', 'Activo::deleteProceso');
        //valoracion de activo
        $routes->get('activo/getValActivo', 'Activo::getValActivo');
        $routes->post('/activo/validarValActivo', 'Activo::validarValActivo');
        $routes->post('/activo/addValActivo', 'Activo::addValActivo');
        $routes->post('/activo/updateValActivo', 'Activo::updateValActivo');
        $routes->post('/activo/deleteValActivo', 'Activo::deleteValActivo');
        $routes->get('/activo/getDetalleEvaluacionActivo/(:num)', 'Activo::getDetalleEvaluacionActivo/$1');
      
        $routes->get('activo/getValoracionActivo', 'Activo::getValoracionActivo');
        $routes->get('activo/getAspectoSeguridad', 'Activo::getAspectoSeguridad');

        //Categoria de activo
        $routes->get('activo/getCatActivo', 'Activo::getCatActivo');
        $routes->post('/activo/validarCatActivo', 'Activo::validarCatActivo');
        $routes->post('/activo/addCatActivo', 'Activo::addCatActivo');
        $routes->post('/activo/updateCatActivo', 'Activo::updateCatActivo');
        $routes->post('/activo/deleteCatActivo', 'Activo::deleteCatActivo');


        //Ubicacion de activo
        $routes->get('activo/getUbiActivo', 'Activo::getUbiActivo');
        $routes->post('/activo/addUbiActivo', 'Activo::addUbiActivo');
        $routes->post('/activo/updateUbiActivo', 'Activo::updateUbiActivo');
        $routes->post('/activo/deleteUbiActivo', 'Activo::deleteUbiActivo');

        //traer continentes paises ciudades
        $routes->post('activo/getContinente', 'Activo::getContinente');
        $routes->post('activo/getPais', 'Activo::getPais');
        $routes->post('activo/getCiudad', 'Activo::getCiudad');


        // Rutas para tipo de riesgos
        $routes->get('/riesgos', 'Main::riesgos');
        $routes->get('/main/showTipoRiesgo/(:num)','TipoRiesgoController::showTipoRiesgo/$1');
        $routes->get('/main/getTipoRiesgos', 'TipoRiesgoController::getTipoRiesgos');
        $routes->get('/main/getTipoRiesgosByActivo', 'TipoRiesgoController::getTipoRiesgosByActivo');
        $routes->post('/main/addTipoRiesgo', 'TipoRiesgoController::addTipoRiesgo');
        $routes->post('/main/updateTipoRiesgo', 'TipoRiesgoController::updateTipoRiesgo');
        $routes->post('/main/deleteTipoRiesgo/(:num)', 'TipoRiesgoController::deleteTipoRiesgo/$1');

       // Rutas para probabilidad de riesgos
        $routes->get('/main/getActives/(:num)','ProbabilidadRiesgoController::getActives/$1');
        $routes->get('/main/getProbabilidadRiesgo/(:num)','ProbabilidadRiesgoController::getProbabilidadRiesgo/$1');
        $routes->post('/main/addProbabilidadRiesgo1','ProbabilidadRiesgoController::addProbabilidadRiesgo1');
        $routes->post('/main/updateProbabilidadRiesgo1','ProbabilidadRiesgoController::updateProbabilidadRiesgo1');
        $routes->post('/main/addProbabilidadRiesgo2','ProbabilidadRiesgoController::addProbabilidadRiesgo2');
        $routes->post('/main/updateProbabilidadRiesgo2','ProbabilidadRiesgoController::updateProbabilidadRiesgo2');
        $routes->post('/main/deleteProbabilidadRiesgo/(:num)', 'ProbabilidadRiesgoController::deleteProbabilidadRiesgo/$1');

        // Rutas para impacto de riesgos
        $routes->get('/main/getActivesImpacto/(:num)','ImpactoRiesgoController::getActives/$1');
        $routes->get('/main/getImpactoRiesgo/(:num)','ImpactoRiesgoController::getImpactoRiesgo/$1');
        $routes->post('/main/addImpactoRiesgo1','ImpactoRiesgoController::addImpactoRiesgo1');
        $routes->post('/main/updateImpactoRiesgo1','ImpactoRiesgoController::updateImpactoRiesgo1');
        $routes->post('/main/addImpactoRiesgo2','ImpactoRiesgoController::addImpactoRiesgo2');
        $routes->post('/main/updateImpactoRiesgo2','ImpactoRiesgoController::updateImpactoRiesgo2');
        $routes->post('/main/deleteImpactoRiesgo/(:num)', 'ImpactoRiesgoController::deleteImpactoRiesgo/$1');
                
        // Rutas para nivel de riesgos
        $routes->get('/main/getNivelRiesgo','NivelRiesgoController::getNivelRiesgo');
        $routes->get('/main/showNivelRiesgo/(:num)','NivelRiesgoController::showNivelRiesgo/$1');
        $routes->post('/main/addNivelRiesgo','NivelRiesgoController::addNivelRiesgo');
        $routes->post('/main/updateNivelRiesgo/(:num)','NivelRiesgoController::updateNivelRiesgo/$1');
        $routes->post('/main/deleteNivelRiesgo/(:num)', 'NivelRiesgoController::deleteNivelRiesgo/$1');

        // Rutas para tipo de amenaza
        $routes->get('/main/getTiposAmenaza','TipoAmenazaController::getTiposAmenaza');
        $routes->get('/main/showTipoAmenaza/(:num)','TipoAmenazaController::showTipoAmenaza/$1');
        $routes->post('/main/addTipoAmenaza','TipoAmenazaController::addTipoAmenaza');
        $routes->post('/main/updateTipoAmenaza/(:num)','TipoAmenazaController::updateTipoAmenaza/$1');
        $routes->post('/main/deleteTipoAmenaza/(:num)', 'TipoAmenazaController::deleteTipoAmenaza/$1');

        // Rutas para desc de amenaza
        $routes->get('/main/getDescAmenaza','DescripcionAmenazaController::getDescAmenaza');
        $routes->get('/main/showDescAmenaza/(:num)','DescripcionAmenazaController::showDescAmenaza/$1');
        $routes->post('/main/addDescAmenaza','DescripcionAmenazaController::addDescAmenaza');
        $routes->post('/main/updateDescAmenaza/(:num)','DescripcionAmenazaController::updateDescAmenaza/$1');
        $routes->post('/main/deleteDescAmenaza/(:num)', 'DescripcionAmenazaController::deleteDescAmenaza/$1');

        // Rutas para categoria vulnerabilidad
        $routes->get('/main/getCategoriasVulnerabilidad','CategoriasVulnerabilidadController::getCategoriasVulnerabilidad');
        $routes->get('/main/showCategoriasVulnerabilidad/(:num)','CategoriasVulnerabilidadController::showCategoriasVulnerabilidad/$1');
        $routes->post('/main/addCategoriasVulnerabilidad','CategoriasVulnerabilidadController::addCategoriasVulnerabilidad');
        $routes->post('/main/updateCategoriasVulnerabilidad/(:num)','CategoriasVulnerabilidadController::updateCategoriasVulnerabilidad/$1');
        $routes->post('/main/deleteCategoriasVulnerabilidad/(:num)', 'CategoriasVulnerabilidadController::deleteCategoriasVulnerabilidad/$1');

        // Rutas para desc vulnerabilidad
        $routes->get('/main/getDescVulnerabilidad','DescriptionVulnerabilidadController::getDescVulnerabilidad');
        $routes->get('/main/showDescVulnerabilidad/(:num)','DescriptionVulnerabilidadController::showDescVulnerabilidad/$1');
        $routes->post('/main/addDescVulnerabilidad','DescriptionVulnerabilidadController::addDescVulnerabilidad');
        $routes->post('/main/updateDescVulnerabilidad/(:num)','DescriptionVulnerabilidadController::updateDescVulnerabilidad/$1');
        $routes->post('/main/deleteDescVulnerabilidad/(:num)', 'DescriptionVulnerabilidadController::deleteDescVulnerabilidad/$1');


        //Controles

        //cobertura

        $routes->get('main/getCobertura', 'CoberturaController::getCobertura');
        $routes->post('/main/addCobertura', 'CoberturaController::addCobertura');
        $routes->post('/main/updateCobertura', 'CoberturaController::updateCobertura');
        $routes->post('/main/deleteCobertura', 'CoberturaController::deleteCobertura');


        //Caracteristica de Control

        $routes->get('main/getOpcionesCaracteristica/(:any)', 'CaractControlController::getOpcionesCaracteristica/$1');
        $routes->get('main/getCaractControl/(:any)/(:any)/(:any)', 'CaractControlController::getCaractControl/$1/$2/$3');
        $routes->post('/main/addCaractControl', 'CaractControlController::addCaractControl');
        $routes->post('/main/updateCaractControl', 'CaractControlController::updateCaractControl');
        $routes->post('/main/deleteCaractControl', 'CaractControlController::deleteCaractControl');


        //Diseño

        $routes->get('main/getOpcionesDisenio', 'DisenioController::getOpcionesDisenio');
        $routes->get('main/getDisenio', 'DisenioController::getDisenio');
        $routes->post('/main/addDisenio', 'DisenioController::addDisenio');
        $routes->post('/main/updateDisenio', 'DisenioController::updateDisenio');
        $routes->post('/main/deleteDisenio', 'DisenioController::deleteDisenio');

        //Definicion

        $routes->get('main/getDefinicion', 'DefinicionController::getDefinicion');
        $routes->post('/main/addDefinicion', 'DefinicionController::addDefinicion');
        $routes->post('/main/updateDefinicion', 'DefinicionController::updateDefinicion');
        $routes->post('/main/deleteDefinicion', 'DefinicionController::deleteDefinicion');

       //Objetivo

       $routes->get('main/getObjetivo', 'ObjetivoController::getObjetivo');
       $routes->post('/main/addObjetivo', 'ObjetivoController::addObjetivo');
       $routes->post('/main/updateObjetivo', 'ObjetivoController::updateObjetivo');
       $routes->post('/main/deleteObjetivo', 'ObjetivoController::deleteObjetivo');    
       
        //Clasificacion de Diseño

        $routes->get('main/getCalificacionDise', 'CalificacionDiseController::getCalificacionDise');
        $routes->post('/main/addCalificacionDise', 'CalificacionDiseController::addCalificacionDise');
        $routes->post('/main/updateCalificacionDise', 'CalificacionDiseController::updateCalificacionDise');
        $routes->post('/main/deleteCalificacionDise', 'CalificacionDiseController::deleteCalificacionDise');    

         //Operatividad

         $routes->get('main/getOperatividad', 'OperatividadController::getOperatividad');
         $routes->get('main/getOpcionesOperatividad', 'OperatividadController::getOpcionesOperatividad');
         $routes->post('/main/addOperatividad', 'OperatividadController::addOperatividad');
         $routes->post('/main/updateOperatividad', 'OperatividadController::updateOperatividad');
         $routes->post('/main/deleteOperatividad', 'OperatividadController::deleteOperatividad');   
         
         //Prueba

         $routes->get('main/getPrueba', 'PruebaController::getPrueba');
         $routes->post('/main/addPrueba', 'PruebaController::addPrueba');
         $routes->post('/main/updatePrueba', 'PruebaController::updatePrueba');
         $routes->post('/main/deletePrueba', 'PruebaController::deletePrueba');   

          //Automatizacion

          $routes->get('main/getAutomatizacion', 'AutomatizacionController::getAutomatizacion');
          $routes->post('/main/addAutomatizacion', 'AutomatizacionController::addAutomatizacion');
          $routes->post('/main/updateAutomatizacion', 'AutomatizacionController::updateAutomatizacion');
          $routes->post('/main/deleteAutomatizacion', 'AutomatizacionController::deleteAutomatizacion');   


        //Clasificacion de Operatividad

        $routes->get('main/getCalificacionOpera', 'CalificacionOperaController::getCalificacionOpera');
        $routes->post('/main/addCalificacionOpera', 'CalificacionOperaController::addCalificacionOpera');
        $routes->post('/main/updateCalificacionOpera', 'CalificacionOperaController::updateCalificacionOpera');
        $routes->post('/main/deleteCalificacionOpera', 'CalificacionOperaController::deleteCalificacionOpera');  
        
         //Caracteristica de Operatividad

         $routes->get('main/getCaracteristicaOpera', 'CaracteristicaOperaController::getCaracteristicaOpera');
         $routes->post('/main/addCaracteristicaOpera', 'CaracteristicaOperaController::addCaracteristicaOpera');
         $routes->post('/main/updateCaracteristicaOpera', 'CaracteristicaOperaController::updateCaracteristicaOpera');
         $routes->post('/main/deleteCaracteristicaOpera', 'CaracteristicaOperaController::deleteCaracteristicaOpera');  

      //Valoracion de Riesgo

      $routes->get('main/getValoracionRiesgo', 'ValoracionRiesgoController::getValoracionRiesgo');
      $routes->post('/main/addValoracionRiesgo', 'ValoracionRiesgoController::addValoracionRiesgo');
      $routes->post('/main/updateValoracionRiesgo', 'ValoracionRiesgoController::updateValoracionRiesgo');
      $routes->post('/main/deleteValoracionRiesgo', 'ValoracionRiesgoController::deleteValoracionRiesgo');
      
      $routes->get('main/getProbabilidadRiesgoByActivo', 'ValoracionRiesgoController::getProbabilidadRiesgoByActivo');
      $routes->get('main/getImpactoRiesgoByActivo', 'ValoracionRiesgoController::getImpactoRiesgoByActivo');
      $routes->get('main/getDataMatriz', 'ValoracionRiesgoController::getDataMatriz');


      $routes->get('main/getEvaluacionControl', 'EvaluacionControlController::getEvaluacionControl');
      $routes->post('main/addEvaluacionControl', 'EvaluacionControlController::addEvaluacionControl');
      $routes->post('main/updateEvaluacionControl', 'EvaluacionControlController::updateEvaluacionControl');
      $routes->post('main/deleteEvaluacionControl', 'EvaluacionControlController::deleteEvaluacionControl');

      $routes->get('/main/getDetalleEvaluacionControl/(:num)', 'EvaluacionControlController::getDetalleEvaluacionControl/$1');

      $routes->get('main/getCalificacionTotal', 'EvaluacionControlController::getCalificacionTotal');
     
      $routes->get('main/getDisenioCalificacion', 'EvaluacionControlController::getDisenioCalificacion');
      $routes->get('main/getOperatividadCalificacion', 'EvaluacionControlController::getOperatividadCalificacion');

      $routes->get('main/getCalificacionSubMenu', 'EvaluacionControlController::getCalificacionSubMenu');
      $routes->get('main/getCalificacionOpcion/(:num)', 'EvaluacionControlController::getCalificacionOpcion/$1');

      //aplucacion de la probabilidad
      $routes->get('main/getAplicacionProbabilidad', 'AplicacionProbabilidadController::getAplicacionProbabilidad');
      $routes->post('main/addAplicacionProbabilidad', 'AplicacionProbabilidadController::addAplicacionProbabilidad');
      $routes->post('main/updateAplicacionProbabilidad', 'AplicacionProbabilidadController::updateAplicacionProbabilidad');
      $routes->post('main/deleteAplicacionProbabilidad', 'AplicacionProbabilidadController::deleteAplicacionProbabilidad');

         //aplucacion del impacto
      $routes->get('main/getAplicacionImpacto', 'AplicacionImpactoController::getAplicacionImpacto');
      $routes->post('main/addAplicacionImpacto', 'AplicacionImpactoController::addAplicacionImpacto');
      $routes->post('main/updateAplicacionImpacto', 'AplicacionImpactoController::updateAplicacionImpacto');
      $routes->post('main/deleteAplicacionImpacto', 'AplicacionImpactoController::deleteAplicacionImpacto');


            $routes->get('activo/getEstado', 'Activo::getEstado');
        $routes->post('/activo/addEstado', 'Activo::addEstado');
        $routes->post('/activo/updateEstado', 'Activo::updateEstado');
        $routes->post('/activo/deleteEstado', 'Activo::deleteEstado');
   
   
   $routes->post('/activo/addEstadoValidada', 'Activo::addEstadoValidada');
   


   $routes->get('activo/getPrioridad', 'Activo::getPrioridad');
   $routes->post('/activo/addPrioridad', 'Activo::addPrioridad');
   $routes->post('/activo/updatePrioridad', 'Activo::updatePrioridad');
   $routes->post('/activo/deletePrioridad', 'Activo::deletePrioridad');

   


   $routes->get('activo/getAlerta_seguimiento', 'Activo::getAlerta_seguimiento');
   $routes->post('/activo/addAlerta_seguimiento', 'Activo::addAlerta_seguimiento');
   $routes->post('/activo/updateAlerta_seguimiento', 'Activo::updateAlerta_seguimiento');
   $routes->post('/activo/deleteAlerta_seguimiento', 'Activo::deleteAlerta_seguimiento');



    //---------------- de Plan de accion -------------------------------------

    $routes->get('PlanAccion/getAlerta_seguimiento', 'PlanAccion::getAlerta_seguimiento');



     // RIESGO PLAN DE ACCIÓN
     $routes->get('/registrar', 'Main::RegPlanAccion');
     $routes->get('/modificarPlanAccion/(:num)', 'Main::modificarPlanAccion/$1');
     $routes->get('/verDetalle/(:num)', 'Main::verDetalle/$1');
     
     $routes->get('activo/getPlanAccion', 'Activo::getPlanAccion');
     $routes->post('/activo/getActividadByPlan', 'Activo::getActividadByPlan');
     $routes->post('/activo/addPlanAccion', 'Activo::addPlanAccion');
     $routes->post('/activo/updatePlanAccion', 'Activo::updatePlanAccion');
     $routes->post('/activo/deletePlanAccion', 'Activo::deletePlanAccion');
 
    // RIESGO ACTIVIDADES PLAN 
     $routes->get('activo/getActividadPlan/(:num)', 'Activo::getActividadPlan/$1');
     $routes->get('activo/getPlan/(:num)', 'Activo::getPlan/$1');
     $routes->post('/activo/addActividadPlan', 'Activo::addActividadPlan');
     $routes->post('/activo/updateActividadPlan', 'Activo::updateActividadPlan');
     $routes->post('/activo/deleteActividadPlan', 'Activo::deleteActividadPlan');



     // RUTAS PARA INVENTARIO CLASIFICACION ACTIVOS
     $routes->get('/inventario-clasificacion-activos','InventarioClasificacionActivosController::index');
     $routes->get('/getListInventarioClasificacionActivo/(:num)','InventarioClasificacionActivosController::getAll/$1');
     $routes->get('/getInventarioClasificacionActivo/(:num)','InventarioClasificacionActivosController::get/$1');
     $routes->post('/addInventarioClasificacionActivo','InventarioClasificacionActivosController::store');
     $routes->post('/updateInventarioClasificacionActivo/(:num)','InventarioClasificacionActivosController::update/$1');
     $routes->post('/deleteInventarioClasificacionActivo/(:num)','InventarioClasificacionActivosController::delete/$1');
     $routes->get('/exportExcelICA/(:num)','InventarioClasificacionActivosController::exportExcelICA/$1');
     $routes->get('/exportExcelICAHistoricos/(:num)','InventarioClasificacionActivosController::exportExcelICAHistoricos/$1');
     $routes->post('/getValorByValoraciones','InventarioClasificacionActivosController::getValorByValoraciones');
     $routes->post('/updateStatus/(:num)','InventarioClasificacionActivosController::updateStatus/$1');
 
        // RUTAS PARA EVALUACION DE RIESGOS
        $routes->get('/evaluacion-riesgos','EvaluacionRiesgoController::index');
        $routes->get('/getEvaluacionRiesgo/(:num)','EvaluacionRiesgoController::getById/$1');
        $routes->get('/countvalores','EvaluacionRiesgoController::countvalores');
        $routes->get('/listEvaluacionRiesgos/(:num)','EvaluacionRiesgoController::getAll/$1');
        $routes->get('/getEvaluacionRiesgoControlesByEvaluacion/(:num)','EvaluacionRiesgoController::getEvaluacionRiesgoControlesByEvaluacion/$1');
        $routes->post('/addEvaluacionRiesgo','EvaluacionRiesgoController::store');
        $routes->post('/addEvaluacionRiesgoHistorial','EvaluacionRiesgoController::store_historial');
        $routes->post('/updateEvaluacionRiesgo/(:num)','EvaluacionRiesgoController::update/$1');
        $routes->post('/deleteEvaluacionRiesgo/(:num)','EvaluacionRiesgoController::delete/$1');
        $routes->get('/exportExcelEVA/(:num)','EvaluacionRiesgoController::exportExcelEVA/$1');
        $routes->get('/exportExcelEVAHistorial/(:num)','EvaluacionRiesgoController::exportExcelEVAHistorial/$1');
        $routes->post('/getValoracionByProbabilidadImpacto','ValoracionRiesgoController::getValoracionByProbabilidadImpacto');
        $routes->post('/getAplicacionImpactoByCaracteristica','AplicacionImpactoController::getAplicacionImpactoByCaracteristica');
        $routes->post('/getAplicacionProbabilidadByCaracteristica','AplicacionProbabilidadController::getAplicacionProbabilidadByCaracteristica');
   
        $routes->post('/getProbabilidadByDescription','ProbabilidadRiesgoController::getByDescription');
        $routes->post('/getImpactoByDescription','ImpactoRiesgoController::getByDescription');
       

    //DATOS PARA REGISTRO DE CONTROLES
    $routes->get('list_registro_controles', 'RegistroControlesController::list_registro_controles');
    $routes->get('getRegistroControlById/(:num)', 'RegistroControlesController::getById/$1');
    $routes->get('/main/getData/(:num)', 'RegistroControlesController::getData/$1');
    $routes->get('/main/getRegistroControl/(:num)', 'RegistroControlesController::getRegistroControl/$1');
    $routes->get('/main/getRegistroDetalleControl/(:num)', 'RegistroControlesController::getRegistroDetalleControl/$1');
    $routes->post('/main/calificarControl/(:num)', 'RegistroControlesController::calificarControl/$1');
    $routes->post('/main/ejecutarEvaluacion', 'RegistroControlesController::ejecutarEvaluacion');

    $routes->post('/main/addControles', 'RegistroControlesController::addControles');
    
    $routes->post('/main/updateRiesgosControlados/(:num)', 'RegistroControlesController::updateRiesgosControlados/$1');


    $routes->post('/main/updateControles', 'RegistroControlesController::updateControles');


    //adiocionales
    $routes->post('activo/getUserByActivo', 'Activo::getUserByActivo');
    $routes->post('activo/getEstadoByActivo', 'Activo::getEstadoByActivo');
    $routes->post('activo/getPrioridadByActivo', 'Activo::getPrioridadByActivo');
    $routes->post('activo/getAlertaByActivo', 'Activo::getAlertaByActivo');


    //Carga de combos Actividades Plan
    $routes->get('activo/getComboAreas', 'Activo::getComboAreas');
    $routes->get('activo/getComboUnidad', 'Activo::getComboUnidad');
    $routes->get('activo/getComboPosicion', 'Activo::getComboPosicion');
    $routes->get('activo/getUserNombreByActivo', 'Activo::getUserNombreByActivo');
    $routes->get('activo/getAlerta', 'Activo::getAlerta');

    $routes->get('getCaracteristicaOpcion/(:num)','EvaluacionControlController::getCaracteristicaOpcion/$1');
    $routes->post('/getdetallevaloracionactivo', 'InventarioClasificacionActivosController::getDetalleValoracionActivo');
    $routes->post('/getValoracionActivoById', 'InventarioClasificacionActivosController::getValoracionActivoById');
    $routes->get('/getAllDetalleValoracionActivo', 'InventarioClasificacionActivosController::getAllDetalleValoracionActivo');
    $routes->post('/getValorActivoByValoraciones', 'InventarioClasificacionActivosController::getValorActivoByValoraciones');
    
/*
/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
