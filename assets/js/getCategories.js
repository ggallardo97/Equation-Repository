const { ipcRenderer } = require('electron');
const mainDashboard = document.querySelector('#mainDashboard');

const urlParams = new URLSearchParams(window.location.search);
const areaValue = urlParams.get('area');

ipcRenderer.send('get-categories-area', { area : areaValue });

ipcRenderer.on('get-categories-area', (e, categories) => {

    let categoriesArrayParsed = JSON.parse(categories);
    
    categoriesArrayParsed.forEach(category => {

        const categoriesTemplate = '<div class="col-xl-3 col-md-6 mb-4"><div class="card border-left-primary shadow h-100 py-2"><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><div class="text-sm font-weight-bold text-primary text-uppercase mb-1"><a href="#" class="showNotes" id="'+category._id+'">'+category.category+'</a></div></div><div class="col-auto"><div class="col no-gutters align-items-center"><div class="col-auto"><a href="#" data-id="'+category._id+'" data-category="'+category.category+'" class="edit" data-toggle="modal" data-target="#modalEditCategory"><i class="fas fa-edit"></i></a></div><div class="col-auto"><a href="#" data-id="'+category._id+'" class="delete"><i class="fas fa-trash"></i></a></div></div></div></div></div></div></div>';
                    
        mainDashboard.innerHTML += categoriesTemplate;  
    });

    const selectedCategory = document.querySelectorAll('.showNotes');

    selectedCategory.forEach(selected => {
        selected.addEventListener('click', e => {
            e.preventDefault();
            window.location = 'equations.html?category=' + selected.id;
        });
    });
});