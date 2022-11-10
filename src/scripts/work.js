"use strict"

// Variabler
let jobsEl = document.getElementById("jobs");
let addWorkButton = document.getElementById("submit");
let editWorkButton = document.getElementById("edit-submit");
let jobInput = document.getElementById("job");
let jobTitleInput = document.getElementById("title");
let jobStartInput = document.getElementById("startDate");
let jobEndInput = document.getElementById("endDate");

// Funktioner
function getJobs() {
    // Återställ jobblistan
    jobsEl.innerHTML = '<tr><th><strong>ID:</strong></th><th><strong>Arbetsplats:</strong></th><th><strong>Titel:</strong></th><th><strong>Start:</strong></th><th><strong>Slut:</strong></th></tr>';

    // Hämta och skriv ut jobb
    fetch('https://samuelwarduppgifter.one/restprojekt/work.php')
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            data.forEach(work => {
                jobsEl.innerHTML +=
                `<tr>
                    <td>${work.id}</td>
                    <td>${work.job}</td>
                    <td>${work.title}</td>
                    <td>${work.startDate}</td>
                    <td>${work.endDate}</td>
                    <td><button id="${work.id}" onClick="deleteJob('${work.id}')">Radera</button></td>
                </tr>`
            })
        })
        // Om ett fel uppstår skriv ut felet
        .catch(error => {
            console.log('Error:', error);
        })
}

// Hämta och ta bort jobb med rätt id
function deleteJob(id) {
    fetch("https://samuelwarduppgifter.one/restprojekt/work.php?id=" + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getJobs();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

function editJob() {
    // Hindrar submit-knappen från att ladda om sidan
    event.preventDefault();

    // Variabler för nya värden
    let editId = document.getElementById('edit-id').value;
    let editJob = document.getElementById('edit-job').value;
    let editTitle = document.getElementById('edit-title').value;
    let editStart = document.getElementById('edit-start').value;
    let editEnd = document.getElementById('edit-end').value;

    let editWork = {'job': editJob, 'title': editTitle, 'startDate': editStart, 'endDate': editEnd};

    // Hämtar och uppdaterar kurs med rätt värden
    fetch("https://samuelwarduppgifter.one/restprojekt/work.php?id=" + editId, {
        method: 'PUT',
        body: JSON.stringify(editWork),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getJobs();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

function addJob() {
    event.preventDefault();

    // Variabler för jobbets värden
    let job = jobInput.value;
    let title = jobTitleInput.value;
    let startDate = jobStartInput.value;
    let endDate = jobEndInput.value;

    let work = {'job': job, 'title': title, 'startDate': startDate, 'endDate': endDate};

    // Lägger till jobbet
    fetch("https://samuelwarduppgifter.one/restprojekt/work.php", {
        method: 'POST',
        body: JSON.stringify(work),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getJobs();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

// Eventlyssnare
window.addEventListener('load', getJobs);
addWorkButton.addEventListener('click', addJob);
editWorkButton.addEventListener('click', editJob);