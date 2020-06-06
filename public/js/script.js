$(document).ready(function () {
  // References to forms and inputs
  const loginForm = $("form.login");
  const loginUsernameInput = $("input#login-username-input");
  const loginPasswordInput = $("input#login-password-input");
  const signupForm = $("form.signup");
  const signupUsernameInput = $("input#signup-username-input");
  const signupPasswordInput = $("input#signup-password-input");

  // When the form is submitted, validate there's a username and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      username: loginUsernameInput.val().trim(),
      password: loginPasswordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }

    // Run login function and clear the form
    login(userData.username, userData.password);
    loginUsernameInput.val("");
    loginPasswordInput.val("");
  });

  // login does a post and if successful redirects to the user's profile
  function login(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function () {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // When the signup button is clicked, validate the username and password are not blank
  signupForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      username: signupUsernameInput.val().trim(),
      password: signupPasswordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }
    // If there is a username and password, run the signup function
    signup(userData.username, userData.password);
    signupUsernameInput.val("");
    signupPasswordInput.val("");
  });

  // login does a post and if successful redirects to the user's profile
  function signup(username, password) {
    $.post("/api/signup", {
      username: username,
      password: password
    })
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  $.get("/api/user_data").then(function (data) {
    $(".users-name").text(data.username);
  });
});
