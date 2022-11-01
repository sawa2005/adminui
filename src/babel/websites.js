"use strict"; // Variabler

var websitesEl = document.getElementById("websites");
var addButton = document.getElementById("submit");
var typeInput = document.getElementById("type");
var titleInput = document.getElementById("title");
var linkInput = document.getElementById("link");
var descInput = document.getElementById("description");
var imgInput = document.getElementById("imgUrl");
var yearInput = document.getElementById("year"); // Funktioner

function getWebsites() {
  // Återställ kurslistan
  websitesEl.innerHTML = '<tr><th><strong>Titel:</strong></th><th><strong>Typ:</strong></th><th><strong>Länk:</strong></th><th><strong>Beskrivning:</strong></th><th><strong>Bild-URL:</strong></th><th><strong>År:</strong></th></tr>';
  fetch('https://samuelwarduppgifter.one/restprojekt/websites.php').then(function (response) {
    return response.json();
  }).then(function (data) {
    data.forEach(function (website) {
      websitesEl.innerHTML += "<tr>\n                    <td>".concat(website.title, "</td>\n                    <td>").concat(website.type, "</td>\n                    <td><a href=\"").concat(website.link, "\">").concat(website.link, "</a></td>\n                    <td>").concat(website.description, "</td>\n                    <td>").concat(website.image, "</td>\n                    <td>").concat(website.year, "</td>\n                    <td><button id=\"").concat(website.id, "\" onClick=\"deleteWebsite('").concat(website.id, "')\">Radera</button></td>\n                </tr>");
    });
  });
}

function deleteWebsites(id) {
  fetch("https://samuelwarduppgifter.one/restprojekt/websites.php?id=" + id, {
    method: 'DELETE'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    getWebsites();
  })["catch"](function (error) {
    console.log('Error:', error);
  });
}

function addWebsite() {
  var title = titleInput.value;
  var type = typeInput.value;
  var link = linkInput.value;
  var description = descInput.value;
  var imgUrl = imgInput.value;
  var year = yearInput.value;
  var website = {
    'title': title,
    'type': type,
    'link': link,
    'description': description,
    'imgUrl': imgUrl,
    'year': year
  };
  fetch("https://samuelwarduppgifter.one/restprojekt/websites.php", {
    method: 'POST',
    body: JSON.stringify(website)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    getWebsites();
  })["catch"](function (error) {
    console.log('Error:', error);
  });
} // Eventlyssnare


window.addEventListener('load', getWebsites);
addButton.addEventListener('click', addWebsite);