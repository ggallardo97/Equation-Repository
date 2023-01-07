const { ipcRenderer } = require('electron');
const form = document.querySelector('form');

form.addEventListener('submit', event => {

    const category = document.querySelector('#category').value;
    const area     = document.querySelector('#area').value;

    const newCategory = {
        category,
        area
    }

    ipcRenderer.send('new-category', newCategory);

    event.preventDefault();
});

ipcRenderer.on('new-category-res', (e, response) => {

    let responseArrayParsed = JSON.parse(response);

    if(responseArrayParsed.res === 'ok'){
        swal({
            title : '¡Categoria agregada!',
            icon  : 'success'
        }).then(() => {
            window.location.reload();
        });
    }else{
        swal({
            title : '¡Algo salió mal!',
            icon  : 'error'
        });
    }

});