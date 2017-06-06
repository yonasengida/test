'use strict';

/**
 * Log Model Definition.
 */

/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
const config    = require('../config');

var Schema = mongoose.Schema;

// New Log Schema Instance
var LogSchema = new Schema({
user:      {type:Schema.Types.ObjectId, ref:'User'},
operation: {type: String},
created_at:{type: Date},
host:      {type:String}
});
// add middleware to support pagination
LogSchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('Log', LogSchema);
