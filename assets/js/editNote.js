$(document).ready(function(){ //Edit a note

    $(document).on('click','.edit', function(e){

        e.preventDefault();
        const id          = $(this).data('id');
        const title       = $(this).data('title');
        const equation    = $(this).data('equation');
        const unit        = $(this).data('unit');
        const description = $(this).data('description');

        $('#modalTitle').val(title);
        $('#modalEquation').val(equation);
        $('#modalUnit').val(unit);
        $('#modalDescription').val(description);

        $(document).on('click','#editNoteBtn', function(e){

            e.preventDefault();
            let title = $('#modalTitle').val();
            let equation = $('#modalEquation').val();
            let unit = $('#modalUnit').val();
            let description = $('#modalDescription').val();

            let editNoteData = {
                id,
                title,
                equation,
                unit,
                description
            }

            ipcRenderer.send('edit-note', editNoteData);

            ipcRenderer.on('edit-note-res', (e, response) => {

                let responseArrayParsed = JSON.parse(response);

                if(responseArrayParsed.res === 'ok'){
                    swal({
                        title: 'Se ha editado la nota correctamente',
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

        });

    });

});