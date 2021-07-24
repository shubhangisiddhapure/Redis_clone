/** @format */
var dic = {};
const getdata = (req, res) => {
  const data = req.body.data;
  var input = data.trim().split(" ");
  console.log(input);
  if (input[0] == "set") {
    if (input.length === 3) {
      dic[input[1]] = input[2];
      // console.log(dic);
      return { status: "Ok \n" };
    } else {
      return { res: "wrong number of arguments for 'set' command \n" };
    }
  } else if (input[0] == "get") {
    if (input.length === 2) {
      const output = dic[input[1]];
      if (output) {
        return { status: output + "\n" };
      }
       return { status: "data not available\n" };
    } else {
      return { res: "wrong number of arguments for 'get' command \n" };
    }
  } else {
    return { res: "unknown command \n" };
  }
};
module.exports = getdata;
