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
var CustomerSchema = new Schema({
job_category:[{type:Schema.Types.ObjectId, ref:'JobCategory'}],
profile:         { type: Schema.Types.ObjectId, ref: 'Profile'},
exprience:       {type :Number},
expire_date:     { type:Date}
},{versionKey: false},{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});
// add middleware to support pagination
CustomerSchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('Customer', CustomerSchema);
