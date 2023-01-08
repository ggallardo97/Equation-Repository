const { ipcRenderer } = require('electron');
const mainDashboard = document.querySelector('#mainDashboard');

const urlParams = new URLSearchParams(window.location.search);
const categoryValue = urlParams.get('category');

ipcRenderer.send('get-notes-category', { category : categoryValue});

ipcRenderer.on('get-notes-category', (e, notes) => {

    let notesArrayParsed = JSON.parse(notes);
 
    notesArrayParsed.forEach(note => {

        const noteTemplate = '<div class="col-xl-4 col-md-6 mb-4"><div class="card border-left-success shadow h-100 py-2"><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><div class="text-sm font-weight-bold text-success text-uppercase mb-1">'+note.title+'</div><div class="h6 mb-0 font-weight-bold text-gray-800">'+note.equation+'</div><div class="text-sm font-weight-bold text-dark mb-1">Unidades: '+note.unit+'</div><div class="text-xs font-weight-bold text-dark mb-1">Notas: '+note.description+'</div></div><div class="col-auto"><div class="col no-gutters align-items-center"><div class="col-auto"><a href="#" class="edit" data-toggle="modal" data-target="#modalEditNote" data-id='+note._id+' data-title="'+note.title+'" data-equation="'+note.equation+'" data-unit="'+note.unit+'" data-description="'+note.description+'"><i class="fas fa-edit"></i></a></div><div class="col-auto"><a href="#" data-id="'+note._id+'" class="delete"><i class="fas fa-trash"></i></a></div></div></div></div></div></div></div>';
                
        mainDashboard.innerHTML += noteTemplate;  
    });
});