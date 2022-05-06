let express = require('express');
let router = express.Router();

let User = require('../models/User');

let controller = require('../controllers/auth.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'response':'hello'});
});


/* Connect Wallet */
router.post("/connectWallet", controller.connectWallet);

router.get("/getUser", (req, res) => {
  User.findOne({
    walletId: req.query.walletId.toLocaleLowerCase()
  })
  .exec((err, user) => {
    if (err) {
      res.status(err)
          .send({
              message: err
          });
      return;
    }
    if(!user) 
    {
      res.status(404)
          .send({
              message: "User not found"
              ,user: null
          });
      return;
    }
    res.status(200)
    .send({
      user: user
    });
  });
});

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
