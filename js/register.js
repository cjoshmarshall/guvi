$(document).ready(function () {
  $("#email").on("input", function () {
    $("#register-email-error").text("");
  });

  $("#password").on("input", function () {
    $("#register-password-error").text("");
  });

  $("#confirmPassword").on("input", function () {
    $("#register-cpassword-error").text("");
  });

  $("#register-form").submit(function (e) {
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    var formData = { email, password };

    if (email === "") {
      $("#register-email-error").text("Please Enter Email");
    }
    if (password === "") {
      $("#register-password-error").text("Please Enter Password");
    }
    if (confirmPassword === "") {
      $("#register-cpassword-error").text("Please Enter Confirm Password");
    }

    if (password !== confirmPassword) {
      return $("#register-error").text("Please Check Password");
    }

    $.ajax({
      type: "POST",
      url: "/api/register",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        // $("#response").text(JSON.stringify(response));
        localStorage.setItem("user", JSON.stringify(response));
        window.location.href = "./login.html";
      },
      error: function (error) {
        // console.log(error);
        $("#register-error").text(error.responseJSON);
      },
    });
  });
});
