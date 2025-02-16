const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
    
  },
  author: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true
  }

},{versionKey:false});

const BookModel = model("Book", BookSchema);

module.exports = BookModel;
