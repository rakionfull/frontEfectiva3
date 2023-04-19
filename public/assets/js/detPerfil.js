
//cambiar estado del view
function EjecutarChangeView(id1,estado){
    try {
        const postData = { 
            id_op:id1,
           
            estado:estado,
        };
     
        try {
            
            $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/main/updateView",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Guardado correctamente, opción ver'
                })
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    }
    catch(err) {
       
    
    }
}
function EjecutarChangeCreate(id1,estado){
   
        const postData = { 
            id_op:id1,
           
            estado:estado,
        };
       // console.log(postData);
        try {

            $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/main/updateCreate",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Guardado correctamente, opción crear'
                })
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    

}
function EjecutarChangeUpdate(id1,estado){
    try {
        const postData = { 
            id_op:id1,
        
            estado:estado,
        };
       // console.log(postData);
        try {

            $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/main/updateUpdate",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Guardado correctamente, opción modificar'
                })
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    }
    catch(err) {
     
    
    }
}
function EjecutarChangeDelete(id1,estado){
    try {
        const postData = { 
            id_op:id1,
        
            estado:estado,
        };
       // console.log(postData);
        try {

            $.ajax({
                method: "POST",
                url: $('#base_url').val()+"/main/updateDelete",
                data: postData,
                dataType: "JSON"
            })
            .done(function(data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Guardado correctamente, opción eliminar'
                })
            })
            .fail(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
                })
            })
            .always(function() {
            });
        }
        catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo activar, intente de nuevo. Si el problema persiste, contacte con el administrador del sistema.'
            })
        }

    }
    catch(err) {
        
    
    }
}
function changeView(elemento){

                    let usuario = elemento.id.split('_');
                    var dato1 = usuario[1];
                   
                    if(elemento.checked){
                        EjecutarChangeView(dato1,1);
                    }else{
                        EjecutarChangeView(dato1,0);
                    }

};
function changeCreate(elemento){
   
    let usuario = elemento.id.split('_');
    var dato1 = usuario[1];
   
    if(elemento.checked){
        EjecutarChangeCreate(dato1,1);
    }else{
        EjecutarChangeCreate(dato1,0);
    }

};
function changeUpdate(elemento){

    let usuario = elemento.id.split('_');
    var dato1 = usuario[1];
   
    if(elemento.checked){
        EjecutarChangeUpdate(dato1,1);
    }else{
        EjecutarChangeUpdate(dato1,0);
    }

};
function changeDelete(elemento){

    let usuario = elemento.id.split('_');
    var dato1 = usuario[1];
   
    if(elemento.checked){
        EjecutarChangeDelete(dato1,1);
    }else{
        EjecutarChangeDelete(dato1,0);
    }

};