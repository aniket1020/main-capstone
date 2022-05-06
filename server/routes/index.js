let express = require('express');
let router = express.Router();

let controller = require('../controllers/auth.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'response':'hello'});
});

/* Connect Wallet */
router.post("/connectWallet", controller.connectWallet);

/* Some sample upload demo */
/* 
let upload = require('../userUploads');
app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  let response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
}); 
*/

module.exports = router;
