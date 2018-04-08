'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// All id fields are id on chain. mongo default _id is not overwritten

var ArtworkSchema = mongoose.model('Artwork', new Schema({
  id: {
    type: String,
    required:true,
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
    required: true,
    unique: true
  },
  password: String,
  salt: String
}))

var AgencySchema = mongoose.model('Agency', new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  salt: String
}))

var AuthoritySchema = mongoose.model('Authority', new Schema({
  id: {
    type: String,
    required: true,
    unique: true
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
  Agency: AgencySchema,
  Authority: AuthoritySchema,
  File: FileSchema
}