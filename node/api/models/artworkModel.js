'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ArtworkSchema = new Schema({
  id: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  hash: {
    type: String
  }
});

module.exports = mongoose.model('Artwork', ArtworkSchema);