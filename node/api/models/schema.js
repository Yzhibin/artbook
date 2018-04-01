'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

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
    type: Buffer,
    default: null
  }
}))

var UserSchema = mongoose.model('User', new Schema({
  id: {
    type: String,
    require: true,
    unique: true
  },
  avatar: {
    type: Buffer,
    default: null
  }
}))

module.exports = {
  Artwork: ArtworkSchema,
  User: UserSchema
}