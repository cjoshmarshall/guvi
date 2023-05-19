$(document).ready(function () {
  $("#email").on("input", function () {
    $("#login-email-error").text("");
  });

  $("#password").on("input", function () {
    $("#login-password-error").text("");
  });

  $("#login-form").submit(function (e) {
    e.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();

    var formData = { email, password };

    if (email === "") {
      return $("#login-email-error").text("Please Enter Email");
    }
    if (password === "") {
      return $("#login-password-error").text("Please Enter Password");
    }

    $.ajax({
      type: "POST",
      url: "/api/login",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        localStorage.setItem("user", JSON.stringify(response));
        window.location.href = "./profile.html";
        localStorage.setItem("mount", false);
      },
      error: function (error) {
        // console.log(error);
        $("#login-error").text(error.responseJSON);
      },
    });
  });
});
