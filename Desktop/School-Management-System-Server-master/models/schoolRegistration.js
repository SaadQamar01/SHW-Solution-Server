var mongoose = require('mongoose');

//Create School Registration Schema using mongoose
var schoolRegisterSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    date: { type: String },
    amount: { type: Number },
    type: { type: String }
}, { collection: 'school-register' });
var SchoolRegister =module.exports= mongoose.model('SchoolRegister', schoolRegisterSchema);