'use strict';

/**
 * Job Category Model Definition.
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

// New Job Category Schema Instance
var JobCategorySchema = new Schema({
name:{ type:String}
},{versionKey: false},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
});

// add middleware to support pagination
JobCategorySchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('JobCategory', JobCategorySchema);
