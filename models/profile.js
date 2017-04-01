// Load Module Dependencies
var mongoose = require('mongoose');

// Short cut to Schema
var Schema = mongoose.Schema;

// Define Profile Schema
var ProfileSchema = new Schema({
  user:          { type: Schema.Types.ObjectId, ref: 'User' },
  customer:      {type:Schema.Types.ObjectId, ref:'Customer'},
  staff:         {type:Schema.Types.ObjectId, ref:'Staff'},
  picture:       { type: String },
  first_name:    { type: String },
  last_name:     { type: String },
  email:         { type: String },
  mobile:        {type:String},
  date_of_birth: { type: Date },
  city:       { type: String },
  country:    { type: String },
  address:    { type: String },
  gender:     { type: String },
  about:      { type: String }
  
},{versionKey: false},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
});


//ProfileSchema.plugin(hidden);
// Export Profile Model
module.exports = mongoose.model('Profile', ProfileSchema);
