
    $('#table_registro_controles').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
            "infoEmpty":  "Mostrando 0 a 0 de 0 Registros",
            "infoFiltered": "(Filtrado de _MAX_ registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Registros",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        scrollX: true,
        fixedColumns:   {
            heightMatch: 'none'
        },
        responsive: false,
        autoWidth: false,
        // processing: true,
        lengthMenu:[5,10,25,50],
        pageLength:10,
        clickToSelect:false,
        columnDefs: [
            {
                "targets": [ 0],
                "visible": false,
                "searchable": false
            },
            
        ],
        'drawCallback': function () {
            $( 'table_registro_controles tbody tr td' ).css( 'padding', '1px 1px 1px 1px' );
        }
        
    })
   