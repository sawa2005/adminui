"use strict"

// Variabler
let jobsEl = document.getElementById("jobs");
let addButton = document.getElementById("submit");
let jobInput = document.getElementById("job");
let titleInput = document.getElementById("title");
let startInput = document.getElementById("startDate");
let endInput = document.getElementById("endDate");

// Funktioner
function getJobs() {
    // Återställ kurslistan
    jobsEl.innerHTML = '<tr><th><strong>Arbetsplats:</strong></th><th><strong>Titel:</strong></th><th><strong>Start:</strong></th><th><strong>Slut:</strong></th></tr>';

    fetch('https://samuelwarduppgifter.one/restprojekt/work.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(work => {
                jobsEl.innerHTML +=
                `<tr>
                    <td>${work.job}</td>
                    <td>${work.title}</td>
                    <td>${work.startDate}</td>
                    <td>${work.endDate}</td>
                    <td><button id="${work.id}" onClick="deleteCourse('${work.id}')">Radera</button></td>
                </tr>`
            })
        })
}

function deleteJob(id) {
    fetch("https://samuelwarduppgifter.one/restprojekt/work.php?id=" + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getJobs();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

function addJob() {
    let job = jobInput.value;
    let title = titleInput.value;
    let startDate = startInput.value;
    let endDate = endInput.value;

    let course = {'job': job, 'title': title, 'startDate': startDate, 'endDate': endDate};

    fetch("https://samuelwarduppgifter.one/restprojekt/work.php", {
        method: 'POST',
        body: JSON.stringify(job),
    })
        .then(response => response.json())
        .then(data => {
            getJobs();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

// Eventlyssnare
window.addEventListener('load', getJobs);
addButton.addEventListener('click', addJob);