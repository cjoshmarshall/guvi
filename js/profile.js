$(document).ready(function () {
  var data = localStorage.getItem("user");
  var profileData = JSON.parse(localStorage.getItem("user-profile"));

  var mount = localStorage.getItem("mount");

  if (mount) {
    localStorage.setItem("mount", true);
    $.ajax({
      type: "POST",
      url: "/api/profile/getProfile",
      data,
      contentType: "application/json",
      success: function (response) {
        localStorage.setItem("user-profile", JSON.stringify(response));
        location.reload();
        localStorage.removeItem("mount");
      },
      error: function (error) {
        // console.log(error);
      },
    });
  } else {
    localStorage.removeItem("mount");
  }

  $.ajax({
    type: "POST",
    url: "/api/profile/profile.html",
    data,
    contentType: "application/json",
    error: function (error) {
      if (error.responseText === "Unauthorized") {
        window.location.href = "./register.html";
      }
    },
  });

  $("#name").val(profileData.name);
  $("#age").val(profileData.age);
  $("#dob").val(profileData.dob);
  $("#phone").val(profileData.phone);

  $("#profile-logout").click(function (e) {
    localStorage.clear("user");
    window.location.href = "./register.html";
  });

  $("#profile-update").click(function (e) {
    e.preventDefault();

    var data = localStorage.getItem("user");
    var profileData = localStorage.getItem("user-profile");

    var email = JSON.parse(data).email;
    var name = $("#name").val();
    var age = $("#age").val();
    var dob = $("#dob").val();
    var phone = $("#phone").val();
    var _id = JSON.parse(profileData)._id;

    var formData = { email, name, age, dob, phone };
    var profileFormData = { ...formData, _id };

    if (!profileData) {
      $.ajax({
        type: "POST",
        url: "/api/profile",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
          localStorage.setItem("user-profile", JSON.stringify(response));
          location.reload();
        },
        error: function (error) {
          // console.log(error);
          $("#profile-error").text(error.responseJSON);
        },
      });
    } else {
      $.ajax({
        type: "PUT",
        url: "/api/profile/",
        data: JSON.stringify(profileFormData),
        contentType: "application/json",
        success: function (response) {
          localStorage.setItem("user-profile", JSON.stringify(response));
          location.reload();
          alert("Updated Successfully");
        },
        error: function (error) {
          $("#profile-error").text(error.responseJSON);
        },
      });
    }
  });
});
