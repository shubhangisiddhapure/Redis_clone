/** @format */

const getdata = require("./data");
var net = require("net");
var server = net.createServer(function (socket) {
  socket.on("data", function (data) {
    var data = data.toString("utf8");
    // console.log(data.length)
    let req = {
      body: {
        data,
      },
    };
    const datas = getdata(req);
    socket.write("server reply " + Object.values(datas));
  });
});
server.listen(7777);
