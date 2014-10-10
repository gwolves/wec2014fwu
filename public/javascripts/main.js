$server = "http://dew.snucse.org:8724/";

$(document).ready(function() {
  $("span.msg").text("Please enter your credentials below");

  $("#loginButton").click(function() {
    var jqxhr = $.ajax({
      type: "POST",
      url: $server + "login",
      data: {
        username: $("input[name=username]").val(),
        password: $("input[name=password]").val()
      },
      success: function(data, textStatus, jqXHR) {
        if (data.error_code && data.error_code === -4) {
          $("span.msg").text("Invalid username and password combination. Please try again. ");
          console.log(data);
        } else if (data.user_name) {
          location.href = '/welcome';
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error');
      }
    });
    return false;
  });

  $("#signupButton").click(function() {
    var jqxhr = $.ajax({
      type: "POST",
      url: $server + "signup",
      data: {
        username: $("input[name=username]").val(),
        password: $("input[name=password]").val()
      },
      success: function(data, textStatus, jqXHR) {
        if (data.error_code) {
          if (data.error_code === -1) {
            $("span.msg").text("The user name should be 5~20 characters long. Please try again.");
          } else if (data.error_code === -2) {
            $("span.msg").text("The password should be 8~20 characters long. Please try again.");
          } else if (data.error_code === -3) {
            $("span.msg").text("This user name already exists. Please try again.");
          }
          console.log(data);
        } else if (data.user_name) {
          location.href = '/welcome';
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error');
      }
    });
    return false;
  });
});
