/*//////////////////////////////////////////
SIGN UP FORM VALIDATION
/////////////////////////////////////////*/

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector("#signup-form");
  const signUpFormErrors = document.querySelector("#signup-form-errors");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirm-password");

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (email === "" || password === "" || confirmPassword === "") {
      signUpFormErrors.style.display = "block";
      return;
    }

    if (password !== confirmPassword) {
      signUpFormErrors.innerHTML =
        "Passwords do not match. Please try again.";
      signUpFormErrors.style.display = "block";
      return;
    }

    // Add email and password to formData
    const formData = new FormData(signUpForm);

    // Send POST request to server with formData
    fetch("/Users/tsn19/Development/Projects/Raven-Reports/PHP/signup.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to login page
          window.location.href = "/Users/tsn19/Development/Projects/Raven-Reports/Pages/log-in.html";
        } else {
          signUpFormErrors.innerHTML = data.message;
          signUpFormErrors.style.display = "block";
        }
      });
  });
});
