$(document).ready(function(){ //Delete a category

    $(document).on('click','.delete', function(e){

        const { ipcRenderer } = require('electron');

        e.preventDefault();
        const id = $(this).data('id');

        swal({
            title      : '¿Eliminar categoría?',
            text       : 'Se borrará y no podrá ser recuperada',
            icon       : 'warning',
            buttons    : ['Cancelar', true],
            dangerMode : true,
        }).then((willdelete) => { 

            if(willdelete){

                ipcRenderer.send('delete-category', { id });

                ipcRenderer.on('delete-category-res', (e, response) => {

                    let responseArrayParsed = JSON.parse(response);

                    if(responseArrayParsed.res === 'ok'){
                        swal({
                            title: 'Se ha eliminado la categoría correctamente',
                            icon : 'success'
                        }).then(() => {
                            window.location.reload();
                        });
                    }else{
                        swal({
                            title: 'Algo salio mal',
                            icon : 'error'
                        });
                    }
                });
            }
        });

    });

});