const selectedArea = document.querySelectorAll('.selectedArea');

selectedArea.forEach(selected => {
    selected.addEventListener('click', e => {
        e.preventDefault();
        window.location = 'categories-areas.html?area=' + selected.id;
    });
});