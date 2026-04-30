const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_title: {
        type: String,
        required: true,
    },
    item_type: {
        type: String,
        enum: ['veg', 'nonveg'],
        required: true,
    },
    item_price: {
        type: Number,
        required: true,
    },
    item_offer: {
        type: String,
        default:"Currently No Offer Applicable!"
    },
    item_src: {
        type: String,
        required: true,
    },
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
