// Variabler
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

if(loginButton) {
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        // Användarnamn
        const topythia = loginForm.oratwelo.value;

        // Lösenord
        const rticiate = loginForm.obasiler.value;

        // Kollar att inloggningsuppgifterna stämmer
        if (topythia === "dT93f&95" && rticiate === "ZhH3398^ygsb") {
            alert("You have successfully logged in.");
            window.location.href = "studies.html";
        } else {
            loginErrorMsg.style.opacity = 1;
        }
    })
}