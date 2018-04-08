'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var ArtworkSchema = mongoose.model('Artwork', new Schema({
  id: {
    type: String,
    require:true,
    unique: true
  },
  name: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
}))

var UserSchema = mongoose.model('User', new Schema({
  id: {
    type: String,
    require: true,
    unique: true
  },
  avatar: {
    data: Buffer,
    contentType: String
  },
  password: String,
  salt: String
}))

var FileSchema = mongoose.model('File', new Schema({
  img: { 
    data: Buffer, 
    contentType: String
   },
   name: {
    type: String,
    default: null
   }
}))


module.exports = {
  Artwork: ArtworkSchema,
  User: UserSchema,
  File: FileSchema
}