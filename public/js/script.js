$(document).ready(function () {
  // References to forms and inputs
  const loginForm = $("form.login");
  const loginEmailInput = $("input#login-email-input");
  const loginPasswordInput = $("input#login-password-input");
  const signupForm = $("form.signup");
  const signupEmailInput = $("input#signup-email-input");
  const signupPasswordInput = $("input#signup-password-input");

  // When the form is submitted, validate there's a email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      email: loginEmailInput.val().trim(),
      password: loginPasswordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // Run login function and clear the form
    login(userData.email, userData.password);
    loginEmailInput.val("");
    loginPasswordInput.val("");
  });

  // login does a post and if successful redirects to the user's profile
  function login(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/profile");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // When the signup button is clicked, validate the email and password are not blank
  signupForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      email: signupEmailInput.val().trim(),
      password: signupPasswordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If there is a email and password, run the signup function
    signup(userData.email, userData.password);
    signupEmailInput.val("");
    signupPasswordInput.val("");
  });

  // login does a post and if successful redirects to the user's profile
  function signup(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function (data) {
        window.location.replace("/profile");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  $.get("/api/user_data").then(function (data) {
    $(".users-name").text(data.email);
  });
});
