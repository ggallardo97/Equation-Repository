const { ipcRenderer } = require('electron');
const form = document.querySelector('form');
let dynamicCategories = document.getElementById('category');
let selectedArea = document.getElementById('area');

ipcRenderer.send('get-categories-form', {});

ipcRenderer.on('get-categories-form', (e, categories) => {

    let categoriesArrayParsed = JSON.parse(categories);

    categoriesArrayParsed.forEach(category => {
        if(category.area === selectedArea.value){
            
            const optionsCategoriesTemplate = '<option value="'+category._id+'">'+category.category+'</option>';
            dynamicCategories.innerHTML += optionsCategoriesTemplate;  
        }
    });

    selectedArea.addEventListener('change', (event) => {
        dynamicCategories.innerHTML = '';
        let newSelectedArea = document.getElementById('area');

        categoriesArrayParsed.forEach(category => {
            if(category.area === newSelectedArea.value){
                const optionsCategoriesTemplate = '<option value="'+category._id+'">'+category.category+'</option>';
                dynamicCategories.innerHTML += optionsCategoriesTemplate;  
            }
        });
    });
});

form.addEventListener('submit', event => {

    const title       = document.querySelector('#title').value;
    const equation    = document.querySelector('#equation').value;
    const unit        = document.querySelector('#unit').value;
    const description = document.querySelector('#description').value;
    const category    = document.querySelector('#category').value;

    const newNote = {
        title,
        equation,
        unit,
        description,
        category
    }

    ipcRenderer.send('new-note', newNote);

    event.preventDefault();
});

ipcRenderer.on('new-note-res', (e, response) => {

    let responseArrayParsed = JSON.parse(response);

    if(responseArrayParsed.res === 'ok'){
        swal({
            title : '¡Nota agregada!',
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
