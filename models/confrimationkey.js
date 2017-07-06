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
var ConfrimationkeySchema = new Schema({
key:       {type:String},
level:     {type: String},
due_date:  {type:Date},
status:    {type:String},
created_at:{type: Date}
},{versionKey: false});
// add middleware to support pagination
ConfrimationkeySchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('Confrimationkey', ConfrimationkeySchema);
