let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        walletId: {
            type: String,
            required: [true, "Invalid wallet address"],
            unique: [true, "Wallet already registered"],
            trim: true
        },
        firstName: {
            type: String,
            required: false,
            default: null,
            trim: true,
        },
        lastName: {
            type: String,
            required: false,
            default: null,
            trim: true,
        },
        userName: {
            type: String,
            required: false,
            default: null,
            trim: true,
        },
        email: {
            type: String,
            unique: [true, "email already exists in database!"],
            lowercase: true,
            trim: true,
            required: false,
            validate: {
              validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
              },
              message: '{VALUE} is not a valid email!'
            }
        },
        website: {
            type: String,
            trim: true,
            default: null,
            required: false
        },
        facebook: {
            type: String,
            trim: true,
            default: null,
            required: false
        },
        twitter: {
            type: String,
            trim: true,
            default: null,
            required: false
        },
        instagram: {
            type: String,
            trim: true,
            default: null,
            required: false
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('User', userSchema);

