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
const bcrypt    = require('bcryptjs');
mongoose.plugin(require('mongoose-regex-search'));

const config    = require('../config');

var Schema = mongoose.Schema;
// New Vacancy Schema Instance
var VacancySchema = new Schema({
    code:           { type: String,
                     index: true,
                      searchable: true },
    position:       { type: String,
                       index: true,
                      searchable: true },
    description:    { type: String },
    //job_category:   {type:Schema.Types.ObjectId, ref:'JobCategory'},
    job_category:   { type:String},
    exprience:      { type:Number,
                      index: true,
                      searchable: true },
    qualifications: { type:String},
    status:         { type:String},
    due_date:       { type:String},
    salary:         { type:String},
    number_required:{ type:String},
    contact:        { type:String},
    mobile:         { type:String},
    email:          { type:String},
    level:          { type:String},
    created_by:     { type:Schema.Types.ObjectId, ref:'User'},
    Updated_by:     { type:Schema.Types.ObjectId, ref:'User'},
    created_at:     { type:Date},
    updated_at:     { type: Date}
},{versionKey: false},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
});

// add middleware to support pagination
VacancySchema.plugin(paginator);
// Expose the User Model
module.exports = mongoose.model('Vacancy', VacancySchema);
