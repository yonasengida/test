'use strict';

/**
 * Vacancy Model Definition.
 */

/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
const bcrypt    = require('bcrypt');

const config    = require('../config');

var Schema = mongoose.Schema;

// New Customer Schema Instance
var VacancySchema = new Schema({

    
},{versionKey: false},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
});

// add middleware to support pagination
UserSchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('Vacancy', VacancySchema);
