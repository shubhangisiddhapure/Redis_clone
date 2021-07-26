/** @format */

const { setdata } = require("./data");
const { getdata } = require("./data");
const { savedata } = require("./data");
var net = require("net");
var server = net.createServer(function (socket) {
  socket.on("data", function (data) {
    var data = data.toString("utf8");
    var input = data.trim().split(" ");
    let req = {
      body: {
        input,
      },
    };
    if (input[0] == "set") {
      const output = setdata(req);
      socket.write("server reply " + Object.values(output));
    } else if (input[0] == "get") {
      const output = getdata(req);
      socket.write("server reply " + Object.values(output));
    } else if (input[0] == "save") {
      const output = savedata(req);
      socket.write("server reply " + Object.values(output));
    } else if (input[0] == "quit") {
      socket.end("server is stoped \n");
    } else {
      socket.write("unknown command \n");
    }
  });
});
server.listen(7777);
