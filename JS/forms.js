/*//////////////////////////////////////////
            FORM VALIDATION
/////////////////////////////////////////*/

document.addEventListener("DOMContentLoaded", function () {
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    /* Helper function to display error messages */
    const showError = (inputElement, message) => {
        let errorSpan = inputElement.nextElementSibling; // Get the next sibling (error span)
        if (!errorSpan || errorSpan.tagName !== "SPAN") {
            errorSpan = document.createElement("span"); // Create span if it doesn't exist
            errorSpan.className = "error-message";
            inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
        }
        errorSpan.textContent = message;
    };

    const clearError = (inputElement) => {
        let errorSpan = inputElement.nextElementSibling;
        if (errorSpan && errorSpan.tagName === "SPAN") {
            errorSpan.textContent = ""; // Clear error message
        }
    };

    /*/////////////////////////////////////////
            SIGN-UP FORM VALIDATION
    /////////////////////////////////////////*/
    const validateSignUp = (event) => {
        event.preventDefault();

        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const birthday = document.getElementById("birthday");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const passwordConfirm = document.getElementById("password-confirm");

        let isValid = true; // Track overall form validity

        if (firstName.value.trim() === "") {
            showError(firstName, "First name is required");
            isValid = false;
        } else {
            clearError(firstName);
        }

        if (lastName.value.trim() === "") {
            showError(lastName, "Last name is required");
            isValid = false;
        } else {
            clearError(lastName);
        }

        if (birthday.value.trim() === "") {
            showError(birthday, "Birthday is required");
            isValid = false;
        } else {
            clearError(birthday);
        }

        if (phone.value.trim() === "") {
            showError(phone, "Phone number is required");
            isValid = false;
        } else {
            clearError(phone);
        }

        if (email.value.trim() === "") {
            showError(email, "Email is required");
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, "Invalid email format");
            isValid = false;
        } else {
            clearError(email);
        }

        if (password.value.trim() === "") {
            showError(password, "Password is required");
            isValid = false;
        } else if (!validatePassword(password.value.trim())) {
            showError(
                password,
                "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character"
            );
            isValid = false;
        } else {
            clearError(password);
        }

        if (password.value !== passwordConfirm.value) {
            showError(passwordConfirm, "Passwords do not match");
            isValid = false;
        } else {
            clearError(passwordConfirm);
        }

        if (isValid) {
            console.log("Sign-up form submitted successfully");
        }
    };

    /*/////////////////////////////////////////
                LOGIN FORM VALIDATION
    /////////////////////////////////////////*/
    const validateLogin = (event) => {
        event.preventDefault();

        const email = document.getElementById("login-email");
        const password = document.getElementById("login-password");

        let isValid = true;

        if (email.value.trim() === "") {
            showError(email, "Email is required");
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, "Invalid email format");
            isValid = false;
        } else {
            clearError(email);
        }

        if (password.value.trim() === "") {
            showError(password, "Password is required");
            isValid = false;
        } else if (!validatePassword(password.value.trim())) {
            showError(
                password,
                "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character"
            );
            isValid = false;
        } else {
            clearError(password);
        }

        if (isValid) {
            console.log("Login form submitted successfully");
            window.location.href = "../Pages/checkout.html";
        }
    };

    /*/////////////////////////////////////////
    FORM SUBMIT HANDLERS
    /////////////////////////////////////////*/

    // Attach event listeners to both forms
    const signUpForm = document.querySelector("#signup-form");
    if (signUpForm) {
        signUpForm.addEventListener("submit", validateSignUp);
    }

    const loginForm = document.querySelector("#login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", validateLogin);
    }
});
