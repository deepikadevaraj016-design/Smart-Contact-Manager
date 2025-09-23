function loadHTML(targetId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        })
}

document.addEventListener("DOMContentLoaded", function () {
    loadHTML("header-placeholder", "header.html");
    loadHTML("footer-placeholder", "footer.html");
    
})


 