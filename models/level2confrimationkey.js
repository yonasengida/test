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

//New Comment Schema Instance
var Level2ConfrimationkeySchema = new Schema({
key:       {type:String},
due_date:  {type:Date},
status:    {type:String},
created_at:{type: Date},
updated_at:{type: Date}
},{versionKey: false});
// add middleware to support pagination
Level2ConfrimationkeySchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('Level2Confrimationkey', Level2ConfrimationkeySchema);
