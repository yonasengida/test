'use strict';

/**
 * Comment Model Definition.
 */

/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
const config    = require('../config');

var Schema = mongoose.Schema;

// New Comment Schema Instance
var CommentSchema = new Schema({
contact:   {type:String},
content:   {type: String},
created_at:{type: Date}
},{versionKey: false});
// add middleware to support pagination
CommentSchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('Comment', CommentSchema);
