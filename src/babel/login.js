"use strict";

var loginForm = document.getElementById("login-form");
var loginButton = document.getElementById("login-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");
loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  var username = loginForm.username.value;
  var password = loginForm.password.value;

  if (username === "user" && password === "web_dev") {
    alert("You have successfully logged in.");
    window.location.href = "studies.html";
  } else {
    loginErrorMsg.style.opacity = 1;
  }
});