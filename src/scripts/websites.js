"use strict"

// Variabler
let websitesEl = document.getElementById("websites");

if (websitesEl) {
    let addWebsitesButton = document.getElementById("submit");
    let editWebsitesButton = document.getElementById("edit-submit");
    let webTypeInput = document.getElementById("type");
    let webTitleInput = document.getElementById("title");
    let linkInput = document.getElementById("link");
    let descInput = document.getElementById("description");
    let imgInput = document.getElementById("imgUrl");
    let yearInput = document.getElementById("year");

    // Funktioner
    function getWebsites() {
    // Återställ webbsidolistan
    websitesEl.innerHTML = '<tr><th><strong>ID:</strong></th><th><strong>Titel:</strong></th><th><strong>Typ:</strong></th><th><strong>Länk:</strong></th><th><strong>Beskrivning:</strong></th><th><strong>Bild-URL:</strong></th><th><strong>År:</strong></th></tr>';

    // Hämta och skriv ut webbsidor
    fetch('https://samuelwarduppgifter.one/restprojekt/websites.php')
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            data.forEach(website => {
                websitesEl.innerHTML +=
                `<tr>
                    <td>${website.id}</td>
                    <td>${website.title}</td>
                    <td>${website.type}</td>
                    <td><a href="${website.link}">${website.link}</a></td>
                    <td>${website.description.slice(0, 40)}...</td>
                    <td>${website.image}</td>
                    <td>${website.year}</td>
                    <td><button id="${website.id}" onClick="deleteWebsite('${website.id}')">Radera</button></td>
                </tr>`
            })
        })
        // Om ett fel uppstår skriv ut felet
        .catch(error => {
            console.log('Error:', error);
        })
    }

    // Hämta och ta bort webbsida med rätt id
    function deleteWebsite(id) {
        fetch("https://samuelwarduppgifter.one/restprojekt/websites.php?id=" + id, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                getWebsites();
            })
            .catch(error => {
                console.log('Error:', error);
            })
    }

    function editWebsite() {
        // Hindrar submit-knappen från att ladda om sidan
        event.preventDefault();

        // Variabler för nya värden
        let editId = document.getElementById("edit-id").value;
        let editTitle = document.getElementById("edit-title").value;
        let editWebType = document.getElementById("edit-type").value;
        let editLink = document.getElementById("edit-link").value;
        let editDescription = document.getElementById("edit-description").value;
        let editImgUrl = document.getElementById("edit-imgUrl").value;
        let editYear = document.getElementById("edit-year").value;

        let editWebsite = {'title': editTitle, 'type': editWebType, 'link': editLink, 'description': editDescription, 'image': editImgUrl, 'year': editYear};

        // Hämtar och uppdaterar webbsida med rätt värden
        fetch("https://samuelwarduppgifter.one/restprojekt/websites.php?id=" + editId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editWebsite)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                getWebsites();
            })
            .catch(error => {
                console.log('Error:', error);
            })
    }

    function addWebsite() {
        event.preventDefault();

        // Variabler för webbsidans värden
        let title = webTitleInput.value;
        let type = webTypeInput.value;
        let link = linkInput.value;
        let description = descInput.value;
        let imgUrl = imgInput.value;
        let year = yearInput.value;

        let website = {'title': title, 'type': type, 'link': link, 'description': description, 'image': imgUrl, 'year': year};

        // Lägger till webbsidan
        fetch("https://samuelwarduppgifter.one/restprojekt/websites.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(website)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                getWebsites();
            })
            .catch(error => {
                console.log('Error:', error);
            })
    }

    // Eventlyssnare
    window.addEventListener('load', getWebsites);
    addWebsitesButton.addEventListener('click', addWebsite);
    editWebsitesButton.addEventListener('click', editWebsite);
}