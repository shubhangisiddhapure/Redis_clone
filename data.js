/** @format */
const fs = require("fs");

var dic = {};

const setdata = (req, res) => {
  const data = req.body.input;
  console.log(data);
  if (data.length === 3) {
    dic[data[1]] = data[2];
    // console.log(dic);
    return { status: "Ok \n" };
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

const lpush = (req) => {
  const data = req.body.input;
  if (data.length === 3) {
    if (dic[data[1]] == undefined) {
      let arr = [data[2]];
      dic[data[1]] = arr;
      return { status: "1 \n" };
    } else if (dic[data[1]]) {
      let arr1 = dic[data[1]];
      arr1.push(data[2]);
      return { status: "1 \n" };
    }
  } else {
    return { res: "wrong number of arguments for 'lpush' command \n" };
  }
};

const lrange = (req) => {
  const data = req.body.input;
  if (data.length === 4) {
    if (dic[data[1]]) {
      const start = parseInt(data[2]);
      const end = parseInt(data[3]);
      if (Number.isInteger(start) && Number.isInteger(end)) {
        var answer = [];
        const output = dic[data[1]];
        for (var i = data[3]; i >= data[2]; i--) {
          answer.push(output[i] + "\n");
        }
        return { status: answer };
      } else {
        return { res: "Value is not an integer or out of range \n" };
      }
    } else {
      return { res: "key does not exist \n" };
    }
  } else {
    return { res: "wrong number of arguments for 'lrange' command \n" };
  }
};

const lpop = (req) => {
  const data = req.body.input;
  if (data.length === 3) {
    if (dic[data[1]]) {
      const count = parseInt(data[2]);
      if (Number.isInteger(count)) {
        const output = dic[data[1]];
        output.reverse();
        var counter = 0;
        for (var i = 0; i <= data[2]; i++) {
          console.log(output, "first time");
          output.shift();
          counter++;
          console.log(output, "second time");
          if (counter === parseInt(data[2])) {
            break;
          }
        }
        return { status: "done" + "\n" };
      } else {
        return { res: "Value is out of range, must be positive \n" };
      }
    } else {
      return { res: 0 + "key does not exist \n" };
    }
  } else {
    return { res: "wrong number of arguments for 'lpush' command \n" };
  }
};

module.exports = { setdata, getdata, savedata, expire, lpush, lrange, lpop };
