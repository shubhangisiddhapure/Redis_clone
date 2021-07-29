/** @format */
const fs = require("fs");

var dic = {};

const setdata = (req, res) => {
  const data = req.body.input;
  if (data.length === 3) {
    dic[data[1]] = data[2];
    // console.log(dic);
    return { status: "Ok \n"  };
  } else {
    return { res: "wrong number of arguments for 'set' command \n" };
  }
};
const getdata = (req, res) => {
  const data = req.body.input;
  if (data.length === 2) {
    const output = dic[data[1]];
    if (output) {
      return { status: output + "\n" };
    }
    return { res: "data not available\n" };
  } else {
    return { res: "wrong number of arguments for 'get' command \n" };
  }
};
var ONE_SECOND = 1000;
const expire = (req, res) => {
  const data = req.body.input;
  if (data.length === 3) {
    if (dic[data[1]]) {
      const time = parseInt(data[2]);
      if (Number.isInteger(time)) {
        setTimeout(() => {
          delete dic[data[1]];
        }, ONE_SECOND * time);
        return { status: 1 + "\n" };
      } else {
        return { res: "Value is not an integer or out of range \n" };
      }
    } else {
      return { res: 0 + "key does not exist \n" };
    }
  } else {
    return { res: "wrong number of arguments for 'expire' command \n" };
  }
};
const savedata = () => {
  if (Object.keys(dic).length === 0) {
      return { res: "DB is empty \n" };
     
    } else {
      const jsonData = JSON.stringify(dic);
      fs.writeFileSync("./data.json", jsonData);
      return { status: "Ok \n" };
    }
};
module.exports = { setdata, getdata, savedata, expire };
