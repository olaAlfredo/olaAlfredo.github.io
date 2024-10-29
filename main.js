function toggleDropdown(event) {
    const header = event.currentTarget;
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');
    
    content.classList.toggle('active');
    arrow.textContent = content.classList.contains('active') ? '▼' : '▲';
}

function loadContent(page) {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = '<p>Cargando...</p>';

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            contentContainer.innerHTML = data;
        })
        .catch(error => {
            contentContainer.innerHTML = `
                <div style="color: #dc3545; padding: 1rem; background-color: #f8d7da; border-radius: 4px;">
                    Error: ${error.message}
                </div>
            `;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const firstMenuItem = document.querySelector('.menu-item');
    const initialFile = firstMenuItem.getAttribute('data-file');
    loadContent(initialFile);

    document.querySelectorAll('.dropdown-header').forEach(header => {
        header.addEventListener('click', toggleDropdown);
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const file = item.getAttribute('data-file');
            loadContent(file);
        });
    });
});