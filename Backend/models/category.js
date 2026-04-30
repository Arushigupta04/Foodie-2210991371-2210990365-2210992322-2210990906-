const mongoose = require('mongoose');
const Item = require('./item'); 

const categorySchema = new mongoose.Schema({
category_title: {
    type: String,
    required: true,
  },
  category_description : {
    type: String,
    required: true,
  },
  category_icon:{
    type: String,
    required:true
  },
  food_item: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item',
  }],
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
