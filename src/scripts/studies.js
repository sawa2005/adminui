"use strict"

// Variabler
let coursesEl = document.getElementById("courses");
let addStudiesButton = document.getElementById("submit");
let editStudiesButton = document.getElementById("edit-submit");
let schoolInput = document.getElementById("school");
let nameInput = document.getElementById("name");
let studiesTypeInput = document.getElementById("type");
let studyStartInput = document.getElementById("startDate");
let studyEndInput = document.getElementById("endDate");

// Funktioner
function getCourses() {
    // Återställ kurslistan
    coursesEl.innerHTML = '<tr><th><strong>ID:</strong></th><th><strong>Lärosäte:</strong></th><th><strong>Namn:</strong></th><th><strong>Typ:</strong></th><th><strong>Start:</strong></th><th><strong>Slut:</strong></th></tr>';

    fetch('https://samuelwarduppgifter.one/restprojekt/studies.php')
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            data.forEach(course => {
                coursesEl.innerHTML +=
                `<tr>
                    <td>${course.id}</td>
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
            console.log('Success:', data);
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

function editCourse() {
    event.preventDefault();

    let editId = document.getElementById("edit-id").value;
    let editSchool = document.getElementById("edit-school").value;
    let editName = document.getElementById("edit-name").value;
    let editStudiesType = document.getElementById("edit-type").value;
    let editStart = document.getElementById("edit-startDate").value;
    let editEnd = document.getElementById("edit-endDate").value;

    let editCourse = {'school': editSchool, 'name': editName, 'type': editStudiesType, 'startDate': editStart, 'endDate': editEnd};

    fetch("https://samuelwarduppgifter.one/restprojekt/studies.php?id=" + editId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editCourse)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

function addCourse() {
    event.preventDefault();

    let school = schoolInput.value;
    let name = nameInput.value;
    let type = studiesTypeInput.value;
    let startDate = studyStartInput.value;
    let endDate = studyEndInput.value;

    let course = {'school': school, 'name': name, 'type': type, 'startDate': startDate, 'endDate': endDate};

    console.log(JSON.stringify(course));

    fetch("https://samuelwarduppgifter.one/restprojekt/studies.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

// Eventlyssnare
window.addEventListener('load', getCourses);
addStudiesButton.addEventListener('click', addCourse);
editStudiesButton.addEventListener('click', editCourse);