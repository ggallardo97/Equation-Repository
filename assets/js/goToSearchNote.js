$(document).ready(function(){ //Search a note

    $(document).on('click', '#searchNoteBtn', function(e){

        e.preventDefault();

        const note = $('#searchNote').val();

        window.location = 'search-results.html?q=' + note;

    });

});