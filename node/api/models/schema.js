'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  var passportLocalMongoose = require('passport-local-mongoose');

var ArtworkSchema = mongoose.model('Artwork', new Schema({
  id: {
    type: String,
    require:true,
    unique: true
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  pic: {
    data: Buffer,
    contentType: String
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