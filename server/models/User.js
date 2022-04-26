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
        created: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('User', userSchema);

