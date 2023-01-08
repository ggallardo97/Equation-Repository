//DB Models
const Note     = require('../models/noteModel');
const Category = require('../models/categoryModel');

//Functions for DB
async function createNote(newNote){

    let note = new Note({
        title: newNote.title,
        equation: newNote.equation,
        unit: newNote.unit,
        description: newNote.description,
        category: newNote.category
    });

    return await note.save();
}

async function createCategory(newCategory){

    let category = new Category({
        category: newCategory.category,
        area: newCategory.area
    });

    return await category.save();
}

async function getCategories(){

    let categoriesList = await Category.find();

    return categoriesList;
}

async function getCategoriesByArea(area){

    let filter = { area : area};

    let categoriesList = await Category.find(filter);

    return categoriesList;
}

async function getNotesByCategory(category){

    let filter = { category };

    let notesList = await Note.find(filter).populate('category');

    return notesList;
}

async function deleteNotesByID(idnote){

    await Note.findByIdAndDelete(idnote);

}

async function editNoteByID(newDataNote){

    await Note.findByIdAndUpdate(newDataNote.id, {
        $set:{
            title : newDataNote.title,
            equation : newDataNote.equation,
            unit : newDataNote.unit,
            description : newDataNote.description
        }
    });

}

async function searchNote(noteToSearch){

    let notes = await Note.find({
        title : new RegExp(noteToSearch.text, 'i')
    });

    return notes;

}

async function deleteCategoryByID(idcategory){

    await Category.findByIdAndDelete(idcategory);

}

async function editCategoryByID(newDataCategory){

    await Category.findByIdAndUpdate(newDataCategory.id, {
        $set:{
            category : newDataCategory.category
        }
    });

}

module.exports = { 
    createNote,
    createCategory,
    getCategories,
    getCategoriesByArea,
    getNotesByCategory,
    deleteNotesByID,
    editNoteByID,
    searchNote,
    deleteCategoryByID,
    editCategoryByID
};