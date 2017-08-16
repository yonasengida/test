'use strict';

/**
 * Customer Model Definition.
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
var RegsiterIndexSchema = new Schema({
mobile:          {type :String},
value:           {type:Number}
},{versionKey: false});
// add middleware to support pagination
RegsiterIndexSchema.plugin(paginator);
// Expose the RegsiterIndex Model
module.exports = mongoose.model('RegsiterIndex', RegsiterIndexSchema);
