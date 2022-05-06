let express = require('express');
let router = express.Router();

let User = require('../models/User');

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

module.exports = router;