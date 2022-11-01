"use strict"

// Variabler
let coursesEl = document.getElementById("courses");
let addButton = document.getElementById("submit");
let schoolInput = document.getElementById("school");
let nameInput = document.getElementById("name");
let typeInput = document.getElementById("type");
let startInput = document.getElementById("startDate");
let endInput = document.getElementById("endDate");

// Funktioner
function getCourses() {
    // Återställ kurslistan
    coursesEl.innerHTML = '<tr><th><strong>Lärosäte:</strong></th><th><strong>Namn:</strong></th><th><strong>Typ:</strong></th><th><strong>Start:</strong></th><th><strong>Slut:</strong></th></tr>';

    fetch('https://samuelwarduppgifter.one/restprojekt/studies.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                coursesEl.innerHTML +=
                `<tr>
                    <td>${course.school}</td>
                    <td>${course.name}</td>
                    <td>${course.type}</td>
                    <td>${course.startDate}</td>
                    <td>${course.endDate}</td>
                    <td><button id="${course.id}" onClick="deleteCourse('${course.id}')">Radera</button></td>
                </tr>`
            })
        })
}

function deleteCourse(id) {
    fetch("https://samuelwarduppgifter.one/restprojekt/studies.php?id=" + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

function addCourse() {
    let school = schoolInput.value;
    let name = nameInput.value;
    let type = typeInput.value;
    let startDate = startInput.value;
    let endDate = endInput.value;

    let course = {'school': school, 'name': name, 'type': type, 'startDate': startDate, 'endDate': endDate};

    fetch("https://samuelwarduppgifter.one/restprojekt/studies.php", {
        method: 'POST',
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

// Eventlyssnare
window.addEventListener('load', getCourses);
addButton.addEventListener('click', addCourse);