var querystring = require("querystring");

function index(response, postData) {
  console.log("Request handler 'index' was called");

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("index");
  response.end();
}

function signup(response, postData) {
  console.log("Request handler 'signup' was called");

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("signup");
  response.end();
}

function login(response, postData) {
  console.log("Request handler 'login' was called");

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("login");
  response.end();
}

function clearData(response, postData) {
  console.log("Request handler 'clearData' was called");

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("clearData");
  response.end();
}

exports.index = index;
exports.signup = signup;
exports.login = login;
exports.clearData = clearData;
