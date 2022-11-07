const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

if(loginButton) {
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        // username
        const topythia = loginForm.oratwelo.value;

        // password
        const rticiate = loginForm.obasiler.value;

        // check username and password inputs
        if (topythia === "dT93f&95" && rticiate === "ZhH3398^ygsb") {
            alert("You have successfully logged in.");
            window.location.href = "studies.html";
        } else {
            loginErrorMsg.style.opacity = 1;
        }
    })
}