"use strict"

// Variabler
let websitesEl = document.getElementById("websites");
let addButton = document.getElementById("submit");
let typeInput = document.getElementById("type");
let titleInput = document.getElementById("title");
let linkInput = document.getElementById("link");
let descInput = document.getElementById("description");
let imgInput = document.getElementById("imgUrl");
let yearInput = document.getElementById("year");

// Funktioner
function getWebsites() {
    // Återställ kurslistan
    websitesEl.innerHTML = '<tr><th><strong>Titel:</strong></th><th><strong>Typ:</strong></th><th><strong>Länk:</strong></th><th><strong>Beskrivning:</strong></th><th><strong>Bild-URL:</strong></th><th><strong>År:</strong></th></tr>';

    fetch('https://samuelwarduppgifter.one/restprojekt/websites.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(website => {
                websitesEl.innerHTML +=
                `<tr>
                    <td>${website.title}</td>
                    <td>${website.type}</td>
                    <td><a href="${website.link}">${website.link}</a></td>
                    <td>${website.description}</td>
                    <td>${website.image}</td>
                    <td>${website.year}</td>
                    <td><button id="${website.id}" onClick="deleteWebsite('${website.id}')">Radera</button></td>
                </tr>`
            })
        })
}

function deleteWebsites(id) {
    fetch("https://samuelwarduppgifter.one/restprojekt/websites.php?id=" + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getWebsites();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

function addWebsite() {
    let title = titleInput.value;
    let type = typeInput.value;
    let link = linkInput.value;
    let description = descInput.value;
    let imgUrl = imgInput.value;
    let year = yearInput.value;

    let website = {'title': title, 'type': type, 'link': link, 'description': description, 'imgUrl': imgUrl, 'year': year,};

    fetch("https://samuelwarduppgifter.one/restprojekt/websites.php", {
        method: 'POST',
        body: JSON.stringify(website),
    })
        .then(response => response.json())
        .then(data => {
            getWebsites();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

// Eventlyssnare
window.addEventListener('load', getWebsites);
addButton.addEventListener('click', addWebsite);