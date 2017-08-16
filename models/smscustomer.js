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

// New Customer Schema Instance
var SMSCustomerSchema = new Schema({
job_category:    {type:String},
exprience:       {type :Number},
level:           {type :String},
mobile:          {type :String},
status:          {type :String},
expire_date:     { type:Date}
},{versionKey: false});
// add middleware to support pagination
SMSCustomerSchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('SMSCustomer', SMSCustomerSchema);
