$(document).ready(function(){ //Delete a note

    $(document).on('click','.delete', function(e){

        e.preventDefault();
        const idNote = $(this).data('id');

        swal({
            title      : '¿Eliminar elemento?',
            text       : 'Se borrará y no podrá ser recuperado',
            icon       : 'warning',
            buttons    : ['Cancelar', true],
            dangerMode : true,
        }).then((willdelete) => { 

            if(willdelete){

                ipcRenderer.send('delete-note', { id : idNote });

                ipcRenderer.on('delete-note-res', (e, response) => {

                    let responseArrayParsed = JSON.parse(response);

                    if(responseArrayParsed.res === 'ok'){
                        swal({
                            title: 'Se ha eliminado el elemento correctamente',
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