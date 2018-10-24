var Express = require('express');
var Webtask = require('webtask-tools');
var bodyParser = require('body-parser');
var app = Express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var okrabyte = require('okrabyte');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/images', multipartMiddleware, (req, res) => {
  var file = req.files.image;
  if (file.type !== "image/png") {
    res.json({msg: 'support png only' });
  }
  okrabyte.decodeFile(file.path, function(err, data){
    if (err) {
      res.json({error: err });
    }
    res.json({msg: data });
  });  

});

module.exports = Webtask.fromExpress(app);
