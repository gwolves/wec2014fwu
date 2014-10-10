$server = "http://dew.snucse.org:8724/";

$(document).ready(function() {
  $("#logoutButton").click(function() {
    var jqxhr = $.ajax({
      type: "POST",
      url: $server + "logout",
      data: {},
      success: function(data, textStatus, jqXHR) {
        location.reload();
      }
    });
  });
});
