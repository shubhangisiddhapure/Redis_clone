/** @format */

const db = require("../test/db");
const { setdata } = require("../data");
const { getdata } = require("../data");
const { expire } = require("../data");
const { savedata } = require("../data");
// Setup connection to the database
beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());

// set the data
describe("Test with set the data", () => {

  try {
     it("it should create a new data", async () => {
       let req = {
         body: {
           input: ["set", "name", "shubhangi"],
         },
       };
       const res = await setdata(req);
       expect(res).toEqual({ status: "Ok \n" });
     });
    
  } catch(error) {
    it("it should give an error for set command", async () => {
      let req = {
        body: {
          input: ["set", "shubhangi"],
        },
      };
      const err = await setdata(req);
      expect(err).toEqual({
        res: "wrong number of arguments for 'set' command \n",
      });
    });
  }
 
});

//get the data
describe("Test with get the data", () => {
  try {
    it("it should get the data", async () => {
      let req = {
        body: {
          input: ["get", "name"],
        },
      };
      const res = await getdata(req);
      // console.log(res);
      expect(res).toEqual({ status: "shubhangi\n" });
    });
  } catch (error) {
    it("it should give an error for the get command as data not available", async () => {
      let req = {
        body: {
          input: ["get", "data"],
        },
      };
      const err = await getdata(req);
      // console.log(res);
      expect(err).toEqual({
        res: "data not available\n",
      });
    });
    it("it should give an error for the get command", async () => {
      let req = {
        body: {
          input: ["get"],
        },
      };
      const err = await getdata(req);
      console.log(res);
      expect(err).toEqual({
        res: "wrong number of arguments for 'get' command \n",
      });
    });
    
  }
  

});
//testing for expire the data
describe("Test for expire the data after limited time", () => {
  try {
     it("it should delete data after fixed time", async () => {
       let req = {
         body: {
           input: ["expire", "name", 1],
         },
       };
       const res = await expire(req);
       console.log(res);
       expect(res).toEqual({ status: "1\n" });
     });
  } catch (error) {
     it("it should give an error as value is an integer", async () => {
       let req = {
         body: {
           input: ["expire", "name", "w"],
         },
       };
       const err = await expire(req);
       console.log(res);
       expect(err).toEqual({
         res: "Value is not an integer or out of range \n",
       });
     });
     //for key not found
     it("it should give an error as key does not exist ", async () => {
       let req = {
         body: {
           input: ["expire", "data", 1],
         },
       };
       const err = await expire(req);
       console.log(res);
       expect(err).toEqual({ res: 0 + "key does not exist \n" });
     });
  }
 
 
});
//save the data in memory
describe("Test with save the data", () => {
  it("it should save the data", async () => {
    const res = await savedata();
    console.log(res);
    expect(res).toEqual({ status: "Ok \n" });
  });
});
