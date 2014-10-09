$server = "http://dew.snucse.org:8724/";

$(document).ready(function() {
  $("#loginButton").click(function() {
    var jqxhr = $.ajax({
      type: "POST",
      url: $server + "login",
      data: {
        username: $("input[name=username]").val(),
        password: $("input[name=password]").val()
      },
      success: function(data, textStatus, jqXHR) {
        if (data.error_code) {
          $("span.msg").text(data.error_code);
        } else if (data.user_name) {
          $("span.msg").text(data.user_name + " " + data.login_count);
        }
        console.log(data);
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
          $("span.msg").text(data.error_code);
        } else if (data.user_name) {
          $("span.msg").text(data.user_name + " " + data.login_count);
        }
        console.log(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error');
      }
    });
    return false;
  });

  $("#logoutButton").click(function() {
    var jqxhr = $.ajax({
      type: "POST",
      url: $server + "logout"
    });
  });
});
