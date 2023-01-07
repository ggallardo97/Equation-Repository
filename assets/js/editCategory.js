$(document).ready(function(){ //Edit a category

    $(document).on('click','.edit', function(e){

        e.preventDefault();
        const id       = $(this).data('id');
        const category = $(this).data('category');

        $('#modalCategory').val(category);

        $(document).on('click','#editCategoryBtn', function(e){

            e.preventDefault();
            let category = $('#modalCategory').val();
            let editCategoryData = {
                id,
                category
            }

            ipcRenderer.send('edit-category', editCategoryData);

            ipcRenderer.on('edit-category-res', (e, response) => {

                let responseArrayParsed = JSON.parse(response);

                if(responseArrayParsed.res === 'ok'){
                    swal({
                        title: 'Se ha editado la categoría correctamente',
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