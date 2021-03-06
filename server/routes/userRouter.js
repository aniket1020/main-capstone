let express = require('express');
let router = express.Router();

let User = require('../models/User');
let upload = require('../userUploads');

let verifyToken = require('../middlewares/authJWT');

const fs = require('fs');

router.get("/userProfile/getUser", (req, res) => {
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

router.post("/userProfile/edit", verifyToken, upload.any(), (req, res) => {

  // console.log(req.body);
  // console.log(req.files);

  User.findOne({
    walletId: req.body.walletAddress.toLocaleLowerCase()
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

    if (req.files.length !== 0)
    {
      if (req.files[0]['fieldname'] == 'profileImagePath')
      user.profileImagePath = req.files[0]['path'];
      else
      {
        user.profileBackgroundImagePath = req.files[0]['path'];
        if(req.files.length == 2)
        {
          if (req.files[1]['fieldname'] == 'profileImagePath')
          user.profileImagePath = req.files[1]['path'];
        }
      }
    }

    if (req.body.profileImagePath)
    {
      try
      {
        fs.unlinkSync(user.profileImagePath);
      }
      catch(err)
      {
        console.log(err);
      }

      user.profileImagePath = null;
    }
    

    if (req.body.profileBackgroundImagePath)
    {
      try
      {
        fs.unlinkSync(user.profileBackgroundImagePath);
      }
      catch(err)
      {
        console.log(err);
      }

      user.profileBackgroundImagePath = null;
    }

    if (req.body.firstName)
    user.firstName = req.body.firstName != "" ? req.body.firstName : null;
    if (req.body.lastName)
    user.lastName = req.body.lastName != "" ? req.body.lastName : null;
    if (req.body.userName)
    user.userName = req.body.userName != "" ? req.body.userName : null;
    if (req.body.email)
    user.email = req.body.email != "" ? req.body.email : null;

    if (req.body.website)
    user.website = req.body.website != "" ? req.body.website : null;
    if (req.body.facebook)
    user.facebook = req.body.facebook != "" ? req.body.facebook : null;
    if (req.body.twitter)
    user.twitter = req.body.twitter != "" ? req.body.twitter : null;
    if (req.body.instagram)
    user.instagram = req.body.instagram != "" ? req.body.instagram : null;

    user.save((err, user) => {
      if (err) {
        console.log(err);
          res.status(500)
              .send({
                  message: err
              });
      }
      res.status(200).send({message: "Saved user successfully"});
   });
  });
});

module.exports = router;