'use strict';

/**
 * Keyword Model Definition.
 */

/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
const bcrypt    = require('bcryptjs');

const config    = require('../config');

var Schema = mongoose.Schema;

// New RegsiterIndex Schema Instance
var KeywordSchema = new Schema({
keyword:          {type :String},
category:         {type:String}
},{versionKey: false});
// add middleware to support pagination
KeywordSchema.plugin(paginator);
// Expose the RegsiterIndKeywordex Model
module.exports = mongoose.model('Keyword', KeywordSchema);
