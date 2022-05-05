let jwt = require('jsonwebtoken');
let User = require('../models/User');

exports.connectWallet = (req, res) => {
    // console.log(req.body.walletId);
    User.findOne(
        {
            walletId: req.body.walletId
        }
    ).exec((err, user) => {
        if (err) {
            res.status(err)
                .send({
                    message: err
                });
            return;
        }
        if (!user) {
            user = new User({
                walletId: req.body.walletId
            });
            user.save((err, user) => {
                if (err) {
                    res.status(500)
                        .send({
                            message: err
                        });
                }
            });
        }

        var token = jwt.sign({
            id: user.walletId
        }, process.env.API_SECRET,
            {
                expiresIn: 86400
            });

        res.status(200)
            .send({
                user: user,
                message: "Login successful",
                accessToken: token
            });
    });
};