const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [{ validator: value => validator.isEmail(value), msg: 'Email already exists.' }],
        required: 'Please supply an Email Address'
    },
    name: {
        type: String,
        required: 'Please supply a Name',
        trim: true
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
