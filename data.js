/** @format */
const fs = require("fs");

var dic = {};
const read = () => {
  data_ = fs.readFileSync("./data.json", "utf8");
  return data_;
};

const write = (key,value)=>{
    let data1 = read()
    let data = JSON.parse(data1)
    data[key]=value;
    let jsonData = JSON.stringify(data)
    fs.writeFileSync('./data.json',jsonData)
  return "data saved";
}

const setdata = (req, res) => {
  const data = req.body.input;
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
     return { status: "data not available\n" };
   } else {
     return { res: "wrong number of arguments for 'get' command \n" };
   }
}
const savedata = (req, res) => {
  const data = req.body.input;
  if (data.length === 3) {
    dic[data[1]] = data[2];
    let key = data[1];
    let value = data[2];
    const output=write(key,value)
    return { status: output+ "\n" };
  } else {
    return { res: "wrong number of arguments for 'set' command \n" };
  }
  
}
module.exports = { setdata, getdata, savedata };
