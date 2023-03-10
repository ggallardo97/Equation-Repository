require('dotenv').config();
const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url  = require('url');
const path = require('path');
const mongoose   = require('mongoose');
const { create } = require('domain');
const dbFunctions = require('../helpers/dbFunctions');
const dbconn = process.env.CONNECTION_DB;

mongoose.set('strictQuery', true);

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname,'../node_modules','.bin','electron')
    });
}

//Define windows
let mainWindow;
let newNoteWindow;
let newCategoryWindow;
let newHelperWindow;
let newErrorWindow;

//DB connection
mongoose.connect(dbconn)
.then(() =>{
   console.log('Connected to MongoDB');
}).catch((err) =>{
   console.log('Cannot connect to MongoDB: ' + err);
   errorWindow();
});

//Main Window
app.on('ready', () => {

    mainWindow = new BrowserWindow({
        center: true,
        width : 1070,
        height: 800,
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(url.format({
        pathname : path.join(__dirname, '../views/index.html'),
        protocol : 'file',
        slashes  : true
    }));
    
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed', () => {
        app.quit();
    });
});

//Windows
function errorWindow(){
    newErrorWindow = new BrowserWindow({
        width : 300,
        height: 300,
        title :'Error',
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        }
    });

    newErrorWindow.setMenu(null);

    newErrorWindow.loadURL(url.format({
        pathname : path.join(__dirname, '../views/error-db.html'),
        protocol : 'file',
        slashes  : true
    }));

    newErrorWindow.on('closed', () => {
        newErrorWindow = null;
        app.quit();
    });
}

function createNewNoteWindow(){
    newNoteWindow = new BrowserWindow({
        width : 700,
        height: 600,
        title :'Agregar una nota',
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        }
    });

    //newNoteWindow.setMenu(null);

    newNoteWindow.loadURL(url.format({
        pathname : path.join(__dirname, '../views/new-note.html'),
        protocol : 'file',
        slashes  : true
    }));

    newNoteWindow.on('closed', () => {
        newNoteWindow = null;
    });
}

function createNewCategoryWindow(){
    newCategoryWindow = new BrowserWindow({
        width : 700,
        height: 600,
        title :'Agregar una categoria',
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        }
    });

    newCategoryWindow.setMenu(null);

    newCategoryWindow.loadURL(url.format({
        pathname : path.join(__dirname, '../views/new-category.html'),
        protocol : 'file',
        slashes  : true
    }));

    newCategoryWindow.on('closed', () => {
        newCategoryWindow = null;
    });
}

function equationFormattingHelperWindow(){
    newHelperWindow = new BrowserWindow({
        width : 700,
        height: 600,
        title :'Formato de las ecuaciones',
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        }
    });

    newHelperWindow.setMenu(null);

    newHelperWindow.loadURL(url.format({
        pathname : path.join(__dirname, '../views/equation-helper.html'),
        protocol : 'file',
        slashes  : true
    }));

    newHelperWindow.on('closed', () => {
        newHelperWindow = null;
    });
}

//Events on the app
//Get all categories and send to mainWindow
ipcMain.on('get-categories', async(e, req) => {
    try{
        let categories = await dbFunctions.getCategories();
        mainWindow.webContents.send('get-categories', JSON.stringify(categories));  
    }catch(err){

    }
    
});

//Get all categories from an area and send to mainWindow
ipcMain.on('get-categories-area', async(e, req) => {
    try{
        let categoriesArea = await dbFunctions.getCategoriesByArea(req.area);
        mainWindow.webContents.send('get-categories-area', JSON.stringify(categoriesArea)); 
    }catch(err){

    }
    
});

//Get all categories and send to newNoteWindow
ipcMain.on('get-categories-form', async(e, req) => {
    try{
        let categories = await dbFunctions.getCategories();
        newNoteWindow.webContents.send('get-categories-form', JSON.stringify(categories));  
    }catch(err){

    }
    
});

