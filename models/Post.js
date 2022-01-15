const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Schema = mongoose.Schema;


const PostSchema = new Schema({
  title: String,
  description: String,
  dateCreated: {
      type:Date,
      default:Date.now
  }
});


const posts = mongoose.model('posts',PostSchema)

module.exports = posts;