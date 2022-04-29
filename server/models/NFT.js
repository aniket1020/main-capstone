let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let nftSchema = new Schema(
    {
       Address: {
           type: String,
           required: [true, "Address not found"],
           trim: true,
       },
       onSale: {
            type: Boolean,
            default: false
       },
       title: {
            type: String,
            trim: true,
            required: [true, "Title not found"],
       },
       price: {
            type: String,
            trim: true,
            required: [true, "Price not found"]
       },
       owner: {
           type: Schema.Types.ObjectId, 
           required: [true, "Owner not found"],
           ref: 'User'
       },
       createdBy: {
            type: Schema.Types.ObjectId, 
            required: [true, "Creator not found"],
            ref: 'User'
        }
    }
);

module.exports = mongoose.model('NFT', nftSchema);