//Get notes by category and send to mainWindow
ipcMain.on('get-notes-category', async(e, req) => {
    try{
        let notes = await dbFunctions.getNotesByCategory(req.category);
        mainWindow.webContents.send('get-notes-category', JSON.stringify(notes));  
    }catch(err){

    }
    
});

//New note
ipcMain.on('new-note', async(e, newNote) => {
    try{
        await dbFunctions.createNote(newNote);
        newNoteWindow.webContents.send('new-note-res', JSON.stringify({ res : 'ok' })); 
    }catch(err){
        newNoteWindow.webContents.send('new-note-res', JSON.stringify({ res : 'error' })); 
    }
});

//New category
ipcMain.on('new-category', async(e, newCategory) => {
    try{
        await dbFunctions.createCategory(newCategory);
        newCategoryWindow.webContents.send('new-category-res', JSON.stringify({ res : 'ok' })); 
    }catch(err){
        newCategoryWindow.webContents.send('new-category-res', JSON.stringify({ res : 'error' }));
    }
    
});

//Delete a note
ipcMain.on('delete-note', async(e, req) => {
    try{
        await dbFunctions.deleteNotesByID(req.id);
        mainWindow.webContents.send('delete-note-res', JSON.stringify({ res : 'ok' })); 
    }catch(err){
        mainWindow.webContents.send('delete-note-res', JSON.stringify({ res : 'error' })); 
    }
    
});

//Edit a note
ipcMain.on('edit-note', async(e, req) => {
    try{
        await dbFunctions.editNoteByID(req);
        mainWindow.webContents.send('edit-note-res', JSON.stringify({ res : 'ok' })); 
    }catch(err){
        mainWindow.webContents.send('edit-note-res', JSON.stringify({ res : 'error' })); 
    }
    
});

//Search a note
ipcMain.on('search-note', async(e, req) => {
    try{
        const notes = await dbFunctions.searchNote(req);
        console.log(notes);
        mainWindow.webContents.send('search-note-res', JSON.stringify(notes)); 
    }catch(err){
        mainWindow.webContents.send('search-note-res', JSON.stringify({ res : 'error' })); 
    }
    
});

//Delete a category
ipcMain.on('delete-category', async(e, req) => {
    try{
        await dbFunctions.deleteCategoryByID(req.id);
        mainWindow.webContents.send('delete-category-res', JSON.stringify({ res : 'ok' })); 
    }catch(error){
        mainWindow.webContents.send('delete-category-res', JSON.stringify({ res : 'error' }));
    }
    
});

//Edit a category
ipcMain.on('edit-category', async(e, req) => {
    try{
        await dbFunctions.editCategoryByID(req);
        mainWindow.webContents.send('edit-category-res', JSON.stringify({ res : 'ok' })); 
    }catch(err){
        mainWindow.webContents.send('edit-category-res', JSON.stringify({ res : 'error' })); 
    }
    
});

//Top menu template
const templateMenu = [
    {
        label  : 'Archivo',
        submenu: [
            {
                label :'Agregar f??rmula',
                click(){
                    createNewNoteWindow();
                }
            },
            {
                label :'Agregar categoria',
                click(){
                    createNewCategoryWindow();
                }
            },
            {
                label : 'Salir',
                accelerator: process.platform === 'darwin' ? 'command+q' : 'Ctrl + Q',
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label : 'Ayuda',
        submenu: [
            {
                label : 'C??mo agregar f??rmulas',
                click(){
                    equationFormattingHelperWindow();
                }
            }
        ]
    }
];

//For Mac
if(process.platform === 'darwin'){
    templateMenu.unshift({
        label : app.getName()
    });
}

//Dev tools (only on DEV env)
if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'Dev Tools',
        submenu:[
            {
                label: 'Show/Hide Dev Tools',
                accelerator: 'Ctrl + D',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}