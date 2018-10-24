const path = require("path");
const config = require(path.join(__dirname, "config.json"));
const testCases = require(path.join(__dirname, "tests.json"));
const request = require('request');
const fs = require('fs');

for (let testCase of testCases) {
  test(`msg should be "${testCase.msg}"`,
    () => {
      let file = fs.createReadStream("."+testCase.image);
      const options = {
        method: "POST",
        url: config.url+"/images",
        port: 443,
        headers: {
          "Content-Type": "multipart/form-data"
        },        
        formData : {
            "image" : file
        }
      };
      request(options, function (err, res, body) {
        if(err) {
          console.log(err);
        } else {
          body = JSON.parse(body);
          expect(body.msg).toBe(testCase.msg);
        }
      });


    }
  );
}