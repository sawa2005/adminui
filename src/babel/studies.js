"use strict"; // Variabler

var coursesEl = document.getElementById("courses");
var addButton = document.getElementById("submit");
var schoolInput = document.getElementById("school");
var nameInput = document.getElementById("name");
var typeInput = document.getElementById("type");
var startInput = document.getElementById("startDate");
var endInput = document.getElementById("endDate"); // Funktioner

function getCourses() {
  // Återställ kurslistan
  coursesEl.innerHTML = '<tr><th><strong>Lärosäte:</strong></th><th><strong>Namn:</strong></th><th><strong>Typ:</strong></th><th><strong>Start:</strong></th><th><strong>Slut:</strong></th></tr>';
  fetch('https://samuelwarduppgifter.one/restprojekt/studies.php').then(function (response) {
    return response.json();
  }).then(function (data) {
    data.forEach(function (course) {
      coursesEl.innerHTML += "<tr>\n                    <td>".concat(course.school, "</td>\n                    <td>").concat(course.name, "</td>\n                    <td>").concat(course.type, "</td>\n                    <td>").concat(course.startDate, "</td>\n                    <td>").concat(course.endDate, "</td>\n                    <td><button id=\"").concat(course.id, "\" onClick=\"deleteCourse('").concat(course.id, "')\">Radera</button></td>\n                </tr>");
    });
  });
}

function deleteCourse(id) {
  fetch("https://samuelwarduppgifter.one/restprojekt/studies.php?id=" + id, {
    method: 'DELETE'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    getCourses();
  })["catch"](function (error) {
    console.log('Error:', error);
  });
}

function addCourse() {
  var school = schoolInput.value;
  var name = nameInput.value;
  var type = typeInput.value;
  var startDate = startInput.value;
  var endDate = endInput.value;
  var course = {
    'school': school,
    'name': name,
    'type': type,
    'startDate': startDate,
    'endDate': endDate
  };
  fetch("https://samuelwarduppgifter.one/restprojekt/studies.php", {
    method: 'POST',
    body: JSON.stringify(course)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    getCourses();
  })["catch"](function (error) {
    console.log('Error:', error);
  });
} // Eventlyssnare


window.addEventListener('load', getCourses);
addButton.addEventListener('click', addCourse);