'use strict';

/**
 * News Model Definition.
 */

/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
const config    = require('../config');

var Schema = mongoose.Schema;

// New News Schema Instance
var NewsSchema = new Schema({
user:      {type:Schema.Types.ObjectId, ref:'User'},
title:     { type : String},
content:   {type: String},
created_at:{type: Date}
},{versionKey: false});
// add middleware to support pagination
NewsSchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('News', NewsSchema);
