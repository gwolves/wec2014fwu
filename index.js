var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.index;
handle["/signup"] = requestHandlers.signup;
handle["/login"] = requestHandlers.login;
handle["/clearData"] = requestHandlers.clearData;

server.start(router.route, handle);
