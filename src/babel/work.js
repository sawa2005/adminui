"use strict"; // Variabler

var jobsEl = document.getElementById("jobs");
var addButton = document.getElementById("submit");
var jobInput = document.getElementById("job");
var titleInput = document.getElementById("title");
var startInput = document.getElementById("startDate");
var endInput = document.getElementById("endDate"); // Funktioner

function getJobs() {
  // Återställ kurslistan
  jobsEl.innerHTML = '<tr><th><strong>Arbetsplats:</strong></th><th><strong>Titel:</strong></th><th><strong>Start:</strong></th><th><strong>Slut:</strong></th></tr>';
  fetch('https://samuelwarduppgifter.one/restprojekt/work.php').then(function (response) {
    return response.json();
  }).then(function (data) {
    data.forEach(function (work) {
      jobsEl.innerHTML += "<tr>\n                    <td>".concat(work.job, "</td>\n                    <td>").concat(work.title, "</td>\n                    <td>").concat(work.startDate, "</td>\n                    <td>").concat(work.endDate, "</td>\n                    <td><button id=\"").concat(work.id, "\" onClick=\"deleteCourse('").concat(work.id, "')\">Radera</button></td>\n                </tr>");
    });
  });
}

function deleteJob(id) {
  fetch("https://samuelwarduppgifter.one/restprojekt/work.php?id=" + id, {
    method: 'DELETE'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    getJobs();
  })["catch"](function (error) {
    console.log('Error:', error);
  });
}

function addJob() {
  var job = jobInput.value;
  var title = titleInput.value;
  var startDate = startInput.value;
  var endDate = endInput.value;
  var course = {
    'job': job,
    'title': title,
    'startDate': startDate,
    'endDate': endDate
  };
  fetch("https://samuelwarduppgifter.one/restprojekt/work.php", {
    method: 'POST',
    body: JSON.stringify(job)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    getJobs();
  })["catch"](function (error) {
    console.log('Error:', error);
  });
} // Eventlyssnare


window.addEventListener('load', getJobs);
addButton.addEventListener('click', addJob);